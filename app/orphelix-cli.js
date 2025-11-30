#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const APP_DIR = path.join(__dirname)
const ECOSYSTEM_CONFIG = path.join(APP_DIR, 'ecosystem.config.js')
const STANDALONE_SERVER = path.join(APP_DIR, '.next/standalone/orphelix/app/server.js')
const LOGS_DIR = path.join(APP_DIR, 'logs')
const PACKAGE_JSON = path.join(APP_DIR, 'package.json')

// Helper function to copy static files and public directory to standalone
function copyStandaloneAssets() {
  try {
    // Copy .next/static to standalone
    const staticSrc = path.join(APP_DIR, '.next/static')
    const staticDest = path.join(APP_DIR, '.next/standalone/orphelix/app/.next/static')
    if (fs.existsSync(staticSrc)) {
      fs.cpSync(staticSrc, staticDest, { recursive: true })
    }

    // Copy public to standalone
    const publicSrc = path.join(APP_DIR, 'public')
    const publicDest = path.join(APP_DIR, '.next/standalone/orphelix/app/public')
    if (fs.existsSync(publicSrc)) {
      fs.cpSync(publicSrc, publicDest, { recursive: true })
    }

    // Copy .env.local to standalone
    const envSrc = path.join(APP_DIR, '.env.local')
    const envDest = path.join(APP_DIR, '.next/standalone/orphelix/app/.env.local')
    if (fs.existsSync(envSrc)) {
      fs.cpSync(envSrc, envDest)
    }

    return true
  } catch (error) {
    console.warn('⚠️  Warning: Could not copy standalone assets:', error.message)
    return false
  }
}

// Import CLI helpers
const backupModule = require('./lib/cli/backup')
const configExportModule = require('./lib/cli/config-export')
const instancesModule = require('./lib/cli/instances')

// Read package.json for version info
function getPackageInfo() {
  try {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'))
    return {
      version: pkg.version,
      name: pkg.name,
      description: pkg.description
    }
  } catch (error) {
    return { version: 'unknown', name: 'orphelix', description: '' }
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2)
  const parsed = { command: null, port: null, name: null, extra: [] }

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' || args[i] === '-p') {
      parsed.port = args[i + 1]
      i++ // skip next arg
    } else if (args[i] === '--name' || args[i] === '-n') {
      parsed.name = args[i + 1]
      i++ // skip next arg
    } else if (!parsed.command) {
      parsed.command = args[i]
    } else {
      parsed.extra.push(args[i])
    }
  }

  return parsed
}

function getInstanceName(customName) {
  return customName || 'orphelix'
}

function getInstanceDbPath(instanceName) {
  return instanceName === 'orphelix'
    ? path.join(APP_DIR, 'orphelix.db')
    : path.join(APP_DIR, `orphelix-${instanceName}.db`)
}

function getPort(customPort) {
  return customPort || process.env.ORPHELIX_PORT || 3000
}

function askQuestion(question) {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    readline.question(question, (answer) => {
      readline.close()
      resolve(answer.trim().toLowerCase())
    })
  })
}

async function configureHosts() {
  const hostname = 'orphelix.local'
  const hostsFile = '/etc/hosts'

  try {
    // Check if entry already exists
    const hostsContent = fs.readFileSync(hostsFile, 'utf-8')
    if (hostsContent.includes(hostname)) {
      return true // Already configured
    }

    // Ask user for permission
    console.log('')
    console.log(`📍 Would you like to configure custom hostname '${hostname}'?`)
    console.log('   This allows you to access Orphelix at: http://orphelix.local:PORT')
    console.log('   Instead of: http://localhost:PORT')
    console.log('   (Requires sudo password once)')
    const answer = await askQuestion('   Configure orphelix.local? [y/N]: ')

    if (answer !== 'y' && answer !== 'yes') {
      console.log('⏭️  Skipping hostname configuration. You can use localhost instead.')
      return false
    }

    console.log(`🌐 Configuring ${hostname} in /etc/hosts...`)
    console.log('   You may be prompted for your password')

    // Add entry to /etc/hosts
    const entry = `\n# Orphelix local hostname\n127.0.0.1    ${hostname}\n`
    execSync(`echo '${entry}' | sudo tee -a ${hostsFile} > /dev/null`, {
      stdio: 'inherit',
    })

    console.log(`✅ ${hostname} configured!`)
    return true
  } catch (error) {
    console.warn(`⚠️  Failed to configure ${hostname}. You can still use localhost.`)
    console.warn('   To configure manually, add this line to /etc/hosts:')
    console.warn(`   127.0.0.1    ${hostname}`)
    return false
  }
}

