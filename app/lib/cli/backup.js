const fs = require('fs')
const path = require('path')
const os = require('os')

const BACKUP_DIR = path.join(os.homedir(), 'orphelix-backups')
const APP_DIR = path.dirname(path.dirname(__dirname))
const DB_PATH = path.join(APP_DIR, 'orphelix.db')

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
  }
}

function getTimestamp() {
  const now = new Date()
  return now.toISOString().replace(/[:.]/g, '-').split('T').join('_').slice(0, -5)
}

function backup() {
  ensureBackupDir()

  if (!fs.existsSync(DB_PATH)) {
    throw new Error('Database not found. Run "orphelix start" first.')
  }

  const timestamp = getTimestamp()
  const backupPath = path.join(BACKUP_DIR, `orphelix-backup-${timestamp}.db`)

  fs.copyFileSync(DB_PATH, backupPath)

  return {
    path: backupPath,
    size: fs.statSync(backupPath).size,
    timestamp,
  }
}

function listBackups() {
  ensureBackupDir()

  const files = fs.readdirSync(BACKUP_DIR)
  const backups = files
    .filter((f) => f.startsWith('orphelix-backup-') && f.endsWith('.db'))
    .map((f) => {
      const filePath = path.join(BACKUP_DIR, f)
      const stats = fs.statSync(filePath)
      return {
        name: f,
        path: filePath,
        size: stats.size,
        created: stats.birthtime,
      }
    })
    .sort((a, b) => b.created - a.created)

  return backups
}

function restore(backupPath) {
  if (!fs.existsSync(backupPath)) {
    throw new Error(`Backup file not found: ${backupPath}`)
  }

  if (!backupPath.endsWith('.db')) {
    throw new Error('Invalid backup file. Must be a .db file.')
  }

  // Create a backup of current DB before restoring
  if (fs.existsSync(DB_PATH)) {
    const preRestoreBackup = path.join(
      BACKUP_DIR,
      `orphelix-pre-restore-${getTimestamp()}.db`
    )
    fs.copyFileSync(DB_PATH, preRestoreBackup)
  }

  fs.copyFileSync(backupPath, DB_PATH)
}

function cleanOldBackups(daysToKeep = 30) {
  ensureBackupDir()

  const files = fs.readdirSync(BACKUP_DIR)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

  let deleted = 0

  files.forEach((f) => {
    if (f.startsWith('orphelix-backup-') && f.endsWith('.db')) {
      const filePath = path.join(BACKUP_DIR, f)
      const stats = fs.statSync(filePath)

      if (stats.birthtime < cutoffDate) {
        fs.unlinkSync(filePath)
        deleted++
      }
    }
  })

  return deleted
}

module.exports = {
  backup,
  listBackups,
  restore,
  cleanOldBackups,
  BACKUP_DIR,
}
