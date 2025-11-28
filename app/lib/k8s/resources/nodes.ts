/**
 * Kubernetes Nodes API
 */

import { getCoreApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { Node, NodeStatus, Event } from '@/types/kubernetes'
import { fetchResourceEvents } from './events'

const logger = createLogger({ module: 'k8s-nodes' })

/**
 * Fetch all nodes in the cluster
 */
export async function fetchNodes(contextName?: string): Promise<Node[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listNode({})

  return response.items.map((node) => {
    const conditions = node.status?.conditions || []
    const readyCondition = conditions.find((c) => c.type === 'Ready')
    let status: NodeStatus = 'Unknown'
    if (readyCondition) {
      status = readyCondition.status === 'True' ? 'Ready' : 'NotReady'
    }

    const roles = node.metadata?.labels
      ? Object.keys(node.metadata.labels)
          .filter((label) => label.startsWith('node-role.kubernetes.io/'))
          .map((label) => label.replace('node-role.kubernetes.io/', ''))
      : []

    return {
      name: node.metadata?.name || '',
      status,
      roles: roles.length > 0 ? roles : ['<none>'],
      version: node.status?.nodeInfo?.kubeletVersion || 'Unknown',
      capacity: {
        cpu: node.status?.capacity?.cpu || '0',
        memory: node.status?.capacity?.memory || '0',
        pods: node.status?.capacity?.pods || '0',
      },
      allocatable: {
        cpu: node.status?.allocatable?.cpu || '0',
        memory: node.status?.allocatable?.memory || '0',
        pods: node.status?.allocatable?.pods || '0',
      },
      age: calculateAge(node.metadata?.creationTimestamp),
      labels: node.metadata?.labels || {},
      conditions: conditions.map((c) => ({
        type: c.type || '',
        status: c.status || '',
        reason: c.reason || '',
        message: c.message || '',
        lastTransitionTime: c.lastTransitionTime?.toString() || '',
      })),
    }
  })
}

/**
 * Fetch a single node by name
 */
export async function fetchNode(name: string, contextName?: string): Promise<Node | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNode({ name })
    const node = response

    const conditions = node.status?.conditions || []
    const readyCondition = conditions.find((c) => c.type === 'Ready')
    let status: NodeStatus = 'Unknown'
    if (readyCondition) {
      status = readyCondition.status === 'True' ? 'Ready' : 'NotReady'
    }

    const roles = node.metadata?.labels
      ? Object.keys(node.metadata.labels)
          .filter((label) => label.startsWith('node-role.kubernetes.io/'))
          .map((label) => label.replace('node-role.kubernetes.io/', ''))
      : []

    return {
      name: node.metadata?.name || '',
      status,
      roles: roles.length > 0 ? roles : ['<none>'],
      version: node.status?.nodeInfo?.kubeletVersion || 'Unknown',
      capacity: {
        cpu: node.status?.capacity?.cpu || '0',
        memory: node.status?.capacity?.memory || '0',
        pods: node.status?.capacity?.pods || '0',
      },
      allocatable: {
        cpu: node.status?.allocatable?.cpu || '0',
        memory: node.status?.allocatable?.memory || '0',
        pods: node.status?.allocatable?.pods || '0',
      },
      age: calculateAge(node.metadata?.creationTimestamp),
      labels: node.metadata?.labels || {},
      conditions: conditions.map((c) => ({
        type: c.type || '',
        status: c.status || '',
        reason: c.reason || '',
        message: c.message || '',
        lastTransitionTime: c.lastTransitionTime?.toString() || '',
      })),
    }
  } catch (error) {
    logger.error(
      { error, name, context: contextName },
      'Failed to fetch node'
    )
    return null
  }
}

/**
 * Fetch events for a specific node
 */
export async function fetchNodeEvents(nodeName: string): Promise<Event[]> {
  return fetchResourceEvents('Node', nodeName, '')
}
