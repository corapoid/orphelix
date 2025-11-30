import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import { fetchDeployments, fetchPods, fetchNodes, fetchConfigMaps, fetchSecrets, fetchHPAs, fetchPVs, fetchServices, fetchIngresses, fetchStatefulSets, fetchDaemonSets, fetchJobs, fetchCronJobs } from '@/lib/k8s/api'
import type { DashboardSummary } from '@/types/kubernetes'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_LIST_LIMIT } from '@/lib/security/rate-limit-configs'
import { namespaceSchema } from '@/lib/validation/schemas'
import { handleApiError, ValidationError } from '@/lib/api/errors'

// Create rate limiter for dashboard operations
const limiter = rateLimit(K8S_LIST_LIMIT)

/**
 * GET /api/dashboard/summary
 *
 * Retrieves dashboard summary for a namespace
 *
 * Rate Limited: 120 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const namespace = getNamespaceFromRequest(request)
    // const context = getContextFromRequest(request) // TODO: use context when API supports it

    if (!namespace) {
      throw new ValidationError('Namespace parameter is required')
    }

    // Validate namespace
    const validated = namespaceSchema.parse(namespace)

    // Fetch data in parallel
    const [deployments, pods, nodes, configMaps, secrets, hpas, pvs, services, ingresses, statefulsets, daemonsets, jobs, cronjobs] = await Promise.all([
      fetchDeployments(validated),
      fetchPods(validated),
      fetchNodes(),
      fetchConfigMaps(validated),
      fetchSecrets(validated),
      fetchHPAs(validated),
      fetchPVs(),
      fetchServices(validated),
      fetchIngresses(validated),
      fetchStatefulSets(validated),
      fetchDaemonSets(validated),
      fetchJobs(validated),
      fetchCronJobs(validated),
    ])

    // Calculate summary
    const totalDeployments = deployments.length
    const healthyDeployments = deployments.filter((d) => d.status === 'Available').length
    const totalPods = pods.length
    const runningPods = pods.filter((p) => p.status === 'Running').length
    const pendingPods = pods.filter((p) => p.status === 'Pending').length
    const failedPods = pods.filter((p) => p.status === 'Failed').length
    const totalNodes = nodes.length
    const readyNodes = nodes.filter((n) => n.status === 'Ready').length

    const summary: DashboardSummary = {
      deployments: {
        total: totalDeployments,
        healthy: healthyDeployments,
        degraded: totalDeployments - healthyDeployments,
      },
      pods: {
        total: totalPods,
        running: runningPods,
        pending: pendingPods,
        failed: failedPods,
      },
      nodes: {
        total: totalNodes,
        ready: readyNodes,
        notReady: totalNodes - readyNodes,
      },
      configMaps: configMaps.length,
      secrets: secrets.length,
      hpa: hpas.length,
      pv: {
        total: pvs.length,
        bound: pvs.filter((pv) => pv.status === 'Bound').length,
      },
      services: services.length,
      ingress: ingresses.length,
      jobs: {
        total: jobs.length,
        active: jobs.filter((j) => j.status === 'Running').length,
        succeeded: jobs.filter((j) => j.status === 'Complete').length,
        failed: jobs.filter((j) => j.status === 'Failed').length,
      },
      cronjobs: {
        total: cronjobs.length,
        active: cronjobs.filter((c) => !c.suspend).length,
        suspended: cronjobs.filter((c) => c.suspend).length,
      },
      statefulsets: {
        total: statefulsets.length,
        ready: statefulsets.filter((s) => s.replicas.ready === s.replicas.desired).length,
        notReady: statefulsets.filter((s) => s.replicas.ready !== s.replicas.desired).length,
      },
      daemonsets: {
        total: daemonsets.length,
        ready: daemonsets.filter((d) => d.ready === d.desired).length,
        notReady: daemonsets.filter((d) => d.ready !== d.desired).length,
      },
    }

    return NextResponse.json(summary)
  } catch (error) {
    return handleApiError(error)
  }
}
