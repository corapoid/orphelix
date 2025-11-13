import { NextResponse } from 'next/server'
import { initK8sClient, getCoreApi } from '@/lib/k8s/client'

export async function GET() {
  try {
    initK8sClient()
    const coreApi = getCoreApi()

    const response = await coreApi.listNamespace({})
    const namespaces = response.items.map((ns) => ({
      name: ns.metadata?.name || '',
      status: ns.status?.phase || 'Unknown',
      age: ns.metadata?.creationTimestamp || '',
    }))

    return NextResponse.json({ namespaces })
  } catch (error) {
    console.error('[API] Failed to fetch namespaces:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch namespaces',
        details: error instanceof Error ? error.message : 'Unknown error',
        namespaces: [],
      },
      { status: 500 }
    )
  }
}
