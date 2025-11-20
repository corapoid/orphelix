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

    if (!owner || !repo) {
      return NextResponse.json({ error: 'owner and repo are required' }, { status: 400 })
    }

    const github = new GitHubClient(token)
    const branches = await github.listBranches(owner, repo)

    return NextResponse.json(branches)
  } catch (error) {
    console.error('Failed to fetch branches:', error)
    return NextResponse.json({ error: 'Failed to fetch branches' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getGitHubToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - Please connect GitHub' }, { status: 401 })
    }

    const body = await request.json()
    const { owner, repo, baseBranch, newBranch } = body

    if (!owner || !repo || !baseBranch || !newBranch) {
      return NextResponse.json(
        { error: 'owner, repo, baseBranch, and newBranch are required' },
        { status: 400 }
      )
    }

    const github = new GitHubClient(token)
    await github.createBranch(owner, repo, baseBranch, newBranch)

    return NextResponse.json({ success: true, branch: newBranch })
  } catch (error: any) {
    console.error('Failed to create branch:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create branch' },
      { status: 500 }
    )
  }
}
