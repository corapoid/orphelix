import { NextRequest, NextResponse } from 'next/server'
import { fetchPVs } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_LIST_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter for K8s list operations
const limiter = rateLimit(K8S_LIST_LIMIT)

/**
 * GET /api/pvs
 *
 * Retrieves list of Persistent Volumes (cluster-wide)
 *
 * Rate Limited: 120 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const pvs = await fetchPVs()
    return NextResponse.json(pvs)
  } catch (error) {
    return handleApiError(error)
  }
}
