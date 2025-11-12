import { NextRequest, NextResponse } from 'next/server'
import { getAppsApi } from '@/lib/k8s-client'
import { getNamespaceFromRequest } from '@/lib/api-helpers'

/**
 * POST /api/deployments/[name]/restart
 * Restart a deployment by updating its annotation to trigger a rollout
 */
export async function POST(
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

    const appsApi = getAppsApi()

    // Read current deployment
    const deployment = await appsApi.readNamespacedDeployment({ name, namespace })

    // Add/update restart annotation to trigger rollout
    const now = new Date().toISOString()
    const annotations = deployment.spec?.template?.metadata?.annotations || {}
    annotations['kubectl.kubernetes.io/restartedAt'] = now

    // Patch the deployment
    await appsApi.patchNamespacedDeployment({
      name,
      namespace,
      body: {
        spec: {
          template: {
            metadata: {
              annotations,
            },
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: `Deployment ${name} restart initiated`,
      restartedAt: now,
    })
  } catch (error: unknown) {
    const err = error as { body?: { message?: string }; message?: string }
    console.error('[API] Failed to restart deployment:', err)
    return NextResponse.json(
      { error: err.body?.message || err.message || 'Failed to restart deployment' },
      { status: 500 }
    )
  }
}
