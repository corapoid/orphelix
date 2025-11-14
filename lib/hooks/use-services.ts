import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import type { Service } from '@/types/kubernetes'

export function useServices() {
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Service[]>({
    queryKey: ['services', namespace],
    queryFn: async () => {
      const response = await fetch(`/api/services?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch services')
      }
      return response.json()
    },
    enabled: !!namespace,
  })
}

export function useService(name: string) {
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Service>({
    queryKey: ['services', namespace, name],
    queryFn: async () => {
      const response = await fetch(`/api/services/${name}?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch service')
      }
      return response.json()
    },
    enabled: !!namespace && !!name,
  })
}
