import type { Node, Edge } from '@xyflow/react'

export type ResourceType =
  | 'Deployment'
  | 'Pod'
  | 'Service'
  | 'ConfigMap'
  | 'Secret'
  | 'PersistentVolumeClaim'
  | 'HPA'

export type ResourceStatus =
  | 'healthy'
  | 'warning'
  | 'error'
  | 'unknown'

export interface TopologyNodeData extends Record<string, unknown> {
  label: string
  resourceType: ResourceType
  status: ResourceStatus
  namespace: string
  details?: {
    replicas?: string
    version?: string
    age?: string
    [key: string]: string | undefined
  }
}

export type TopologyNode = Node<TopologyNodeData>
export type TopologyEdge = Edge

export interface TopologyGraphData {
  nodes: TopologyNode[]
  edges: TopologyEdge[]
}

export interface ResourceRelationship {
  source: string
  target: string
  type: 'owns' | 'uses' | 'mounts' | 'manages'
}
