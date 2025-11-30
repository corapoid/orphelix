/**
 * Kubernetes StatefulSets API
 */

import * as k8s from '@kubernetes/client-node'
import { getAppsApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { StatefulSet, DeploymentStatus } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-statefulsets' })

/**
 * Helper: Extract PVC names from StatefulSet
 */
function extractPVCNames(sts: k8s.V1StatefulSet): string[] {
  const pvcTemplates = sts.spec?.volumeClaimTemplates || []
  return pvcTemplates.map((pvc) => pvc.metadata?.name || '').filter(Boolean)
}

/**
 * Helper: Extract ConfigMap names from StatefulSet
 */
function extractConfigMapNamesFromStatefulSet(sts: k8s.V1StatefulSet): string[] {
  const configMaps = new Set<string>()
  const containers = sts.spec?.template?.spec?.containers || []

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

  sts.spec?.template?.spec?.volumes?.forEach((volume) => {
    if (volume.configMap?.name) {
      configMaps.add(volume.configMap.name)
    }
  })

  return Array.from(configMaps)
}

/**
 * Helper: Extract Secret names from StatefulSet
 */
function extractSecretNamesFromStatefulSet(sts: k8s.V1StatefulSet): string[] {
  const secrets = new Set<string>()
  const containers = sts.spec?.template?.spec?.containers || []

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

  sts.spec?.template?.spec?.volumes?.forEach((volume) => {
    if (volume.secret?.secretName) {
      secrets.add(volume.secret.secretName)
    }
  })

  sts.spec?.template?.spec?.imagePullSecrets?.forEach((secret) => {
    if (secret.name) {
      secrets.add(secret.name)
    }
  })

  return Array.from(secrets)
}

/**
 * Fetch all statefulsets in a namespace
 */
export async function fetchStatefulSets(namespace: string, contextName?: string): Promise<StatefulSet[]> {
  try {
    const appsApi = getAppsApi(contextName)
    const response = await appsApi.listNamespacedStatefulSet({ namespace })

    return response.items.map((sts) => {
      const readyReplicas = sts.status?.readyReplicas || 0
      const desired = sts.spec?.replicas || 0

      let status: DeploymentStatus = 'Available'
      if (readyReplicas < desired) {
        status = 'Progressing'
      }
      if (readyReplicas === 0 && desired > 0) {
        status = 'Degraded'
      }

      return {
        name: sts.metadata?.name || '',
        namespace: sts.metadata?.namespace || namespace,
        replicas: {
          desired,
          ready: readyReplicas,
          current: sts.status?.currentReplicas || 0,
          updated: sts.status?.updatedReplicas || 0,
        },
        status,
        age: calculateAge(sts.metadata?.creationTimestamp),
        labels: sts.metadata?.labels || {},
        selector: sts.spec?.selector?.matchLabels || {},
        serviceName: sts.spec?.serviceName || '',
        updateStrategy: sts.spec?.updateStrategy?.type || 'RollingUpdate',
        podManagementPolicy: sts.spec?.podManagementPolicy || 'OrderedReady',
        persistentVolumeClaims: extractPVCNames(sts),
        configMaps: extractConfigMapNamesFromStatefulSet(sts),
        secrets: extractSecretNamesFromStatefulSet(sts),
      }
    })
  } catch (error) {
    logger.error(
      { error, namespace, context: contextName },
      'Failed to fetch statefulsets'
    )
    return []
  }
}

/**
 * Fetch a single statefulset by name
 */
export async function fetchStatefulSet(
  name: string,
  namespace: string,
  contextName?: string
): Promise<StatefulSet | null> {
  try {
    const appsApi = getAppsApi(contextName)
    const response = await appsApi.readNamespacedStatefulSet({ name, namespace })
    const sts = response

    const readyReplicas = sts.status?.readyReplicas || 0
    const desired = sts.spec?.replicas || 0

    let status: DeploymentStatus = 'Available'
    if (readyReplicas < desired) {
      status = 'Progressing'
    }
    if (readyReplicas === 0 && desired > 0) {
      status = 'Degraded'
    }

    return {
      name: sts.metadata?.name || name,
      namespace: sts.metadata?.namespace || namespace,
      replicas: {
        desired,
        ready: readyReplicas,
        current: sts.status?.currentReplicas || 0,
        updated: sts.status?.updatedReplicas || 0,
      },
      status,
      age: calculateAge(sts.metadata?.creationTimestamp),
      labels: sts.metadata?.labels || {},
      selector: sts.spec?.selector?.matchLabels || {},
      serviceName: sts.spec?.serviceName || '',
      updateStrategy: sts.spec?.updateStrategy?.type || 'RollingUpdate',
      podManagementPolicy: sts.spec?.podManagementPolicy || 'OrderedReady',
      persistentVolumeClaims: extractPVCNames(sts),
      configMaps: extractConfigMapNamesFromStatefulSet(sts),
      secrets: extractSecretNamesFromStatefulSet(sts),
    }
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch statefulset'
    )
    return null
  }
}
