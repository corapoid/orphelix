// Kubernetes resource types

// Label and Annotation types
export interface LabelInfo {
  key: string
  value: string
  count: number // Number of resources with this label
  resourceTypes: string[] // Types of resources that use this label
}

export interface LabelGroup {
  key: string
  values: Array<{
    value: string
    count: number
  }>
  totalCount: number
  resourceTypes: string[]
}

export interface ResourceWithLabels {
  name: string
  namespace: string
  kind: string
  labels: Record<string, string>
  annotations: Record<string, string>
}

export interface LabelSearchResult {
  labels: LabelGroup[]
  resources: ResourceWithLabels[]
  totalResources: number
}

export type PodStatus =
  | 'Running'
  | 'Pending'
  | 'Failed'
  | 'Succeeded'
  | 'Unknown'
  | 'CrashLoopBackOff'

export type DeploymentStatus = 'Available' | 'Progressing' | 'Degraded' | 'Healthy' | 'Not Ready' | 'Unknown'

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
  containerStatuses?: ContainerStatus[]
  labels: Record<string, string>
  ownerReferences?: OwnerReference[]
  configMaps: string[]
  secrets: string[]
}

export interface Probe {
  type: 'httpGet' | 'tcpSocket' | 'exec' | 'grpc'
  httpGet?: {
    path: string
    port: number
    scheme: string
  }
  tcpSocket?: {
    port: number
  }
  exec?: {
    command: string[]
  }
  initialDelaySeconds?: number
  periodSeconds?: number
  timeoutSeconds?: number
  successThreshold?: number
  failureThreshold?: number
}

export interface ProbeFailure {
  timestamp: string
  probeType: 'liveness' | 'readiness' | 'startup'
  containerName: string
  reason: string
  message?: string
}

export interface ContainerRestartEvent {
  timestamp: string
  containerName: string
  exitCode?: number
  reason: string
  message?: string
  restartCount: number
}

export interface HealthCheckStatus {
  container: string
  livenessStatus: 'healthy' | 'unhealthy' | 'not-configured'
  readinessStatus: 'ready' | 'not-ready' | 'not-configured'
  startupStatus: 'started' | 'not-started' | 'not-configured'
  lastProbeTime?: string
  failureCount: number
  restartCount: number
}

export interface ContainerState {
  waiting?: {
    reason: string
    message?: string
  }
  running?: {
    startedAt: string
  }
  terminated?: {
    exitCode: number
    reason: string
    message?: string
    startedAt: string
    finishedAt: string
  }
}

export interface ContainerStatus {
  name: string
  ready: boolean
  restartCount: number
  state: ContainerState
  lastState?: ContainerState
}

export interface Container {
  name: string
  image: string
  ready: boolean
  restartCount: number
  livenessProbe?: Probe
  readinessProbe?: Probe
  startupProbe?: Probe
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

export interface StatefulSet {
  name: string
  namespace: string
  replicas: {
    desired: number
    ready: number
    current: number
    updated: number
  }
  status: DeploymentStatus // Reusing same status type
  age: string
  labels: Record<string, string>
  selector: Record<string, string>
  serviceName: string
  updateStrategy: string
  podManagementPolicy: string
  persistentVolumeClaims: string[]
  configMaps: string[]
  secrets: string[]
}

export interface DaemonSet {
  name: string
  namespace: string
  desired: number
  current: number
  ready: number
  upToDate: number
  available: number
  status: DeploymentStatus // Reusing same status type
  age: string
  labels: Record<string, string>
  selector: Record<string, string>
  updateStrategy: string
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
  services: number
  ingress: number
  jobs?: {
    total: number
    active?: number
    succeeded?: number
    failed?: number
  }
  cronjobs?: {
    total: number
    active?: number
    suspended?: number
  }
  statefulsets?: {
    total: number
    ready: number
    notReady: number
  }
  daemonsets?: {
    total: number
    ready: number
    notReady: number
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

// Service types

export type ServiceType = 'ClusterIP' | 'NodePort' | 'LoadBalancer' | 'ExternalName'

export interface ServicePort {
  name?: string
  protocol: string
  port: number
  targetPort: number | string
  nodePort?: number
}

export interface Service {
  name: string
  namespace: string
  type: ServiceType
  clusterIP: string
  externalIPs?: string[]
  ports: ServicePort[]
  selector: Record<string, string>
  age: string
  labels: Record<string, string>
}

// Ingress types

export interface IngressRule {
  host?: string
  paths: IngressPath[]
}

export interface IngressPath {
  path: string
  pathType: string
  backend: {
    service: {
      name: string
      port: {
        number?: number
        name?: string
      }
    }
  }
}

export interface IngressTLS {
  hosts: string[]
  secretName?: string
}

export interface Ingress {
  name: string
  namespace: string
  className?: string
  hosts: string[]
  rules: IngressRule[]
  tls?: IngressTLS[]
  age: string
  labels: Record<string, string>
}

// Job types

export type JobStatus = 'Complete' | 'Failed' | 'Running' | 'Pending' | 'Unknown'

export interface JobCondition {
  type: string
  status: string
  lastProbeTime?: string
  lastTransitionTime?: string
  reason?: string
  message?: string
}

export interface Job {
  name: string
  namespace: string
  status: JobStatus
  completions: number
  succeeded: number
  failed: number
  active: number
  startTime?: string
  completionTime?: string
  duration?: string
  age: string
  labels: Record<string, string>
  conditions: JobCondition[]
}

// CronJob types

export type CronJobStatus = 'Active' | 'Suspended' | 'Unknown'

export interface CronJob {
  name: string
  namespace: string
  schedule: string
  suspend: boolean
  active: number
  lastSchedule?: string
  lastSuccessfulTime?: string
  age: string
  labels: Record<string, string>
}

// Namespace types

export type NamespaceStatus = 'Active' | 'Terminating' | 'Unknown'

export interface Namespace {
  name: string
  status: NamespaceStatus
  age: string
  labels: Record<string, string>
  annotations: Record<string, string>
}

// ResourceQuota types

export interface ResourceQuotaStatus {
  hard: Record<string, string>
  used: Record<string, string>
}

export interface ResourceQuota {
  name: string
  namespace: string
  age: string
  hard: Record<string, string>
  used: Record<string, string>
  labels: Record<string, string>
}

// LimitRange types

export interface LimitRangeItem {
  type: string // Pod, Container, PersistentVolumeClaim
  max?: Record<string, string>
  min?: Record<string, string>
  default?: Record<string, string>
  defaultRequest?: Record<string, string>
  maxLimitRequestRatio?: Record<string, string>
}

export interface LimitRange {
  name: string
  namespace: string
  age: string
  limits: LimitRangeItem[]
  labels: Record<string, string>
}
