import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockServices } from '@/lib/mocks/data'
import type { Service } from '@/types/kubernetes'

export function useServices() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<Service[]>({
    queryKey: ['services', mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockServices()
      }

      const response = await fetch(`/api/services?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch services')
      }
      return response.json()
    },
    enabled: mode === 'demo' || !!namespace,
  })
}

export function useService(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<Service>({
    queryKey: ['services', mode, namespace, name],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const services = generateMockServices()
        const service = services.find((s) => s.name === name)
        if (!service) throw new Error('Service not found')
        return service
      }

      const response = await fetch(`/api/services/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch service')
      }
      return response.json()
    },
    enabled: (mode === 'demo' || !!namespace) && !!name,
  })
}
