import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'

export interface ClusterHealthResponse {
  status: 'connected' | 'disconnected'
  message: string
  code?: number
}

async function fetchClusterHealth(mode: 'demo' | 'real'): Promise<ClusterHealthResponse> {
  // In demo mode, always return connected
  if (mode === 'demo') {
    return {
      status: 'connected',
      message: 'Demo mode - simulated cluster connection',
    }
  }

  const response = await fetch('/api/cluster/health')
  if (!response.ok) {
    throw new Error('Failed to check cluster health')
  }

  return response.json()
}

export function useClusterHealth() {
  const mode = useModeStore((state) => state.mode)
  const hasCompletedWelcome = useModeStore((state) => state.hasCompletedWelcome)

  return useQuery<ClusterHealthResponse>({
    queryKey: ['cluster-health', mode],
    queryFn: () => fetchClusterHealth(mode),
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 60000, // Refetch every 60 seconds
    retry: 1, // Only retry once
    enabled: hasCompletedWelcome, // Don't check health until user has selected cluster
  })
}
