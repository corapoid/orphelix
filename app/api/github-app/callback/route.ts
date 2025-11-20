import { NextRequest, NextResponse } from 'next/server'
import { githubApp } from '@/lib/auth/github-app'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const setup_action = searchParams.get('setup_action')

    if (!code) {
      return NextResponse.redirect(
        new URL('/settings?error=no_code', request.url)
      )
    }

    // Extract returnTo from state parameter
    let returnTo = '/settings'
    if (state && state.includes('_return=')) {
      const returnMatch = state.match(/_return=([^&]+)/)
      if (returnMatch && returnMatch[1]) {
        returnTo = decodeURIComponent(returnMatch[1])
      }
    }

    // Exchange code for access token
    const { token, refreshToken, expiresAt, refreshTokenExpiresAt } =
      await githubApp.exchangeCode(code)

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
    const successParam = setup_action === 'install' ? 'github_app=installed' : 'github_app=connected'
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
