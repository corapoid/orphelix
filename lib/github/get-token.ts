import { cookies } from 'next/headers'

/**
 * Get GitHub App token from cookies
 * Returns the GitHub App installation token
 */
export async function getGitHubToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const githubAppToken = cookieStore.get('github_app_token')?.value

  return githubAppToken || null
}
