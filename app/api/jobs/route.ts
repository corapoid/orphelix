import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, handleK8sError } from '@/lib/core/api-helpers'
import { fetchJobs } from '@/lib/k8s/api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const jobs = await fetchJobs(namespace)
    return NextResponse.json(jobs)
  } catch (error) {
    return handleK8sError(error, 'Jobs')
  }
}
