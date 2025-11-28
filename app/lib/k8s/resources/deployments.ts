/**
 * Kubernetes Deployments API
 *
 * Functions for fetching and managing Kubernetes Deployments
 */

import * as k8s from '@kubernetes/client-node'
import { getAppsApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { Deployment, DeploymentStatus } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-deployments' })

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
 * Fetch all deployments in a namespace
 */
export async function fetchDeployments(
  namespace: string,
  contextName?: string
): Promise<Deployment[]> {
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

/**
 * Fetch a single deployment by name
 */
export async function fetchDeployment(
  name: string,
  namespace: string,
  contextName?: string
): Promise<Deployment | null> {
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
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch deployment'
    )
    return null
  }
}

/**
 * Fetch deployment as raw YAML string
 */
export async function fetchDeploymentYaml(
  name: string,
  namespace: string,
  contextName?: string
): Promise<string | null> {
  try {
    const appsApi = getAppsApi(contextName)
    const response = await appsApi.readNamespacedDeployment({ name, namespace })

    // Convert to YAML using js-yaml
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const yaml = require('js-yaml')
    const yamlString = yaml.dump(response, { noRefs: true, sortKeys: true })

    return yamlString
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch deployment YAML'
    )
    return null
  }
}
