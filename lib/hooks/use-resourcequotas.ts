import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockResourceQuotas } from '@/lib/mocks/data'
import type { ResourceQuota } from '@/types/kubernetes'

export function useResourceQuotas() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<ResourceQuota[]>({
    queryKey: ['resourcequotas', mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockResourceQuotas()
      }

      const response = await fetch(`/api/resourcequotas?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) {
        // Return empty array for 403 errors (permission denied)
        if (response.status === 403) {
          return []
        }
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch resource quotas')
      }
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
    retry: (failureCount, error) => {
      // Don't retry on 403 errors (permission denied)
      if (error instanceof Error && error.message.includes('Forbidden')) {
        return false
      }
      return failureCount < 3
    },
  })
}
