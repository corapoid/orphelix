import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest, handleK8sError } from '@/lib/core/api-helpers'
import { fetchIngresses } from '@/lib/k8s/api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const ingresses = await fetchIngresses(namespace, context)
    return NextResponse.json(ingresses)
  } catch (error) {
    return handleK8sError(error, 'Ingress')
  }
}
