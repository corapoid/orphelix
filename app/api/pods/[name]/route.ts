import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/api-helpers'
import { fetchPod } from '@/lib/k8s-api'

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

    const pod = await fetchPod(name, namespace)
    if (!pod) {
      return NextResponse.json(
        { error: 'Pod not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(pod)
  } catch (error) {
    console.error('[API] Failed to fetch pod:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pod' },
      { status: 500 }
    )
  }
}
