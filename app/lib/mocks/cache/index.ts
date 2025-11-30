/**
 * Global cache for mock data
 * Survives HMR and navigation, only resets on full page reload (F5)
 */

import type {
  Pod,
  Deployment,
  StatefulSet,
  DaemonSet,
  Node,
  ConfigMap,
  Secret,
  HPA,
  PersistentVolume,
  PersistentVolumeClaim,
  Event,
  Service,
  Ingress,
  Job,
  CronJob,
  Namespace,
  ResourceQuota,
  LimitRange,
} from '@/types/kubernetes'

export interface MockDataCache {
  pods: Pod[] | null
  deployments: Deployment[] | null
  statefulSets: StatefulSet[] | null
  daemonSets: DaemonSet[] | null
  nodes: Node[] | null
  configMaps: ConfigMap[] | null
  secrets: Secret[] | null
  hpas: HPA[] | null
  pvs: PersistentVolume[] | null
  pvcs: PersistentVolumeClaim[] | null
  events: Event[] | null
  services: Service[] | null
  ingresses: Ingress[] | null
  jobs: Job[] | null
  cronJobs: CronJob[] | null
  namespaces: Namespace[] | null
  resourceQuotas: ResourceQuota[] | null
  limitRanges: LimitRange[] | null
}

declare global {
  interface Window {
    __mockDataCache?: MockDataCache
  }
}

// Initialize cache if it doesn't exist
if (typeof window !== 'undefined' && !window.__mockDataCache) {
  window.__mockDataCache = {
    pods: null,
    deployments: null,
    statefulSets: null,
    daemonSets: null,
    nodes: null,
    configMaps: null,
    secrets: null,
    hpas: null,
    pvs: null,
    pvcs: null,
    events: null,
    services: null,
    ingresses: null,
    jobs: null,
    cronJobs: null,
    namespaces: null,
    resourceQuotas: null,
    limitRanges: null,
  }
}

// Cache accessors
export const getCache = () => (typeof window !== 'undefined' ? window.__mockDataCache : null)

// Pods
export const getCachedPods = () => getCache()?.pods || null
export const setCachedPods = (data: Pod[]) => {
  if (getCache()) getCache()!.pods = data
}

// Deployments
export const getCachedDeployments = () => getCache()?.deployments || null
export const setCachedDeployments = (data: Deployment[]) => {
  if (getCache()) getCache()!.deployments = data
}

// StatefulSets
export const getCachedStatefulSets = () => getCache()?.statefulSets || null
export const setCachedStatefulSets = (data: StatefulSet[]) => {
  if (getCache()) getCache()!.statefulSets = data
}

// DaemonSets
export const getCachedDaemonSets = () => getCache()?.daemonSets || null
export const setCachedDaemonSets = (data: DaemonSet[]) => {
  if (getCache()) getCache()!.daemonSets = data
}

// Nodes
export const getCachedNodes = () => getCache()?.nodes || null
export const setCachedNodes = (data: Node[]) => {
  if (getCache()) getCache()!.nodes = data
}

// ConfigMaps
export const getCachedConfigMaps = () => getCache()?.configMaps || null
export const setCachedConfigMaps = (data: ConfigMap[]) => {
  if (getCache()) getCache()!.configMaps = data
}

// Secrets
export const getCachedSecrets = () => getCache()?.secrets || null
export const setCachedSecrets = (data: Secret[]) => {
  if (getCache()) getCache()!.secrets = data
}

// HPAs
export const getCachedHPAs = () => getCache()?.hpas || null
export const setCachedHPAs = (data: HPA[]) => {
  if (getCache()) getCache()!.hpas = data
}

// PVs
export const getCachedPVs = () => getCache()?.pvs || null
export const setCachedPVs = (data: PersistentVolume[]) => {
  if (getCache()) getCache()!.pvs = data
}

// PVCs
export const getCachedPVCs = () => getCache()?.pvcs || null
export const setCachedPVCs = (data: PersistentVolumeClaim[]) => {
  if (getCache()) getCache()!.pvcs = data
}

// Events
export const getCachedEvents = () => getCache()?.events || null
export const setCachedEvents = (data: Event[]) => {
  if (getCache()) getCache()!.events = data
}

// Services
export const getCachedServices = () => getCache()?.services || null
export const setCachedServices = (data: Service[]) => {
  if (getCache()) getCache()!.services = data
}

// Ingresses
export const getCachedIngresses = () => getCache()?.ingresses || null
export const setCachedIngresses = (data: Ingress[]) => {
  if (getCache()) getCache()!.ingresses = data
}

// Jobs
export const getCachedJobs = () => getCache()?.jobs || null
export const setCachedJobs = (data: Job[]) => {
  if (getCache()) getCache()!.jobs = data
}

// CronJobs
export const getCachedCronJobs = () => getCache()?.cronJobs || null
export const setCachedCronJobs = (data: CronJob[]) => {
  if (getCache()) getCache()!.cronJobs = data
}

// Namespaces
export const getCachedNamespaces = () => getCache()?.namespaces || null
export const setCachedNamespaces = (data: Namespace[]) => {
  if (getCache()) getCache()!.namespaces = data
}

// ResourceQuotas
export const getCachedResourceQuotas = () => getCache()?.resourceQuotas || null
export const setCachedResourceQuotas = (data: ResourceQuota[]) => {
  if (getCache()) getCache()!.resourceQuotas = data
}

// LimitRanges
export const getCachedLimitRanges = () => getCache()?.limitRanges || null
export const setCachedLimitRanges = (data: LimitRange[]) => {
  if (getCache()) getCache()!.limitRanges = data
}
