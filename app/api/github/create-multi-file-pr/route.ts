import { GitHubClient } from '@/lib/github/client'
import { NextRequest, NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'

interface FileChange {
  path: string
  content: string
  sha: string
}

export async function POST(request: NextRequest) {
  try {
    const token = await getGitHubToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - Please connect GitHub' }, { status: 401 })
    }

    const requestBody = await request.json()
    const {
      owner,
      repo,
      branch: newBranch,
      baseBranch = 'main',
      files,
      commitMessage,
      prTitle,
      prBody,
    } = requestBody

    if (!owner || !repo || !newBranch || !files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: 'owner, repo, branch, and files array are required' },
        { status: 400 }
      )
    }

    const github = new GitHubClient(token)

    // 1. Create new branch from base
    await github.createBranch(owner, repo, baseBranch, newBranch)

    // 2. Commit each file to the new branch
    for (const file of files as FileChange[]) {
      const message = commitMessage || `Update ${file.path}`
      await github.commitFile(owner, repo, newBranch, file.path, file.content, file.sha, message)
    }

    // 3. Create PR
    const title = prTitle || `Update ${files.length} files`
    const body = prBody || `Updated ${files.length} configuration files`

    const pr = await github.createPullRequest(owner, repo, title, newBranch, baseBranch, body)

    return NextResponse.json({
      success: true,
      number: pr.number,
      url: pr.url,
      branch: newBranch,
    })
  } catch (error) {
    console.error('Failed to create multi-file PR:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create multi-file PR' },
      { status: 500 }
    )
  }
}
