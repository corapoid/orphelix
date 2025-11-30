import { NextRequest, NextResponse } from 'next/server'
import { fetchResourceQuotas } from '@/lib/k8s/api'
import { getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_LIST_LIMIT } from '@/lib/security/rate-limit-configs'
import { namespaceSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter for K8s list operations
const limiter = rateLimit(K8S_LIST_LIMIT)

/**
 * GET /api/resourcequotas
 *
 * Retrieves list of ResourceQuotas in a namespace
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

    const quotas = await fetchResourceQuotas(validated, context)
    return NextResponse.json(quotas)
  } catch (error) {
    return handleApiError(error)
  }
}
