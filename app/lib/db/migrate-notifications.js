const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const APP_DIR = path.dirname(path.dirname(path.dirname(__filename)))
const DB_PATH = path.join(APP_DIR, 'orphelix.db')

function migrateNotifications() {
  if (!fs.existsSync(DB_PATH)) {
    console.log('No database found, skipping migration')
    return
  }

  const db = new Database(DB_PATH)

  try {
    // Check if column already exists
    const tableInfo = db.prepare("PRAGMA table_info(user_settings)").all()
    const hasNotificationsColumn = tableInfo.some(col => col.name === 'notifications_enabled')

    if (!hasNotificationsColumn) {
      console.log('Adding notifications_enabled column...')
      db.prepare('ALTER TABLE user_settings ADD COLUMN notifications_enabled INTEGER NOT NULL DEFAULT 0').run()
      console.log('✅ Migration complete')
    } else {
      console.log('✅ Database already up to date')
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    throw error
  } finally {
    db.close()
  }
}

// Run if called directly
if (require.main === module) {
  migrateNotifications()
}

module.exports = { migrateNotifications }
