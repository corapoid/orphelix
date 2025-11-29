import { NextRequest, NextResponse } from 'next/server'
import { getCoreApi } from '@/lib/k8s/client'
import { rateLimit } from '@/lib/security/rate-limiter'
import { POD_RESTART_LIMIT } from '@/lib/security/rate-limit-configs'
import { podRestartSchema } from '@/lib/validation/schemas'
import { handleApiError, NotFoundError } from '@/lib/api/errors'

// Create rate limiter for pod restart operations
const limiter = rateLimit(POD_RESTART_LIMIT)

/**
 * POST /api/pods/[name]/restart
 *
 * Restarts a pod by deleting it (Kubernetes will recreate it via ReplicaSet/Deployment)
 *
 * Note: This only works for pods managed by controllers (Deployment, StatefulSet, etc.)
 * Standalone pods will be permanently deleted!
 *
 * Rate Limited: 10 requests per 60 seconds
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { name } = await params
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace')

    // Validate input using Zod schema
    const validated = podRestartSchema.parse({
      name,
      namespace,
    })

    const coreApi = getCoreApi()

    // Delete the pod - Kubernetes will recreate it if managed by a controller
    const result = await coreApi.deleteNamespacedPod({
      name: validated.name,
      namespace: validated.namespace,
    })

    // Check if pod was found
    if (!result) {
      throw new NotFoundError('Pod', validated.name)
    }

    return NextResponse.json({
      success: true,
      message: `Pod ${validated.name} deletion initiated. If managed by a controller, it will be recreated automatically.`,
      podName: validated.name,
      namespace: validated.namespace,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
