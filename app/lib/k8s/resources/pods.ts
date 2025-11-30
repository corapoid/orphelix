/**
 * Kubernetes Pods API
 */

import * as k8s from '@kubernetes/client-node'
import { getCoreApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { Pod, PodStatus, Probe } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-pods' })

interface ProbeConfig {
  initialDelaySeconds?: number
  periodSeconds?: number
  timeoutSeconds?: number
  successThreshold?: number
  failureThreshold?: number
  type?: 'httpGet' | 'tcpSocket' | 'exec' | 'grpc'
  httpGet?: {
    path: string
    port: number | string
    scheme?: string
  }
  tcpSocket?: {
    port: number | string
  }
  exec?: {
    command: string[]
  }
}

interface K8sProbe {
  initialDelaySeconds?: number
  periodSeconds?: number
  timeoutSeconds?: number
  successThreshold?: number
  failureThreshold?: number
  httpGet?: {
    path?: string
    port?: number | string
    scheme?: string
  }
  tcpSocket?: {
    port?: number | string
  }
  exec?: {
    command?: string[]
  }
  grpc?: {
    port?: number
    service?: string
  }
}

/**
 * Helper: Parse probe configuration
 */
function parseProbe(probe: K8sProbe | undefined): ProbeConfig | undefined {
  if (!probe) return undefined

  const result: ProbeConfig = {
    initialDelaySeconds: probe.initialDelaySeconds,
    periodSeconds: probe.periodSeconds,
    timeoutSeconds: probe.timeoutSeconds,
    successThreshold: probe.successThreshold,
    failureThreshold: probe.failureThreshold,
  }

  if (probe.httpGet) {
    result.type = 'httpGet'
    result.httpGet = {
      path: probe.httpGet.path || '/',
      port: probe.httpGet.port as string | number,
      scheme: probe.httpGet.scheme || 'HTTP',
    }
  } else if (probe.tcpSocket) {
    result.type = 'tcpSocket'
    result.tcpSocket = {
      port: probe.tcpSocket.port as string | number,
    }
  } else if (probe.exec) {
    result.type = 'exec'
    result.exec = {
      command: probe.exec.command || [],
    }
  } else if (probe.grpc) {
    result.type = 'grpc'
  }

  return result
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
 * Fetch all pods in a namespace
 */
export async function fetchPods(
  namespace: string,
  contextName?: string,
  labelSelector?: string
): Promise<Pod[]> {
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

/**
 * Fetch a single pod by name
 */
export async function fetchPod(
  name: string,
  namespace: string,
  contextName?: string
): Promise<Pod | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedPod({ name, namespace })
    const pod = response

    const containerStatuses = pod.status?.containerStatuses || []
    const containerSpecs = pod.spec?.containers || []
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
      containers: containerSpecs.map((spec) => ({
        name: spec.name,
        image: spec.image || '',
        ready: containerStatuses.find((cs) => cs.name === spec.name)?.ready || false,
        restartCount: containerStatuses.find((cs) => cs.name === spec.name)?.restartCount || 0,
        livenessProbe: parseProbe(spec.livenessProbe) as Probe | undefined,
        readinessProbe: parseProbe(spec.readinessProbe) as Probe | undefined,
        startupProbe: parseProbe(spec.startupProbe) as Probe | undefined,
      })),
      containerStatuses: containerStatuses.map((cs) => ({
        name: cs.name,
        ready: cs.ready || false,
        restartCount: cs.restartCount || 0,
        state: {
          waiting: cs.state?.waiting ? {
            reason: cs.state.waiting.reason || '',
            message: cs.state.waiting.message,
          } : undefined,
          running: cs.state?.running ? {
            startedAt: cs.state.running.startedAt?.toISOString() || '',
          } : undefined,
          terminated: cs.state?.terminated ? {
            exitCode: cs.state.terminated.exitCode || 0,
            reason: cs.state.terminated.reason || '',
            message: cs.state.terminated.message,
            startedAt: cs.state.terminated.startedAt?.toISOString() || '',
            finishedAt: cs.state.terminated.finishedAt?.toISOString() || '',
          } : undefined,
        },
        lastState: cs.lastState ? {
          waiting: cs.lastState.waiting ? {
            reason: cs.lastState.waiting.reason || '',
            message: cs.lastState.waiting.message,
          } : undefined,
          running: cs.lastState.running ? {
            startedAt: cs.lastState.running.startedAt?.toISOString() || '',
          } : undefined,
          terminated: cs.lastState.terminated ? {
            exitCode: cs.lastState.terminated.exitCode || 0,
            reason: cs.lastState.terminated.reason || '',
            message: cs.lastState.terminated.message,
            startedAt: cs.lastState.terminated.startedAt?.toISOString() || '',
            finishedAt: cs.lastState.terminated.finishedAt?.toISOString() || '',
          } : undefined,
        } : undefined,
      })),
      configMaps: extractConfigMapNamesFromPod(pod),
      secrets: extractSecretNamesFromPod(pod),
    }
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch pod'
    )
    return null
  }
}

/**
 * Fetch pod logs
 */
export async function fetchPodLogs(
  name: string,
  namespace: string,
  contextName?: string,
  container?: string,
  tail = 100,
  previous = false
): Promise<string> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedPodLog({
      name,
      namespace,
      container,
      tailLines: tail,
      previous,
      timestamps: true,
    })
    return response
  } catch (error) {
    logger.error(
      { error, name, namespace, container, context: contextName },
      'Failed to fetch pod logs'
    )
    throw error
  }
}

/**
 * Fetch pods on a specific node
 */
export async function fetchNodePods(
  nodeName: string,
  namespace?: string,
  contextName?: string
): Promise<Pod[]> {
  try {
    const coreApi = getCoreApi(contextName)

    // If no namespace provided, we can't list pods (no cluster-level permission)
    if (!namespace) {
      logger.warn(
        { node: nodeName },
        'Cannot fetch node pods without namespace (no cluster-level permission)'
      )
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
  } catch (error: unknown) {
    // Silently handle 403 (permission denied) - just return empty array
    const errorCode = (error as { code?: number })?.code
    if (errorCode !== 403) {
      logger.error(
        { error, node: nodeName, namespace, context: contextName },
        'Failed to fetch pods for node'
      )
    }
    return []
  }
}
