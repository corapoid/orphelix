import { NextResponse } from 'next/server'
import { fetchDaemonSet } from '@/lib/k8s/api'
import { handleK8sError } from '@/lib/core/api-helpers'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace') || 'default'
    const contextName = searchParams.get('context') || undefined

    const daemonset = await fetchDaemonSet(params.name, namespace, contextName)

    if (!daemonset) {
      return NextResponse.json({ error: 'DaemonSet not found' }, { status: 404 })
    }

    return NextResponse.json(daemonset)
  } catch (error) {
    return handleK8sError(error, 'DaemonSet')
  }
}
