import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import type { Ingress } from '@/types/kubernetes'

export function useIngresses() {
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Ingress[]>({
    queryKey: ['ingress', namespace],
    queryFn: async () => {
      const response = await fetch(`/api/ingress?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch ingresses')
      }
      return response.json()
    },
    enabled: !!namespace,
  })
}

export function useIngress(name: string) {
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Ingress>({
    queryKey: ['ingress', namespace, name],
    queryFn: async () => {
      const response = await fetch(`/api/ingress/${name}?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch ingress')
      }
      return response.json()
    },
    enabled: !!namespace && !!name,
  })
}
