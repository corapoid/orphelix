import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/store'

export interface ClusterHealthResponse {
  status: 'connected' | 'disconnected'
  message: string
  code?: number
}

async function fetchClusterHealth(mode: 'mock' | 'real'): Promise<ClusterHealthResponse> {
  // In mock mode, always return connected
  if (mode === 'mock') {
    return {
      status: 'connected',
      message: 'Mock mode - simulated cluster connection',
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

  return useQuery<ClusterHealthResponse>({
    queryKey: ['cluster-health', mode],
    queryFn: () => fetchClusterHealth(mode),
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 60000, // Refetch every 60 seconds
    retry: 1, // Only retry once
  })
}
