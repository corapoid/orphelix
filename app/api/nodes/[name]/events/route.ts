import { NextRequest, NextResponse } from 'next/server'
import { fetchNodeEvents } from '@/lib/k8s-api'

/**
 * GET /api/nodes/[name]/events
 *
 * Fetches events for a specific Node
 * Nodes are cluster-scoped resources (no namespace required)
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params

    const events = await fetchNodeEvents(name)
    return NextResponse.json(events)
  } catch (error) {
    console.error('[API] Failed to fetch Node events:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch Node events',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
