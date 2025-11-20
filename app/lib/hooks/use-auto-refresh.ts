import { useEffect, useRef } from 'react'
import { useModeStore } from '@/lib/core/store'

/**
 * Hook for automatic data refresh
 *
 * Usage:
 * ```tsx
 * const { data, refetch } = useDeployments()
 * useAutoRefresh(refetch)
 * ```
 */
export function useAutoRefresh(refetch: () => void) {
  const { autoRefreshEnabled, autoRefreshInterval } = useModeStore()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Set up new interval if enabled
    if (autoRefreshEnabled) {
      intervalRef.current = setInterval(() => {
        refetch()
      }, autoRefreshInterval * 1000)
    }

    // Cleanup on unmount or when settings change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoRefreshEnabled, autoRefreshInterval, refetch])
}
