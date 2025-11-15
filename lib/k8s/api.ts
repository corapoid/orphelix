/**
 * Kubernetes API Functions
 *
 * This module provides functions to interact with Kubernetes resources
 * using the official @kubernetes/client-node library.
 */

import * as k8s from '@kubernetes/client-node'
import { getAppsApi, getCoreApi, getAutoscalingApi, getNetworkingApi, getBatchApi } from './client'
import type {
  Deployment,
  Pod,
  Node,
  ConfigMap,
  Secret,
  HPA,
  PersistentVolume,
  PersistentVolumeClaim,
  Event,
  DeploymentStatus,
  PodStatus,
  NodeStatus,
  PVStatus,
  PVCStatus,
  Service,
  ServicePort,
  Ingress,
  IngressRule,
  IngressPath,
  IngressTLS,
  Job,
  JobStatus,
  JobCondition,
  CronJob,
  Namespace,
  NamespaceStatus,
  ResourceQuota,
  LimitRange,
  LimitRangeItem,
} from '@/types/kubernetes'

/**
 * Helper: Calculate age from timestamp
 */
function calculateAge(timestamp: Date | string | undefined): string {
  if (!timestamp) return 'Unknown'
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      return `${diffMins}m`
    }
    return `${diffHours}h`
  }
  return `${diffDays}d`
}

/**
 * Deployments API
 */
export async function fetchDeployments(namespace: string, contextName?: string): Promise<Deployment[]> {
  const appsApi = getAppsApi(contextName)
  const response = await appsApi.listNamespacedDeployment({ namespace })

  return response.items.map((dep) => {
    const readyReplicas = dep.status?.readyReplicas || 0
    const availableReplicas = dep.status?.availableReplicas || 0
    const unavailableReplicas = dep.status?.unavailableReplicas || 0

    let status: DeploymentStatus = 'Available'
    if (unavailableReplicas > 0) {
      status = 'Degraded'
    } else if (readyReplicas < (dep.spec?.replicas || 0)) {
      status = 'Progressing'
    }

    return {
      name: dep.metadata?.name || '',
      namespace: dep.metadata?.namespace || namespace,
      status,
      replicas: {
        desired: dep.spec?.replicas || 0,
        ready: readyReplicas,
        available: availableReplicas,
        unavailable: unavailableReplicas,
      },
      strategy: dep.spec?.strategy?.type || 'RollingUpdate',
      age: calculateAge(dep.metadata?.creationTimestamp),
      labels: dep.metadata?.labels || {},
      selector: dep.spec?.selector?.matchLabels || {},
      configMaps: extractConfigMapNames(dep),
      secrets: extractSecretNames(dep),
    }
  })
}

