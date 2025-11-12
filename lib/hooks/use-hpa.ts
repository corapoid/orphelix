import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/store'
import { generateMockHPAs } from '@/lib/mock-data'
import type { HPA } from '@/types/kubernetes'

/**
 * Hook to fetch all HPAs
 */
export function useHPAs() {
  const mode = useModeStore((state) => state.mode)

  return useQuery<HPA[]>({
    queryKey: ['hpas', mode],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockHPAs()
      }

      
      const response = await fetch('/api/hpas')
      if (!response.ok) throw new Error('Failed to fetch HPAs')
      return response.json()
    },
  })
}

/**
 * Hook to fetch a single HPA by name
 * @param name - HPA name
 */
export function useHPA(name: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<HPA>({
    queryKey: ['hpa', name, mode],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const hpas = generateMockHPAs()
        const hpa = hpas.find((h) => h.name === name)
        if (!hpa) throw new Error('HPA not found')
        return hpa
      }

      
      const response = await fetch(`/api/hpas/${name}`)
      if (!response.ok) throw new Error('Failed to fetch HPA')
      return response.json()
    },
    enabled: !!name,
  })
}
