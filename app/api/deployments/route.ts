import { NextRequest, NextResponse } from 'next/server'
import { fetchDeployments } from '@/lib/k8s-api'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const namespace = searchParams.get('namespace') || 'default'

    const deployments = await fetchDeployments(namespace)
    return NextResponse.json(deployments)
  } catch (error) {
    console.error('[API] Failed to fetch deployments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deployments' },
      { status: 500 }
    )
  }
}
