import { NextRequest, NextResponse } from 'next/server'
import { SidebarPinsService } from '@/lib/db/services'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiters
const updateLimiter = rateLimit(SETTINGS_UPDATE_LIMIT)
const generalLimiter = rateLimit(GENERAL_API_LIMIT)

// Validate request schemas
const sidebarPinUpdateSchema = z.object({
  path: z.string().min(1, 'Path is required'),
  pinned: z.boolean(),
})

/**
 * GET /api/settings/sidebar-pins
 *
 * Retrieves sidebar pin settings
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')

    if (path) {
      const pinned = SidebarPinsService.isPinned(path)
      return NextResponse.json({ pinned })
    }

    const pinned = SidebarPinsService.getPinned()
    return NextResponse.json(Array.from(pinned))
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/settings/sidebar-pins
 *
 * Updates sidebar pin settings
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
    const validated = sidebarPinUpdateSchema.parse(body)

    SidebarPinsService.setPinned(validated.path, validated.pinned)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
