/**
 * API Key Hook
 *
 * Client-side hook for securely retrieving API keys from encrypted storage.
 * Provides automatic migration from localStorage to encrypted database.
 *
 * Usage:
 * ```tsx
 * const { apiKey, loading, error } = useApiKey('openai')
 * ```
 *
 * @module lib/hooks/use-api-key
 */

import { useEffect, useState } from 'react'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'use-api-key' })

interface UseApiKeyReturn {
  /** The decrypted API key, or null if not found */
  apiKey: string | null
  /** Loading state */
  loading: boolean
  /** Error message if fetch failed */
  error: string | null
  /** Refetch the API key */
  refetch: () => void
}

/**
 * Migrate API key from localStorage to encrypted DB
 * This is a one-time migration for existing users
 */
async function migrateFromLocalStorage(keyName: string): Promise<void> {
  try {
    const localStorageKey = `orphelix_${keyName}_key`
    const localValue = localStorage.getItem(localStorageKey)

    if (!localValue) {
      // Nothing to migrate
      return
    }

    // Store in encrypted DB via API
    const response = await fetch('/api/api-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keyName,
        value: localValue,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to migrate API key')
    }

    // Migration successful - remove from localStorage
    localStorage.removeItem(localStorageKey)
    logger.info(`Migrated ${keyName} API key from localStorage to encrypted DB`)
  } catch (error) {
    logger.error({ error, keyName }, 'Failed to migrate API key from localStorage')
    // Don't throw - we'll fall back to localStorage for this session
  }
}

/**
 * Fetch API key from encrypted database
 */
async function fetchApiKey(keyName: string): Promise<string | null> {
  try {
    const response = await fetch(`/api/api-keys?keyName=${encodeURIComponent(keyName)}`)

    if (response.status === 404) {
      // Key not found in DB
      return null
    }

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch API key')
    }

    const data = await response.json()
    return data.value || null
  } catch (error) {
    logger.error({ error, keyName }, 'Failed to fetch API key from DB')
    throw error
  }
}

/**
 * Hook to get API key from encrypted storage
 *
 * Features:
 * - Automatic migration from localStorage to encrypted DB
 * - Fallback to localStorage if migration/fetch fails
 * - Loading and error states
 * - Refetch capability
 *
 * @param keyName - Name of the API key (e.g., 'openai', 'anthropic')
 * @returns API key value, loading state, error, and refetch function
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { apiKey, loading, error, refetch } = useApiKey('openai')
 *
 *   if (loading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error}</div>
 *   if (!apiKey) return <div>No API key configured</div>
 *
 *   // Use apiKey safely
 *   return <AIComponent apiKey={apiKey} />
 * }
 * ```
 */
export function useApiKey(keyName: string): UseApiKeyReturn {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  useEffect(() => {
    let isMounted = true

    async function loadApiKey() {
      setLoading(true)
      setError(null)

      try {
        // Step 1: Try to migrate from localStorage if exists
        await migrateFromLocalStorage(keyName)

        // Step 2: Fetch from encrypted DB
        const key = await fetchApiKey(keyName)

        if (isMounted) {
          if (key) {
            setApiKey(key)
          } else {
            // Fallback: Check localStorage (in case migration failed)
            const localStorageKey = `orphelix_${keyName}_key`
            const localValue = localStorage.getItem(localStorageKey)

            if (localValue) {
              logger.warn(
                { keyName },
                'Using API key from localStorage (migration may have failed)'
              )
              setApiKey(localValue)
            } else {
              setApiKey(null)
            }
          }
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
          setError(errorMessage)
          setLoading(false)

          // Fallback to localStorage on error
          const localStorageKey = `orphelix_${keyName}_key`
          const localValue = localStorage.getItem(localStorageKey)
          if (localValue) {
            logger.warn(
              { keyName, error: err },
              'Falling back to localStorage due to DB fetch error'
            )
            setApiKey(localValue)
          }
        }
      }
    }

    loadApiKey()

    return () => {
      isMounted = false
    }
  }, [keyName, refetchTrigger])

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1)
  }

  return {
    apiKey,
    loading,
    error,
    refetch,
  }
}

/**
 * Hook to check if an API key exists (without loading the actual value)
 * Useful for conditional rendering
 */
export function useApiKeyExists(keyName: string): {
  exists: boolean
  loading: boolean
  error: string | null
} {
  const [exists, setExists] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function checkExists() {
      setLoading(true)
      setError(null)

      try {
        // First check DB
        const response = await fetch(`/api/api-keys?keyName=${encodeURIComponent(keyName)}`)

        if (isMounted) {
          if (response.ok) {
            setExists(true)
          } else if (response.status === 404) {
            // Check localStorage as fallback
            const localStorageKey = `orphelix_${keyName}_key`
            const hasLocal = !!localStorage.getItem(localStorageKey)
            setExists(hasLocal)
          } else {
            throw new Error('Failed to check API key existence')
          }
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
          setError(errorMessage)
          setLoading(false)

          // Fallback to localStorage
          const localStorageKey = `orphelix_${keyName}_key`
          setExists(!!localStorage.getItem(localStorageKey))
        }
      }
    }

    checkExists()

    return () => {
      isMounted = false
    }
  }, [keyName])

  return { exists, loading, error }
}
