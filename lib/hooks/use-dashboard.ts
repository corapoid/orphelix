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
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<DashboardSummary>({
    queryKey: ['dashboard-summary', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockDashboardSummary()
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/dashboard/summary?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) throw new Error('Failed to fetch dashboard summary')
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}

/**
 * Hook to fetch recent events
 * @param limit - Number of events to fetch (default: 10)
 */
export function useRecentEvents(limit = 10) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Event[]>({
    queryKey: ['recent-events', mode, namespace, limit],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const events = generateMockEvents()
        return events.slice(0, limit)
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/events?namespace=${encodeURIComponent(namespace)}&limit=${limit}`)
      if (!response.ok) throw new Error('Failed to fetch events')
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}
