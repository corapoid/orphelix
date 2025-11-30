import { NextRequest, NextResponse } from 'next/server'
import { fetchDaemonSet } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sResourceDetailSchema } from '@/lib/validation/schemas'
import { handleApiError, NotFoundError } from '@/lib/api/errors'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/daemonsets/[name]
 *
 * Retrieves a specific DaemonSet by name
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace') || 'default'
    const contextName = searchParams.get('context') || undefined
    const { name } = await params

    // Validate input
    const validated = k8sResourceDetailSchema.parse({ name, namespace })

    const daemonset = await fetchDaemonSet(validated.name, validated.namespace, contextName)

    if (!daemonset) {
      throw new NotFoundError('DaemonSet', validated.name)
    }

    return NextResponse.json(daemonset)
  } catch (error) {
    return handleApiError(error)
  }
}
