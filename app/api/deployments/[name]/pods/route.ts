import { NextResponse } from 'next/server'
import { fetchPods } from '@/lib/k8s-api'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    // Fetch pods with label selector for this deployment
    const pods = await fetchPods('default', `app=${name}`)
    return NextResponse.json(pods)
  } catch (error) {
    console.error('[API] Failed to fetch pods for deployment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deployment pods' },
      { status: 500 }
    )
  }
}
