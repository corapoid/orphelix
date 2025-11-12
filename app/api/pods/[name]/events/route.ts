import { NextResponse } from 'next/server'
import { fetchResourceEvents } from '@/lib/k8s-api'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const events = await fetchResourceEvents('Pod', name)
    return NextResponse.json(events)
  } catch (error) {
    console.error('[API] Failed to fetch pod events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pod events' },
      { status: 500 }
    )
  }
}
