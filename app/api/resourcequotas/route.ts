import { NextRequest, NextResponse } from 'next/server'
import { fetchResourceQuotas } from '@/lib/k8s/api'
import { handleK8sError } from '@/lib/k8s/errors'
import { getNamespaceFromRequest } from '@/lib/k8s/utils'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json({ error: 'Namespace parameter is required' }, { status: 400 })
    }

    const quotas = await fetchResourceQuotas(namespace)
    return NextResponse.json(quotas)
  } catch (error) {
    return handleK8sError(error, 'ResourceQuotas')
  }
}
