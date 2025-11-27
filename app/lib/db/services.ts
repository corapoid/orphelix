import { getDatabase } from './database'
import type { AppMode, KubernetesContext } from '@/types/app'

/**
 * User Settings Type
 */
export type UserSettings = {
  mode: AppMode
  selectedContext: KubernetesContext | null
  selectedNamespace: string
  clusterConnected: boolean
  connectionError: string | null
  realtimeEnabled: boolean
  autoRefreshEnabled: boolean
  autoRefreshInterval: number
  hasCompletedWelcome: boolean
  themeMode: string
  visualPreset: string
  compactMode: boolean
}

/**
 * User Settings Service
 */
export const UserSettingsService = {
  get(): UserSettings {
    const db = getDatabase()
    const row = db.prepare('SELECT * FROM user_settings WHERE id = 1').get() as Record<string, unknown> | undefined
    if (!row) {
      throw new Error('User settings not found')
    }

    return {
      mode: row.mode as AppMode,
      selectedContext: row.selected_context ? JSON.parse(row.selected_context as string) as KubernetesContext : null,
      selectedNamespace: row.selected_namespace as string,
      clusterConnected: Boolean(row.cluster_connected),
      connectionError: row.connection_error as string | null,
      realtimeEnabled: Boolean(row.realtime_enabled),
      autoRefreshEnabled: Boolean(row.auto_refresh_enabled),
      autoRefreshInterval: row.auto_refresh_interval as number,
      hasCompletedWelcome: Boolean(row.has_completed_welcome),
      themeMode: row.theme_mode as string,
      visualPreset: row.visual_preset as string,
      compactMode: Boolean(row.compact_mode),
    }
  },

  update(data: Partial<UserSettings>) {
    const db = getDatabase()
    const fields: string[] = []
    const values: Array<string | number | null> = []

    if (data.mode !== undefined) {
      fields.push('mode = ?')
      values.push(data.mode)
    }
    if (data.selectedContext !== undefined) {
      fields.push('selected_context = ?')
      values.push(data.selectedContext ? JSON.stringify(data.selectedContext) : null)
    }
    if (data.selectedNamespace !== undefined) {
      fields.push('selected_namespace = ?')
      values.push(data.selectedNamespace)
    }
    if (data.clusterConnected !== undefined) {
      fields.push('cluster_connected = ?')
      values.push(data.clusterConnected ? 1 : 0)
    }
    if (data.connectionError !== undefined) {
      fields.push('connection_error = ?')
      values.push(data.connectionError)
    }
    if (data.realtimeEnabled !== undefined) {
      fields.push('realtime_enabled = ?')
      values.push(data.realtimeEnabled ? 1 : 0)
    }
    if (data.autoRefreshEnabled !== undefined) {
      fields.push('auto_refresh_enabled = ?')
      values.push(data.autoRefreshEnabled ? 1 : 0)
    }
    if (data.autoRefreshInterval !== undefined) {
      fields.push('auto_refresh_interval = ?')
      values.push(data.autoRefreshInterval)
    }
    if (data.hasCompletedWelcome !== undefined) {
      fields.push('has_completed_welcome = ?')
      values.push(data.hasCompletedWelcome ? 1 : 0)
    }
    if (data.themeMode !== undefined) {
      fields.push('theme_mode = ?')
      values.push(data.themeMode)
    }
    if (data.visualPreset !== undefined) {
      fields.push('visual_preset = ?')
      values.push(data.visualPreset)
    }
    if (data.compactMode !== undefined) {
      fields.push('compact_mode = ?')
      values.push(data.compactMode ? 1 : 0)
    }

    if (fields.length === 0) return

    fields.push('updated_at = CURRENT_TIMESTAMP')
    values.push(1) // id

    const sql = `UPDATE user_settings SET ${fields.join(', ')} WHERE id = ?`
    db.prepare(sql).run(...values)
  },

  reset() {
    const db = getDatabase()
    db.prepare(
      `UPDATE user_settings SET
        mode = 'demo',
        selected_context = NULL,
        selected_namespace = '',
        cluster_connected = 0,
        connection_error = NULL,
        realtime_enabled = 0,
        auto_refresh_enabled = 0,
        auto_refresh_interval = 30,
        has_completed_welcome = 0,
        theme_mode = 'system',
        visual_preset = 'liquidGlass',
        compact_mode = 0,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1`
    ).run()
  },
}

/**
 * GitHub Settings Service
 */
