import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'

export async function POST(request: NextRequest) {
  try {
    const token = await getGitHubToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - Please connect GitHub' }, { status: 401 })
    }

    const body = await request.json()
    const { owner, repo, pullNumber, mergeMethod = 'merge' } = body

    if (!owner || !repo || !pullNumber) {
      return NextResponse.json(
        { error: 'owner, repo, and pullNumber are required' },
        { status: 400 }
      )
    }

    const github = new GitHubClient(token)
    const result = await github.mergePullRequest(owner, repo, pullNumber, mergeMethod)

    if (!result.merged) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    })
  } catch (error) {
    console.error('Failed to merge PR:', error)
    return NextResponse.json(
      { error: 'Failed to merge PR' },
      { status: 500 }
    )
  }
}
