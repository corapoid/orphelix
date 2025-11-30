import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/database'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT, GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiters
const updateLimiter = rateLimit(SETTINGS_UPDATE_LIMIT)
const generalLimiter = rateLimit(GENERAL_API_LIMIT)

// Validate notification settings update
const notificationUpdateSchema = z.object({
  enabled: z.boolean(),
})

/**
 * GET /api/notifications
 *
 * Retrieves notification settings
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await generalLimiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const db = getDatabase()

    // Get notification settings
    const userSettings = db.prepare('SELECT notifications_enabled FROM user_settings WHERE id = 1').get() as { notifications_enabled: number } | undefined
    const notificationsEnabled = Boolean(userSettings?.notifications_enabled)

    // Get enabled resource types
    const resources = db.prepare('SELECT resource_type FROM critical_issues_settings WHERE enabled = 1').all() as { resource_type: string }[]
    const enabledResources = resources.map(r => r.resource_type)

    return NextResponse.json({
      enabled: notificationsEnabled,
      enabledResources,
      status: notificationsEnabled ? 'active' : 'disabled'
    })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/notifications
 *
 * Updates notification settings
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
    const validated = notificationUpdateSchema.parse(body)

    const db = getDatabase()

    db.prepare(
      'UPDATE user_settings SET notifications_enabled = ? WHERE id = 1'
    ).run(validated.enabled ? 1 : 0)

    return NextResponse.json({
      success: true,
      enabled: validated.enabled,
      message: validated.enabled ? 'Notifications enabled' : 'Notifications disabled'
    })
  } catch (error) {
    return handleApiError(error)
  }
}
