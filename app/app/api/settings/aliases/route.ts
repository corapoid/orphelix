import { NextResponse } from 'next/server'
import { ClusterAliasesService } from '@/lib/db/services'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const contextName = searchParams.get('context')

    if (contextName) {
      const alias = ClusterAliasesService.get(contextName)
      return NextResponse.json({ alias })
    }

    const aliases = ClusterAliasesService.getAll()
    return NextResponse.json(aliases)
  } catch (error) {
    console.error('Failed to get cluster aliases:', error)
    return NextResponse.json({ error: 'Failed to get cluster aliases' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { contextName, alias } = await request.json()
    ClusterAliasesService.set(contextName, alias)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to set cluster alias:', error)
    return NextResponse.json({ error: 'Failed to set cluster alias' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const contextName = searchParams.get('context')

    if (!contextName) {
      return NextResponse.json({ error: 'context is required' }, { status: 400 })
    }

    ClusterAliasesService.remove(contextName)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to remove cluster alias:', error)
    return NextResponse.json({ error: 'Failed to remove cluster alias' }, { status: 500 })
  }
}
