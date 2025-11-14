import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockNamespaces } from '@/lib/mocks/data'
import type { Namespace } from '@/types/kubernetes'

export function useNamespaces() {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Namespace[]>({
    queryKey: ['namespaces', mode],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockNamespaces()
      }

      const response = await fetch('/api/namespaces')
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch namespaces')
      }
      return response.json()
    },
    enabled: true,
  })
}

export function useNamespace(name: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Namespace>({
    queryKey: ['namespaces', mode, name],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const namespaces = generateMockNamespaces()
        const namespace = namespaces.find((ns) => ns.name === name)
        if (!namespace) throw new Error('Namespace not found')
        return namespace
      }

      const response = await fetch(`/api/namespaces/${name}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch namespace')
      }
      return response.json()
    },
    enabled: !!name,
  })
}
