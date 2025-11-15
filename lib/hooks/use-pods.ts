import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockPods, generateMockEvents } from '@/lib/mocks/data'
import type { Pod, Event, PodStatus } from '@/types/kubernetes'

/**
 * Hook to fetch all pods
 * @param statusFilter - Optional status filter
 */
export function usePods(statusFilter?: PodStatus) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<Pod[]>({
    queryKey: ['pods', mode, namespace, statusFilter],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const pods = generateMockPods()

        if (statusFilter) {
          return pods.filter((pod) => pod.status === statusFilter)
        }

        return pods
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const url = statusFilter
        ? `/api/pods?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}&status=${statusFilter}`
        : `/api/pods?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch pods')
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}

/**
 * Hook to fetch a single pod by name
 * @param name - Pod name
 */
export function usePod(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<Pod>({
    queryKey: ['pod', name, mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const pods = generateMockPods()
        const pod = pods.find((p) => p.name === name)
        if (!pod) throw new Error('Pod not found')
        return pod
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/pods/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) throw new Error('Failed to fetch pod')
      return response.json()
    },
    enabled: !!name && (mode === 'mock' || !!namespace),
  })
}

/**
 * Hook to fetch events for a specific pod
 * @param podName - Name of the pod
 */
export function usePodEvents(podName: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<Event[]>({
    queryKey: ['pod-events', podName, mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 150))
        const allEvents = generateMockEvents()
        // Filter events related to this pod
        return allEvents.filter(
          (event) =>
            event.kind === 'Pod' &&
            event.name === podName
        )
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/pods/${podName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) throw new Error('Failed to fetch pod events')
      return response.json()
    },
    enabled: !!podName && (mode === 'mock' || !!namespace),
  })
}

/**
 * Hook to fetch logs for a specific pod container
 * @param podName - Name of the pod
 * @param containerName - Name of the container
 * @param tail - Number of lines to tail (default: 100)
 */
export function usePodLogs(podName: string, containerName: string, tail = 100) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<{ logs: string; parsed?: Array<{ line: number; timestamp?: string; level?: string; message: string; raw: string; isJson: boolean; data?: Record<string, unknown> }> }>({
    queryKey: ['pod-logs', podName, containerName, tail, mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 400))
        // Generate mock logs
        const logLines: string[] = []
        const timestamps = ['2024-01-15', '2024-01-16', '2024-01-17']
        const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG']
        const messages = [
          'Application started successfully',
          'Connected to database',
          'Processing request from user',
          'Cache miss for key',
          'Request completed in 45ms',
          'Memory usage: 512MB',
          'Health check passed',
          'Scheduled task executed',
        ]

        for (let i = 0; i < tail; i++) {
          const timestamp = timestamps[Math.floor(Math.random() * timestamps.length)]
          const time = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
          const level = levels[Math.floor(Math.random() * levels.length)]
          const message = messages[Math.floor(Math.random() * messages.length)]
          logLines.push(`${timestamp} ${time} [${level}] ${containerName} - ${message}`)
        }

        return {
          logs: logLines.join('\n'),
          parsed: undefined,
        }
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(
        `/api/pods/${podName}/logs?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}&container=${containerName}&tail=${tail}`
      )
      if (!response.ok) throw new Error('Failed to fetch pod logs')
      const data = await response.json()
      return {
        logs: data.logs,
        parsed: data.parsed,
      }
    },
    enabled: !!podName && !!containerName && (mode === 'mock' || !!namespace),
    refetchInterval: false, // Don't auto-refresh logs
    staleTime: Infinity, // Logs don't go stale
  })
}
