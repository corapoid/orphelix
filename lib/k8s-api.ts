/**
 * Kubernetes API Functions
 *
 * This module provides functions to interact with Kubernetes resources
 * using the official @kubernetes/client-node library.
 */

import * as k8s from '@kubernetes/client-node'
import { getAppsApi, getCoreApi, getAutoscalingApi } from './k8s-client'
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
export async function fetchDeployments(namespace = 'default'): Promise<Deployment[]> {
  const appsApi = getAppsApi()
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

export async function fetchDeployment(name: string, namespace = 'default'): Promise<Deployment | null> {
  try {
    const appsApi = getAppsApi()
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
 * Pods API
 */
export async function fetchPods(namespace = 'default', labelSelector?: string): Promise<Pod[]> {
  const coreApi = getCoreApi()
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
    }
  })
}

export async function fetchPod(name: string, namespace = 'default'): Promise<Pod | null> {
  try {
    const coreApi = getCoreApi()
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
    }
  } catch (error) {
    console.error(`[K8s] Failed to fetch pod ${name}:`, error)
    return null
  }
}

export async function fetchPodLogs(
  name: string,
  namespace = 'default',
  container?: string,
  tail = 100
): Promise<string> {
  try {
    const coreApi = getCoreApi()
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
export async function fetchNodes(): Promise<Node[]> {
  const coreApi = getCoreApi()
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

export async function fetchNode(name: string): Promise<Node | null> {
  try {
    const coreApi = getCoreApi()
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

/**
 * ConfigMaps API
 */
export async function fetchConfigMaps(namespace = 'default'): Promise<ConfigMap[]> {
  const coreApi = getCoreApi()
  const response = await coreApi.listNamespacedConfigMap({ namespace })

  return response.items.map((cm) => ({
    name: cm.metadata?.name || '',
    namespace: cm.metadata?.namespace || namespace,
    data: cm.data || {},
    age: calculateAge(cm.metadata?.creationTimestamp),
    labels: cm.metadata?.labels || {},
  }))
}

export async function fetchConfigMap(name: string, namespace = 'default'): Promise<ConfigMap | null> {
  try {
    const coreApi = getCoreApi()
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
export async function fetchSecrets(namespace = 'default'): Promise<Secret[]> {
  const coreApi = getCoreApi()
  const response = await coreApi.listNamespacedSecret({ namespace })

  return response.items.map((secret) => ({
    name: secret.metadata?.name || '',
    namespace: secret.metadata?.namespace || namespace,
    type: secret.type || 'Opaque',
    keys: Object.keys(secret.data || {}),
    age: calculateAge(secret.metadata?.creationTimestamp),
    labels: secret.metadata?.labels || {},
  }))
}

export async function fetchSecret(name: string, namespace = 'default'): Promise<Secret | null> {
  try {
    const coreApi = getCoreApi()
    const response = await coreApi.readNamespacedSecret({ name, namespace })
    const secret = response

    return {
      name: secret.metadata?.name || '',
      namespace: secret.metadata?.namespace || namespace,
      type: secret.type || 'Opaque',
      keys: Object.keys(secret.data || {}),
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
export async function fetchHPAs(namespace = 'default'): Promise<HPA[]> {
  const autoscalingApi = getAutoscalingApi()
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
export async function fetchPVs(): Promise<PersistentVolume[]> {
  const coreApi = getCoreApi()
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
export async function fetchPVCs(namespace = 'default'): Promise<PersistentVolumeClaim[]> {
  const coreApi = getCoreApi()
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
export async function fetchEvents(namespace?: string): Promise<Event[]> {
  const coreApi = getCoreApi()
  const response = namespace
    ? await coreApi.listNamespacedEvent({ namespace })
    : await coreApi.listEventForAllNamespaces({})

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
}

export async function fetchResourceEvents(
  kind: string,
  name: string,
  namespace = 'default'
): Promise<Event[]> {
  const coreApi = getCoreApi()
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
}
