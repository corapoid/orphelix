import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { rateLimit } from '@/lib/security/rate-limiter'
import { GENERAL_API_LIMIT } from '@/lib/security/rate-limit-configs'

// Create rate limiter
const limiter = rateLimit(GENERAL_API_LIMIT)

/**
 * GET /api/github/auth-status
 *
 * Check if user is authenticated with either GitHub App or OAuth
 *
 * Rate Limited: 100 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const token = await getGitHubToken()

    return NextResponse.json({
      authenticated: !!token,
      hasToken: !!token
    })
  } catch {
    return NextResponse.json({
      authenticated: false,
      hasToken: false
    })
  }
}
