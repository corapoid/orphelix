import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockCronJobs } from '@/lib/mocks/data'
import type { CronJob } from '@/types/kubernetes'

export function useCronJobs() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<CronJob[]>({
    queryKey: ['cronjobs', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockCronJobs()
      }

      const response = await fetch(`/api/cronjobs?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch cronjobs')
      }
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}

export function useCronJob(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<CronJob>({
    queryKey: ['cronjobs', mode, namespace, name],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const cronjobs = generateMockCronJobs()
        const cronjob = cronjobs.find((cj) => cj.name === name)
        if (!cronjob) throw new Error('CronJob not found')
        return cronjob
      }

      const response = await fetch(`/api/cronjobs/${name}?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch cronjob')
      }
      return response.json()
    },
    enabled: (mode === 'mock' || !!namespace) && !!name,
  })
}
