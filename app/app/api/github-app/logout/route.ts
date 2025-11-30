import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter
const limiter = rateLimit(GENERAL_API_LIMIT)

/**
 * POST /api/github-app/logout
 *
 * Logs out from GitHub App by deleting cookies
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const cookieStore = await cookies()

    // Delete all GitHub App cookies
    cookieStore.delete('github_app_token')
    cookieStore.delete('github_app_refresh_token')

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
