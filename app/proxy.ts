import { auth } from '@/auth'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // Always allow root path (welcome screen)
  if (pathname === '/') return

  // Always allow API routes
  if (pathname.startsWith('/api')) return

  // Always allow Next.js internal routes
  if (pathname.startsWith('/_next')) return

  // Check demo mode cookie
  const appMode = req.cookies.get('app-mode')?.value

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware]', {
      pathname,
      appMode,
      isLoggedIn,
      cookies: Object.fromEntries(req.cookies.getAll().map(c => [c.name, c.value]))
    })
  }

  // Allow all routes if in demo mode (cookie is set)
  if (appMode === 'demo') {
    console.log('[Middleware] Allowing demo mode access to:', pathname)
    return
  }

  // Allow all routes if logged in (real mode with GitHub auth)
  if (isLoggedIn) {
    console.log('[Middleware] Allowing logged in access to:', pathname)
    return
  }

  // Otherwise redirect to welcome page
  console.log('[Middleware] Redirecting to welcome:', pathname)
  return Response.redirect(new URL('/', req.url))
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.ico|.*\\.webp).*)'],
}
