import { NextResponse } from 'next/server'
import { fetchNamespaces } from '@/lib/k8s/api'
import { handleK8sError } from '@/lib/core/api-helpers'

export async function GET() {
  try {
    const namespaces = await fetchNamespaces()
    return NextResponse.json(namespaces)
  } catch (error) {
    return handleK8sError(error, 'Namespaces')
  }
}