export async function fetchDeployment(name: string, namespace: string, contextName?: string): Promise<Deployment | null> {
  try {
    const appsApi = getAppsApi(contextName)
    const response = await appsApi.readNamespacedDeployment({ name, namespace })
    const dep = response

    const readyReplicas = dep.status?.readyReplicas || 0
    const availableReplicas = dep.status?.availableReplicas || 0
    const unavailableReplicas = dep.status?.unavailableReplicas || 0

    let status: DeploymentStatus = 'Available'
    if (unavailableReplicas > 0) {
      status = 'Degraded'
    } else if (readyReplicas < (dep.spec?.replicas || 0)) {
      status = 'Progressing'
    }

    return {
      name: dep.metadata?.name || '',
      namespace: dep.metadata?.namespace || namespace,
      status,
      replicas: {
        desired: dep.spec?.replicas || 0,
        ready: readyReplicas,
        available: availableReplicas,
        unavailable: unavailableReplicas,
      },
      strategy: dep.spec?.strategy?.type || 'RollingUpdate',
      age: calculateAge(dep.metadata?.creationTimestamp),
      labels: dep.metadata?.labels || {},
      selector: dep.spec?.selector?.matchLabels || {},
      configMaps: extractConfigMapNames(dep),
      secrets: extractSecretNames(dep),
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch deployment ${name}:`, error)
    return null
  }
}

/**
 * Helper: Extract ConfigMap names from deployment
 */
function extractConfigMapNames(dep: k8s.V1Deployment): string[] {
  const configMaps = new Set<string>()
  const containers = dep.spec?.template?.spec?.containers || []

  containers.forEach((container) => {
    // From envFrom
    container.envFrom?.forEach((envFrom) => {
      if (envFrom.configMapRef?.name) {
        configMaps.add(envFrom.configMapRef.name)
      }
    })

    // From env
    container.env?.forEach((env) => {
      if (env.valueFrom?.configMapKeyRef?.name) {
        configMaps.add(env.valueFrom.configMapKeyRef.name)
      }
    })
  })

  // From volumes
  dep.spec?.template?.spec?.volumes?.forEach((volume) => {
    if (volume.configMap?.name) {
      configMaps.add(volume.configMap.name)
    }
  })

  return Array.from(configMaps)
}

/**
 * Helper: Extract Secret names from deployment
 */
function extractSecretNames(dep: k8s.V1Deployment): string[] {
  const secrets = new Set<string>()
  const containers = dep.spec?.template?.spec?.containers || []

  containers.forEach((container) => {
    // From envFrom
    container.envFrom?.forEach((envFrom) => {
      if (envFrom.secretRef?.name) {
        secrets.add(envFrom.secretRef.name)
      }
    })

    // From env
    container.env?.forEach((env) => {
      if (env.valueFrom?.secretKeyRef?.name) {
        secrets.add(env.valueFrom.secretKeyRef.name)
      }
    })
  })

  // From volumes
  dep.spec?.template?.spec?.volumes?.forEach((volume) => {
    if (volume.secret?.secretName) {
      secrets.add(volume.secret.secretName)
    }
  })

  // Image pull secrets
  dep.spec?.template?.spec?.imagePullSecrets?.forEach((secret) => {
    if (secret.name) {
      secrets.add(secret.name)
    }
  })

  return Array.from(secrets)
}

/**
 * Helper: Extract ConfigMap names from pod
 */
function extractConfigMapNamesFromPod(pod: k8s.V1Pod): string[] {
  const configMaps = new Set<string>()
  const containers = pod.spec?.containers || []

  containers.forEach((container) => {
    // From envFrom
    container.envFrom?.forEach((envFrom) => {
      if (envFrom.configMapRef?.name) {
        configMaps.add(envFrom.configMapRef.name)
      }
    })

    // From env
    container.env?.forEach((env) => {
      if (env.valueFrom?.configMapKeyRef?.name) {
        configMaps.add(env.valueFrom.configMapKeyRef.name)
      }
    })
  })

  // From volumes
  pod.spec?.volumes?.forEach((volume) => {
    if (volume.configMap?.name) {
      configMaps.add(volume.configMap.name)
    }
  })

  return Array.from(configMaps)
}

/**
 * Helper: Extract Secret names from pod
 */
function extractSecretNamesFromPod(pod: k8s.V1Pod): string[] {
  const secrets = new Set<string>()
  const containers = pod.spec?.containers || []

  containers.forEach((container) => {
    // From envFrom
    container.envFrom?.forEach((envFrom) => {
      if (envFrom.secretRef?.name) {
        secrets.add(envFrom.secretRef.name)
      }
    })

    // From env
    container.env?.forEach((env) => {
      if (env.valueFrom?.secretKeyRef?.name) {
        secrets.add(env.valueFrom.secretKeyRef.name)
      }
    })
  })

  // From volumes
  pod.spec?.volumes?.forEach((volume) => {
    if (volume.secret?.secretName) {
      secrets.add(volume.secret.secretName)
    }
  })

  // Image pull secrets
  pod.spec?.imagePullSecrets?.forEach((secret) => {
    if (secret.name) {
      secrets.add(secret.name)
    }
  })

  return Array.from(secrets)
}

/**
 * Pods API
 */
export async function fetchPods(namespace: string, contextName?: string, labelSelector?: string): Promise<Pod[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listNamespacedPod({
    namespace,
    labelSelector,
  })

  return response.items.map((pod) => {
    const containerStatuses = pod.status?.containerStatuses || []
    const totalRestarts = containerStatuses.reduce(
      (sum, cs) => sum + (cs.restartCount || 0),
      0
    )

    return {
      name: pod.metadata?.name || '',
      namespace: pod.metadata?.namespace || namespace,
      status: (pod.status?.phase as PodStatus) || 'Unknown',
      nodeName: pod.spec?.nodeName || 'Unknown',
      ip: pod.status?.podIP || 'Unknown',
      restartCount: totalRestarts,
      age: calculateAge(pod.metadata?.creationTimestamp),
      labels: pod.metadata?.labels || {},
      containers: containerStatuses.map((cs) => ({
        name: cs.name,
        image: cs.image || '',
        ready: cs.ready || false,
        restartCount: cs.restartCount || 0,
      })),
      configMaps: extractConfigMapNamesFromPod(pod),
      secrets: extractSecretNamesFromPod(pod),
    }
  })
}

export async function fetchPod(name: string, namespace: string, contextName?: string): Promise<Pod | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedPod({ name, namespace })
    const pod = response

    const containerStatuses = pod.status?.containerStatuses || []
    const totalRestarts = containerStatuses.reduce(
      (sum, cs) => sum + (cs.restartCount || 0),
      0
    )

    return {
      name: pod.metadata?.name || '',
      namespace: pod.metadata?.namespace || namespace,
      status: (pod.status?.phase as PodStatus) || 'Unknown',
      nodeName: pod.spec?.nodeName || 'Unknown',
      ip: pod.status?.podIP || 'Unknown',
      restartCount: totalRestarts,
      age: calculateAge(pod.metadata?.creationTimestamp),
      labels: pod.metadata?.labels || {},
      containers: containerStatuses.map((cs) => ({
        name: cs.name,
        image: cs.image || '',
        ready: cs.ready || false,
        restartCount: cs.restartCount || 0,
      })),
      configMaps: extractConfigMapNamesFromPod(pod),
      secrets: extractSecretNamesFromPod(pod),
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch pod ${name}:`, error)
    return null
  }
}

