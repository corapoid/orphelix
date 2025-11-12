import { NextRequest, NextResponse } from 'next/server'
import { fetchConfigMap } from '@/lib/k8s-api'
import { getNamespaceFromRequest } from '@/lib/api-helpers'

/**
 * GET /api/configmaps/[name]
 *
 * Fetches a single ConfigMap by name in the specified namespace
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

    const configMap = await fetchConfigMap(name, namespace)

    if (!configMap) {
      return NextResponse.json(
        { error: `ConfigMap '${name}' not found in namespace '${namespace}'` },
        { status: 404 }
      )
    }

    return NextResponse.json(configMap)
  } catch (error) {
    console.error('[API] Failed to fetch ConfigMap:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch ConfigMap',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
