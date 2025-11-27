import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/database'

export async function GET() {
  try {
    const db = getDatabase()

    // Get notification settings
    const userSettings = db.prepare('SELECT notifications_enabled FROM user_settings WHERE id = 1').get() as { notifications_enabled: number } | undefined
    const notificationsEnabled = Boolean(userSettings?.notifications_enabled)

    // Get enabled resource types
    const resources = db.prepare('SELECT resource_type FROM critical_issues_settings WHERE enabled = 1').all() as { resource_type: string }[]
    const enabledResources = resources.map(r => r.resource_type)

    return NextResponse.json({
      enabled: notificationsEnabled,
      enabledResources,
      status: notificationsEnabled ? 'active' : 'disabled'
    })
  } catch (error) {
    console.error('Failed to get notification settings:', error)
    return NextResponse.json(
      { error: 'Failed to get notification settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { enabled } = await request.json()

    if (typeof enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'enabled must be a boolean' },
        { status: 400 }
      )
    }

    const db = getDatabase()

    db.prepare(
      'UPDATE user_settings SET notifications_enabled = ? WHERE id = 1'
    ).run(enabled ? 1 : 0)

    return NextResponse.json({
      success: true,
      enabled,
      message: enabled ? 'Notifications enabled' : 'Notifications disabled'
    })
  } catch (error) {
    console.error('Failed to update notification settings:', error)
    return NextResponse.json(
      { error: 'Failed to update notification settings' },
      { status: 500 }
    )
  }
}
