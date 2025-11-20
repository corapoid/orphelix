import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'
import { getMockFileContent } from '@/lib/mocks/github-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')
    const path = searchParams.get('path')
    const ref = searchParams.get('ref') || 'main'
    const mode = searchParams.get('mode')

    if (!owner || !repo || !path) {
      return NextResponse.json({ error: 'owner, repo and path are required' }, { status: 400 })
    }

    // Mock mode for demo
    if (mode === 'demo') {
      try {
        const { content, sha } = getMockFileContent(path)
        return NextResponse.json({ content, sha })
      } catch {
        return NextResponse.json({ error: 'File not found' }, { status: 404 })
      }
    }

    const token = await getGitHubToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - Please connect GitHub' }, { status: 401 })
    }

    const github = new GitHubClient(token)
    const { content, sha } = await github.getFileContent(owner, repo, path, ref)

    return NextResponse.json({ content, sha })
  } catch (error) {
    console.error('Failed to fetch file content:', error)
    return NextResponse.json({ error: 'Failed to fetch file content' }, { status: 500 })
  }
}
