import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import { fetchResourceEvents } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sResourceDetailSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/deployments/[name]/events
 *
 * Retrieves events for a specific deployment
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

    const events = await fetchResourceEvents('Deployment', validated.name, validated.namespace)
    return NextResponse.json(events)
  } catch (error) {
    return handleApiError(error)
  }
}
