/**
 * Kubernetes Namespaces, Resource Quotas, and Limit Ranges API
 */

import { getCoreApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { Namespace, NamespaceStatus, ResourceQuota, LimitRange, LimitRangeItem } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-namespaces' })

/**
 * Timeout wrapper for API calls
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Request timeout after ${timeoutMs}ms`)), timeoutMs)
    ),
  ])
}

/**
 * Fetch all namespaces
 */
export async function fetchNamespaces(contextName?: string): Promise<Namespace[]> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await withTimeout(coreApi.listNamespace(), 10000)
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
    logger.error(
      { error, context: contextName },
      'Failed to fetch namespaces'
    )
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
    logger.error(
      { error, name, context: contextName },
      'Failed to fetch namespace'
    )
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
  } catch (error: unknown) {
    // Silently return empty array for 403 (permission denied)
    // This is expected for users with namespace-scoped permissions
    const errorObj = error as { statusCode?: number; code?: number }
    if (errorObj?.statusCode === 403 || errorObj?.code === 403) {
      return []
    }
    // Re-throw other errors to be handled by the API route
    throw error
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
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch resource quota'
    )
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
        default: limit._default || undefined,
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
  } catch (error: unknown) {
    // Silently return empty array for 403 (permission denied)
    // This is expected for users with namespace-scoped permissions
    const errorObj = error as { statusCode?: number; code?: number }
    if (errorObj?.statusCode === 403 || errorObj?.code === 403) {
      return []
    }
    // Re-throw other errors to be handled by the API route
    throw error
  }
}

/**
 * Fetch single limit range
 */
export async function fetchLimitRange(
  name: string,
  namespace: string,
  contextName?: string
): Promise<LimitRange | null> {
  try {
    const coreApi = getCoreApi(contextName)
    const response = await coreApi.readNamespacedLimitRange({ name, namespace })
    const lr = response

    const limits: LimitRangeItem[] = (lr.spec?.limits || []).map((limit) => ({
      type: limit.type || 'Container',
      max: limit.max || undefined,
      min: limit.min || undefined,
      default: limit._default || undefined,
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
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch limit range'
    )
    return null
  }
}