export async function fetchPodLogs(
  name: string,
  namespace: string,
  contextName?: string,
  container?: string,
  tail = 100
): Promise<string> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedPodLog({
      name,
      namespace,
      container,
      tailLines: tail,
    })
    return response
  } catch (error) {
    console.error(`[K8s] Failed to fetch logs for pod ${name}:`, error)
    throw error
  }
}

/**
 * Nodes API
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
    console.error(`[K8s] Failed to fetch node ${name}:`, error)
    return null
  }
}

export async function fetchNodeEvents(nodeName: string): Promise<Event[]> {
  return fetchResourceEvents('Node', nodeName, '')
}

export async function fetchNodePods(nodeName: string, namespace?: string, contextName?: string): Promise<Pod[]> {
  try {
    const coreApi = getCoreApi(contextName)

    // If no namespace provided, we can't list pods (no cluster-level permission)
    if (!namespace) {
      console.warn('[K8s] Cannot fetch node pods without namespace (no cluster-level permission)')
      return []
    }

    // List pods in the specified namespace only
    const response = await coreApi.listNamespacedPod({
      namespace,
      fieldSelector: `spec.nodeName=${nodeName}`,
    })

    return response.items.map((pod) => {
      const containerStatuses = pod.status?.containerStatuses || []
      const totalRestarts = containerStatuses.reduce(
        (sum, cs) => sum + (cs.restartCount || 0),
        0
      )

      return {
        name: pod.metadata?.name || '',
        namespace: pod.metadata?.namespace || '',
        status: (pod.status?.phase as PodStatus) || 'Unknown',
        nodeName: pod.spec?.nodeName || 'Unknown',
        ip: pod.status?.podIP || 'Unknown',
        restartCount: totalRestarts,
        age: calculateAge(pod.metadata?.creationTimestamp),
        labels: pod.metadata?.labels || {},
        containers: containerStatuses.map((cs) => ({
          name: cs.name,
          image: cs.image || '',
          ready: cs.ready || false,
          restartCount: cs.restartCount || 0,
        })),
        configMaps: extractConfigMapNamesFromPod(pod),
        secrets: extractSecretNamesFromPod(pod),
      }
    })
  } catch (error: any) {
    // Silently handle 403 (permission denied) - just return empty array
    if (error?.code !== 403) {
      console.error(`[K8s] Failed to fetch pods for node ${nodeName}:`, error)
    }
    return []
  }
}

/**
 * ConfigMaps API
 */
export async function fetchConfigMaps(namespace: string, contextName?: string): Promise<ConfigMap[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listNamespacedConfigMap({ namespace })

  return response.items.map((cm) => ({
    name: cm.metadata?.name || '',
    namespace: cm.metadata?.namespace || namespace,
    data: cm.data || {},
    age: calculateAge(cm.metadata?.creationTimestamp),
    labels: cm.metadata?.labels || {},
  }))
}

