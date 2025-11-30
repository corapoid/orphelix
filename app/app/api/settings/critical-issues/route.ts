import { NextRequest, NextResponse } from 'next/server'
import { CriticalIssuesService } from '@/lib/db/services'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiters
const updateLimiter = rateLimit(SETTINGS_UPDATE_LIMIT)
const generalLimiter = rateLimit(GENERAL_API_LIMIT)

// Validate request schemas
const criticalIssuesUpdateSchema = z.object({
  resourceType: z.string().min(1, 'Resource type is required'),
  enabled: z.boolean(),
})

/**
 * GET /api/settings/critical-issues
 *
 * Retrieves critical issues settings
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)
    const resourceType = searchParams.get('resource')

    if (resourceType) {
      const enabled = CriticalIssuesService.isEnabled(resourceType)
      return NextResponse.json({ enabled })
    }

    const enabled = CriticalIssuesService.getEnabled()
    return NextResponse.json(Array.from(enabled))
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/settings/critical-issues
 *
 * Updates critical issues settings
 *
 * Rate Limited: 30 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await updateLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const body = await request.json()

    // Validate input
    const validated = criticalIssuesUpdateSchema.parse(body)

    CriticalIssuesService.setEnabled(validated.resourceType, validated.enabled)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
