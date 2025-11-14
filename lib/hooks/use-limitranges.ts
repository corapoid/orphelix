import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockLimitRanges } from '@/lib/mocks/data'
import type { LimitRange } from '@/types/kubernetes'

export function useLimitRanges() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<LimitRange[]>({
    queryKey: ['limitranges', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockLimitRanges()
      }

      const response = await fetch(`/api/limitranges?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch limit ranges')
      }
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}
