import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, handleK8sError } from '@/lib/api-helpers'
import { fetchPods } from '@/lib/k8s-api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const pods = await fetchPods(namespace)
    return NextResponse.json(pods)
  } catch (error) {
    return handleK8sError(error, 'Pods')
  }
}
