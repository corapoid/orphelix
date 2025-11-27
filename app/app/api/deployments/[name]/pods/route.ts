import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import { getCoreApi } from '@/lib/k8s/client'
import type { Pod, PodStatus } from '@/types/kubernetes'
import type { V1Pod } from '@kubernetes/client-node'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const coreV1Api = getCoreApi()

    // Fetch all pods in namespace
    const podsResponse = await coreV1Api.listNamespacedPod({ namespace })

    // Filter pods that belong to this deployment
    const deploymentPods = (podsResponse.items || [])
      .filter((pod: V1Pod) => {
        // Check owner references for ReplicaSet owned by this deployment
        const hasMatchingOwner = pod.metadata?.ownerReferences?.some((ref) => {
          return ref.kind === 'ReplicaSet' && ref.name.startsWith(name + '-')
        })

        // Also check labels as fallback
        const hasMatchingLabel = pod.metadata?.labels?.app === name ||
                                 pod.metadata?.labels?.['app.kubernetes.io/name'] === name

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
    console.error('[API] Failed to fetch pods for deployment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deployment pods' },
      { status: 500 }
    )
  }
}
