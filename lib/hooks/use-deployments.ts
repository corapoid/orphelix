import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockDeployments, generateMockPods, generateMockEvents } from '@/lib/mocks/data'
import type { Deployment, Pod, Event } from '@/types/kubernetes'

/**
 * Hook to fetch all deployments
 */
export function useDeployments() {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Deployment[]>({
    queryKey: ['deployments', mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return generateMockDeployments()
      }

      // Real mode: fetch from API route (server-side)
      const response = await fetch(`/api/deployments?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) throw new Error('Failed to fetch deployments')
      return response.json()
    },
  })
}

/**
 * Hook to fetch a single deployment by name
 * @param name - Deployment name
 */
export function useDeployment(name: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Deployment>({
    queryKey: ['deployment', name, mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const deployments = generateMockDeployments()
        const deployment = deployments.find((d) => d.name === name)
        if (!deployment) throw new Error('Deployment not found')
        return deployment
      }

      // Real mode: fetch from API route (server-side)
      const response = await fetch(`/api/deployments/${name}?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) throw new Error('Failed to fetch deployment')
      return response.json()
    },
    enabled: !!name && (mode === 'mock' || !!namespace),
  })
}

/**
 * Hook to fetch pods for a specific deployment
 * @param deploymentName - Name of the deployment
 */
export function useDeploymentPods(deploymentName: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Pod[]>({
    queryKey: ['deployment-pods', deploymentName, mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const allPods = generateMockPods()
        // Filter pods that belong to this deployment (by owner references or labels)
        return allPods.filter((pod) => {
          // Check if pod has owner reference to this deployment's ReplicaSet
          const hasOwnerRef = pod.ownerReferences?.some(
            (ref) => ref.kind === 'ReplicaSet' && ref.name.startsWith(deploymentName)
          )
          // Or check if pod has matching app label
          const hasMatchingLabel = pod.labels.app === deploymentName
          return hasOwnerRef || hasMatchingLabel
        })
      }

      // Real mode: fetch from API route
      const response = await fetch(`/api/deployments/${deploymentName}/pods?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) throw new Error('Failed to fetch deployment pods')
      return response.json()
    },
    enabled: !!deploymentName && (mode === 'mock' || !!namespace),
  })
}

/**
 * Hook to fetch events for a specific deployment
 * @param deploymentName - Name of the deployment
 */
export function useDeploymentEvents(deploymentName: string) {
  const mode = useModeStore((state) => state.mode)
  const namespace = useModeStore((state) => state.selectedNamespace)

  return useQuery<Event[]>({
    queryKey: ['deployment-events', deploymentName, mode, namespace],
    queryFn: async () => {
      if (mode === 'mock') {
        await new Promise((resolve) => setTimeout(resolve, 150))
        const allEvents = generateMockEvents()
        // Filter events related to this deployment
        return allEvents.filter(
          (event) =>
            event.kind === 'Deployment' &&
            event.name === deploymentName
        )
      }

      // Real mode: fetch from API route
      const response = await fetch(`/api/deployments/${deploymentName}/events?namespace=${encodeURIComponent(namespace)}`)
      if (!response.ok) throw new Error('Failed to fetch deployment events')
      return response.json()
    },
    enabled: !!deploymentName && (mode === 'mock' || !!namespace),
  })
}
