/**
 * Kubernetes Labels and Resource Search API
 */

import { createLogger } from '@/lib/logging/logger'
import type { ResourceWithLabels, LabelGroup } from '@/types/kubernetes'

// Import resource fetching functions
import { fetchDeployments } from './deployments'
import { fetchStatefulSets } from './statefulsets'
import { fetchDaemonSets } from './daemonsets'
import { fetchPods } from './pods'
import { fetchServices } from './networking'
import { fetchConfigMaps, fetchSecrets } from './config'
import { fetchJobs, fetchCronJobs } from './workloads'
import { fetchIngresses } from './networking'

const logger = createLogger({ module: 'k8s-labels' })

/**
 * Fetch all resources with labels from a namespace
 */
export async function fetchResourcesWithLabels(
  namespace: string,
  contextName?: string
): Promise<ResourceWithLabels[]> {
  try {
    const resources: ResourceWithLabels[] = []

    // Fetch all resource types in parallel
    const [
      deployments,
      statefulsets,
      daemonsets,
      pods,
      services,
      configmaps,
      secrets,
      jobs,
      cronjobs,
      ingresses,
    ] = await Promise.all([
      fetchDeployments(namespace, contextName),
      fetchStatefulSets(namespace, contextName),
      fetchDaemonSets(namespace, contextName),
      fetchPods(namespace, contextName),
      fetchServices(namespace, contextName),
      fetchConfigMaps(namespace, contextName),
      fetchSecrets(namespace, contextName),
      fetchJobs(namespace, contextName),
      fetchCronJobs(namespace, contextName),
      fetchIngresses(namespace, contextName),
    ])

    // Convert each resource type to ResourceWithLabels
    deployments.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'Deployment',
        labels: r.labels,
        annotations: {},
      })
    })

    statefulsets.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'StatefulSet',
        labels: r.labels,
        annotations: {},
      })
    })

    daemonsets.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'DaemonSet',
        labels: r.labels,
        annotations: {},
      })
    })

    pods.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'Pod',
        labels: r.labels,
        annotations: {},
      })
    })

    services.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'Service',
        labels: r.labels,
        annotations: {},
      })
    })

    configmaps.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'ConfigMap',
        labels: r.labels,
        annotations: {},
      })
    })

    secrets.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'Secret',
        labels: r.labels,
        annotations: {},
      })
    })

    jobs.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'Job',
        labels: r.labels,
        annotations: {},
      })
    })

    cronjobs.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'CronJob',
        labels: r.labels,
        annotations: {},
      })
    })

    ingresses.forEach((r) => {
      resources.push({
        name: r.name,
        namespace: r.namespace,
        kind: 'Ingress',
        labels: r.labels,
        annotations: {},
      })
    })

    return resources
  } catch (error) {
    logger.error(
      { error, namespace, context: contextName },
      'Failed to fetch resources with labels'
    )
    return []
  }
}

/**
 * Index all labels from resources
 */
export function indexLabels(resources: ResourceWithLabels[]): LabelGroup[] {
  const labelMap = new Map<string, Map<string, { count: number; resourceTypes: Set<string> }>>()

  // Index all labels
  resources.forEach((resource) => {
    Object.entries(resource.labels).forEach(([key, value]) => {
      if (!labelMap.has(key)) {
        labelMap.set(key, new Map())
      }

      const valueMap = labelMap.get(key)!
      if (!valueMap.has(value)) {
        valueMap.set(value, { count: 0, resourceTypes: new Set() })
      }

      const entry = valueMap.get(value)!
      entry.count++
      entry.resourceTypes.add(resource.kind)
    })
  })

  // Convert to LabelGroup array
  const labelGroups: LabelGroup[] = []
  labelMap.forEach((valueMap, key) => {
    const values: Array<{ value: string; count: number }> = []
    let totalCount = 0
    const resourceTypes = new Set<string>()

    valueMap.forEach((entry, value) => {
      values.push({ value, count: entry.count })
      totalCount += entry.count
      entry.resourceTypes.forEach((type) => resourceTypes.add(type))
    })

    // Sort values by count descending
    values.sort((a, b) => b.count - a.count)

    labelGroups.push({
      key,
      values,
      totalCount,
      resourceTypes: Array.from(resourceTypes),
    })
  })

  // Sort label groups by totalCount descending
  labelGroups.sort((a, b) => b.totalCount - a.totalCount)

  return labelGroups
}

/**
 * Search resources by label selector
 * Supports syntax: key=value, key!=value, key, !key
 */
export function searchByLabelSelector(
  resources: ResourceWithLabels[],
  selector: string
): ResourceWithLabels[] {
  if (!selector.trim()) {
    return resources
  }

  // Parse selector (simple implementation for common cases)
  const selectors = selector.split(',').map((s) => s.trim())

  return resources.filter((resource) => {
    return selectors.every((sel) => {
      // key=value
      if (sel.includes('=') && !sel.includes('!=')) {
        const [key, value] = sel.split('=').map((s) => s.trim())
        return resource.labels[key] === value
      }

      // key!=value
      if (sel.includes('!=')) {
        const [key, value] = sel.split('!=').map((s) => s.trim())
        return resource.labels[key] !== value
      }

      // !key (label not present)
      if (sel.startsWith('!')) {
        const key = sel.substring(1).trim()
        return !(key in resource.labels)
      }

      // key (label present)
      return sel in resource.labels
    })
  })
}
