import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'

interface RestartPodResponse {
  success: boolean
  message: string
  podName: string
}

interface RestartPodError {
  error: string
  details?: string
}

/**
 * Hook to restart a pod
 *
 * In real mode: Calls DELETE API to restart the pod
 * In mock mode: Simulates restart with delay
 *
 * @param podName - Name of the pod to restart
 */
export function useRestartPod(podName: string) {
  const queryClient = useQueryClient()
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useMutation<RestartPodResponse, RestartPodError, void>({
    mutationFn: async () => {
      if (mode === 'mock') {
        // Simulate restart in mock mode
        await new Promise((resolve) => setTimeout(resolve, 1500))
        return {
          success: true,
          message: `Pod ${podName} restarted successfully (mock mode)`,
          podName,
        }
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      // Real mode: Call restart API
      const response = await fetch(`/api/pods/${podName}/restart?namespace=${encodeURIComponent(namespace)}`, {
        method: 'POST',
      })

      if (!response.ok) {
        const error: RestartPodError = await response.json()
        throw error
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidate pod queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['pods'] })
      queryClient.invalidateQueries({ queryKey: ['pod', podName] })
      queryClient.invalidateQueries({ queryKey: ['deployment-pods'] })
      queryClient.invalidateQueries({ queryKey: ['node-pods'] })
      queryClient.invalidateQueries({ queryKey: ['pod-events', podName] })
    },
  })
}
