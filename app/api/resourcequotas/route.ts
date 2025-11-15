import { NextRequest, NextResponse } from 'next/server'
import { fetchResourceQuotas } from '@/lib/k8s/api'
import { handleK8sError, getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)

    if (!namespace) {
      return NextResponse.json({ error: 'Namespace parameter is required' }, { status: 400 })
    }

    const quotas = await fetchResourceQuotas(namespace, context)
    return NextResponse.json(quotas)
  } catch (error) {
    return handleK8sError(error, 'ResourceQuotas')
  }
}
