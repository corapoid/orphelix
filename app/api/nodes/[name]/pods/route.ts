import { NextRequest, NextResponse } from 'next/server'
import { fetchNodePods } from '@/lib/k8s-api'

/**
 * GET /api/nodes/[name]/pods
 *
 * Fetches all Pods running on a specific Node
 * Returns pods from all namespaces on this node
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params

    const pods = await fetchNodePods(name)
    return NextResponse.json(pods)
  } catch (error) {
    console.error('[API] Failed to fetch Node pods:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch Node pods',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
