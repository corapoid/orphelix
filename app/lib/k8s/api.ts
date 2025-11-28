/**
 * Kubernetes API Functions
 *
 * This module re-exports all K8s resource functions from modular resource files.
 * The original monolithic file has been refactored into smaller, focused modules
 * located in the resources/ directory, with structured logging throughout.
 */

// Deployments
export {
  fetchDeployments,
  fetchDeployment,
  fetchDeploymentYaml,
} from './resources/deployments'

// StatefulSets
export {
  fetchStatefulSets,
  fetchStatefulSet,
} from './resources/statefulsets'

// DaemonSets
export {
  fetchDaemonSets,
  fetchDaemonSet,
} from './resources/daemonsets'

// Pods
export {
  fetchPods,
  fetchPod,
  fetchPodLogs,
  fetchNodePods,
} from './resources/pods'

// Nodes
export {
  fetchNodes,
  fetchNode,
  fetchNodeEvents,
} from './resources/nodes'

// ConfigMaps & Secrets
export {
  fetchConfigMaps,
  fetchConfigMap,
  fetchConfigMapYaml,
  fetchSecrets,
  fetchSecret,
  fetchSecretYaml,
} from './resources/config'

// Jobs & CronJobs
export {
  fetchJobs,
  fetchJob,
  fetchCronJobs,
  fetchCronJob,
} from './resources/workloads'

// Services & Ingresses
export {
  fetchServices,
  fetchService,
  fetchIngresses,
  fetchIngress,
} from './resources/networking'

// Storage (PVs & PVCs)
export {
  fetchPVs,
  fetchPVCs,
} from './resources/storage'

// Autoscaling (HPAs)
export {
  fetchHPAs,
} from './resources/autoscaling'

// Namespaces, ResourceQuotas, LimitRanges
export {
  fetchNamespaces,
  fetchNamespace,
  fetchResourceQuotas,
  fetchResourceQuota,
  fetchLimitRanges,
  fetchLimitRange,
} from './resources/namespaces'

// Events
export {
  fetchEvents,
  fetchResourceEvents,
} from './resources/events'

// Labels & Resource Search
export {
  fetchResourcesWithLabels,
  indexLabels,
  searchByLabelSelector,
} from './resources/labels'
