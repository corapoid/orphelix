import { NextResponse } from 'next/server'
import { GitHubSettingsService } from '@/lib/db/services'

export async function GET() {
  try {
    const pendingPRs = GitHubSettingsService.getPendingPRs()
    return NextResponse.json(pendingPRs)
  } catch (error) {
    console.error('Failed to get pending PRs:', error)
    return NextResponse.json({ error: 'Failed to get pending PRs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { deploymentName, namespace, prNumber } = await request.json()
    GitHubSettingsService.setPendingPR(deploymentName, namespace, prNumber)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to set pending PR:', error)
    return NextResponse.json({ error: 'Failed to set pending PR' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const deploymentName = searchParams.get('deploymentName')
    const namespace = searchParams.get('namespace')

    if (!deploymentName || !namespace) {
      return NextResponse.json(
        { error: 'deploymentName and namespace are required' },
        { status: 400 }
      )
    }

    GitHubSettingsService.removePendingPR(deploymentName, namespace)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to remove pending PR:', error)
    return NextResponse.json({ error: 'Failed to remove pending PR' }, { status: 500 })
  }
}
