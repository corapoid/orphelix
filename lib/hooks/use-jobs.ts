import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockJobs } from '@/lib/mocks/data'
import type { Job } from '@/types/kubernetes'

export function useJobs() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Job[]>({
    queryKey: ['jobs', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockJobs()
      }

      const response = await fetch(`/api/jobs?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch jobs')
      }
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}

export function useJob(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Job>({
    queryKey: ['jobs', mode, namespace, name],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const jobs = generateMockJobs()
        const job = jobs.find((j) => j.name === name)
        if (!job) throw new Error('Job not found')
        return job
      }

      const response = await fetch(`/api/jobs/${name}?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch job')
      }
      return response.json()
    },
    enabled: (mode === 'mock' || !!namespace) && !!name,
  })
}