export async function fetchConfigMap(name: string, namespace: string, contextName?: string): Promise<ConfigMap | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedConfigMap({ name, namespace })
    const cm = response

    return {
      name: cm.metadata?.name || '',
      namespace: cm.metadata?.namespace || namespace,
      data: cm.data || {},
      age: calculateAge(cm.metadata?.creationTimestamp),
      labels: cm.metadata?.labels || {},
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch configmap ${name}:`, error)
    return null
  }
}

/**
 * Secrets API
 */
export async function fetchSecrets(namespace: string, contextName?: string): Promise<Secret[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listNamespacedSecret({ namespace })

  return response.items.map((secret) => {
    // For list view, we don't include the actual data (only for detail view)
    const data: Record<string, string> = {}
    if (secret.data) {
      for (const key of Object.keys(secret.data)) {
        data[key] = '' // Empty placeholder for list view
      }
    }

    return {
      name: secret.metadata?.name || '',
      namespace: secret.metadata?.namespace || namespace,
      type: secret.type || 'Opaque',
      keys: Object.keys(secret.data || {}),
      data,
      age: calculateAge(secret.metadata?.creationTimestamp),
      labels: secret.metadata?.labels || {},
    }
  })
}

export async function fetchSecret(name: string, namespace: string, contextName?: string): Promise<Secret | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedSecret({ name, namespace })
    const secret = response

    // Convert data to Record<string, string> (values are base64 encoded)
    const data: Record<string, string> = {}
    if (secret.data) {
      for (const [key, value] of Object.entries(secret.data)) {
        data[key] = value as string
      }
    }

    return {
      name: secret.metadata?.name || '',
      namespace: secret.metadata?.namespace || namespace,
      type: secret.type || 'Opaque',
      keys: Object.keys(secret.data || {}),
      data,
      age: calculateAge(secret.metadata?.creationTimestamp),
      labels: secret.metadata?.labels || {},
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch secret ${name}:`, error)
    return null
  }
}

/**
 * HPAs API
 */
export async function fetchHPAs(namespace: string, contextName?: string): Promise<HPA[]> {
  const autoscalingApi = getAutoscalingApi(contextName)
  const response = await autoscalingApi.listNamespacedHorizontalPodAutoscaler({ namespace })

  return response.items.map((hpa) => {
    const currentReplicas = hpa.status?.currentReplicas || 0
    const desiredReplicas = hpa.status?.desiredReplicas || 0
    const minReplicas = hpa.spec?.minReplicas || 1
    const maxReplicas = hpa.spec?.maxReplicas || 1

    // Extract CPU metrics
    const cpuMetric = hpa.status?.currentMetrics?.find(
      (m) => m.type === 'Resource' && m.resource?.name === 'cpu'
    )
    const cpuCurrent = cpuMetric?.resource?.current?.averageUtilization || 0

    const cpuTargetMetric = hpa.spec?.metrics?.find(
      (m) => m.type === 'Resource' && m.resource?.name === 'cpu'
    )
    const cpuTarget = cpuTargetMetric?.resource?.target?.averageUtilization || 0

    return {
      name: hpa.metadata?.name || '',
      namespace: hpa.metadata?.namespace || namespace,
      targetRef: {
        kind: hpa.spec?.scaleTargetRef?.kind || '',
        name: hpa.spec?.scaleTargetRef?.name || '',
      },
      minReplicas,
      maxReplicas,
      currentReplicas,
      desiredReplicas,
      metrics: [
        {
          type: 'Resource' as const,
          resource: {
            name: 'cpu',
            target: {
              type: 'Utilization' as const,
              averageUtilization: cpuTarget,
            },
            current: {
              averageUtilization: cpuCurrent,
            },
          },
        },
      ],
      age: calculateAge(hpa.metadata?.creationTimestamp),
      labels: hpa.metadata?.labels || {},
    }
  })
}

/**
 * PersistentVolumes API
 */
export async function fetchPVs(contextName?: string): Promise<PersistentVolume[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listPersistentVolume({})

  return response.items.map((pv) => ({
    name: pv.metadata?.name || '',
    capacity: pv.spec?.capacity?.storage || '0',
    accessModes: pv.spec?.accessModes || [],
    reclaimPolicy: pv.spec?.persistentVolumeReclaimPolicy || 'Retain',
    status: (pv.status?.phase as PVStatus) || 'Unknown',
    claim: pv.spec?.claimRef
      ? `${pv.spec.claimRef.namespace}/${pv.spec.claimRef.name}`
      : '',
    storageClass: pv.spec?.storageClassName || '',
    age: calculateAge(pv.metadata?.creationTimestamp),
  }))
}

/**
 * PersistentVolumeClaims API
 */
export async function fetchPVCs(namespace: string, contextName?: string): Promise<PersistentVolumeClaim[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listNamespacedPersistentVolumeClaim({ namespace })

  return response.items.map((pvc) => ({
    name: pvc.metadata?.name || '',
    namespace: pvc.metadata?.namespace || namespace,
    status: (pvc.status?.phase as PVCStatus) || 'Unknown',
    volume: pvc.spec?.volumeName || '',
    capacity: pvc.status?.capacity?.storage || '0',
    accessModes: pvc.spec?.accessModes || [],
    storageClass: pvc.spec?.storageClassName || '',
    age: calculateAge(pvc.metadata?.creationTimestamp),
    labels: pvc.metadata?.labels || {},
  }))
}

/**
 * Events API
 */
