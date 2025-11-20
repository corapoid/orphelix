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

    // Get repositories for all installations
    const { Octokit } = await import('@octokit/rest')
    const octokit = new Octokit({ auth: token })

    const allRepositories = []

    for (const installation of installations) {
      try {
        const { data } = await octokit.rest.apps.listInstallationReposForAuthenticatedUser({
          installation_id: installation.id,
        })

        allRepositories.push(
          ...data.repositories.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            owner: {
              login: repo.owner.login,
              avatar_url: repo.owner.avatar_url,
            },
            default_branch: repo.default_branch,
            private: repo.private,
          }))
        )
      } catch (error) {
        console.error(`Error fetching repos for installation ${installation.id}:`, error)
      }
    }

    return NextResponse.json({ repositories: allRepositories })
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}
