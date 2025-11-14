import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockResourceQuotas } from '@/lib/mocks/data'
import type { ResourceQuota } from '@/types/kubernetes'

export function useResourceQuotas() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<ResourceQuota[]>({
    queryKey: ['resourcequotas', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockResourceQuotas()
      }

      const response = await fetch(`/api/resourcequotas?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch resource quotas')
      }
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}