export async function fetchEvents(namespace?: string, contextName?: string, timeRangeHours = 24): Promise<Event[]> {
  const coreApi = getCoreApi(contextName)
  const response = namespace
    ? await coreApi.listNamespacedEvent({ namespace })
    : await coreApi.listEventForAllNamespaces({})

  // Calculate cutoff time
  const cutoffTime = new Date()
  cutoffTime.setHours(cutoffTime.getHours() - timeRangeHours)

  // Filter events by time range and map to our Event type
  return response.items
    .filter((event) => {
      const lastTimestamp = event.lastTimestamp || event.eventTime
      if (!lastTimestamp) return false

      const eventTime = new Date(lastTimestamp.toString())
      return eventTime >= cutoffTime
    })
    .map((event) => ({
      type: (event.type as 'Normal' | 'Warning') || 'Normal',
      reason: event.reason || '',
      message: event.message || '',
      kind: event.involvedObject?.kind || '',
      name: event.involvedObject?.name || '',
      namespace: event.involvedObject?.namespace || '',
      count: event.count || 1,
      firstTimestamp: event.firstTimestamp?.toString() || '',
      lastTimestamp: event.lastTimestamp?.toString() || '',
    }))
    .sort((a, b) => {
      // Sort by lastTimestamp descending (most recent first)
      const aTime = new Date(a.lastTimestamp).getTime()
      const bTime = new Date(b.lastTimestamp).getTime()
      return bTime - aTime
    })
}

export async function fetchResourceEvents(
  kind: string,
  name: string,
  namespace: string,
  contextName?: string
): Promise<Event[]> {
  try {
    const coreApi = getCoreApi(contextName)
    const fieldSelector = `involvedObject.kind=${kind},involvedObject.name=${name}`
    const response = await coreApi.listNamespacedEvent({
      namespace,
      fieldSelector,
    })

    return response.items.map((event) => ({
      type: (event.type as 'Normal' | 'Warning') || 'Normal',
      reason: event.reason || '',
      message: event.message || '',
      kind: event.involvedObject?.kind || '',
      name: event.involvedObject?.name || '',
      namespace: event.involvedObject?.namespace || '',
      count: event.count || 1,
      firstTimestamp: event.firstTimestamp?.toString() || '',
      lastTimestamp: event.lastTimestamp?.toString() || '',
    }))
  } catch (error: any) {
    // Silently handle 403 (permission denied) - just return empty array
    if (error?.code !== 403) {
      console.error(`[API] Failed to fetch Node events:`, error)
    }
    return []
  }
}

/**
 * Fetch deployment as raw YAML string
 */
export async function fetchDeploymentYaml(name: string, namespace: string, contextName?: string): Promise<string | null> {
  try {
    const appsApi = getAppsApi(contextName)
    const response = await appsApi.readNamespacedDeployment({ name, namespace })
    
    // Convert to YAML using js-yaml
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const yaml = require('js-yaml')
    const yamlString = yaml.dump(response, { noRefs: true, sortKeys: true })
    
    return yamlString
  } catch (error) {
    console.error('[API] Failed to fetch deployment YAML:', error)
    return null
  }
}

/**
 * Fetch configmap as raw YAML string
 */
export async function fetchConfigMapYaml(name: string, namespace: string, contextName?: string): Promise<string | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedConfigMap({ name, namespace })
    
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const yaml = require('js-yaml')
    const yamlString = yaml.dump(response, { noRefs: true, sortKeys: true })
    
    return yamlString
  } catch (error) {
    console.error('[API] Failed to fetch configmap YAML:', error)
    return null
  }
}

/**
 * Fetch secret as raw YAML string
 */
export async function fetchSecretYaml(name: string, namespace: string, contextName?: string): Promise<string | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedSecret({ name, namespace })

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const yaml = require('js-yaml')
    const yamlString = yaml.dump(response, { noRefs: true, sortKeys: true })

    return yamlString
  } catch (error) {
    console.error('[API] Failed to fetch secret YAML:', error)
    return null
  }
}

/**
 * Services API
 */
export async function fetchServices(namespace: string, contextName?: string): Promise<Service[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listNamespacedService({ namespace })

  return response.items.map((svc) => {
    const ports: ServicePort[] = (svc.spec?.ports || []).map((port) => ({
      name: port.name,
      protocol: port.protocol || 'TCP',
      port: port.port || 0,
      targetPort: port.targetPort || 0,
      nodePort: port.nodePort,
    }))

    return {
      name: svc.metadata?.name || '',
      namespace: svc.metadata?.namespace || namespace,
      type: (svc.spec?.type as Service['type']) || 'ClusterIP',
      clusterIP: svc.spec?.clusterIP || '',
      externalIPs: svc.spec?.externalIPs,
      ports,
      selector: svc.spec?.selector || {},
      age: calculateAge(svc.metadata?.creationTimestamp),
      labels: svc.metadata?.labels || {},
    }
  })
}

