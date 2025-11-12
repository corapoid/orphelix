import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/api-helpers'
import { fetchHPAs } from '@/lib/k8s-api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)
    const hpas = await fetchHPAs(namespace)
    return NextResponse.json(hpas)
  } catch (error) {
    console.error('[API] Failed to fetch HPAs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch HPAs' },
      { status: 500 }
    )
  }
}
