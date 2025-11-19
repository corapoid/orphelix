import { NextRequest, NextResponse } from 'next/server'
import { analyzeRepository } from '@/lib/github/repo-analyzer'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')
    const ref = searchParams.get('ref') || 'main'
    const mode = searchParams.get('mode')

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'owner and repo are required' },
        { status: 400 }
      )
    }

    // Get base URL for server-side fetch
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const host = request.headers.get('host') || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    const structure = await analyzeRepository(
      owner,
      repo,
      ref,
      mode === 'mock' ? 'mock' : undefined,
      baseUrl
    )

    return NextResponse.json(structure)
  } catch (error) {
    console.error('Failed to analyze repository structure:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze repository structure' },
      { status: 500 }
    )
  }
}
