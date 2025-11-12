import { NextResponse } from 'next/server'
import { fetchPVCs } from '@/lib/k8s-api'

export async function GET() {
  try {
    const pvcs = await fetchPVCs()
    return NextResponse.json(pvcs)
  } catch (error) {
    console.error('[API] Failed to fetch PVCs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PVCs' },
      { status: 500 }
    )
  }
}
