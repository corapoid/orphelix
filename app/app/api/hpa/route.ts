import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'
import { fetchHPAs } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_LIST_LIMIT } from '@/lib/security/rate-limit-configs'
import { namespaceSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter for K8s list operations
const limiter = rateLimit(K8S_LIST_LIMIT)

/**
 * GET /api/hpa
 *
 * Retrieves list of HorizontalPodAutoscalers in a namespace
 *
 * Rate Limited: 120 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)

    // Validate namespace
    const validated = namespaceSchema.parse(namespace)

    const hpas = await fetchHPAs(validated, context)
    return NextResponse.json(hpas)
  } catch (error) {
    return handleApiError(error)
  }
}
