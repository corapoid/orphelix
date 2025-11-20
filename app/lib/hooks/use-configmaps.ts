import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockConfigMaps, generateMockEvents } from '@/lib/mocks/data'
import type { ConfigMap, Event } from '@/types/kubernetes'

/**
 * Hook to fetch all ConfigMaps
 */
export function useConfigMaps() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<ConfigMap[]>({
    queryKey: ['configmaps', mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockConfigMaps()
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/configmaps?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) throw new Error('Failed to fetch ConfigMaps')
      return response.json()
    },
    enabled: mode === 'demo' || !!namespace,
  })
}

/**
 * Hook to fetch a single ConfigMap by name
 * @param name - ConfigMap name
 */
export function useConfigMap(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<ConfigMap>({
    queryKey: ['configmap', name, mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const configMaps = generateMockConfigMaps()
        const configMap = configMaps.find((cm) => cm.name === name)
        if (!configMap) throw new Error('ConfigMap not found')
        return configMap
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/configmaps/${name}?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) throw new Error('Failed to fetch ConfigMap')
      return response.json()
    },
    enabled: !!name && (mode === 'demo' || !!namespace),
  })
}

/**
 * Hook to fetch events for a specific ConfigMap
 * @param configMapName - Name of the ConfigMap
 */
export function useConfigMapEvents(configMapName: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  return useQuery<Event[]>({
    queryKey: ['configmap-events', configMapName, mode, namespace, selectedContext?.name || ''],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 150))
        const allEvents = generateMockEvents()
        // Filter events related to this ConfigMap
        return allEvents.filter(
          (event) =>
            event.kind === 'ConfigMap' &&
            event.name === configMapName
        )
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/configmaps/${configMapName}/events?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      if (!response.ok) throw new Error('Failed to fetch ConfigMap events')
      return response.json()
    },
    enabled: !!configMapName && (mode === 'demo' || !!namespace),
  })
}
