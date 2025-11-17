import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import { fetchDeployments, fetchPods, fetchNodes, fetchConfigMaps, fetchSecrets, fetchHPAs, fetchPVs, fetchServices, fetchIngresses, fetchStatefulSets, fetchDaemonSets, fetchJobs, fetchCronJobs } from '@/lib/k8s/api'
import type { DashboardSummary } from '@/types/kubernetes'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)
    // const context = getContextFromRequest(request) // TODO: use context when API supports it

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    // Fetch data in parallel
    const [deployments, pods, nodes, configMaps, secrets, hpas, pvs, services, ingresses, statefulsets, daemonsets, jobs, cronjobs] = await Promise.all([
      fetchDeployments(namespace),
      fetchPods(namespace),
      fetchNodes(),
      fetchConfigMaps(namespace),
      fetchSecrets(namespace),
      fetchHPAs(namespace),
      fetchPVs(),
      fetchServices(namespace),
      fetchIngresses(namespace),
      fetchStatefulSets(namespace),
      fetchDaemonSets(namespace),
      fetchJobs(namespace),
      fetchCronJobs(namespace),
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
        ready: daemonsets.filter((d) => d.numberReady === d.desiredNumberScheduled).length,
        notReady: daemonsets.filter((d) => d.numberReady !== d.desiredNumberScheduled).length,
      },
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error('[API] Failed to fetch dashboard summary:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard summary' },
      { status: 500 }
    )
  }
}
