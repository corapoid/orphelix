import { NextResponse } from 'next/server'
import { fetchPod } from '@/lib/k8s-api'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const pod = await fetchPod(name)
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
