import { NextRequest, NextResponse } from 'next/server'
import { fetchResourceEvents } from '@/lib/k8s-api'
import { getNamespaceFromRequest } from '@/lib/api-helpers'

/**
 * GET /api/secrets/[name]/events
 *
 * Fetches events for a specific Secret
 * Requires namespace query parameter
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const events = await fetchResourceEvents('Secret', name, namespace)
    return NextResponse.json(events)
  } catch (error) {
    console.error('[API] Failed to fetch Secret events:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch Secret events',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
