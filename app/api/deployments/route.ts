import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, handleK8sError } from '@/lib/api-helpers'
import { fetchDeployments } from '@/lib/k8s-api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const deployments = await fetchDeployments(namespace)
    return NextResponse.json(deployments)
  } catch (error) {
    return handleK8sError(error, 'Deployments')
  }
}
