import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'
import { generateMockNodes, generateMockEvents } from '@/lib/mocks/data'
import type { Node, Event, NodeStatus } from '@/types/kubernetes'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'use-nodes' })

/**
 * Hook to fetch all nodes
 * @param statusFilter - Optional status filter
 */
export function useNodes(statusFilter?: NodeStatus) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Node[]>({
    queryKey: ['nodes', mode, statusFilter],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const nodes = generateMockNodes()

        if (statusFilter) {
          return nodes.filter((node) => node.status === statusFilter)
        }

        return nodes
      }

      
      const url = statusFilter
        ? `/api/nodes?status=${statusFilter}`
        : '/api/nodes'
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch nodes')
      return response.json()
    },
  })
}

/**
 * Hook to fetch a single node by name
 * @param name - Node name
 */
export function useNode(name: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Node>({
    queryKey: ['node', name, mode],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const nodes = generateMockNodes()
        const node = nodes.find((n) => n.name === name)
        if (!node) throw new Error('Node not found')
        return node
      }

      
      const response = await fetch(`/api/nodes/${name}`)
      if (!response.ok) throw new Error('Failed to fetch node')
      return response.json()
    },
    enabled: !!name,
  })
}

/**
 * Hook to fetch events for a specific node
 * @param nodeName - Name of the node
 */
export function useNodeEvents(nodeName: string) {
  const mode = useModeStore((state) => state.mode)

  return useQuery<Event[]>({
    queryKey: ['node-events', nodeName, mode],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 150))
        const allEvents = generateMockEvents()
        // Filter events related to this node
        return allEvents.filter(
          (event) =>
            event.kind === 'Node' &&
            event.name === nodeName
        )
      }


      const response = await fetch(`/api/nodes/${nodeName}/events`)
      // If 403 (forbidden), return empty array instead of throwing
      if (!response.ok) {
        if (response.status === 403) {
          logger.warn({ nodeName, status: 403 }, 'Node events: insufficient permissions')
          return []
        }
        throw new Error('Failed to fetch node events')
      }
      return response.json()
    },
    enabled: !!nodeName,
    retry: false, // Don't retry on 403 errors
  })
}

/**
 * Hook to fetch pods running on a specific node
 * @param nodeName - Name of the node
 */
export function useNodePods(nodeName: string) {
  const mode = useModeStore((state) => state.mode)
  const selectedNamespace = useModeStore((state) => state.selectedNamespace)

  return useQuery({
    queryKey: ['node-pods', nodeName, mode, selectedNamespace],
    queryFn: async () => {
      if (mode === 'demo') {
        await new Promise((resolve) => setTimeout(resolve, 200))
        const { generateMockPods } = await import('@/lib/mocks/data')
        const allPods = generateMockPods()
        // Filter pods running on this node
        return allPods.filter((pod) => pod.nodeName === nodeName)
      }

      // Pass namespace to API to scope pod list to user's selected namespace
      const url = selectedNamespace
        ? `/api/nodes/${nodeName}/pods?namespace=${selectedNamespace}`
        : `/api/nodes/${nodeName}/pods`
      const response = await fetch(url)
      // If 403 (forbidden), return empty array instead of throwing
      if (!response.ok) {
        if (response.status === 403) {
          logger.warn({ nodeName, namespace: selectedNamespace, status: 403 }, 'Node pods: insufficient permissions')
          return []
        }
        throw new Error('Failed to fetch node pods')
      }
      return response.json()
    },
    enabled: !!nodeName,
    retry: false, // Don't retry on 403 errors
  })
}
