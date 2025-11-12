import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/api-helpers'
import { fetchDeployment } from '@/lib/k8s-api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const deployment = await fetchDeployment(name, namespace)
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
