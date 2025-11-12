import { NextResponse } from 'next/server'
import { fetchPodLogs } from '@/lib/k8s-api'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace') || ''
    const container = searchParams.get('container') || undefined
    const tail = parseInt(searchParams.get('tail') || '100')

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const logs = await fetchPodLogs(name, namespace, container, tail)
    return NextResponse.json({ logs })
  } catch (error) {
    console.error('[API] Failed to fetch pod logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pod logs' },
      { status: 500 }
    )
  }
}
