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
    const filePath = searchParams.get('filePath')
    const ref = searchParams.get('ref') || 'main'

    if (!owner || !repo || !filePath) {
      return NextResponse.json({ error: 'owner, repo and filePath are required' }, { status: 400 })
    }

    const github = new GitHubClient(token)
    const structure = await github.getKustomizeStructure(owner, repo, filePath, ref)

    return NextResponse.json(structure)
  } catch (error) {
    console.error('Failed to fetch kustomize structure:', error)
    return NextResponse.json({ error: 'Failed to fetch kustomize structure' }, { status: 500 })
  }
}
