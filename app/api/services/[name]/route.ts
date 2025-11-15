import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest, handleK8sError } from '@/lib/core/api-helpers'
import { fetchService } from '@/lib/k8s/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)
    const { name } = await params

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const service = await fetchService(name, namespace, context)

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    return handleK8sError(error, 'Service')
  }
}
