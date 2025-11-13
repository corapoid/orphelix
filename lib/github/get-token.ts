import { auth } from '@/lib/auth/github-auth'
import { cookies } from 'next/headers'

/**
 * Universal function to get GitHub token from either OAuth or GitHub App
 * Supports both authentication methods
 */
export async function getGitHubToken(): Promise<string | null> {
  // Try GitHub App first (recommended method)
  const cookieStore = await cookies()
  const githubAppToken = cookieStore.get('github_app_token')?.value

  if (githubAppToken) {
    return githubAppToken
  }

  // Fall back to OAuth (legacy method)
  try {
    const session = await auth()
    if (session?.accessToken) {
      return session.accessToken
    }
  } catch (error) {
    console.error('Failed to get OAuth session:', error)
  }

  return null
}
