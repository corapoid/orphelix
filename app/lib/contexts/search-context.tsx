'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchPlaceholder: string
  setSearchPlaceholder: (placeholder: string) => void
  clearSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search...')

  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [setSearchQuery])

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchPlaceholder,
        setSearchPlaceholder,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

/**
 * Hook for pages to register their search functionality
 * Automatically sets placeholder and clears search on unmount
 */
export function usePageSearch(placeholder: string) {
  const { searchQuery, setSearchPlaceholder, clearSearch } = useSearch()

  useEffect(() => {
    setSearchPlaceholder(placeholder)

    // Clear search when component unmounts (navigating away)
    return () => {
      clearSearch()
    }
  }, [placeholder, setSearchPlaceholder, clearSearch])

  return searchQuery
}