export async function fetchService(name: string, namespace: string, contextName?: string): Promise<Service | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedService({ name, namespace })
    const svc = response

    const ports: ServicePort[] = (svc.spec?.ports || []).map((port) => ({
      name: port.name,
      protocol: port.protocol || 'TCP',
      port: port.port || 0,
      targetPort: port.targetPort || 0,
      nodePort: port.nodePort,
    }))

    return {
      name: svc.metadata?.name || '',
      namespace: svc.metadata?.namespace || namespace,
      type: (svc.spec?.type as Service['type']) || 'ClusterIP',
      clusterIP: svc.spec?.clusterIP || '',
      externalIPs: svc.spec?.externalIPs,
      ports,
      selector: svc.spec?.selector || {},
      age: calculateAge(svc.metadata?.creationTimestamp),
      labels: svc.metadata?.labels || {},
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch service ${name}:`, error)
    return null
  }
}

/**
 * Ingress API
 */
export async function fetchIngresses(namespace: string, contextName?: string): Promise<Ingress[]> {
  const networkingApi = getNetworkingApi(contextName)
  const response = await networkingApi.listNamespacedIngress({ namespace })

  return response.items.map((ing) => {
    // Extract hosts from rules
    const hosts: string[] = []
    const rules: IngressRule[] = (ing.spec?.rules || []).map((rule) => {
      if (rule.host) {
        hosts.push(rule.host)
      }

      const paths: IngressPath[] = (rule.http?.paths || []).map((path) => ({
        path: path.path || '/',
        pathType: path.pathType || 'Prefix',
        backend: {
          service: {
            name: path.backend?.service?.name || '',
            port: {
              number: path.backend?.service?.port?.number,
              name: path.backend?.service?.port?.name,
            },
          },
        },
      }))

      return {
        host: rule.host,
        paths,
      }
    })

    // Extract TLS configuration
    const tls: IngressTLS[] | undefined = ing.spec?.tls?.map((tlsConfig) => ({
      hosts: tlsConfig.hosts || [],
      secretName: tlsConfig.secretName,
    }))

    return {
      name: ing.metadata?.name || '',
      namespace: ing.metadata?.namespace || namespace,
      className: ing.spec?.ingressClassName,
      hosts,
      rules,
      tls,
      age: calculateAge(ing.metadata?.creationTimestamp),
      labels: ing.metadata?.labels || {},
    }
  })
}

export async function fetchIngress(name: string, namespace: string, contextName?: string): Promise<Ingress | null> {
  try {
    const networkingApi = getNetworkingApi(contextName)
    const response = await networkingApi.readNamespacedIngress({ name, namespace })
    const ing = response

    // Extract hosts from rules
    const hosts: string[] = []
    const rules: IngressRule[] = (ing.spec?.rules || []).map((rule) => {
      if (rule.host) {
        hosts.push(rule.host)
      }

      const paths: IngressPath[] = (rule.http?.paths || []).map((path) => ({
        path: path.path || '/',
        pathType: path.pathType || 'Prefix',
        backend: {
          service: {
            name: path.backend?.service?.name || '',
            port: {
              number: path.backend?.service?.port?.number,
              name: path.backend?.service?.port?.name,
            },
          },
        },
      }))

      return {
        host: rule.host,
        paths,
      }
    })

    // Extract TLS configuration
    const tls: IngressTLS[] | undefined = ing.spec?.tls?.map((tlsConfig) => ({
      hosts: tlsConfig.hosts || [],
      secretName: tlsConfig.secretName,
    }))

    return {
      name: ing.metadata?.name || '',
      namespace: ing.metadata?.namespace || namespace,
      className: ing.spec?.ingressClassName,
      hosts,
      rules,
      tls,
      age: calculateAge(ing.metadata?.creationTimestamp),
      labels: ing.metadata?.labels || {},
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch ingress ${name}:`, error)
    return null
  }
}

/**
 * Jobs API
 */
