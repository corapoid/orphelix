'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, ReactNode, useEffect } from 'react'
import { ThemeProvider } from './theme-provider'
import { SearchProvider } from '@/lib/contexts/search-context'
import { useModeStore } from '@/lib/core/store'

function ModeSync() {
  const setMode = useModeStore((state) => state.setMode)

  useEffect(() => {
    // Check if we're on /demo path
    const isDemoPath = window.location.pathname.startsWith('/demo')

    if (isDemoPath) {
      setMode('mock')
    } else {
      setMode('real')
    }
  }, [setMode])

  return null
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000, // 30s
            refetchInterval: 30000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SearchProvider>
          <ModeSync />
          {children}
        </SearchProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
