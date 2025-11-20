import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockPVs, generateMockPVCs } from '@/lib/mocks/data'
import type { PersistentVolume, PersistentVolumeClaim } from '@/types/kubernetes'

/**
 * Hook to fetch all PersistentVolumes
 */
export function usePVs() {
  const mode = useModeStore((state) => state.mode)

  return useQuery<PersistentVolume[]>({
    queryKey: ['pvs', mode],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockPVs()
      }

      
      const response = await fetch('/api/pvs')
      if (!response.ok) throw new Error('Failed to fetch PersistentVolumes')
      return response.json()
    },
  })
}

/**
 * Hook to fetch all PersistentVolumeClaims
 */
export function usePVCs() {
  const mode = useModeStore((state) => state.mode)

  return useQuery<PersistentVolumeClaim[]>({
    queryKey: ['pvcs', mode],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockPVCs()
      }

      
      const response = await fetch('/api/pvcs')
      if (!response.ok) throw new Error('Failed to fetch PersistentVolumeClaims')
      return response.json()
    },
  })
}
