import { NextRequest, NextResponse } from 'next/server'
import { fetchNodePods } from '@/lib/k8s-api'

/**
 * GET /api/nodes/[name]/pods?namespace=xxx
 *
 * Fetches all Pods running on a specific Node in the specified namespace
 * Requires namespace query parameter as user doesn't have cluster-level permissions
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace')

    const pods = await fetchNodePods(name, namespace || undefined)
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
