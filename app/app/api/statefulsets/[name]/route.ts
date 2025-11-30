import { NextRequest, NextResponse } from 'next/server'
import { fetchStatefulSet } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sResourceDetailSchema } from '@/lib/validation/schemas'
import { handleApiError, NotFoundError } from '@/lib/api/errors'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/statefulsets/[name]
 *
 * Retrieves a specific StatefulSet by name
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

    const statefulset = await fetchStatefulSet(validated.name, validated.namespace, contextName)

    if (!statefulset) {
      throw new NotFoundError('StatefulSet', validated.name)
    }

    return NextResponse.json(statefulset)
  } catch (error) {
    return handleApiError(error)
  }
}
