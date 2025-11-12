import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/api-helpers'
import { fetchPods } from '@/lib/k8s-api'

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

    // Fetch pods with label selector for this deployment
    const pods = await fetchPods(namespace, `app=${name}`)
    return NextResponse.json(pods)
  } catch (error) {
    console.error('[API] Failed to fetch pods for deployment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deployment pods' },
      { status: 500 }
    )
  }
}
