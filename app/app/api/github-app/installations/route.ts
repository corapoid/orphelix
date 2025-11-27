import { NextResponse } from 'next/server'
import { githubApp } from '@/lib/auth/github-app'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('github_app_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get user's installations
    const installations = await githubApp.getUserInstallations(token)

    // Get repositories for each installation
    const { Octokit } = await import('@octokit/rest')
    const octokit = new Octokit({ auth: token })

    const installationsWithRepos = await Promise.all(
      installations.map(async (installation) => {
        try {
          const { data } = await octokit.rest.apps.listInstallationReposForAuthenticatedUser({
            installation_id: installation.id,
          })

          const account = installation.account
          const accountLogin = account && 'login' in account ? account.login : account?.name || ''
          const accountType = account && 'type' in account ? account.type : 'Organization'

          return {
            id: installation.id,
            account: {
              login: accountLogin,
              avatar_url: account?.avatar_url,
              type: accountType,
            },
            repositories: data.repositories.map((repo) => ({
              id: repo.id,
              name: repo.name,
              full_name: repo.full_name,
              owner: repo.owner.login,
              private: repo.private,
              default_branch: repo.default_branch,
            })),
          }
        } catch (error) {
          console.error(`Error fetching repos for installation ${installation.id}:`, error)
          return {
            id: installation.id,
            account: installation.account,
            repositories: [],
          }
        }
      })
    )

    return NextResponse.json(installationsWithRepos)
  } catch (error) {
    console.error('Error fetching installations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch installations' },
      { status: 500 }
    )
  }
}
