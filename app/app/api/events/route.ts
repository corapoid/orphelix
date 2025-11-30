import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'
import { fetchEvents } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_LIST_LIMIT } from '@/lib/security/rate-limit-configs'
import { namespaceSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter for K8s list operations
const limiter = rateLimit(K8S_LIST_LIMIT)

/**
 * Events List Request Schema
 */
const eventsListSchema = z.object({
  namespace: namespaceSchema,
  timeRangeHours: z.number().int().min(1).max(24).default(24),
})

/**
 * GET /api/events
 *
 * Retrieves events for a namespace
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

    // Get time range from query params (default: 24 hours, max: 24 hours)
    const { searchParams } = new URL(request.url)
    const timeRangeParam = searchParams.get('timeRange')
    let timeRangeHours = 24 // Default to 24 hours

    if (timeRangeParam) {
      const parsed = parseInt(timeRangeParam, 10)
      if (!isNaN(parsed) && parsed > 0) {
        timeRangeHours = Math.min(parsed, 24)
      }
    }

    // Validate input
    const validated = eventsListSchema.parse({ namespace, timeRangeHours })

    const events = await fetchEvents(validated.namespace, context, validated.timeRangeHours)
    return NextResponse.json(events)
  } catch (error) {
    return handleApiError(error)
  }
}
