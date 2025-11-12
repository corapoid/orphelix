import { NextRequest, NextResponse } from 'next/server'
import { fetchNode } from '@/lib/k8s-api'

/**
 * GET /api/nodes/[name]
 *
 * Fetches a single Node by name
 * Nodes are cluster-scoped resources (no namespace required)
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params

    const node = await fetchNode(name)

    if (!node) {
      return NextResponse.json(
        { error: `Node '${name}' not found` },
        { status: 404 }
      )
    }

    return NextResponse.json(node)
  } catch (error) {
    console.error('[API] Failed to fetch Node:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch Node',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
