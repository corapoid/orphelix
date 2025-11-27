import { NextResponse } from 'next/server'
import { GitHubSettingsService } from '@/lib/db/services'

export async function GET() {
  try {
    const settings = GitHubSettingsService.get()
    const pendingPRs = GitHubSettingsService.getPendingPRs()
    const editBasket = GitHubSettingsService.getEditBasket()

    return NextResponse.json({
      ...settings,
      pendingPRs,
      editBasket,
    })
  } catch (error) {
    console.error('Failed to get GitHub settings:', error)
    return NextResponse.json({ error: 'Failed to get GitHub settings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (data.repo) {
      GitHubSettingsService.update({
        owner: data.repo.owner,
        repo: data.repo.repo,
        branch: data.repo.branch,
      })
    }

    if (data.branch) {
      GitHubSettingsService.update({ branch: data.branch })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update GitHub settings:', error)
    return NextResponse.json({ error: 'Failed to update GitHub settings' }, { status: 500 })
  }
}
