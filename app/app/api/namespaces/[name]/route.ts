import { NextResponse } from 'next/server'
import { fetchNamespace } from '@/lib/k8s/api'
import { handleK8sError } from '@/lib/core/api-helpers'

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params

    if (!name) {
      return NextResponse.json({ error: 'Namespace name is required' }, { status: 400 })
    }

    const namespace = await fetchNamespace(name)

    if (!namespace) {
      return NextResponse.json({ error: 'Namespace not found' }, { status: 404 })
    }

    return NextResponse.json(namespace)
  } catch (error) {
    return handleK8sError(error, 'Namespace')
  }
}
