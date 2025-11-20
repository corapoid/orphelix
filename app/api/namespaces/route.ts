import { NextRequest, NextResponse } from 'next/server'
import { fetchNamespaces } from '@/lib/k8s/api'
import { handleK8sError } from '@/lib/core/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const context = searchParams.get('context')

    const namespaces = await fetchNamespaces(context || undefined)
    return NextResponse.json(namespaces)
  } catch (error) {
    return handleK8sError(error, 'Namespaces')
  }
}
