import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import { fetchResourceEvents } from '@/lib/k8s/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const namespace = getNamespaceFromRequest(request)
    // const context = getContextFromRequest(request) // TODO: use context when API supports it

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const events = await fetchResourceEvents('Pod', name, namespace)
    return NextResponse.json(events)
  } catch (error) {
    console.error('[API] Failed to fetch pod events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pod events' },
      { status: 500 }
    )
  }
}
