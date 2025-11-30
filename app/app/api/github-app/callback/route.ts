import { NextRequest, NextResponse } from 'next/server'
import { githubApp } from '@/lib/auth/github-app'
import { cookies } from 'next/headers'
import { rateLimit } from '@/lib/security/rate-limiter'
import { AUTH_LIMIT } from '@/lib/security/rate-limit-configs'
import { z } from 'zod'

// Create rate limiter for auth callbacks (stricter limit)
const limiter = rateLimit(AUTH_LIMIT)

// Validate callback parameters
const callbackSchema = z.object({
  code: z.string().min(1, 'Authorization code is required'),
  state: z.string().optional(),
  setup_action: z.string().optional(),
})

/**
 * GET /api/github-app/callback
 *
 * GitHub App OAuth callback handler
 *
 * Rate Limited: 5 requests per 15 minutes (anti-brute force)
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { searchParams } = new URL(request.url)

    // Validate callback parameters
    const validated = callbackSchema.parse({
      code: searchParams.get('code'),
      state: searchParams.get('state') || undefined,
      setup_action: searchParams.get('setup_action') || undefined,
    })

    // Extract returnTo from state parameter
    let returnTo = '/settings'
    if (validated.state && validated.state.includes('_return=')) {
      const returnMatch = validated.state.match(/_return=([^&]+)/)
      if (returnMatch && returnMatch[1]) {
        returnTo = decodeURIComponent(returnMatch[1])
      }
    }

    // Exchange code for access token
    const { token, refreshToken, expiresAt, refreshTokenExpiresAt } =
      await githubApp.exchangeCode(validated.code)

    // Store tokens in HTTP-only cookies
    const cookieStore = await cookies()

    cookieStore.set('github_app_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(expiresAt),
      path: '/',
    })

    cookieStore.set('github_app_refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(refreshTokenExpiresAt),
      path: '/',
    })

    // Redirect back to where user came from, or settings as fallback
    const successParam = validated.setup_action === 'install' ? 'github_app=installed' : 'github_app=connected'
    const separator = returnTo.includes('?') ? '&' : '?'
    const successUrl = `${returnTo}${separator}${successParam}`

    return NextResponse.redirect(new URL(successUrl, request.url))
  } catch (error) {
    console.error('GitHub App callback error:', error)
    return NextResponse.redirect(
      new URL('/settings?error=callback_failed', request.url)
    )
  }
}
