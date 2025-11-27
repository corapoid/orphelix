import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

let db: Database.Database | null = null

/**
 * Get or create the SQLite database connection
 * Database file is stored in the app directory as orphelix.db
 */
export function getDatabase(): Database.Database {
  if (db) return db

  const dbPath = path.join(process.cwd(), 'orphelix.db')
  const schemaPath = path.join(process.cwd(), 'lib/db/schema.sql')

  // Create database
  db = new Database(dbPath)

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
      console.warn('⚠️  Schema file not found, database may not be properly initialized')
    }
  }

  return db
}

/**
 * Close the database connection
 */
export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
}

/**
 * Migrate data from localStorage to SQLite
 * This function should be called on first run to import existing settings
 */
export function migrateFromLocalStorage(localStorageData: Record<string, string>): void {
  const database = getDatabase()

  try {
    database.exec('BEGIN TRANSACTION')

    // Migrate orphelix-mode store
    const modeData = localStorageData['orphelix-mode']
    if (modeData) {
      try {
        const parsed = JSON.parse(modeData)
        const state = parsed.state || parsed

        database
          .prepare(
            `UPDATE user_settings SET
            mode = ?,
            selected_context = ?,
            selected_namespace = ?,
            cluster_connected = ?,
            connection_error = ?,
            realtime_enabled = ?,
            auto_refresh_enabled = ?,
            auto_refresh_interval = ?,
            has_completed_welcome = ?,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = 1`
          )
          .run(
            state.mode || 'demo',
            state.selectedContext ? JSON.stringify(state.selectedContext) : null,
            state.selectedNamespace || '',
            state.clusterConnected ? 1 : 0,
            state.connectionError || null,
            state.realtimeEnabled ? 1 : 0,
            state.autoRefreshEnabled ? 1 : 0,
            state.autoRefreshInterval || 30,
            state.hasCompletedWelcome ? 1 : 0
          )
      } catch (e) {
        console.error('Failed to migrate orphelix-mode:', e)
      }
    }

    // Migrate orphelix-github store
    const githubData = localStorageData['orphelix-github']
    if (githubData) {
      try {
        const parsed = JSON.parse(githubData)
        const state = parsed.state || parsed

        // Update GitHub settings
        if (state.selectedRepo) {
          database
            .prepare(
              `UPDATE github_settings SET
              selected_repo_owner = ?,
              selected_repo_name = ?,
              selected_branch = ?,
              updated_at = CURRENT_TIMESTAMP
              WHERE id = 1`
            )
            .run(
              state.selectedRepo.owner,
              state.selectedRepo.repo,
              state.selectedBranch || 'main'
            )
        }

        // Migrate pending PRs
        if (state.pendingPRs && Array.isArray(state.pendingPRs)) {
          const insertPR = database.prepare(
            'INSERT OR REPLACE INTO github_pending_prs (deployment_name, namespace, pr_number) VALUES (?, ?, ?)'
          )
          for (const [key, prNumber] of state.pendingPRs) {
            const [namespace, deploymentName] = key.split('/')
            if (namespace && deploymentName) {
              insertPR.run(deploymentName, namespace, prNumber)
            }
          }
        }

        // Migrate edit basket
        if (state.editBasket && Array.isArray(state.editBasket)) {
          const insertEdit = database.prepare(
            'INSERT OR REPLACE INTO github_edit_basket (file_path, content, original_content, sha) VALUES (?, ?, ?, ?)'
          )
          for (const [filePath, edit] of state.editBasket) {
            insertEdit.run(filePath, edit.content, edit.originalContent, edit.sha)
          }
        }
      } catch (e) {
        console.error('Failed to migrate orphelix-github:', e)
      }
    }

    // Migrate cluster aliases
    const aliasesData = localStorageData['orphelix-cluster-aliases']
    if (aliasesData) {
      try {
        const parsed = JSON.parse(aliasesData)
        const state = parsed.state || parsed

        if (state.aliases) {
          const insertAlias = database.prepare(
            'INSERT OR REPLACE INTO cluster_aliases (context_name, alias) VALUES (?, ?)'
          )
          for (const [contextName, alias] of Object.entries(state.aliases)) {
            insertAlias.run(contextName, alias)
          }
        }
      } catch (e) {
        console.error('Failed to migrate cluster aliases:', e)
      }
    }

    // Migrate critical issues settings
    const criticalIssuesData = localStorageData['orphelix-critical-issues-settings']
    if (criticalIssuesData) {
      try {
        const parsed = JSON.parse(criticalIssuesData)
        const state = parsed.state || parsed

        if (state.enabledResources && Array.isArray(state.enabledResources)) {
          const updateSetting = database.prepare(
            'UPDATE critical_issues_settings SET enabled = ? WHERE resource_type = ?'
          )
          const allResources = ['pods', 'nodes', 'deployments', 'pv']
          for (const resource of allResources) {
            const enabled = state.enabledResources.includes(resource)
            updateSetting.run(enabled ? 1 : 0, resource)
          }
        }
      } catch (e) {
        console.error('Failed to migrate critical issues settings:', e)
      }
    }

    // Migrate sidebar pins
    const sidebarPinsData = localStorageData['orphelix-sidebar-pins']
    if (sidebarPinsData) {
      try {
        const parsed = JSON.parse(sidebarPinsData)
        const state = parsed.state || parsed

        if (state.pinnedItems && Array.isArray(state.pinnedItems)) {
          const updatePin = database.prepare(
            'UPDATE sidebar_pins SET pinned = ? WHERE path = ?'
          )
          const insertPin = database.prepare(
            'INSERT OR IGNORE INTO sidebar_pins (path, pinned) VALUES (?, ?)'
          )

          // First, mark all as unpinned
          database.prepare('UPDATE sidebar_pins SET pinned = 0').run()

          // Then set pinned items
          for (const path of state.pinnedItems) {
            updatePin.run(1, path)
            insertPin.run(path, 1)
          }
        }
      } catch (e) {
        console.error('Failed to migrate sidebar pins:', e)
      }
    }

    database.exec('COMMIT')
    console.log('✅ Successfully migrated localStorage data to SQLite')
  } catch (error) {
    database.exec('ROLLBACK')
    console.error('❌ Failed to migrate data:', error)
    throw error
  }
}
