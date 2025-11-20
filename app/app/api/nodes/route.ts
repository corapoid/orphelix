import { NextResponse } from 'next/server'
import { fetchNodes } from '@/lib/k8s/api'

export async function GET() {
  try {
    // Nodes are cluster-wide, namespace parameter not needed
    const nodes = await fetchNodes()
    return NextResponse.json(nodes)
  } catch (error) {
    console.error('[API] Failed to fetch nodes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch nodes' },
      { status: 500 }
    )
  }
}
