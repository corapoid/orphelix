import { NextRequest, NextResponse } from 'next/server'
import { getCoreApi, initK8sClient } from '@/lib/k8s-client'

/**
 * POST /api/pods/[name]/restart
 *
 * Restarts a pod by deleting it (Kubernetes will recreate it via ReplicaSet/Deployment)
 *
 * Note: This only works for pods managed by controllers (Deployment, StatefulSet, etc.)
 * Standalone pods will be permanently deleted!
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace') || ''

    if (!name) {
      return NextResponse.json({ error: 'Pod name is required' }, { status: 400 })
    }

    if (!namespace) {
      return NextResponse.json({ error: 'Namespace parameter is required' }, { status: 400 })
    }

    // Initialize Kubernetes client
    initK8sClient()
    const coreApi = getCoreApi()

    // Delete the pod - Kubernetes will recreate it if managed by a controller
    await coreApi.deleteNamespacedPod({
      name,
      namespace,
    })

    return NextResponse.json({
      success: true,
      message: `Pod ${name} deletion initiated. If managed by a controller, it will be recreated automatically.`,
      podName: name,
    })
  } catch (error) {
    console.error('[API] Failed to restart pod:', error)

    // Check if it's a 404 (pod not found)
    if (error && typeof error === 'object' && 'statusCode' in error) {
      const statusCode = (error as { statusCode?: number }).statusCode
      if (statusCode === 404) {
        return NextResponse.json({ error: 'Pod not found' }, { status: 404 })
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to restart pod',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
