import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockIngresses } from '@/lib/mocks/data'
import type { Ingress } from '@/types/kubernetes'

export function useIngresses() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Ingress[]>({
    queryKey: ['ingress', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockIngresses()
      }

      const response = await fetch(`/api/ingress?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch ingresses')
      }
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}

export function useIngress(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Ingress>({
    queryKey: ['ingress', mode, namespace, name],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const ingresses = generateMockIngresses()
        const ingress = ingresses.find((i) => i.name === name)
        if (!ingress) throw new Error('Ingress not found')
        return ingress
      }

      const response = await fetch(`/api/ingress/${name}?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch ingress')
      }
      return response.json()
    },
    enabled: (mode === 'mock' || !!namespace) && !!name,
  })
}
