import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { getMockRepositoryTree } from '@/lib/mocks/github-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')
    const ref = searchParams.get('ref') || 'main'
    const path = searchParams.get('path') || ''
    const mode = searchParams.get('mode')

    if (!owner || !repo) {
      return NextResponse.json({ error: 'owner and repo are required' }, { status: 400 })
    }

    // Mock mode for demo
    if (mode === 'demo') {
      const tree = getMockRepositoryTree(path)
      return NextResponse.json(tree)
    }

    const token = await getGitHubToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - Please connect GitHub' }, { status: 401 })
    }

    const github = new GitHubClient(token)
    const tree = await github.getRepositoryTree(owner, repo, ref, path)

    return NextResponse.json(tree)
  } catch (error) {
    console.error('Failed to fetch tree:', error)
    return NextResponse.json({ error: 'Failed to fetch tree' }, { status: 500 })
  }
}