const commands = {
  start: async (port, instanceName) => {
    const actualPort = getPort(port)
    const name = getInstanceName(instanceName)
    console.log(`🚀 Starting Orphelix${name !== 'orphelix' ? ` (${name})` : ''} on port ${actualPort}...`)

    try {
      // 1. Check and install dependencies if needed
      const nodeModulesPath = path.join(APP_DIR, 'node_modules')
      if (!fs.existsSync(nodeModulesPath)) {
        console.log('📦 Installing dependencies (this may take a few minutes)...')
        execSync('npm install', { cwd: APP_DIR, stdio: 'inherit' })
        console.log('✅ Dependencies installed')
      }

      // 2. Configure hosts file (only on first run or if missing)
      const useCustomHost = await configureHosts()

      // 3. Check and build standalone if needed
      if (!fs.existsSync(STANDALONE_SERVER)) {
        console.log('🔨 Building standalone application (this may take a few minutes)...')
        execSync('npm run build', { cwd: APP_DIR, stdio: 'inherit' })
        console.log('📦 Copying static assets to standalone build...')
        copyStandaloneAssets()
        console.log('✅ Build completed')
      } else {
        // Copy assets even if build exists (for updates to .env.local or static files)
        copyStandaloneAssets()
      }

      // 4. Create logs directory if it doesn't exist
      if (!fs.existsSync(LOGS_DIR)) {
        fs.mkdirSync(LOGS_DIR, { recursive: true })
      }

      // 5. Initialize database before starting
      console.log('🔧 Initializing database...')
      execSync('node scripts/init-db.js', { cwd: APP_DIR, stdio: 'inherit' })

      // 6. Start with pm2
      const env = { ...process.env, ORPHELIX_PORT: actualPort }

      // For custom instance names, create dynamic ecosystem config
      if (name !== 'orphelix') {
        const dynamicConfig = instancesModule.generateEcosystemConfig(name, actualPort)
        const tempConfigPath = path.join(APP_DIR, `ecosystem-${name}.config.js`)
        fs.writeFileSync(tempConfigPath, `module.exports = ${JSON.stringify(dynamicConfig, null, 2)}`)

        execSync(`npx pm2 start ${tempConfigPath}`, {
          cwd: APP_DIR,
          stdio: 'inherit',
          env
        })

        // Clean up temp config
        fs.unlinkSync(tempConfigPath)
      } else {
        execSync(`npx pm2 start ${ECOSYSTEM_CONFIG}`, {
          cwd: APP_DIR,
          stdio: 'inherit',
          env
        })
      }

      console.log('✅ Orphelix is running!')
      if (useCustomHost) {
        console.log(`📍 Open in browser: http://orphelix.local:${actualPort}`)
        console.log(`📍 Or: http://localhost:${actualPort}`)
      } else {
        console.log(`📍 Open in browser: http://localhost:${actualPort}`)
      }

      // Start notification worker
      try {
        execSync(`npx pm2 start ${path.join(APP_DIR, 'lib/notifications/worker.js')} --name ${name}-notifications`, {
          cwd: APP_DIR,
          stdio: 'ignore'
        })
        console.log('🔔 Notification worker started')
      } catch (error) {
        console.log('⚠️  Warning: Could not start notification worker')
      }

      if (name !== 'orphelix') {
        console.log(`📊 View logs: orphelix logs --name ${name}`)
        console.log(`🛑 Stop: orphelix stop --name ${name}`)
      } else {
        console.log('📊 View logs: orphelix logs')
        console.log('🛑 Stop: orphelix stop')
      }
    } catch (error) {
      console.error('❌ Failed to start Orphelix')
      process.exit(1)
    }
  },

  stop: (instanceName) => {
    const name = getInstanceName(instanceName)
    console.log(`🛑 Stopping Orphelix${name !== 'orphelix' ? ` (${name})` : ''}...`)
    try {
      execSync(`npx pm2 stop ${name}`, { cwd: APP_DIR, stdio: 'inherit' })

      // Stop notification worker
      try {
        execSync(`npx pm2 stop ${name}-notifications`, { cwd: APP_DIR, stdio: 'ignore' })
        console.log('🔔 Notification worker stopped')
      } catch (error) {
        // Worker might not be running, that's ok
      }

      console.log('✅ Orphelix stopped')
    } catch (error) {
      console.error('❌ Failed to stop Orphelix')
      process.exit(1)
    }
  },

  restart: (port, instanceName) => {
    const name = getInstanceName(instanceName)
    console.log(`🔄 Restarting Orphelix${name !== 'orphelix' ? ` (${name})` : ''}...`)
    try {
      const actualPort = getPort(port)

      // Copy latest static assets and .env.local before restarting
      console.log('📦 Syncing static assets to standalone build...')
      copyStandaloneAssets()

      const env = { ...process.env, ORPHELIX_PORT: actualPort }
      execSync(`npx pm2 restart ${name}`, {
        cwd: APP_DIR,
        stdio: 'inherit',
        env
      })
      console.log('✅ Orphelix restarted')
      console.log(`📍 Open in browser: http://orphelix.local:${actualPort}`)
      console.log(`📍 Or: http://localhost:${actualPort}`)
    } catch (error) {
      console.error('❌ Failed to restart Orphelix')
      process.exit(1)
    }
  },

  rebuild: (port, instanceName) => {
    const name = getInstanceName(instanceName)
    console.log(`🔨 Rebuilding Orphelix${name !== 'orphelix' ? ` (${name})` : ''}...`)
    console.log('')

    try {
      const actualPort = getPort(port)

      // Step 1: Build the application
      console.log('📦 Step 1/3: Building Next.js application...')
      execSync('npm run build', {
        cwd: APP_DIR,
        stdio: 'inherit'
      })
      console.log('✅ Build completed\n')

      // Step 2: Copy static assets
      console.log('📦 Step 2/3: Syncing static assets to standalone build...')
      copyStandaloneAssets()
      console.log('✅ Assets synced\n')

      // Step 3: Restart PM2
      console.log('🔄 Step 3/3: Restarting PM2 process...')
      const env = { ...process.env, ORPHELIX_PORT: actualPort }
      execSync(`npx pm2 restart ${name}`, {
        cwd: APP_DIR,
        stdio: 'inherit',
        env
      })

      console.log('')
      console.log('✅ Rebuild completed successfully!')
      console.log(`📍 Open in browser: http://orphelix.local:${actualPort}`)
      console.log(`📍 Or: http://localhost:${actualPort}`)
    } catch (error) {
      console.error('❌ Rebuild failed')
      console.error('💡 Check the error messages above for details')
      process.exit(1)
    }
  },

  logs: (instanceName) => {
    const name = getInstanceName(instanceName)
    try {
      execSync(`npx pm2 logs ${name}`, { cwd: APP_DIR, stdio: 'inherit' })
    } catch (error) {
      // pm2 logs command exits when user presses Ctrl+C, which is expected
    }
  },

  status: (instanceName) => {
    const name = getInstanceName(instanceName)
    try {
      execSync(`npx pm2 status ${name}`, { cwd: APP_DIR, stdio: 'inherit' })
    } catch (error) {
      console.error('❌ Failed to get status')
      process.exit(1)
    }
  },

  list: () => {
    console.log('📋 Orphelix Instances\n')

    const instances = instancesModule.listInstances()

    if (instances.length === 0) {
      console.log('No running instances found.')
      console.log('Start a new instance with: orphelix start')
      return
    }

    instances.forEach((instance) => {
      const statusIcon = instance.status === 'online' ? '🟢' : '⚫'
      console.log(`${statusIcon} ${instance.name}`)
      console.log(`   Status:   ${instance.status}`)
      console.log(`   PID:      ${instance.pid}`)
      console.log(`   Uptime:   ${instance.uptime} minutes`)
      console.log(`   Memory:   ${instance.memory} MB`)
      console.log(`   CPU:      ${instance.cpu}%`)
      console.log(`   Port:     ${instance.port}`)
      console.log(`   Restarts: ${instance.restarts}`)
      console.log('')
    })

    console.log('💡 Manage instances:')
    console.log('   orphelix stop --name <instance>')
    console.log('   orphelix restart --name <instance>')
    console.log('   orphelix logs --name <instance>')
  },

  open: (port) => {
    console.log('🌐 Opening Orphelix in browser...')
    const actualPort = getPort(port)

    // Try orphelix.local first, fallback to localhost
    const hostsContent = fs.readFileSync('/etc/hosts', 'utf-8')
    const useCustomHost = hostsContent.includes('orphelix.local')
    const url = useCustomHost
      ? `http://orphelix.local:${actualPort}`
      : `http://localhost:${actualPort}`

    try {
      // macOS
      execSync(`open ${url}`, { stdio: 'ignore' })
    } catch (error) {
      console.log(`📍 Please open manually: ${url}`)
    }
  },

  delete: (instanceName) => {
    const name = getInstanceName(instanceName)
    console.log(`🗑️  Removing Orphelix${name !== 'orphelix' ? ` (${name})` : ''} from pm2...`)
    try {
      execSync(`npx pm2 delete ${name}`, { cwd: APP_DIR, stdio: 'inherit' })

      // Delete notification worker
      try {
        execSync(`npx pm2 delete ${name}-notifications`, { cwd: APP_DIR, stdio: 'ignore' })
      } catch (error) {
        // Worker might not exist, that's ok
      }

      console.log('✅ Orphelix removed from pm2')
    } catch (error) {
      console.error('❌ Failed to remove Orphelix')
      process.exit(1)
    }
  },

  version: () => {
    const pkg = getPackageInfo()
    console.log(`Orphelix v${pkg.version}`)
    console.log(pkg.description)

    // Check for updates
    try {
      console.log('\n🔍 Checking for updates...')
      const response = execSync(
        'curl -s https://api.github.com/repos/YOUR_USERNAME/orphelix/releases/latest',
        { encoding: 'utf-8' }
      )
      const latest = JSON.parse(response)
      const latestVersion = latest.tag_name?.replace('v', '')

      if (latestVersion && latestVersion !== pkg.version) {
        console.log(`✨ New version available: v${latestVersion}`)
        console.log(`Run "orphelix update" to upgrade`)
      } else {
        console.log('✅ You are on the latest version')
      }
    } catch (error) {
      console.log('⚠️  Could not check for updates')
    }
  },

  info: () => {
    const pkg = getPackageInfo()
    console.log('📊 Orphelix Information\n')
    console.log(`Version:     ${pkg.version}`)

    try {
      // Get pm2 process info
      const pm2Info = execSync('npx pm2 jlist', { encoding: 'utf-8', cwd: APP_DIR })
      const processes = JSON.parse(pm2Info)
      const orphelix = processes.find(p => p.name === 'orphelix')

      if (orphelix) {
        console.log(`Status:      🟢 Running`)
        console.log(`PID:         ${orphelix.pid}`)
        console.log(`Uptime:      ${Math.floor(orphelix.pm2_env.pm_uptime / 1000 / 60)} minutes`)
        console.log(`Memory:      ${Math.round(orphelix.monit.memory / 1024 / 1024)} MB`)
        console.log(`CPU:         ${orphelix.monit.cpu}%`)
        console.log(`Restarts:    ${orphelix.pm2_env.restart_time}`)

        const port = orphelix.pm2_env.env.ORPHELIX_PORT || 3000
        console.log(`Port:        ${port}`)

        // Check for orphelix.local
        try {
          const hostsContent = fs.readFileSync('/etc/hosts', 'utf-8')
          const useCustomHost = hostsContent.includes('orphelix.local')
          if (useCustomHost) {
            console.log(`URL:         http://orphelix.local:${port}`)
            console.log(`             http://localhost:${port}`)
          } else {
            console.log(`URL:         http://localhost:${port}`)
          }
        } catch {
          console.log(`URL:         http://localhost:${port}`)
        }
      } else {
        console.log(`Status:      ⚫ Stopped`)
        console.log(`Run "orphelix start" to start the application`)
      }
    } catch (error) {
      console.log(`Status:      ⚫ Stopped`)
      console.log(`Run "orphelix start" to start the application`)
    }

    // Database info
    const dbPath = path.join(APP_DIR, 'orphelix.db')
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath)
      console.log(`\nDatabase:    ${(stats.size / 1024).toFixed(2)} KB`)
      console.log(`Location:    ${dbPath}`)
    }
  },

  doctor: () => {
    console.log('🏥 Running Orphelix health checks...\n')
    let hasIssues = false

    // Check 1: Node.js version
    try {
      const nodeVersion = process.version.replace('v', '')
      const majorVersion = parseInt(nodeVersion.split('.')[0])
      if (majorVersion >= 24) {
        console.log('✅ Node.js version:', nodeVersion, '(>= 24.0.0)')
      } else {
        console.log('❌ Node.js version:', nodeVersion, '(requires >= 24.0.0)')
        console.log('   Install from: https://nodejs.org')
        hasIssues = true
      }
    } catch (error) {
      console.log('❌ Node.js not found')
      hasIssues = true
    }

    // Check 2: npm dependencies
    const nodeModulesPath = path.join(APP_DIR, 'node_modules')
    if (fs.existsSync(nodeModulesPath)) {
      console.log('✅ npm dependencies installed')
    } else {
      console.log('⚠️  npm dependencies not installed')
      console.log('   Run: npm install')
      hasIssues = true
    }

    // Check 3: Standalone build
    if (fs.existsSync(STANDALONE_SERVER)) {
      console.log('✅ Standalone build exists')
    } else {
      console.log('⚠️  Standalone build not found')
      console.log('   Run: npm run build:standalone')
      hasIssues = true
    }

    // Check 4: kubectl
    try {
      const kubectlVersion = execSync('kubectl version --client --short 2>/dev/null', { encoding: 'utf-8' })
      console.log('✅ kubectl installed:', kubectlVersion.trim())

      // Check kubectl context
      try {
        const context = execSync('kubectl config current-context 2>/dev/null', { encoding: 'utf-8' })
        console.log('✅ kubectl context:', context.trim())
      } catch {
        console.log('⚠️  kubectl context not set')
        console.log('   Run: kubectl config use-context <context-name>')
      }
    } catch (error) {
      console.log('⚠️  kubectl not found (optional for demo mode)')
      console.log('   Install from: https://kubernetes.io/docs/tasks/tools/')
    }

    // Check 5: Database
    const dbPath = path.join(APP_DIR, 'orphelix.db')
    if (fs.existsSync(dbPath)) {
      try {
        fs.accessSync(dbPath, fs.constants.R_OK | fs.constants.W_OK)
        console.log('✅ Database readable and writable')
      } catch {
        console.log('❌ Database exists but not accessible')
        console.log('   Check permissions on:', dbPath)
        hasIssues = true
      }
    } else {
      console.log('ℹ️  Database not initialized (will be created on first start)')
    }

    // Check 6: Port availability
    const port = process.env.ORPHELIX_PORT || 3000
    try {
      const netstat = execSync(`lsof -ti:${port} 2>/dev/null`, { encoding: 'utf-8' })
      if (netstat.trim()) {
        console.log(`⚠️  Port ${port} is in use`)
        console.log(`   Use a different port: orphelix start --port <other-port>`)
      } else {
        console.log(`✅ Port ${port} is available`)
      }
    } catch {
      console.log(`✅ Port ${port} is available`)
    }

    // Summary
    console.log('')
    if (hasIssues) {
      console.log('⚠️  Some issues found. Please address them before starting.')
      process.exit(1)
    } else {
      console.log('✅ All checks passed! You\'re good to go.')
      console.log('   Run "orphelix start" to launch the application')
    }
  },

  dev: () => {
    console.log('🔧 Starting Orphelix in development mode...')
    try {
      execSync('npm run dev', { cwd: APP_DIR, stdio: 'inherit' })
    } catch (error) {
      console.error('❌ Failed to start development server')
      process.exit(1)
    }
  },

  debug: () => {
    console.log('🐛 Starting Orphelix in debug mode...')
    console.log('Node.js inspector will be available at: chrome://inspect')
    try {
      execSync('node --inspect node_modules/.bin/next dev', { cwd: APP_DIR, stdio: 'inherit' })
    } catch (error) {
      console.error('❌ Failed to start debug server')
      process.exit(1)
    }
  },

  test: () => {
    console.log('🧪 Running tests...\n')
    try {
      console.log('Running unit tests...')
      execSync('npm test', { cwd: APP_DIR, stdio: 'inherit' })

      console.log('\nRunning E2E tests...')
      execSync('npm run test:e2e', { cwd: APP_DIR, stdio: 'inherit' })

      console.log('\n✅ All tests passed!')
    } catch (error) {
      console.error('\n❌ Some tests failed')
      process.exit(1)
    }
  },

  clean: () => {
    console.log('🧹 Cleaning Orphelix...\n')

    const itemsToClean = [
      { path: path.join(APP_DIR, '.next'), name: 'Next.js cache' },
      { path: path.join(APP_DIR, 'node_modules/.cache'), name: 'npm cache' },
      { path: path.join(APP_DIR, 'logs'), name: 'logs' },
    ]

    itemsToClean.forEach(item => {
      if (fs.existsSync(item.path)) {
        try {
          fs.rmSync(item.path, { recursive: true, force: true })
          console.log(`✅ Cleaned ${item.name}`)
        } catch (error) {
          console.log(`⚠️  Could not clean ${item.name}:`, error.message)
        }
      } else {
        console.log(`⏭️  ${item.name} not found, skipping`)
      }
    })

    // Clean pm2 logs
    try {
      execSync('npx pm2 flush', { cwd: APP_DIR, stdio: 'ignore' })
      console.log('✅ Cleaned pm2 logs')
    } catch {
      console.log('⏭️  pm2 logs not found, skipping')
    }

    console.log('\n✨ Cleanup complete!')
  },

  update: async () => {
    console.log('🔄 Checking for updates...\n')
    const pkg = getPackageInfo()

    try {
      const response = execSync(
        'curl -s https://api.github.com/repos/YOUR_USERNAME/orphelix/releases/latest',
        { encoding: 'utf-8' }
      )
      const latest = JSON.parse(response)
      const latestVersion = latest.tag_name?.replace('v', '')

      if (!latestVersion) {
        console.log('⚠️  Could not fetch latest version')
        return
      }

      if (latestVersion === pkg.version) {
        console.log(`✅ You are already on the latest version (v${pkg.version})`)
        return
      }

      console.log(`📦 New version available: v${latestVersion} (current: v${pkg.version})`)
      console.log('')

      const answer = await askQuestion('   Update now? [y/N]: ')
      if (answer !== 'y' && answer !== 'yes') {
        console.log('⏭️  Update cancelled')
        return
      }

      // Backup database before update
      console.log('\n💾 Creating backup before update...')
      try {
        const backup = backupModule.backup()
        console.log(`✅ Backup created: ${backup.path}`)
      } catch (error) {
        console.log('⚠️  Could not create backup:', error.message)
      }

      // Update via npm
      console.log('\n📥 Downloading update...')
      execSync('npm install -g https://github.com/YOUR_USERNAME/orphelix/archive/refs/tags/v' + latestVersion + '.tar.gz', {
        cwd: APP_DIR,
        stdio: 'inherit',
      })

      console.log('\n✅ Update complete!')
      console.log('   Restart Orphelix with: orphelix restart')
    } catch (error) {
      console.error('❌ Update failed:', error.message)
      process.exit(1)
    }
  },

  backup: () => {
    console.log('💾 Creating database backup...\n')

    try {
      const result = backupModule.backup()
      console.log('✅ Backup created successfully!')
      console.log(`   Location: ${result.path}`)
      console.log(`   Size: ${(result.size / 1024).toFixed(2)} KB`)
      console.log(`\n💡 Restore with: orphelix restore ${result.path}`)
    } catch (error) {
      console.error('❌ Backup failed:', error.message)
      process.exit(1)
    }
  },

  restore: async (backupPath) => {
    if (!backupPath) {
      console.log('📦 Available backups:\n')
      try {
        const backups = backupModule.listBackups()

        if (backups.length === 0) {
          console.log('No backups found.')
          console.log(`Backup directory: ${backupModule.BACKUP_DIR}`)
          return
        }

        backups.forEach((backup, index) => {
          console.log(`${index + 1}. ${backup.name}`)
          console.log(`   Created: ${backup.created.toLocaleString()}`)
          console.log(`   Size: ${(backup.size / 1024).toFixed(2)} KB`)
          console.log('')
        })

        console.log('💡 Use: orphelix restore <path-to-backup>')
      } catch (error) {
        console.error('❌ Could not list backups:', error.message)
        process.exit(1)
      }
      return
    }

    console.log(`🔄 Restoring from backup...\n`)
    console.log(`   Backup: ${backupPath}`)
    console.log('')

    const answer = await askQuestion('   This will overwrite your current database. Continue? [y/N]: ')
    if (answer !== 'y' && answer !== 'yes') {
      console.log('⏭️  Restore cancelled')
      return
    }

    try {
      backupModule.restore(backupPath)
      console.log('\n✅ Database restored successfully!')
      console.log('   Restart Orphelix to apply changes: orphelix restart')
    } catch (error) {
      console.error('❌ Restore failed:', error.message)
      process.exit(1)
    }
  },

  'export-config': () => {
    console.log('📤 Exporting configuration...\n')

    try {
      const config = configExportModule.exportConfig()
      const filename = `orphelix-config-${new Date().toISOString().split('T')[0]}.json`
      const outputPath = path.join(process.cwd(), filename)

      fs.writeFileSync(outputPath, JSON.stringify(config, null, 2))

      console.log('✅ Configuration exported successfully!')
      console.log(`   Location: ${outputPath}`)
      console.log(`\n💡 Import with: orphelix import-config ${outputPath}`)
    } catch (error) {
      console.error('❌ Export failed:', error.message)
      process.exit(1)
    }
  },

  'import-config': async (configPath) => {
    if (!configPath) {
      console.error('❌ Please provide path to config file')
      console.log('Usage: orphelix import-config <path-to-config.json>')
      process.exit(1)
    }

    if (!fs.existsSync(configPath)) {
      console.error(`❌ Config file not found: ${configPath}`)
      process.exit(1)
    }

    console.log(`🔄 Importing configuration...\n`)
    console.log(`   Config: ${configPath}`)
    console.log('')

    const answer = await askQuestion('   This will overwrite your current settings. Continue? [y/N]: ')
    if (answer !== 'y' && answer !== 'yes') {
      console.log('⏭️  Import cancelled')
      return
    }

    try {
      const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      configExportModule.importConfig(configData)

      console.log('\n✅ Configuration imported successfully!')
      console.log('   Restart Orphelix to apply changes: orphelix restart')
    } catch (error) {
      console.error('❌ Import failed:', error.message)
      process.exit(1)
    }
  },

  startup: () => {
    console.log('🚀 Configuring auto-startup on system boot...\n')

    try {
      // Generate pm2 startup script
      console.log('Generating pm2 startup script (may require sudo password)...')
      execSync('npx pm2 startup', { cwd: APP_DIR, stdio: 'inherit' })

      console.log('\n💾 Saving current pm2 process list...')
      execSync('npx pm2 save', { cwd: APP_DIR, stdio: 'inherit' })

      console.log('\n✅ Auto-startup configured!')
      console.log('   Orphelix will now start automatically on system boot')
      console.log('\n💡 To disable: orphelix unstartup')
    } catch (error) {
      console.error('❌ Failed to configure auto-startup')
      console.log('\n💡 You can manually run:')
      console.log('   npx pm2 startup')
      console.log('   npx pm2 save')
      process.exit(1)
    }
  },

  unstartup: () => {
    console.log('🛑 Removing auto-startup configuration...\n')

    try {
      execSync('npx pm2 unstartup', { cwd: APP_DIR, stdio: 'inherit' })

      console.log('\n✅ Auto-startup disabled!')
      console.log('   Orphelix will no longer start automatically on system boot')
      console.log('\n💡 To re-enable: orphelix startup')
    } catch (error) {
      console.error('❌ Failed to remove auto-startup')
      console.log('\n💡 You can manually run: npx pm2 unstartup')
      process.exit(1)
    }
  },

  help: () => {
    console.log(`
Orphelix CLI - Kubernetes Dashboard

Usage:
  orphelix <command> [options]

Commands:
  Process Management:
    start          Start Orphelix in background (auto-installs deps, builds, configures)
    stop           Stop Orphelix
    restart        Restart Orphelix
    rebuild        Rebuild application and restart (useful after code changes)
    status         Check if Orphelix is running
    list           List all running Orphelix instances
    logs           View real-time logs (Ctrl+C to exit)
    open           Open Orphelix in default browser
    delete         Remove Orphelix from pm2

  Information:
    version        Show current version and check for updates
    info           Show detailed application information
    doctor         Run health checks and diagnostics

  Backup & Config:
    backup         Create database backup
    restore [file] Restore from backup (list backups if no file provided)
    export-config  Export configuration to JSON
    import-config  Import configuration from JSON

  Development:
    dev            Start in development mode
    debug          Start with Node.js inspector
    test           Run all tests (unit + E2E)
    clean          Clean caches and logs

  Maintenance:
    update         Update to latest version from GitHub
    startup        Enable auto-startup on system boot
    unstartup      Disable auto-startup
    help           Show this help message

Options:
  --port, -p     Specify custom port (default: 3000)
  --name, -n     Instance name for multi-instance support

Examples:
  orphelix start                     # First run: installs, builds, configures orphelix.local
  orphelix start --port 8080         # Start on port 8080
  orphelix start --name prod -p 3000 # Start named instance "orphelix-prod" on port 3000
  orphelix rebuild                   # Rebuild after code changes (npm run build + restart)
  orphelix list                      # List all running instances
  orphelix logs --name prod          # View logs for specific instance
  orphelix stop --name prod          # Stop specific instance
  orphelix open --port 8080          # Open in browser with custom port

Environment Variables:
  ORPHELIX_PORT   Set default port (can be overridden with --port)

First Run Setup:
  On first run, 'orphelix start' will:
  - Install npm dependencies
  - Build standalone application
  - Configure orphelix.local hostname (requires sudo)
  - Initialize SQLite database
  - Start application in background
  - Start notification worker for desktop alerts

Features:
  - Desktop notifications for critical issues (enable in Settings)
  - Multi-instance support for different clusters
  - Auto-update with automatic backup
  - SQLite database for persistent settings

Access:
  http://orphelix.local:3000  (custom hostname)
  http://localhost:3000       (standard)
    `)
  },
}

const { command, port } = parseArgs()

;(async () => {
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    commands.help()
  } else if (commands[command]) {
    await commands[command](port)
  } else {
    console.error(`❌ Unknown command: ${command}`)
    console.log('Run "orphelix help" for available commands')
    process.exit(1)
  }
})()
