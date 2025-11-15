import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest, handleK8sError } from '@/lib/core/api-helpers'
import { fetchJob } from '@/lib/k8s/api'

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

    const job = await fetchJob(name, namespace, context)

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    return handleK8sError(error, 'Job')
  }
}
