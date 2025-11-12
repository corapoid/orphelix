import { NextRequest } from 'next/server'

/**
 * Extract namespace from request query parameters
 * Falls back to 'default' if not provided
 */
export function getNamespaceFromRequest(request: NextRequest): string {
  const searchParams = request.nextUrl.searchParams
  return searchParams.get('namespace') || 'default'
}

/**
 * Build API URL with namespace query parameter
 */
export function buildApiUrl(path: string, namespace: string): string {
  const url = new URL(path, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  url.searchParams.set('namespace', namespace)
  return url.toString()
}
