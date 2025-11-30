import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'
import { fetchIngress } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sResourceDetailSchema } from '@/lib/validation/schemas'
import { handleApiError, NotFoundError } from '@/lib/api/errors'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/ingress/[name]
 *
 * Retrieves a specific Ingress by name
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
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)
    const { name } = await params

    // Validate input
    const validated = k8sResourceDetailSchema.parse({ name, namespace })

    const ingress = await fetchIngress(validated.name, validated.namespace, context)

    if (!ingress) {
      throw new NotFoundError('Ingress', validated.name)
    }

    return NextResponse.json(ingress)
  } catch (error) {
    return handleApiError(error)
  }
}
