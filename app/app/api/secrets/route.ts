import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest, handleK8sError } from '@/lib/core/api-helpers'
import { fetchSecrets } from '@/lib/k8s/api'

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

    const secrets = await fetchSecrets(namespace, context)
    return NextResponse.json(secrets)
  } catch (error) {
    return handleK8sError(error, 'Secrets')
  }
}
