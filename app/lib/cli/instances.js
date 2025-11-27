const { execSync } = require('child_process')
const path = require('path')

function listInstances() {
  try {
    const pm2List = execSync('npx pm2 jlist', { encoding: 'utf-8' })
    const processes = JSON.parse(pm2List)

    const orphelixInstances = processes.filter(p =>
      p.name.startsWith('orphelix')
    )

    return orphelixInstances.map(instance => ({
      name: instance.name,
      pid: instance.pid,
      status: instance.pm2_env.status,
      uptime: Math.floor((Date.now() - instance.pm2_env.pm_uptime) / 1000 / 60),
      memory: Math.round(instance.monit.memory / 1024 / 1024),
      cpu: instance.monit.cpu,
      port: instance.pm2_env.env.ORPHELIX_PORT || 3000,
      restarts: instance.pm2_env.restart_time
    }))
  } catch (error) {
    return []
  }
}

function generateEcosystemConfig(instanceName, port) {
  const config = {
    apps: [
      {
        name: instanceName,
        script: '.next/standalone/server.js',
        cwd: './',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
          PORT: port,
        },
        error_file: `./logs/${instanceName}-err.log`,
        out_file: `./logs/${instanceName}-out.log`,
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      },
    ],
  }

  return config
}

module.exports = {
  listInstances,
  generateEcosystemConfig
}
