import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/api-helpers'
import { fetchPVCs } from '@/lib/k8s-api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const pvcs = await fetchPVCs(namespace)
    return NextResponse.json(pvcs)
  } catch (error) {
    console.error('[API] Failed to fetch PVCs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PVCs' },
      { status: 500 }
    )
  }
}