function calculateDuration(startTime?: string, completionTime?: string): string | undefined {
  if (!startTime) return undefined

  const start = new Date(startTime)
  const end = completionTime ? new Date(completionTime) : new Date()
  const diffMs = end.getTime() - start.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) return `${hours}h ${minutes % 60}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

function determineJobStatus(job: k8s.V1Job): JobStatus {
  const conditions = job.status?.conditions || []
  const succeeded = job.status?.succeeded || 0
  const failed = job.status?.failed || 0
  const active = job.status?.active || 0

  // Check conditions
  const completeCondition = conditions.find(c => c.type === 'Complete' && c.status === 'True')
  const failedCondition = conditions.find(c => c.type === 'Failed' && c.status === 'True')

  if (completeCondition) return 'Complete'
  if (failedCondition) return 'Failed'
  if (active > 0) return 'Running'
  if (succeeded === 0 && failed === 0 && active === 0) return 'Pending'

  return 'Unknown'
}

export async function fetchJobs(namespace: string, contextName?: string): Promise<Job[]> {
  const batchApi = getBatchApi(contextName)
  const response = await batchApi.listNamespacedJob({ namespace })

  return response.items.map((job: k8s.V1Job) => {
    const completions = job.spec?.completions || 1
    const succeeded = job.status?.succeeded || 0
    const failed = job.status?.failed || 0
    const active = job.status?.active || 0
    const status = determineJobStatus(job)

    const conditions: JobCondition[] = (job.status?.conditions || []).map(c => ({
      type: c.type || '',
      status: c.status || '',
      lastProbeTime: c.lastProbeTime,
      lastTransitionTime: c.lastTransitionTime,
      reason: c.reason,
      message: c.message,
    }))

    return {
      name: job.metadata?.name || '',
      namespace: job.metadata?.namespace || namespace,
      status,
      completions,
      succeeded,
      failed,
      active,
      startTime: job.status?.startTime,
      completionTime: job.status?.completionTime,
      duration: calculateDuration(job.status?.startTime, job.status?.completionTime),
      age: calculateAge(job.metadata?.creationTimestamp),
      labels: job.metadata?.labels || {},
      conditions,
    }
  })
}

export async function fetchJob(name: string, namespace: string, contextName?: string): Promise<Job | null> {
  try {
    const batchApi = getBatchApi(contextName)
    const response = await batchApi.readNamespacedJob({ name, namespace })
    const job = response

    const completions = job.spec?.completions || 1
    const succeeded = job.status?.succeeded || 0
    const failed = job.status?.failed || 0
    const active = job.status?.active || 0
    const status = determineJobStatus(job)

    const conditions: JobCondition[] = (job.status?.conditions || []).map((c: any) => ({
      type: c.type || '',
      status: c.status || '',
      lastProbeTime: c.lastProbeTime,
      lastTransitionTime: c.lastTransitionTime,
      reason: c.reason,
      message: c.message,
    }))

    return {
      name: job.metadata?.name || '',
      namespace: job.metadata?.namespace || namespace,
      status,
      completions,
      succeeded,
      failed,
      active,
      startTime: job.status?.startTime,
      completionTime: job.status?.completionTime,
      duration: calculateDuration(job.status?.startTime, job.status?.completionTime),
      age: calculateAge(job.metadata?.creationTimestamp),
      labels: job.metadata?.labels || {},
      conditions,
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch job ${name}:`, error)
    return null
  }
}

/**
 * CronJobs API
 */
export async function fetchCronJobs(namespace: string, contextName?: string): Promise<CronJob[]> {
  const batchApi = getBatchApi(contextName)
  const response = await batchApi.listNamespacedCronJob({ namespace })

  return response.items.map((cronJob: k8s.V1CronJob) => {
    return {
      name: cronJob.metadata?.name || '',
      namespace: cronJob.metadata?.namespace || namespace,
      schedule: cronJob.spec?.schedule || '',
      suspend: cronJob.spec?.suspend || false,
      active: cronJob.status?.active?.length || 0,
      lastSchedule: cronJob.status?.lastScheduleTime,
      lastSuccessfulTime: cronJob.status?.lastSuccessfulTime,
      age: calculateAge(cronJob.metadata?.creationTimestamp),
      labels: cronJob.metadata?.labels || {},
    }
  })
}

