import { NextRequest, NextResponse } from 'next/server'
import { getCoreApi } from '@/lib/k8s/client'

export const dynamic = 'force-dynamic'

/**
 * POST /api/cluster-health
 * Verify cluster connection with specific context
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contextName } = body

    if (!contextName) {
      return NextResponse.json({ error: 'Context name is required' }, { status: 400 })
    }

    // Try to connect to cluster using the specified context
    const coreApi = getCoreApi(contextName)

    // Simple health check - try to list namespaces
    const response = await coreApi.listNamespace({ limit: 1 })

    if (response && response.items) {
      return NextResponse.json({
        status: 'healthy',
        contextName,
        message: 'Successfully connected to cluster',
      })
    }

    return NextResponse.json(
      { error: 'Failed to verify cluster connection' },
      { status: 500 }
    )
  } catch (error) {
    console.error('[API] Cluster health check failed:', error)
    return NextResponse.json(
      {
        error: 'Failed to connect to cluster',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
