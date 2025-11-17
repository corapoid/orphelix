import { NextResponse } from 'next/server'
import { fetchStatefulSet } from '@/lib/k8s/api'
import { handleK8sError } from '@/lib/core/api-helpers'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace') || 'default'
    const contextName = searchParams.get('context') || undefined

    const statefulset = await fetchStatefulSet(params.name, namespace, contextName)

    if (!statefulset) {
      return NextResponse.json({ error: 'StatefulSet not found' }, { status: 404 })
    }

    return NextResponse.json(statefulset)
  } catch (error) {
    return handleK8sError(error, 'StatefulSet')
  }
}
