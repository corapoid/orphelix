import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, handleK8sError } from '@/lib/core/api-helpers'
import { fetchConfigMaps } from '@/lib/k8s/api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const configMaps = await fetchConfigMaps(namespace)
    return NextResponse.json(configMaps)
  } catch (error) {
    return handleK8sError(error, 'ConfigMaps')
  }
}
