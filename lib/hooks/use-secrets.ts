import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/store'
import { generateMockSecrets, generateMockEvents } from '@/lib/mock-data'
import type { Secret, Event } from '@/types/kubernetes'

/**
 * Hook to fetch all Secrets
 * @param namespace - Optional namespace filter
 */
export function useSecrets(namespace?: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Secret[]>({
    queryKey: ['secrets', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const secrets = generateMockSecrets()

        if (namespace) {
          return secrets.filter((s) => s.namespace === namespace)
        }

        return secrets
      }

      
      const url = namespace
        ? `/api/secrets?namespace=${namespace}`
        : '/api/secrets'
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch Secrets')
      return response.json()
    },
  })
}

/**
 * Hook to fetch a single Secret by name
 * @param name - Secret name
 */
export function useSecret(name: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Secret>({
    queryKey: ['secret', name, mode],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const secrets = generateMockSecrets()
        const secret = secrets.find((s) => s.name === name)
        if (!secret) throw new Error('Secret not found')
        return secret
      }

      
      const response = await fetch(`/api/secrets/${name}`)
      if (!response.ok) throw new Error('Failed to fetch Secret')
      return response.json()
    },
    enabled: !!name,
  })
}

/**
 * Hook to fetch events for a specific Secret
 * @param secretName - Name of the Secret
 */
export function useSecretEvents(secretName: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Event[]>({
    queryKey: ['secret-events', secretName, mode],
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

      
      const response = await fetch(`/api/secrets/${secretName}/events`)
      if (!response.ok) throw new Error('Failed to fetch Secret events')
      return response.json()
    },
    enabled: !!secretName,
  })
}
