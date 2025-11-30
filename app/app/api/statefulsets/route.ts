import { NextRequest, NextResponse } from 'next/server'
import { fetchStatefulSets } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_LIST_LIMIT } from '@/lib/security/rate-limit-configs'
import { namespaceSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter for K8s list operations
const limiter = rateLimit(K8S_LIST_LIMIT)

/**
 * GET /api/statefulsets
 *
 * Retrieves list of StatefulSets in a namespace
 *
 * Rate Limited: 120 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace') || 'default'
    const contextName = searchParams.get('context') || undefined

    // Validate namespace
    const validated = namespaceSchema.parse(namespace)

    const statefulsets = await fetchStatefulSets(validated, contextName)
    return NextResponse.json(statefulsets)
  } catch (error) {
    return handleApiError(error)
  }
}
