import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import type { LabelSearchResult } from '@/types/kubernetes'

export function useLabels(selector?: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<LabelSearchResult>({
    queryKey: ['labels', mode, namespace, selectedContext?.name || '', selector || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        // Return mock label data
        await new Promise((resolve) => setTimeout(resolve, 300))
        return {
          labels: [
            {
              key: 'app',
              values: [
                { value: 'nginx', count: 15 },
                { value: 'redis', count: 8 },
                { value: 'postgres', count: 5 },
              ],
              totalCount: 28,
              resourceTypes: ['Deployment', 'Pod', 'Service'],
            },
            {
              key: 'environment',
              values: [
                { value: 'production', count: 12 },
                { value: 'staging', count: 8 },
                { value: 'development', count: 6 },
              ],
              totalCount: 26,
              resourceTypes: ['Deployment', 'Pod', 'Service', 'ConfigMap'],
            },
            {
              key: 'version',
              values: [
                { value: 'v1.0.0', count: 10 },
                { value: 'v2.0.0', count: 8 },
                { value: 'v1.5.0', count: 4 },
              ],
              totalCount: 22,
              resourceTypes: ['Deployment', 'Pod'],
            },
            {
              key: 'tier',
              values: [
                { value: 'frontend', count: 9 },
                { value: 'backend', count: 7 },
                { value: 'database', count: 3 },
              ],
              totalCount: 19,
              resourceTypes: ['Deployment', 'Service', 'Pod'],
            },
            {
              key: 'component',
              values: [
                { value: 'api', count: 6 },
                { value: 'worker', count: 5 },
                { value: 'cache', count: 4 },
              ],
              totalCount: 15,
              resourceTypes: ['Deployment', 'Pod', 'ConfigMap'],
            },
          ],
          resources: [],
          totalResources: 89,
        }
      }

      const params = new URLSearchParams({
        namespace,
        context: selectedContext?.name || '',
      })

      if (selector) {
        params.append('selector', selector)
      }

      const response = await fetch(`/api/labels?${params}`)
      if (!response.ok) throw new Error('Failed to fetch labels')
      return response.json()
    },
  })
}
