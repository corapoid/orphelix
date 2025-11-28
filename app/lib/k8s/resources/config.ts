/**
 * Kubernetes ConfigMaps and Secrets API
 */

import { getCoreApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { ConfigMap, Secret } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-config' })

/**
 * Fetch all configmaps in a namespace
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

/**
 * Fetch a single configmap by name
 */
export async function fetchConfigMap(
  name: string,
  namespace: string,
  contextName?: string
): Promise<ConfigMap | null> {
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
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch configmap'
    )
    return null
  }
}

/**
 * Fetch configmap as raw YAML string
 */
export async function fetchConfigMapYaml(
  name: string,
  namespace: string,
  contextName?: string
): Promise<string | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedConfigMap({ name, namespace })

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const yaml = require('js-yaml')
    const yamlString = yaml.dump(response, { noRefs: true, sortKeys: true })

    return yamlString
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch configmap YAML'
    )
    return null
  }
}

/**
 * Fetch all secrets in a namespace
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

/**
 * Fetch a single secret by name
 */
export async function fetchSecret(
  name: string,
  namespace: string,
  contextName?: string
): Promise<Secret | null> {
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
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch secret'
    )
    return null
  }
}

/**
 * Fetch secret as raw YAML string
 */
export async function fetchSecretYaml(
  name: string,
  namespace: string,
  contextName?: string
): Promise<string | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedSecret({ name, namespace })

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const yaml = require('js-yaml')
    const yamlString = yaml.dump(response, { noRefs: true, sortKeys: true })

    return yamlString
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch secret YAML'
    )
    return null
  }
}
