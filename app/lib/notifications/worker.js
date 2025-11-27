const notifier = require('node-notifier')
const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const APP_DIR = path.dirname(path.dirname(path.dirname(__filename)))
const DB_PATH = path.join(APP_DIR, 'orphelix.db')
const STATE_FILE = path.join(APP_DIR, '.notification-state.json')

// Store previous state to detect changes
let previousState = loadState()

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
    }
  } catch (error) {
    console.error('Failed to load notification state:', error)
  }
  return {
    pods: { failing: 0 },
    nodes: { notReady: 0 },
    deployments: { degraded: 0 },
    pv: { unbound: 0 }
  }
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
  } catch (error) {
    console.error('Failed to save notification state:', error)
  }
}

function getSettings() {
  if (!fs.existsSync(DB_PATH)) {
    return { notificationsEnabled: false, enabledResources: new Set() }
  }

  const db = new Database(DB_PATH, { readonly: true })

  try {
    // Get notifications enabled setting
    const userSettings = db.prepare('SELECT notifications_enabled FROM user_settings WHERE id = 1').get()
    const notificationsEnabled = Boolean(userSettings?.notifications_enabled)

    // Get enabled resource types
    const resources = db.prepare('SELECT resource_type FROM critical_issues_settings WHERE enabled = 1').all()
    const enabledResources = new Set(resources.map(r => r.resource_type))

    return { notificationsEnabled, enabledResources }
  } finally {
    db.close()
  }
}

async function fetchCriticalIssues() {
  try {
    // Fetch from the local API
    const response = await fetch('http://localhost:3000/api/dashboard')
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    return {
      pods: {
        failing: data.pods?.filter(p => p.status === 'Failed' || p.status === 'CrashLoopBackOff').length || 0
      },
      nodes: {
        notReady: data.nodes?.filter(n => !n.ready).length || 0
      },
      deployments: {
        degraded: data.deployments?.filter(d => d.availableReplicas < d.desiredReplicas).length || 0
      },
      pv: {
        unbound: data.persistentVolumes?.filter(pv => pv.status !== 'Bound').length || 0
      }
    }
  } catch (error) {
    console.error('Failed to fetch critical issues:', error.message)
    return null
  }
}

function sendNotification(title, message, type = 'info') {
  notifier.notify({
    title: `Orphelix - ${title}`,
    message: message,
    sound: type === 'critical' ? 'Basso' : false,
    wait: false,
    timeout: 10,
    icon: path.join(APP_DIR, 'public', 'icon.png'), // Optional: add icon
  })
}

function checkAndNotify(currentState, enabledResources) {
  const notifications = []

  // Check pods
  if (enabledResources.has('pods')) {
    const prevFailing = previousState.pods.failing
    const currFailing = currentState.pods.failing

    if (currFailing > prevFailing) {
      const newFailing = currFailing - prevFailing
      notifications.push({
        title: 'Pod Failures Detected',
        message: `${newFailing} new pod(s) in failed state. Total: ${currFailing}`,
        type: 'critical'
      })
    }
  }

  // Check nodes
  if (enabledResources.has('nodes')) {
    const prevNotReady = previousState.nodes.notReady
    const currNotReady = currentState.nodes.notReady

    if (currNotReady > prevNotReady) {
      const newNotReady = currNotReady - prevNotReady
      notifications.push({
        title: 'Node Issues Detected',
        message: `${newNotReady} node(s) not ready. Total: ${currNotReady}`,
        type: 'critical'
      })
    }
  }

  // Check deployments
  if (enabledResources.has('deployments')) {
    const prevDegraded = previousState.deployments.degraded
    const currDegraded = currentState.deployments.degraded

    if (currDegraded > prevDegraded) {
      const newDegraded = currDegraded - prevDegraded
      notifications.push({
        title: 'Deployment Issues',
        message: `${newDegraded} deployment(s) degraded. Total: ${currDegraded}`,
        type: 'warning'
      })
    }
  }

  // Check PVs
  if (enabledResources.has('pv')) {
    const prevUnbound = previousState.pv.unbound
    const currUnbound = currentState.pv.unbound

    if (currUnbound > prevUnbound) {
      const newUnbound = currUnbound - prevUnbound
      notifications.push({
        title: 'Volume Issues',
        message: `${newUnbound} persistent volume(s) unbound. Total: ${currUnbound}`,
        type: 'warning'
      })
    }
  }

  // Send all notifications
  notifications.forEach(n => sendNotification(n.title, n.message, n.type))
}

async function checkCriticalIssues() {
  const { notificationsEnabled, enabledResources } = getSettings()

  if (!notificationsEnabled) {
    return // Notifications disabled
  }

  if (enabledResources.size === 0) {
    return // No resources monitored
  }

  const currentState = await fetchCriticalIssues()

  if (!currentState) {
    return // Failed to fetch data
  }

  // Check for changes and notify
  checkAndNotify(currentState, enabledResources)

  // Save current state for next check
  previousState = currentState
  saveState(currentState)
}

// Main loop
async function start() {
  console.log('🔔 Notification worker started')
  console.log('   Checking every 30 seconds...')

  // Initial check after 5 seconds
  setTimeout(() => {
    checkCriticalIssues().catch(console.error)
  }, 5000)

  // Check every 30 seconds
  setInterval(() => {
    checkCriticalIssues().catch(console.error)
  }, 30000)
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🔔 Notification worker stopped')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🔔 Notification worker stopped')
  process.exit(0)
})

// Start the worker
if (require.main === module) {
  start()
}

module.exports = { checkCriticalIssues, start }
