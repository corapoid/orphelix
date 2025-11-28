import { NextRequest, NextResponse } from 'next/server'
import { migrateFromLocalStorage } from '@/lib/db/database'
import { rateLimit } from '@/lib/security/rate-limiter'
import { SETTINGS_UPDATE_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter for migration operations
const limiter = rateLimit(SETTINGS_UPDATE_LIMIT)

/**
 * POST /api/settings/migrate
 *
 * Migrates data from localStorage to database
 *
 * Rate Limited: 30 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const localStorageData = await request.json()
    migrateFromLocalStorage(localStorageData)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
