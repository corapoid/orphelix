import { NextResponse } from 'next/server'
import { fetchPVs } from '@/lib/k8s-api'

export async function GET() {
  try {
    const pvs = await fetchPVs()
    return NextResponse.json(pvs)
  } catch (error) {
    console.error('[API] Failed to fetch PVs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PVs' },
      { status: 500 }
    )
  }
}
