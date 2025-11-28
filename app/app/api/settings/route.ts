import { NextRequest, NextResponse } from 'next/server'
import { UserSettingsService } from '@/lib/db/services'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { settingsUpdateSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiters
const updateLimiter = rateLimit(SETTINGS_UPDATE_LIMIT)
const generalLimiter = rateLimit(GENERAL_API_LIMIT)

/**
 * GET /api/settings
 *
 * Retrieves user settings
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const settings = UserSettingsService.get()
    return NextResponse.json(settings)
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/settings
 *
 * Updates user settings
 *
 * Rate Limited: 30 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await updateLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const data = await request.json()

    // Validate input using Zod schema
    const validated = settingsUpdateSchema.parse(data)

    UserSettingsService.update(validated)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * DELETE /api/settings
 *
 * Resets user settings to defaults
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function DELETE(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    UserSettingsService.reset()
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
