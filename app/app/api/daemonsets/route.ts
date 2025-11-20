import { NextResponse } from 'next/server'
import { fetchDaemonSets } from '@/lib/k8s/api'
import { handleK8sError } from '@/lib/core/api-helpers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace') || 'default'
    const contextName = searchParams.get('context') || undefined

    const daemonsets = await fetchDaemonSets(namespace, contextName)
    return NextResponse.json(daemonsets)
  } catch (error) {
    return handleK8sError(error, 'DaemonSets')
  }
}
