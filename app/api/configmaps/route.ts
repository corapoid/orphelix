import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/api-helpers'
import { fetchConfigMaps } from '@/lib/k8s-api'

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
    console.error('[API] Failed to fetch configmaps:', error)
    return NextResponse.json(
      { error: 'Failed to fetch configmaps' },
      { status: 500 }
    )
  }
}
