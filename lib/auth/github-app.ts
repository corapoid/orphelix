import { App } from '@octokit/app'

// GitHub App authentication (not OAuth)
// This allows users to grant access to specific repositories only
export class GitHubAppAuth {
  private app: App | null = null

  constructor() {
    const appId = process.env.GITHUB_APP_ID
    const privateKey = process.env.GITHUB_APP_PRIVATE_KEY
    const clientId = process.env.GITHUB_APP_CLIENT_ID
    const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET

    if (!appId || !privateKey || !clientId || !clientSecret) {
      console.warn('GitHub App credentials not configured')
      return
    }

    this.app = new App({
      appId,
      privateKey: privateKey.replace(/\\n/g, '\n'), // Handle escaped newlines
      oauth: {
        clientId,
        clientSecret,
      },
    })
  }

  isConfigured(): boolean {
    return this.app !== null
  }

  getApp(): App {
    if (!this.app) {
      throw new Error('GitHub App not configured')
    }
    return this.app
  }

  // Get OAuth URL for user to install the app
  getInstallationUrl(): string {
    const clientId = process.env.GITHUB_APP_CLIENT_ID
    if (!clientId) {
      throw new Error('GITHUB_APP_CLIENT_ID not configured')
    }
    return `https://github.com/apps/${process.env.GITHUB_APP_SLUG}/installations/new`
  }

  // Exchange code for user access token (after OAuth callback)
  async exchangeCode(code: string): Promise<{
    token: string
    expiresAt: string
    refreshToken: string
    refreshTokenExpiresAt: string
  }> {
    if (!this.app) {
      throw new Error('GitHub App not configured')
    }

    const result = await this.app.oauth.createToken({
      code,
    })

    return {
      token: result.authentication.token,
      expiresAt: result.authentication.expiresAt || '',
      refreshToken: result.authentication.refreshToken || '',
      refreshTokenExpiresAt: result.authentication.refreshTokenExpiresAt || '',
    }
  }

  // Refresh an expired user access token
  async refreshToken(refreshToken: string): Promise<{
    token: string
    expiresAt: string
    refreshToken: string
    refreshTokenExpiresAt: string
  }> {
    if (!this.app) {
      throw new Error('GitHub App not configured')
    }

    const result = await this.app.oauth.refreshToken({
      refreshToken,
    })

    return {
      token: result.authentication.token,
      expiresAt: result.authentication.expiresAt || '',
      refreshToken: result.authentication.refreshToken || '',
      refreshTokenExpiresAt: result.authentication.refreshTokenExpiresAt || '',
    }
  }

  // Get installation token for accessing repositories
  async getInstallationToken(installationId: number): Promise<string> {
    if (!this.app) {
      throw new Error('GitHub App not configured')
    }

    const octokit = await this.app.getInstallationOctokit(installationId)
    // @ts-expect-error - Octokit types are complex
    const { data } = await octokit.rest.apps.createInstallationAccessToken({
      installation_id: installationId,
    })

    return data.token
  }

  // Get user's installations (which orgs/accounts have the app installed)
  async getUserInstallations(userToken: string): Promise<any[]> {
    if (!this.app) {
      throw new Error('GitHub App not configured')
    }

    const { Octokit } = await import('@octokit/rest')
    const octokit = new Octokit({ auth: userToken })

    const { data } = await octokit.rest.apps.listInstallationsForAuthenticatedUser()
    return data.installations
  }
}

export const githubApp = new GitHubAppAuth()
