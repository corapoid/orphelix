import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'

export async function GET(request: NextRequest) {
  try {
    const token = await getGitHubToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - Please connect GitHub' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')
    const ref = searchParams.get('ref') || 'main'

    if (!owner || !repo) {
      return NextResponse.json({ error: 'owner and repo are required' }, { status: 400 })
    }

    const github = new GitHubClient(token)
    const files = await github.listYamlFiles(owner, repo, '', ref)

    return NextResponse.json(files)
  } catch (error) {
    console.error('Failed to fetch files:', error)
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
  }
}
