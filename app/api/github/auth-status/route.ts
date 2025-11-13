import { NextResponse } from 'next/server'
import { getGitHubToken } from '@/lib/github/get-token'

/**
 * Check if user is authenticated with either GitHub App or OAuth
 */
export async function GET() {
  try {
    const token = await getGitHubToken()

    return NextResponse.json({
      authenticated: !!token,
      hasToken: !!token
    })
  } catch (error) {
    console.error('Failed to check auth status:', error)
    return NextResponse.json({
      authenticated: false,
      hasToken: false
    })
  }
}
