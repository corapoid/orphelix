/**
 * Kubernetes Events API
 */

import { getCoreApi } from '../client'
import { createLogger } from '@/lib/logging/logger'
import type { Event } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-events' })

/**
 * Fetch all events (optionally filtered by namespace and time range)
 */
export async function fetchEvents(
  namespace?: string,
  contextName?: string,
  timeRangeHours = 24
): Promise<Event[]> {
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

/**
 * Fetch events for a specific resource
 */
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
  } catch (error: unknown) {
    // Silently handle 403 (permission denied) - just return empty array
    const errorCode = (error as { code?: number })?.code
    if (errorCode !== 403) {
      logger.error(
        { error, kind, name, namespace, context: contextName },
        'Failed to fetch resource events'
      )
    }
    return []
  }
}
