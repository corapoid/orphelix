import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockStatefulSets } from '@/lib/mocks/data'
import type { StatefulSet } from '@/types/kubernetes'

/**
 * Hook to fetch all statefulsets
 */
export function useStatefulSets() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<StatefulSet[]>({
    queryKey: ['statefulsets', mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockStatefulSets()
      }

      // Real mode: fetch from API route (server-side)
      const response = await fetch(
        `/api/statefulsets?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`
      )
      if (!response.ok) throw new Error('Failed to fetch statefulsets')
      return response.json()
    },
  })
}

/**
 * Hook to fetch a single statefulset by name
 */
export function useStatefulSet(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<StatefulSet>({
    queryKey: ['statefulset', name, mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const statefulsets = generateMockStatefulSets()
        const statefulset = statefulsets.find((sts) => sts.name === name)
        if (!statefulset) throw new Error('StatefulSet not found')
        return statefulset
      }

      // Real mode: fetch from API route (server-side)
      const response = await fetch(
        `/api/statefulsets/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`
      )
      if (!response.ok) throw new Error('Failed to fetch statefulset')
      return response.json()
    },
    enabled: !!name && (mode === 'mock' || !!namespace),
  })
}
