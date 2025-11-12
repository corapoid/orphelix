import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/store'
import { generateMockConfigMaps, generateMockEvents } from '@/lib/mock-data'
import type { ConfigMap, Event } from '@/types/kubernetes'

/**
 * Hook to fetch all ConfigMaps
 * @param namespace - Optional namespace filter
 */
export function useConfigMaps(namespace?: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<ConfigMap[]>({
    queryKey: ['configmaps', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const configMaps = generateMockConfigMaps()

        if (namespace) {
          return configMaps.filter((cm) => cm.namespace === namespace)
        }

        return configMaps
      }

      
      const url = namespace
        ? `/api/configmaps?namespace=${namespace}`
        : '/api/configmaps'
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch ConfigMaps')
      return response.json()
    },
  })
}

/**
 * Hook to fetch a single ConfigMap by name
 * @param name - ConfigMap name
 */
export function useConfigMap(name: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<ConfigMap>({
    queryKey: ['configmap', name, mode],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const configMaps = generateMockConfigMaps()
        const configMap = configMaps.find((cm) => cm.name === name)
        if (!configMap) throw new Error('ConfigMap not found')
        return configMap
      }

      
      const response = await fetch(`/api/configmaps/${name}`)
      if (!response.ok) throw new Error('Failed to fetch ConfigMap')
      return response.json()
    },
    enabled: !!name,
  })
}

/**
 * Hook to fetch events for a specific ConfigMap
 * @param configMapName - Name of the ConfigMap
 */
export function useConfigMapEvents(configMapName: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Event[]>({
    queryKey: ['configmap-events', configMapName, mode],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 150))
        const allEvents = generateMockEvents()
        // Filter events related to this ConfigMap
        return allEvents.filter(
          (event) =>
            event.kind === 'ConfigMap' &&
            event.name === configMapName
        )
      }

      
      const response = await fetch(`/api/configmaps/${configMapName}/events`)
      if (!response.ok) throw new Error('Failed to fetch ConfigMap events')
      return response.json()
    },
    enabled: !!configMapName,
  })
}
