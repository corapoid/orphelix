import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockDaemonSets } from '@/lib/mocks/data'
import type { DaemonSet } from '@/types/kubernetes'

/**
 * Hook to fetch all daemonsets
 */
export function useDaemonSets() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<DaemonSet[]>({
    queryKey: ['daemonsets', mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockDaemonSets()
      }

      // Real mode: fetch from API route (server-side)
      const response = await fetch(
        `/api/daemonsets?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`
      )
      if (!response.ok) throw new Error('Failed to fetch daemonsets')
      return response.json()
    },
  })
}

/**
 * Hook to fetch a single daemonset by name
 */
export function useDaemonSet(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<DaemonSet>({
    queryKey: ['daemonset', name, mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const daemonsets = generateMockDaemonSets()
        const daemonset = daemonsets.find((ds) => ds.name === name)
        if (!daemonset) throw new Error('DaemonSet not found')
        return daemonset
      }

      // Real mode: fetch from API route (server-side)
      const response = await fetch(
        `/api/daemonsets/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`
      )
      if (!response.ok) throw new Error('Failed to fetch daemonset')
      return response.json()
    },
    enabled: !!name && (mode === 'mock' || !!namespace),
  })
}
