import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()

    // Delete all GitHub App cookies
    cookieStore.delete('github_app_token')
    cookieStore.delete('github_app_refresh_token')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('GitHub App logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}
