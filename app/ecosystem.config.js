const path = require('path')

module.exports = {
  apps: [
    {
      name: 'orphelix',
      script: path.join(__dirname, '.next/standalone/server.js'),
      cwd: path.join(__dirname, '.next/standalone'),
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.ORPHELIX_PORT || 3000,
        HOSTNAME: '0.0.0.0',
      },
      error_file: path.join(__dirname, 'logs/err.log'),
      out_file: path.join(__dirname, 'logs/out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
}
