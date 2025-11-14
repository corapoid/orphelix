import { NextRequest, NextResponse } from 'next/server'
import { fetchLimitRanges } from '@/lib/k8s/api'
import { handleK8sError } from '@/lib/k8s/errors'
import { getNamespaceFromRequest } from '@/lib/k8s/utils'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json({ error: 'Namespace parameter is required' }, { status: 400 })
    }

    const limitRanges = await fetchLimitRanges(namespace)
    return NextResponse.json(limitRanges)
  } catch (error) {
    return handleK8sError(error, 'LimitRanges')
  }
}
