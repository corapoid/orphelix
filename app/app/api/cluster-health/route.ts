import { NextRequest, NextResponse } from 'next/server'
import { getCoreApi } from '@/lib/k8s/client'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

// Create rate limiter for cluster health operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

// Validate request body
const clusterHealthSchema = z.object({
  contextName: z.string().min(1, 'Context name is required'),
})

/**
 * POST /api/cluster-health
 *
 * Verify cluster connection with specific context
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const body = await request.json()
    const validated = clusterHealthSchema.parse(body)

    // Try to connect to cluster using the specified context
    const coreApi = getCoreApi(validated.contextName)

    // Simple health check - try to list namespaces
    const response = await coreApi.listNamespace({ limit: 1 })

    if (response && response.items) {
      return NextResponse.json({
        status: 'healthy',
        contextName: validated.contextName,
        message: 'Successfully connected to cluster',
      })
    }

    return NextResponse.json(
      { error: 'Failed to verify cluster connection' },
      { status: 500 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
