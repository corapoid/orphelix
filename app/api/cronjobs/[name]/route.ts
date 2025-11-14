import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, handleK8sError } from '@/lib/core/api-helpers'
import { fetchCronJob } from '@/lib/k8s/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const namespace = getNamespaceFromRequest(request)
    const { name } = await params

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const cronjob = await fetchCronJob(name, namespace)

    if (!cronjob) {
      return NextResponse.json({ error: 'CronJob not found' }, { status: 404 })
    }

    return NextResponse.json(cronjob)
  } catch (error) {
    return handleK8sError(error, 'CronJob')
  }
}
