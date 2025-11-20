import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Allow access to root path (welcome screen)
  if (pathname === '/') return NextResponse.next()

  // Allow API routes
  if (pathname.startsWith('/api')) return NextResponse.next()

  // Check if user is authenticated (for real mode)
  if (session) return NextResponse.next()

  // Check for demo mode cookie
  const appMode = request.cookies.get('app-mode')?.value
  if (appMode === 'demo') return NextResponse.next()

  // Deny access - redirect to '/'
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
