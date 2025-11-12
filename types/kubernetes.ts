// Kubernetes resource types

export type PodStatus =
  | 'Running'
  | 'Pending'
  | 'Failed'
  | 'Succeeded'
  | 'Unknown'
  | 'CrashLoopBackOff'

export type DeploymentStatus = 'Available' | 'Progressing' | 'Degraded' | 'Unknown'

export type NodeStatus = 'Ready' | 'NotReady' | 'Unknown'

export type PVStatus = 'Available' | 'Bound' | 'Released' | 'Failed' | 'Pending' | 'Unknown'

export type PVCStatus = 'Bound' | 'Pending' | 'Lost' | 'Available'

export interface Pod {
  name: string
  namespace: string
  status: PodStatus
  restartCount: number
  age: string
  nodeName: string
  ip: string
  containers: Container[]
  labels: Record<string, string>
  ownerReferences?: OwnerReference[]
}

export interface Container {
  name: string
  image: string
  ready: boolean
  restartCount: number
}

export interface OwnerReference {
  kind: string
  name: string
  uid: string
}

export interface Deployment {
  name: string
  namespace: string
  replicas: {
    desired: number
    ready: number
    available: number
    unavailable: number
  }
  status: DeploymentStatus
  age: string
  labels: Record<string, string>
  selector: Record<string, string>
  strategy: string
  configMaps: string[]
  secrets: string[]
}

export interface Node {
  name: string
  status: NodeStatus
  roles: string[]
  age: string
  version: string
  capacity: {
    cpu: string
    memory: string
    pods: string
  }
  allocatable: {
    cpu: string
    memory: string
    pods: string
  }
  labels: Record<string, string>
  conditions: NodeCondition[]
}

export interface NodeCondition {
  type: string
  status: string
  reason?: string
  message?: string
}

export interface ConfigMap {
  name: string
  namespace: string
  age: string
  data: Record<string, string>
  labels: Record<string, string>
}

export interface Secret {
  name: string
  namespace: string
  type: string
  age: string
  keys: string[]
  data: Record<string, string>
  labels: Record<string, string>
}

export interface HPA {
  name: string
  namespace: string
  targetRef: {
    kind: string
    name: string
  }
  minReplicas: number
  maxReplicas: number
  currentReplicas: number
  desiredReplicas: number
  metrics: HPAMetric[]
  age: string
}

export interface HPAMetric {
  type: 'Resource' | 'Pods' | 'Object' | 'External'
  resource?: {
    name: string
    target: {
      type: 'Utilization' | 'AverageValue'
      averageUtilization?: number
      averageValue?: string
    }
    current: {
      averageUtilization?: number
      averageValue?: string
    }
  }
}

export interface PersistentVolume {
  name: string
  capacity: string
  accessModes: string[]
  reclaimPolicy: string
  status: string
  claim?: string
  storageClass: string
  age: string
}

export interface PersistentVolumeClaim {
  name: string
  namespace: string
  status: PVCStatus
  volume?: string
  capacity: string
  accessModes: string[]
  storageClass: string
  age: string
}

export interface Event {
  type: 'Normal' | 'Warning'
  reason: string
  message: string
  kind: string // involvedObject.kind
  name: string // involvedObject.name
  namespace: string // involvedObject.namespace
  count: number
  firstTimestamp: string
  lastTimestamp: string
}

export interface DashboardSummary {
  deployments: {
    total: number
    healthy: number
    degraded: number
  }
  pods: {
    total: number
    running: number
    pending: number
    failed: number
  }
  nodes: {
    total: number
    ready: number
    notReady: number
  }
  configMaps: number
  secrets: number
  hpa: number
  pv: {
    total: number
    bound: number
  }
}

// Flux GitOps types

export type FluxResourceStatus = 'Ready' | 'Reconciling' | 'Failed' | 'Unknown'

export interface FluxCondition {
  type: string
  status: string
  reason?: string
  message?: string
  lastTransitionTime: string
}

export interface GitRepository {
  name: string
  namespace: string
  url: string
  branch?: string
  tag?: string
  status: FluxResourceStatus
  ready: boolean
  lastReconcileTime?: string
  age: string
  conditions: FluxCondition[]
}

export interface Kustomization {
  name: string
  namespace: string
  sourceRef: {
    kind: string
    name: string
  }
  path?: string
  status: FluxResourceStatus
  ready: boolean
  lastAppliedRevision?: string
  lastReconcileTime?: string
  age: string
  conditions: FluxCondition[]
}

export interface HelmRelease {
  name: string
  namespace: string
  chart: string
  version?: string
  sourceRef: {
    kind: string
    name: string
  }
  status: FluxResourceStatus
  ready: boolean
  lastAppliedRevision?: string
  lastReconcileTime?: string
  age: string
  conditions: FluxCondition[]
}
