import { NextRequest, NextResponse } from 'next/server'
import { githubApp } from '@/lib/auth/github-app'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const setup_action = searchParams.get('setup_action')

    if (!code) {
      return NextResponse.redirect(
        new URL('/settings?error=no_code', request.url)
      )
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

    // If this was a new installation, show success message
    const successUrl = setup_action === 'install'
      ? '/settings?github_app=installed'
      : '/settings?github_app=connected'

    return NextResponse.redirect(new URL(successUrl, request.url))
  } catch (error) {
    console.error('GitHub App callback error:', error)
    return NextResponse.redirect(
      new URL('/settings?error=callback_failed', request.url)
    )
  }
}
