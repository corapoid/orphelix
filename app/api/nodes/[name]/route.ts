/**
 * Node Details API
 * GET /api/nodes/[name] - Get node details including instance type, capacity, conditions
 */

import { NextRequest, NextResponse } from 'next/server'
import { getKubernetesClient } from '@/lib/kubernetes/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const k8sClient = getKubernetesClient()
    const coreApi = k8sClient.coreV1Api

    console.log('[API] Fetching node details for:', name)

    const response = await coreApi.readNode(name)
    const node = response.body

    // Extract useful information
    const nodeInfo = {
      name: node.metadata?.name,
      labels: node.metadata?.labels || {},
      annotations: node.metadata?.annotations || {},
      creationTimestamp: node.metadata?.creationTimestamp,

      // Node specifications
      podCIDR: node.spec?.podCIDR,
      podCIDRs: node.spec?.podCIDRs,
      providerID: node.spec?.providerID,
      unschedulable: node.spec?.unschedulable || false,
      taints: node.spec?.taints || [],

      // Node status
      addresses: node.status?.addresses || [],
      allocatable: node.status?.allocatable || {},
      capacity: node.status?.capacity || {},
      conditions: node.status?.conditions || [],
      nodeInfo: node.status?.nodeInfo,

      // Computed fields
      instanceType: node.metadata?.labels?.['node.kubernetes.io/instance-type'] ||
                    node.metadata?.labels?.['beta.kubernetes.io/instance-type'] ||
                    'unknown',
      zone: node.metadata?.labels?.['topology.kubernetes.io/zone'] ||
            node.metadata?.labels?.['failure-domain.beta.kubernetes.io/zone'] ||
            'unknown',
      region: node.metadata?.labels?.['topology.kubernetes.io/region'] ||
              node.metadata?.labels?.['failure-domain.beta.kubernetes.io/region'] ||
              'unknown',

      // Ready status
      ready: node.status?.conditions?.find((c: any) => c.type === 'Ready')?.status === 'True',
    }

    return NextResponse.json(nodeInfo)
  } catch (error: any) {
    console.error('[API] Failed to fetch node details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch node details', details: error.message },
      { status: error.statusCode || 500 }
    )
  }
}
