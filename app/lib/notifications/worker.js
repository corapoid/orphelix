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
    return { notificationsEnabled: false, enabledResources: new Set(), mode: 'demo' }
  }

  const db = new Database(DB_PATH, { readonly: true })

  try {
    // Get notifications enabled setting and mode
    const userSettings = db.prepare('SELECT notifications_enabled, mode FROM user_settings WHERE id = 1').get()
    const notificationsEnabled = Boolean(userSettings?.notifications_enabled)
    const mode = userSettings?.mode || 'demo'

    // Get enabled resource types
    const resources = db.prepare('SELECT resource_type FROM critical_issues_settings WHERE enabled = 1').all()
    const enabledResources = new Set(resources.map(r => r.resource_type))

    return { notificationsEnabled, enabledResources, mode }
  } finally {
    db.close()
  }
}

async function fetchCriticalIssues() {
  try {
    // Get selected namespace from database
    if (!fs.existsSync(DB_PATH)) {
      return null
    }

    const db = new Database(DB_PATH, { readonly: true })
    let namespace = 'default'

    try {
      const userSettings = db.prepare('SELECT selected_namespace FROM user_settings WHERE id = 1').get()
      namespace = userSettings?.selected_namespace || 'default'
    } finally {
      db.close()
    }

    // Fetch from the local API with namespace parameter
    const response = await fetch(`http://localhost:3000/api/dashboard/summary?namespace=${namespace}`)
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    return {
      pods: {
        failing: (data.pods?.failed || 0) + (data.pods?.pending || 0)
      },
      nodes: {
        notReady: data.nodes?.notReady || 0
      },
      deployments: {
        degraded: data.deployments?.degraded || 0
      },
      pv: {
        unbound: (data.pv?.total || 0) - (data.pv?.bound || 0)
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
  const { notificationsEnabled, enabledResources, mode } = getSettings()

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

// Demo notification for users to see how notifications work
function sendDemoNotification() {
  const demoExamples = [
    {
      title: '🔴 Critical: Pod Failures',
      message: '2 pods in failed state\n\n• nginx-deployment-abc123\n• api-server-xyz789\n\nCheck your dashboard for details.',
      type: 'critical'
    },
    {
      title: '⚠️ Warning: Deployment Issues',
      message: 'frontend-app deployment degraded\n\nDesired: 3 replicas\nAvailable: 1 replica\n\nScale or investigate immediately.',
      type: 'warning'
    },
    {
      title: '🔴 Critical: Node Not Ready',
      message: 'Worker node-2 not responding\n\nStatus: NotReady\nAge: 45m\n\nCluster capacity reduced.',
      type: 'critical'
    },
    {
      title: '⚠️ Warning: Storage Issues',
      message: 'PersistentVolume unbound\n\npvc-mysql-data (10Gi)\nStatus: Pending\n\nCheck storage provisioner.',
      type: 'warning'
    }
  ]

  // Pick a random demo notification
  const demo = demoExamples[Math.floor(Math.random() * demoExamples.length)]
  sendNotification(demo.title, demo.message, demo.type)
  console.log(`📬 Demo notification sent: ${demo.title}`)
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

  // Demo mode: send initial notification after 10 seconds
  setTimeout(() => {
    const { notificationsEnabled, mode } = getSettings()

    if (notificationsEnabled && mode === 'demo') {
      console.log('📬 Sending initial demo notification...')
      sendDemoNotification()
    }
  }, 10000) // 10 seconds

  // Demo mode: send example notification every 5 minutes
  setInterval(() => {
    const { notificationsEnabled, mode } = getSettings()

    if (notificationsEnabled && mode === 'demo') {
      sendDemoNotification()
    }
  }, 5 * 60 * 1000) // 5 minutes

  console.log('   Demo notifications enabled (every 5 minutes in demo mode)')
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
