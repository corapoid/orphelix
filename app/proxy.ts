import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'middleware' })

/**
 * Security Headers Configuration
 * Applied to all responses for defense-in-depth
 */
function applySecurityHeaders(response: NextResponse): NextResponse {
  const headers = response.headers

  // Content Security Policy
  // Restricts resource loading to prevent XSS and other injection attacks
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
    connect-src 'self' https://api.github.com https://api.openai.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  headers.set('Content-Security-Policy', cspHeader)

  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff')

  // Prevent clickjacking by disallowing iframe embedding
  headers.set('X-Frame-Options', 'DENY')

  // Enable XSS filter in older browsers
  headers.set('X-XSS-Protection', '1; mode=block')

  // Control referrer information
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Restrict browser features
  headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

  // HSTS - Force HTTPS (only in production with HTTPS)
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_URL) {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }

  return response
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // Always allow root path (welcome screen)
  if (pathname === '/') {
    const response = NextResponse.next()
    return applySecurityHeaders(response)
  }

  // Always allow API routes
  if (pathname.startsWith('/api')) {
    const response = NextResponse.next()
    return applySecurityHeaders(response)
  }

  // Always allow Next.js internal routes
  if (pathname.startsWith('/_next')) {
    const response = NextResponse.next()
    return applySecurityHeaders(response)
  }

  // Check demo mode cookie
  const appMode = req.cookies.get('app-mode')?.value

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    logger.debug('Middleware check', {
      pathname,
      appMode,
      isLoggedIn,
      cookies: Object.fromEntries(req.cookies.getAll().map(c => [c.name, c.value]))
    })
  }

  // Allow all routes if in demo mode (cookie is set)
  if (appMode === 'demo') {
    logger.debug('Allowing demo mode access', { pathname })
    const response = NextResponse.next()
    return applySecurityHeaders(response)
  }

  // Allow all routes if logged in (real mode with GitHub auth)
  if (isLoggedIn) {
    logger.debug('Allowing logged in access', { pathname })
    const response = NextResponse.next()
    return applySecurityHeaders(response)
  }

  // Otherwise redirect to welcome page
  logger.debug('Redirecting to welcome', { pathname })
  const response = NextResponse.redirect(new URL('/', req.url))
  return applySecurityHeaders(response)
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.ico|.*\\.webp).*)'],
}
