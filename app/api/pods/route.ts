import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/api-helpers'
import { fetchPods } from '@/lib/k8s-api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)
    const pods = await fetchPods(namespace)
    return NextResponse.json(pods)
  } catch (error) {
    console.error('[API] Failed to fetch pods:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pods' },
      { status: 500 }
    )
  }
}
