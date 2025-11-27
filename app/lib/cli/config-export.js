const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

const APP_DIR = path.dirname(path.dirname(__dirname))
const DB_PATH = path.join(APP_DIR, 'orphelix.db')

function exportConfig() {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error('Database not found. Run "orphelix start" first.')
  }

  const db = new Database(DB_PATH, { readonly: true })

  const config = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    userSettings: db.prepare('SELECT * FROM user_settings WHERE id = 1').get(),
    githubSettings: db.prepare('SELECT * FROM github_settings WHERE id = 1').get(),
    clusterAliases: db.prepare('SELECT * FROM cluster_aliases').all(),
    criticalIssuesSettings: db.prepare('SELECT * FROM critical_issues_settings').all(),
    sidebarPins: db.prepare('SELECT * FROM sidebar_pins').all(),
  }

  db.close()

  return config
}

function importConfig(configData) {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error('Database not found. Run "orphelix start" first.')
  }

  const db = new Database(DB_PATH)

  try {
    db.exec('BEGIN TRANSACTION')

    // Import user settings
    if (configData.userSettings) {
      const fields = []
      const values = []

      Object.keys(configData.userSettings).forEach((key) => {
        if (key !== 'id' && key !== 'created_at') {
          fields.push(`${key} = ?`)
          values.push(configData.userSettings[key])
        }
      })

      if (fields.length > 0) {
        db.prepare(
          `UPDATE user_settings SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = 1`
        ).run(...values)
      }
    }

    // Import GitHub settings
    if (configData.githubSettings) {
      const fields = []
      const values = []

      Object.keys(configData.githubSettings).forEach((key) => {
        if (key !== 'id' && key !== 'created_at') {
          fields.push(`${key} = ?`)
          values.push(configData.githubSettings[key])
        }
      })

      if (fields.length > 0) {
        db.prepare(
          `UPDATE github_settings SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = 1`
        ).run(...values)
      }
    }

    // Import cluster aliases
    if (configData.clusterAliases && Array.isArray(configData.clusterAliases)) {
      db.prepare('DELETE FROM cluster_aliases').run()
      const insertAlias = db.prepare(
        'INSERT INTO cluster_aliases (context_name, alias) VALUES (?, ?)'
      )
      configData.clusterAliases.forEach((alias) => {
        insertAlias.run(alias.context_name, alias.alias)
      })
    }

    // Import critical issues settings
    if (
      configData.criticalIssuesSettings &&
      Array.isArray(configData.criticalIssuesSettings)
    ) {
      const updateSetting = db.prepare(
        'UPDATE critical_issues_settings SET enabled = ? WHERE resource_type = ?'
      )
      configData.criticalIssuesSettings.forEach((setting) => {
        updateSetting.run(setting.enabled, setting.resource_type)
      })
    }

    // Import sidebar pins
    if (configData.sidebarPins && Array.isArray(configData.sidebarPins)) {
      db.prepare('DELETE FROM sidebar_pins').run()
      const insertPin = db.prepare('INSERT INTO sidebar_pins (path, pinned) VALUES (?, ?)')
      configData.sidebarPins.forEach((pin) => {
        insertPin.run(pin.path, pin.pinned)
      })
    }

    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  } finally {
    db.close()
  }
}

module.exports = {
  exportConfig,
  importConfig,
}
