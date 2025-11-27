import { NextResponse } from 'next/server'
import { UserSettingsService } from '@/lib/db/services'

export async function GET() {
  try {
    const settings = UserSettingsService.get()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to get user settings:', error)
    return NextResponse.json({ error: 'Failed to get user settings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    UserSettingsService.update(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update user settings:', error)
    return NextResponse.json({ error: 'Failed to update user settings' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    UserSettingsService.reset()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to reset user settings:', error)
    return NextResponse.json({ error: 'Failed to reset user settings' }, { status: 500 })
  }
}
