/**
 * Kubernetes DaemonSets API
 */

import * as k8s from '@kubernetes/client-node'
import { getAppsApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { DaemonSet, DeploymentStatus } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-daemonsets' })

/**
 * Helper: Get DaemonSet status
 */
function getDaemonSetStatus(status: k8s.V1DaemonSetStatus | undefined): DeploymentStatus {
  if (!status) return 'Unknown'

  const desired = status.desiredNumberScheduled || 0
  const ready = status.numberReady || 0
  const available = status.numberAvailable || 0

  if (ready === 0) return 'Not Ready'
  if (ready < desired) return 'Degraded'
  if (available === desired && ready === desired) return 'Healthy'

  return 'Unknown'
}

/**
 * Helper: Extract ConfigMap names from DaemonSet
 */
function extractConfigMapNamesFromDaemonSet(ds: k8s.V1DaemonSet): string[] {
  const configMaps = new Set<string>()
  const containers = ds.spec?.template?.spec?.containers || []

  containers.forEach((container) => {
    container.envFrom?.forEach((envFrom) => {
      if (envFrom.configMapRef?.name) {
        configMaps.add(envFrom.configMapRef.name)
      }
    })
    container.env?.forEach((env) => {
      if (env.valueFrom?.configMapKeyRef?.name) {
        configMaps.add(env.valueFrom.configMapKeyRef.name)
      }
    })
  })

  ds.spec?.template?.spec?.volumes?.forEach((volume) => {
    if (volume.configMap?.name) {
      configMaps.add(volume.configMap.name)
    }
  })

  return Array.from(configMaps)
}

/**
 * Helper: Extract Secret names from DaemonSet
 */
function extractSecretNamesFromDaemonSet(ds: k8s.V1DaemonSet): string[] {
  const secrets = new Set<string>()
  const containers = ds.spec?.template?.spec?.containers || []

  containers.forEach((container) => {
    container.envFrom?.forEach((envFrom) => {
      if (envFrom.secretRef?.name) {
        secrets.add(envFrom.secretRef.name)
      }
    })
    container.env?.forEach((env) => {
      if (env.valueFrom?.secretKeyRef?.name) {
        secrets.add(env.valueFrom.secretKeyRef.name)
      }
    })
  })

  ds.spec?.template?.spec?.volumes?.forEach((volume) => {
    if (volume.secret?.secretName) {
      secrets.add(volume.secret.secretName)
    }
  })

  ds.spec?.template?.spec?.imagePullSecrets?.forEach((secret) => {
    if (secret.name) {
      secrets.add(secret.name)
    }
  })

  return Array.from(secrets)
}

/**
 * Fetch all daemonsets in a namespace
 */
export async function fetchDaemonSets(namespace: string, contextName?: string): Promise<DaemonSet[]> {
  try {
    const appsApi = getAppsApi(contextName)
    const response = await appsApi.listNamespacedDaemonSet({ namespace })

    return response.items.map((ds) => ({
      name: ds.metadata?.name || '',
      namespace: ds.metadata?.namespace || namespace,
      desired: ds.status?.desiredNumberScheduled || 0,
      current: ds.status?.currentNumberScheduled || 0,
      ready: ds.status?.numberReady || 0,
      upToDate: ds.status?.updatedNumberScheduled || 0,
      available: ds.status?.numberAvailable || 0,
      status: getDaemonSetStatus(ds.status),
      age: calculateAge(ds.metadata?.creationTimestamp),
      labels: ds.metadata?.labels || {},
      selector: ds.spec?.selector?.matchLabels || {},
      updateStrategy: ds.spec?.updateStrategy?.type || 'RollingUpdate',
      configMaps: extractConfigMapNamesFromDaemonSet(ds),
      secrets: extractSecretNamesFromDaemonSet(ds),
    }))
  } catch (error) {
    logger.error(
      { error, namespace, context: contextName },
      'Failed to fetch daemonsets'
    )
    return []
  }
}

/**
 * Fetch a single daemonset by name
 */
export async function fetchDaemonSet(
  name: string,
  namespace: string,
  contextName?: string
): Promise<DaemonSet | null> {
  try {
    const appsApi = getAppsApi(contextName)
    const response = await appsApi.readNamespacedDaemonSet({ name, namespace })
    const ds = response

    return {
      name: ds.metadata?.name || name,
      namespace: ds.metadata?.namespace || namespace,
      desired: ds.status?.desiredNumberScheduled || 0,
      current: ds.status?.currentNumberScheduled || 0,
      ready: ds.status?.numberReady || 0,
      upToDate: ds.status?.updatedNumberScheduled || 0,
      available: ds.status?.numberAvailable || 0,
      status: getDaemonSetStatus(ds.status),
      age: calculateAge(ds.metadata?.creationTimestamp),
      labels: ds.metadata?.labels || {},
      selector: ds.spec?.selector?.matchLabels || {},
      updateStrategy: ds.spec?.updateStrategy?.type || 'RollingUpdate',
      configMaps: extractConfigMapNamesFromDaemonSet(ds),
      secrets: extractSecretNamesFromDaemonSet(ds),
    }
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch daemonset'
    )
    return null
  }
}
