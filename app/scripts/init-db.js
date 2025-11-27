#!/usr/bin/env node

/**
 * Initialize SQLite database on application startup
 * This script is called by pm2 before starting the Next.js server
 */

const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

try {
  console.log('🔧 Initializing Orphelix database...')

  const dbPath = path.join(process.cwd(), 'orphelix.db')
  const schemaPath = path.join(process.cwd(), 'lib/db/schema.sql')

  // Create database
  const db = new Database(dbPath)

  // Enable WAL mode for better concurrency
  db.pragma('journal_mode = WAL')

  // Check if database needs initialization
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='user_settings'")
    .all()

  if (tables.length === 0) {
    // Initialize database with schema
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf-8')
      db.exec(schema)
      console.log('✅ Database initialized with schema')
    } else {
      console.warn('⚠️  Schema file not found at:', schemaPath)
      console.warn('   Database may not be properly initialized')
    }
  } else {
    console.log('✅ Database already initialized')
  }

  db.close()
  console.log('✅ Database initialization complete')
  process.exit(0)
} catch (error) {
  console.error('❌ Failed to initialize database:', error)
  process.exit(1)
}
