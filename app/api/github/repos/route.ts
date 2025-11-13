import { GitHubClient } from '@/lib/github/client'
import { NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'

export async function GET() {
  try {
    const token = await getGitHubToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - Please connect GitHub' }, { status: 401 })
    }

    const github = new GitHubClient(token)
    const repos = await github.listRepositories()

    return NextResponse.json(repos)
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
  }
}
