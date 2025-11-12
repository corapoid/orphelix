import { NextRequest, NextResponse } from 'next/server'
import { fetchResourceEvents } from '@/lib/k8s-api'
import { getNamespaceFromRequest } from '@/lib/api-helpers'

/**
 * GET /api/configmaps/[name]/events
 *
 * Fetches events related to a specific ConfigMap
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

    const events = await fetchResourceEvents('ConfigMap', name, namespace)
    return NextResponse.json(events)
  } catch (error) {
    console.error('[API] Failed to fetch ConfigMap events:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch ConfigMap events',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
