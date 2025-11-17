/**
 * AI Context Collector
 *
 * Collects relevant Kubernetes context for AI troubleshooting analysis
 */

import type { Event, Pod, Deployment } from '@/types/kubernetes'

export interface TroubleshootingContext {
  resource?: {
    type: string
    name: string
    namespace: string
    status?: string
    data?: Record<string, unknown>
  }
  events?: Array<{
    type: string
    reason: string
    message: string
    count: number
  }>
  logs?: string[]
  metrics?: {
    cpu?: string
    memory?: string
  }
}

/**
 * Collect context for a deployment
 */
export async function collectDeploymentContext(
  deployment: Deployment,
  namespace: string
): Promise<TroubleshootingContext> {
  const context: TroubleshootingContext = {
    resource: {
      type: 'Deployment',
      name: deployment.name,
      namespace,
      status: deployment.status,
      data: {
        replicas: deployment.replicas,
        strategy: deployment.strategy,
        labels: deployment.labels,
        age: deployment.age,
      },
    },
  }

  // Fetch related events
  try {
    const eventsRes = await fetch(
      `/api/deployments/${encodeURIComponent(deployment.name)}/events?namespace=${namespace}`
    )
    if (eventsRes.ok) {
      const events: Event[] = await eventsRes.json()
      context.events = events.slice(0, 10).map(e => ({
        type: e.type,
        reason: e.reason,
        message: e.message,
        count: e.count,
      }))
    }
  } catch (error) {
    console.warn('Failed to fetch deployment events:', error)
  }

  return context
}

/**
 * Collect context for a pod
 */
export async function collectPodContext(
  pod: Pod,
  namespace: string,
  containerName?: string
): Promise<TroubleshootingContext> {
  const context: TroubleshootingContext = {
    resource: {
      type: 'Pod',
      name: pod.name,
      namespace,
      status: pod.status,
      data: {
        phase: pod.status,
        nodeName: pod.nodeName,
        ip: pod.ip,
        restartCount: pod.restartCount,
        containers: pod.containers,
        age: pod.age,
      },
    },
  }

  // Fetch related events
  try {
    const eventsRes = await fetch(
      `/api/pods/${encodeURIComponent(pod.name)}/events?namespace=${namespace}`
    )
    if (eventsRes.ok) {
      const events: Event[] = await eventsRes.json()
      context.events = events.slice(0, 10).map(e => ({
        type: e.type,
        reason: e.reason,
        message: e.message,
        count: e.count,
      }))
    }
  } catch (error) {
    console.warn('Failed to fetch pod events:', error)
  }

  // Fetch logs
  if (containerName || pod.containers.length > 0) {
    const container = containerName || pod.containers[0]
    try {
      const logsRes = await fetch(
        `/api/pods/${encodeURIComponent(pod.name)}/logs?namespace=${namespace}&container=${container}&tail=50`
      )
      if (logsRes.ok) {
        const logsText = await logsRes.text()
        context.logs = logsText.split('\n').filter(Boolean).slice(-20)
      }
    } catch (error) {
      console.warn('Failed to fetch pod logs:', error)
    }
  }

  return context
}

/**
 * Detect common issues from events
 */
export function detectIssuesFromEvents(events: Event[]): string[] {
  const issues: string[] = []
  const issuePatterns = [
    {
      pattern: /crashloopbackoff|backoff/i,
      issue: 'Pod is in CrashLoopBackOff - container is repeatedly crashing',
    },
    {
      pattern: /imagepullbackoff|errimagepull/i,
      issue: 'Cannot pull container image - check image name and registry access',
    },
    {
      pattern: /oomkilled|out of memory/i,
      issue: 'Container killed due to Out Of Memory - increase memory limits',
    },
    {
      pattern: /insufficient (cpu|memory)/i,
      issue: 'Insufficient resources - cluster may be overcommitted',
    },
    {
      pattern: /failed scheduling/i,
      issue: 'Pod cannot be scheduled - check node resources and constraints',
    },
    {
      pattern: /liveness probe failed|readiness probe failed/i,
      issue: 'Health probe failing - application may not be responding correctly',
    },
  ]

  events.forEach(event => {
    const text = `${event.reason} ${event.message}`.toLowerCase()
    issuePatterns.forEach(({ pattern, issue }) => {
      if (pattern.test(text) && !issues.includes(issue)) {
        issues.push(issue)
      }
    })
  })

  return issues
}

/**
 * Analyze resource metrics for issues
 */
export function analyzeResourceMetrics(metrics: {
  cpu?: string
  memory?: string
}): string[] {
  const issues: string[] = []

  if (metrics.cpu) {
    const cpuMatch = metrics.cpu.match(/(\d+)%/)
    if (cpuMatch) {
      const cpuPercent = parseInt(cpuMatch[1])
      if (cpuPercent > 90) {
        issues.push('CPU usage is critically high (>90%)')
      } else if (cpuPercent > 75) {
        issues.push('CPU usage is elevated (>75%)')
      }
    }
  }

  if (metrics.memory) {
    const memMatch = metrics.memory.match(/(\d+)%/)
    if (memMatch) {
      const memPercent = parseInt(memMatch[1])
      if (memPercent > 90) {
        issues.push('Memory usage is critically high (>90%) - risk of OOM')
      } else if (memPercent > 75) {
        issues.push('Memory usage is elevated (>75%)')
      }
    }
  }

  return issues
}
