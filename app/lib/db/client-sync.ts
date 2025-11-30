'use client'

import { useModeStore } from '@/lib/core/store'
import { useEffect, useRef } from 'react'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'db-client-sync' })

/**
 * Hook to initialize and sync stores with SQLite database
 * Call this once at app root to load settings from database
 */
export function useInitializeStores() {
  const initialized = useRef(false)
  const modeStore = useModeStore()

  useEffect(() => {
    if (initialized.current || modeStore.initialized) return
    initialized.current = true

    async function loadSettings() {
      try {
        // Load user settings
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          modeStore.initialize(data)
        }
      } catch (error) {
        logger.error({ error }, 'Failed to load settings from database')
        // If fetch fails, mark as initialized anyway to prevent infinite loading
        modeStore.initialize({})
      }
    }

    loadSettings()
  }, [modeStore])
}

/**
 * Migrate localStorage data to SQLite database (one-time operation)
 * This should be called on first app load after upgrade
 */
export async function migrateLocalStorageToDatabase() {
  if (typeof window === 'undefined') return

  const migrationKey = 'orphelix-db-migration-done'
  if (localStorage.getItem(migrationKey)) {
    return // Already migrated
  }

  try {
    // Collect all orphelix-related localStorage data
    const localStorageData: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('orphelix-') || key === 'theme-mode') {
        const value = localStorage.getItem(key)
        if (value) {
          localStorageData[key] = value
        }
      }
    }

    // Send to server for migration
    const response = await fetch('/api/settings/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(localStorageData),
    })

    if (response.ok) {
      // Mark migration as complete
      localStorage.setItem(migrationKey, 'true')
      logger.info('Successfully migrated localStorage to SQLite', {
        migratedKeys: Object.keys(localStorageData).length
      })

      // Optionally clear old localStorage data
      Object.keys(localStorageData).forEach((key) => {
        if (key !== migrationKey) {
          localStorage.removeItem(key)
        }
      })
    }
  } catch (error) {
    logger.error({ error }, 'Failed to migrate localStorage')
  }
}
