'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { SearchProvider } from '@/lib/contexts/search-context'

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
        <SearchProvider>{children}</SearchProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
