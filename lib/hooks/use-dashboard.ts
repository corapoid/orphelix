import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/store'
import { generateMockDashboardSummary, generateMockEvents } from '@/lib/mock-data'
import type { DashboardSummary, Event } from '@/types/kubernetes'

/**
 * Hook to fetch dashboard summary data
 * Returns mock data in mock mode, real data in real mode
 */
export function useDashboardSummary() {
  const mode = useModeStore((state) => state.mode)

  return useQuery<DashboardSummary>({
    queryKey: ['dashboard-summary', mode],
    queryFn: async () => {
      if (mode === 'mock') {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockDashboardSummary()
      }

      
      const response = await fetch('/api/dashboard/summary')
      if (!response.ok) throw new Error('Failed to fetch dashboard summary')
      return response.json()
    },
  })
}

/**
 * Hook to fetch recent events
 * @param limit - Number of events to fetch (default: 10)
 */
export function useRecentEvents(limit = 10) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Event[]>({
    queryKey: ['recent-events', mode, limit],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const events = generateMockEvents()
        return events.slice(0, limit)
      }

      
      const response = await fetch(`/api/events?limit=${limit}`)
      if (!response.ok) throw new Error('Failed to fetch events')
      return response.json()
    },
  })
}
