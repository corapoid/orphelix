import { NextRequest, NextResponse } from 'next/server'
import { fetchLimitRanges } from '@/lib/k8s/api'
import { handleK8sError, getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)

    if (!namespace) {
      return NextResponse.json({ error: 'Namespace parameter is required' }, { status: 400 })
    }

    const limitRanges = await fetchLimitRanges(namespace, context)
    return NextResponse.json(limitRanges)
  } catch (error) {
    return handleK8sError(error, 'LimitRanges')
  }
}
