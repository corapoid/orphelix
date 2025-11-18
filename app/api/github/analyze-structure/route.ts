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

    const structure = await analyzeRepository(
      owner,
      repo,
      ref,
      mode === 'mock' ? 'mock' : undefined
    )

    return NextResponse.json(structure)
  } catch (error) {
    console.error('Failed to analyze repository structure:', error)
    return NextResponse.json(
      { error: 'Failed to analyze repository structure' },
      { status: 500 }
    )
  }
}
