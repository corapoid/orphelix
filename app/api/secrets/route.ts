import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, handleK8sError } from '@/lib/api-helpers'
import { fetchSecrets } from '@/lib/k8s-api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const secrets = await fetchSecrets(namespace)
    return NextResponse.json(secrets)
  } catch (error) {
    return handleK8sError(error, 'Secrets')
  }
}
