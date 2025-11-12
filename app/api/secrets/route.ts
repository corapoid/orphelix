import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/api-helpers'
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
    console.error('[API] Failed to fetch secrets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch secrets' },
      { status: 500 }
    )
  }
}