export const GitHubSettingsService = {
  get() {
    const db = getDatabase()
    const row = db.prepare('SELECT * FROM github_settings WHERE id = 1').get() as Record<string, string | null> | undefined
    if (!row) {
      throw new Error('GitHub settings not found')
    }

    return {
      selectedRepo:
        row.selected_repo_owner && row.selected_repo_name
          ? {
              owner: row.selected_repo_owner,
              repo: row.selected_repo_name,
              branch: row.selected_branch || 'main',
            }
          : null,
      selectedBranch: row.selected_branch || 'main',
    }
  },

  update(data: { owner?: string; repo?: string; branch?: string }) {
    const db = getDatabase()
    const fields: string[] = []
    const values: Array<string | number> = []

    if (data.owner !== undefined) {
      fields.push('selected_repo_owner = ?')
      values.push(data.owner)
    }
    if (data.repo !== undefined) {
      fields.push('selected_repo_name = ?')
      values.push(data.repo)
    }
    if (data.branch !== undefined) {
      fields.push('selected_branch = ?')
      values.push(data.branch)
    }

    if (fields.length === 0) return

    fields.push('updated_at = CURRENT_TIMESTAMP')
    values.push(1)

    const sql = `UPDATE github_settings SET ${fields.join(', ')} WHERE id = ?`
    db.prepare(sql).run(...values)
  },

  getPendingPRs() {
    const db = getDatabase()
    const rows = db.prepare('SELECT * FROM github_pending_prs').all() as Array<{ deployment_name: string; namespace: string; pr_number: number }>
    return rows.map((row) => ({
      deploymentName: row.deployment_name,
      namespace: row.namespace,
      prNumber: row.pr_number,
    }))
  },

  setPendingPR(deploymentName: string, namespace: string, prNumber: number) {
    const db = getDatabase()
    db.prepare(
      'INSERT OR REPLACE INTO github_pending_prs (deployment_name, namespace, pr_number) VALUES (?, ?, ?)'
    ).run(deploymentName, namespace, prNumber)
  },

  removePendingPR(deploymentName: string, namespace: string) {
    const db = getDatabase()
    db.prepare('DELETE FROM github_pending_prs WHERE deployment_name = ? AND namespace = ?').run(
      deploymentName,
      namespace
    )
  },

  getEditBasket() {
    const db = getDatabase()
    const rows = db.prepare('SELECT * FROM github_edit_basket').all() as Array<{ file_path: string; content: string; original_content: string; sha: string }>
    return rows.map((row) => ({
      filePath: row.file_path,
      content: row.content,
      originalContent: row.original_content,
      sha: row.sha,
    }))
  },

  addToBasket(edit: { filePath: string; content: string; originalContent: string; sha: string }) {
    const db = getDatabase()
    db.prepare(
      'INSERT OR REPLACE INTO github_edit_basket (file_path, content, original_content, sha, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)'
    ).run(edit.filePath, edit.content, edit.originalContent, edit.sha)
  },

  removeFromBasket(filePath: string) {
    const db = getDatabase()
    db.prepare('DELETE FROM github_edit_basket WHERE file_path = ?').run(filePath)
  },

  clearBasket() {
    const db = getDatabase()
    db.prepare('DELETE FROM github_edit_basket').run()
  },
}

/**
 * Cluster Aliases Service
 */
export const ClusterAliasesService = {
  getAll() {
    const db = getDatabase()
    const rows = db.prepare('SELECT * FROM cluster_aliases').all() as Array<{ context_name: string; alias: string }>
    const aliases: Record<string, string> = {}
    for (const row of rows) {
      aliases[row.context_name] = row.alias
    }
    return aliases
  },

  get(contextName: string) {
    const db = getDatabase()
    const row = db.prepare('SELECT alias FROM cluster_aliases WHERE context_name = ?').get(contextName) as { alias: string } | undefined
    return row?.alias || null
  },

  set(contextName: string, alias: string) {
    const db = getDatabase()
    db.prepare(
      'INSERT OR REPLACE INTO cluster_aliases (context_name, alias, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)'
    ).run(contextName, alias)
  },

  remove(contextName: string) {
    const db = getDatabase()
    db.prepare('DELETE FROM cluster_aliases WHERE context_name = ?').run(contextName)
  },
}

/**
 * Critical Issues Settings Service
 */
export const CriticalIssuesService = {
  getEnabled() {
    const db = getDatabase()
    const rows = db
      .prepare('SELECT resource_type FROM critical_issues_settings WHERE enabled = 1')
      .all() as Array<{ resource_type: string }>
    return new Set(rows.map((row) => row.resource_type))
  },

  isEnabled(resourceType: string) {
    const db = getDatabase()
    const row = db
      .prepare('SELECT enabled FROM critical_issues_settings WHERE resource_type = ?')
      .get(resourceType) as { enabled: number } | undefined
    return Boolean(row?.enabled)
  },

  setEnabled(resourceType: string, enabled: boolean) {
    const db = getDatabase()
    db.prepare(
      'INSERT OR REPLACE INTO critical_issues_settings (resource_type, enabled, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)'
    ).run(resourceType, enabled ? 1 : 0)
  },
}

/**
 * Sidebar Pins Service
 */
export const SidebarPinsService = {
  getPinned() {
    const db = getDatabase()
    const rows = db.prepare('SELECT path FROM sidebar_pins WHERE pinned = 1').all() as Array<{ path: string }>
    return new Set(rows.map((row) => row.path))
  },

  isPinned(path: string) {
    const db = getDatabase()
    const row = db.prepare('SELECT pinned FROM sidebar_pins WHERE path = ?').get(path) as { pinned: number } | undefined
    return Boolean(row?.pinned)
  },

  setPinned(path: string, pinned: boolean) {
    const db = getDatabase()
    db.prepare(
      'INSERT OR REPLACE INTO sidebar_pins (path, pinned, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)'
    ).run(path, pinned ? 1 : 0)
  },
}
