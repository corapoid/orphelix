import { NextRequest, NextResponse } from 'next/server'
import { fetchNamespace } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { namespaceSchema } from '@/lib/validation/schemas'
import { handleApiError, NotFoundError } from '@/lib/api/errors'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/namespaces/[name]
 *
 * Retrieves a specific Namespace by name (cluster-wide resource)
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { name } = await context.params

    // Validate input - namespace uses its own schema for validation
    const validated = namespaceSchema.parse(name)

    const namespace = await fetchNamespace(validated)

    if (!namespace) {
      throw new NotFoundError('Namespace', validated)
    }

    return NextResponse.json(namespace)
  } catch (error) {
    return handleApiError(error)
  }
}
