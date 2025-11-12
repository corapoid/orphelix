import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/store'
import { generateMockSecrets, generateMockEvents } from '@/lib/mock-data'
import type { Secret, Event } from '@/types/kubernetes'

/**
 * Hook to fetch all Secrets
 */
export function useSecrets() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Secret[]>({
    queryKey: ['secrets', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockSecrets()
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/secrets?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) throw new Error('Failed to fetch Secrets')
      return response.json()
    },
    enabled: mode === 'mock' || !!namespace,
  })
}

/**
 * Hook to fetch a single Secret by name
 * @param name - Secret name
 */
export function useSecret(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Secret>({
    queryKey: ['secret', name, mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const secrets = generateMockSecrets()
        const secret = secrets.find((s) => s.name === name)
        if (!secret) throw new Error('Secret not found')
        return secret
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/secrets/${name}?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) throw new Error('Failed to fetch Secret')
      return response.json()
    },
    enabled: !!name && (mode === 'mock' || !!namespace),
  })
}

/**
 * Hook to fetch events for a specific Secret
 * @param secretName - Name of the Secret
 */
export function useSecretEvents(secretName: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Event[]>({
    queryKey: ['secret-events', secretName, mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 150))
        const allEvents = generateMockEvents()
        // Filter events related to this Secret
        return allEvents.filter(
          (event) =>
            event.kind === 'Secret' &&
            event.name === secretName
        )
      }

      if (!namespace) {
        throw new Error('Namespace is required')
      }

      const response = await fetch(`/api/secrets/${secretName}/events?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) throw new Error('Failed to fetch Secret events')
      return response.json()
    },
    enabled: !!secretName && (mode === 'mock' || !!namespace),
  })
}
