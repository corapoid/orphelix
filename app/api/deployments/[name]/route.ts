import { NextResponse } from 'next/server'
import { fetchDeployment } from '@/lib/k8s-api'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const deployment = await fetchDeployment(name)
    if (!deployment) {
      return NextResponse.json(
        { error: 'Deployment not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(deployment)
  } catch (error) {
    console.error('[API] Failed to fetch deployment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deployment' },
      { status: 500 }
    )
  }
}
