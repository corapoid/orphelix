import { NextRequest, NextResponse } from 'next/server'

/**
 * Extract namespace from request query parameters
 * Returns empty string if not provided
 */
export function getNamespaceFromRequest(request: NextRequest): string {
  const searchParams = request.nextUrl.searchParams
  return searchParams.get('namespace') || ''
}

/**
 * Build API URL with namespace query parameter
 */
export function buildApiUrl(path: string, namespace: string): string {
  const url = new URL(path, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  url.searchParams.set('namespace', namespace)
  return url.toString()
}

/**
 * Handle Kubernetes API errors and return appropriate NextResponse
 * Handles 401 Unauthorized, 403 Forbidden, and other common errors
 */
export function handleK8sError(error: unknown, resourceType: string): NextResponse {
  console.error(`[API] Failed to fetch ${resourceType}:`, error)

  // Check if it's an authorization error (401)
  if (error && typeof error === 'object' && 'code' in error) {
    if (error.code === 401) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: `You do not have permission to access ${resourceType} in this namespace`,
          code: 401
        },
        { status: 401 }
      )
    }

    // Check if it's a forbidden error (403)
    if (error.code === 403) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: `Access to ${resourceType} is forbidden`,
          code: 403
        },
        { status: 403 }
      )
    }
  }

  // Generic error response
  return NextResponse.json(
    { error: `Failed to fetch ${resourceType}` },
    { status: 500 }
  )
}
