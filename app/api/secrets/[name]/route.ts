import { NextRequest, NextResponse } from 'next/server'
import { fetchSecret } from '@/lib/k8s-api'
import { getNamespaceFromRequest } from '@/lib/api-helpers'

/**
 * GET /api/secrets/[name]
 *
 * Fetches a single Secret by name
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

    const secret = await fetchSecret(name, namespace)

    if (!secret) {
      return NextResponse.json(
        { error: `Secret '${name}' not found in namespace '${namespace}'` },
        { status: 404 }
      )
    }

    return NextResponse.json(secret)
  } catch (error) {
    console.error('[API] Failed to fetch Secret:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch Secret',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
