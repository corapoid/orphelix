import { NextRequest, NextResponse } from 'next/server'
import { fetchNodeEvents } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sClusterResourceSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/nodes/[name]/events
 *
 * Retrieves events for a specific Node (cluster-scoped resource)
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

    // Validate input
    const validated = k8sClusterResourceSchema.parse({ name })

    const events = await fetchNodeEvents(validated.name)
    return NextResponse.json(events)
  } catch (error) {
    return handleApiError(error)
  }
}
