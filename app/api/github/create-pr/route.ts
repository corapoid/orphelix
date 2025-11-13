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
    const { owner, repo, filePath, content, deploymentName, namespace, baseBranch = 'main' } = body

    if (!owner || !repo || !filePath || !content || !deploymentName || !namespace) {
      return NextResponse.json(
        { error: 'owner, repo, filePath, content, deploymentName and namespace are required' },
        { status: 400 }
      )
    }

    const github = new GitHubClient(token)

    // 1. Get current file SHA
    const { sha } = await github.getFileContent(owner, repo, filePath, baseBranch)

    // 2. Create new branch
    const branchName = `kubevista/${namespace}/${deploymentName}-${Date.now()}`
    await github.createBranch(owner, repo, baseBranch, branchName)

    // 3. Commit changes
    const commitMessage = `Update ${deploymentName} manifest via KubeVista\n\nNamespace: ${namespace}\nFile: ${filePath}`
    await github.commitFile(owner, repo, branchName, filePath, content, sha, commitMessage)

    // 4. Create PR
    const prTitle = `[KubeVista] Update ${namespace}/${deploymentName}`
    const prBody = `## Changes

Updated \`${filePath}\` for deployment **${deploymentName}** in namespace **${namespace}**.

---

🤖 Generated with [KubeVista](https://github.com/yourorg/kubevista)
`

    const pr = await github.createPullRequest(owner, repo, prTitle, branchName, baseBranch, prBody)

    return NextResponse.json({
      success: true,
      pr: {
        number: pr.number,
        url: pr.url,
      },
      branch: branchName,
    })
  } catch (error) {
    console.error('Failed to create PR:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create PR' },
      { status: 500 }
    )
  }
}
