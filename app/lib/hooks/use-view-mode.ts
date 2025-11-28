import { useState, useEffect } from 'react'

export type ViewMode = 'list' | 'grid'

const STORAGE_KEY = 'orphelix-view-mode'

/**
 * Global hook for managing view mode (list/grid) across all resource pages
 */
export function useViewMode() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return (saved as ViewMode) || 'list'
    }
    return 'list'
  })

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setViewMode(e.newValue as ViewMode)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const updateViewMode = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem(STORAGE_KEY, mode)
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new CustomEvent('viewModeChange', { detail: mode }))
  }

  useEffect(() => {
    const handleViewModeChange = (e: CustomEvent<ViewMode>) => {
      setViewMode(e.detail)
    }

    window.addEventListener('viewModeChange', handleViewModeChange as EventListener)
    return () => window.removeEventListener('viewModeChange', handleViewModeChange as EventListener)
  }, [])

  return { viewMode, setViewMode: updateViewMode }
}
