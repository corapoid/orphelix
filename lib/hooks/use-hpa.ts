import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockHPAs } from '@/lib/mocks/data'
import type { HPA } from '@/types/kubernetes'

/**
 * Hook to fetch all HPAs
 */
export function useHPAs() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<HPA[]>({
    queryKey: ['hpas', mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockHPAs()
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/hpa?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) throw new Error('Failed to fetch HPAs')
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}

/**
 * Hook to fetch a single HPA by name
 * @param name - HPA name
 */
export function useHPA(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<HPA>({
    queryKey: ['hpa', name, mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const hpas = generateMockHPAs()
        const hpa = hpas.find((h) => h.name === name)
        if (!hpa) throw new Error('HPA not found')
        return hpa
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/hpa/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) throw new Error('Failed to fetch HPA')
      return response.json()
    },
    enabled: !!name && (mode === 'mock' || !!namespace),
  })
}
