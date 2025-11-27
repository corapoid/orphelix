import { NextResponse } from 'next/server'
import { CriticalIssuesService } from '@/lib/db/services'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const resourceType = searchParams.get('resource')

    if (resourceType) {
      const enabled = CriticalIssuesService.isEnabled(resourceType)
      return NextResponse.json({ enabled })
    }

    const enabled = CriticalIssuesService.getEnabled()
    return NextResponse.json(Array.from(enabled))
  } catch (error) {
    console.error('Failed to get critical issues settings:', error)
    return NextResponse.json(
      { error: 'Failed to get critical issues settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { resourceType, enabled } = await request.json()
    CriticalIssuesService.setEnabled(resourceType, enabled)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update critical issues settings:', error)
    return NextResponse.json(
      { error: 'Failed to update critical issues settings' },
      { status: 500 }
    )
  }
}