export async function fetchCronJob(name: string, namespace: string, contextName?: string): Promise<CronJob | null> {
  try {
    const batchApi = getBatchApi(contextName)
    const response = await batchApi.readNamespacedCronJob({ name, namespace })
    const cronJob = response

    return {
      name: cronJob.metadata?.name || '',
      namespace: cronJob.metadata?.namespace || namespace,
      schedule: cronJob.spec?.schedule || '',
      suspend: cronJob.spec?.suspend || false,
      active: cronJob.status?.active?.length || 0,
      lastSchedule: cronJob.status?.lastScheduleTime,
      lastSuccessfulTime: cronJob.status?.lastSuccessfulTime,
      age: calculateAge(cronJob.metadata?.creationTimestamp),
      labels: cronJob.metadata?.labels || {},
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch cronjob ${name}:`, error)
    return null
  }
}

/**
 * Fetch all namespaces
 */
export async function fetchNamespaces(contextName?: string): Promise<Namespace[]> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.listNamespace()
    const namespaces = response.items

    return namespaces.map((ns) => {
      const phase = ns.status?.phase || 'Unknown'
      let status: NamespaceStatus = 'Unknown'
      if (phase === 'Active') status = 'Active'
      else if (phase === 'Terminating') status = 'Terminating'

      return {
        name: ns.metadata?.name || '',
        status,
        age: calculateAge(ns.metadata?.creationTimestamp),
        labels: ns.metadata?.labels || {},
        annotations: ns.metadata?.annotations || {},
      }
    })
  } catch (error) {
    console.error('[K8s] Failed to fetch namespaces:', error)
    return []
  }
}

/**
 * Fetch single namespace
 */
export async function fetchNamespace(name: string, contextName?: string): Promise<Namespace | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespace({ name })
    const ns = response

    const phase = ns.status?.phase || 'Unknown'
    let status: NamespaceStatus = 'Unknown'
    if (phase === 'Active') status = 'Active'
    else if (phase === 'Terminating') status = 'Terminating'

    return {
      name: ns.metadata?.name || '',
      status,
      age: calculateAge(ns.metadata?.creationTimestamp),
      labels: ns.metadata?.labels || {},
      annotations: ns.metadata?.annotations || {},
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch namespace ${name}:`, error)
    return null
  }
}

/**
 * Fetch all resource quotas in a namespace
 */
export async function fetchResourceQuotas(namespace: string, contextName?: string): Promise<ResourceQuota[]> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.listNamespacedResourceQuota({ namespace })
    const quotas = response.items

    return quotas.map((quota) => ({
      name: quota.metadata?.name || '',
      namespace: quota.metadata?.namespace || namespace,
      age: calculateAge(quota.metadata?.creationTimestamp),
      hard: quota.status?.hard || {},
      used: quota.status?.used || {},
      labels: quota.metadata?.labels || {},
    }))
  } catch (error) {
    console.error(`[K8s] Failed to fetch resource quotas in ${namespace}:`, error)
    return []
  }
}

/**
 * Fetch single resource quota
 */
export async function fetchResourceQuota(
  name: string,
  namespace: string,
  contextName?: string
): Promise<ResourceQuota | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedResourceQuota({ name, namespace })
    const quota = response

    return {
      name: quota.metadata?.name || '',
      namespace: quota.metadata?.namespace || namespace,
      age: calculateAge(quota.metadata?.creationTimestamp),
      hard: quota.status?.hard || {},
      used: quota.status?.used || {},
      labels: quota.metadata?.labels || {},
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch resource quota ${name}:`, error)
    return null
  }
}

/**
 * Fetch all limit ranges in a namespace
 */
export async function fetchLimitRanges(namespace: string, contextName?: string): Promise<LimitRange[]> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.listNamespacedLimitRange({ namespace })
    const limitRanges = response.items

    return limitRanges.map((lr) => {
      const limits: LimitRangeItem[] = (lr.spec?.limits || []).map((limit) => ({
        type: limit.type || 'Container',
        max: limit.max || undefined,
        min: limit.min || undefined,
        default: limit.default || undefined,
        defaultRequest: limit.defaultRequest || undefined,
        maxLimitRequestRatio: limit.maxLimitRequestRatio || undefined,
      }))

      return {
        name: lr.metadata?.name || '',
        namespace: lr.metadata?.namespace || namespace,
        age: calculateAge(lr.metadata?.creationTimestamp),
        limits,
        labels: lr.metadata?.labels || {},
      }
    })
  } catch (error) {
    console.error(`[K8s] Failed to fetch limit ranges in ${namespace}:`, error)
    return []
  }
}

/**
 * Fetch single limit range
 */
export async function fetchLimitRange(name: string, namespace: string, contextName?: string): Promise<LimitRange | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedLimitRange({ name, namespace })
    const lr = response

    const limits: LimitRangeItem[] = (lr.spec?.limits || []).map((limit) => ({
      type: limit.type || 'Container',
      max: limit.max || undefined,
      min: limit.min || undefined,
      default: limit.default || undefined,
      defaultRequest: limit.defaultRequest || undefined,
      maxLimitRequestRatio: limit.maxLimitRequestRatio || undefined,
    }))

    return {
      name: lr.metadata?.name || '',
      namespace: lr.metadata?.namespace || namespace,
      age: calculateAge(lr.metadata?.creationTimestamp),
      limits,
      labels: lr.metadata?.labels || {},
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch limit range ${name}:`, error)
    return null
  }
}
