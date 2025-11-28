import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import { getCoreApi } from '@/lib/k8s/client'
import type { Pod, PodStatus } from '@/types/kubernetes'
import type { V1Pod } from '@kubernetes/client-node'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sResourceDetailSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

export const dynamic = 'force-dynamic'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/deployments/[name]/pods
 *
 * Retrieves pods for a specific deployment
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { name } = await params
    const namespace = getNamespaceFromRequest(request)

    // Validate input
    const validated = k8sResourceDetailSchema.parse({ name, namespace })

    const coreV1Api = getCoreApi()

    // Fetch all pods in namespace
    const podsResponse = await coreV1Api.listNamespacedPod({ namespace: validated.namespace })

    // Filter pods that belong to this deployment
    const deploymentPods = (podsResponse.items || [])
      .filter((pod: V1Pod) => {
        // Check owner references for ReplicaSet owned by this deployment
        const hasMatchingOwner = pod.metadata?.ownerReferences?.some((ref) => {
          return ref.kind === 'ReplicaSet' && ref.name.startsWith(validated.name + '-')
        })

        // Also check labels as fallback
        const hasMatchingLabel = pod.metadata?.labels?.app === validated.name ||
                                 pod.metadata?.labels?.['app.kubernetes.io/name'] === validated.name

        return hasMatchingOwner || hasMatchingLabel
      })
      .map((pod: V1Pod): Pod => {
        const containers = pod.spec?.containers || []
        const containerStatuses = pod.status?.containerStatuses || []

        return {
          name: pod.metadata?.name || '',
          namespace: pod.metadata?.namespace || '',
          status: (pod.status?.phase as PodStatus) || 'Unknown',
          restartCount: containerStatuses.reduce((sum, c) => sum + (c.restartCount || 0), 0),
          age: pod.metadata?.creationTimestamp?.toISOString() || '',
          nodeName: pod.spec?.nodeName || 'N/A',
          ip: pod.status?.podIP || 'N/A',
          containers: containers.map((c, idx) => ({
            name: c.name || '',
            image: c.image || '',
            ready: containerStatuses[idx]?.ready || false,
            restartCount: containerStatuses[idx]?.restartCount || 0,
          })),
          labels: pod.metadata?.labels || {},
          ownerReferences: pod.metadata?.ownerReferences?.map((ref) => ({
            kind: ref.kind || '',
            name: ref.name || '',
            uid: ref.uid || '',
          })) || [],
          configMaps: [],
          secrets: [],
        }
      })

    return NextResponse.json(deploymentPods)
  } catch (error) {
    return handleApiError(error)
  }
}
