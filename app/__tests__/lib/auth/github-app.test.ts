/**
 * Tests for GitHub App Authentication
 *
 * Critical security requirements:
 * - Private key must NEVER appear in logs
 * - Access tokens must NEVER appear in logs
 * - Refresh tokens must NEVER appear in logs
 *
 * This test suite validates authentication flow and security measures.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mockLoggerModule } from '../../helpers/mocks'

// Mock logger to capture log calls
const mockLoggerInstance = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  trace: vi.fn(),
  fatal: vi.fn(),
  child: vi.fn().mockReturnThis(),
}

const mockLogger = {
  ...mockLoggerModule(),
  logger: mockLoggerInstance,
  baseLogger: mockLoggerInstance,
}

vi.mock('@/lib/logging/logger', () => mockLogger)

// Export for test access

// Mock @octokit/app
vi.mock('@octokit/app', () => ({
  App: class MockApp {
    oauth = {
      createToken: vi.fn().mockResolvedValue({
        authentication: {
          token: 'gho_test_token_1234567890',
          expiresAt: '2025-12-31T23:59:59Z',
          refreshToken: 'ghr_test_refresh_1234567890',
          refreshTokenExpiresAt: '2026-12-31T23:59:59Z',
        },
      }),
      refreshToken: vi.fn().mockResolvedValue({
        authentication: {
          token: 'gho_refreshed_token_1234567890',
          expiresAt: '2025-12-31T23:59:59Z',
          refreshToken: 'ghr_refreshed_refresh_1234567890',
          refreshTokenExpiresAt: '2026-12-31T23:59:59Z',
        },
      }),
    }
    getInstallationOctokit = vi.fn().mockResolvedValue({
      rest: {
        apps: {
          createInstallationAccessToken: vi.fn().mockResolvedValue({
            data: { token: 'ghs_installation_token_1234567890' },
          }),
        },
      },
    })
  },
}))

// Mock @octokit/rest
vi.mock('@octokit/rest', () => ({
  Octokit: class MockOctokit {
    rest = {
      apps: {
        listInstallationsForAuthenticatedUser: vi.fn().mockResolvedValue({
          data: {
            installations: [
              { id: 12345, account: { login: 'test-org' } },
              { id: 67890, account: { login: 'test-user' } },
            ],
          },
        }),
      },
    }
  },
}))

describe('GitHub App Authentication', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    // Set up valid GitHub App environment variables
    process.env = {
      ...originalEnv,
      GITHUB_APP_ID: '123456',
      GITHUB_APP_PRIVATE_KEY: '-----BEGIN RSA PRIVATE KEY-----\\nMIIEpAIBAAKCAQEA...\\n-----END RSA PRIVATE KEY-----',
      GITHUB_APP_CLIENT_ID: 'Iv1.abc123def456',
      GITHUB_APP_CLIENT_SECRET: 'secret_abc123def456ghi789',
      GITHUB_APP_SLUG: 'my-test-app',
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('Configuration', () => {
    it('should initialize when all credentials are provided', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      expect(auth.isConfigured()).toBe(true)
    })

    it('should not initialize when credentials are missing', async () => {
      delete process.env.GITHUB_APP_ID
      delete process.env.GITHUB_APP_PRIVATE_KEY

      // Force re-import to get new instance
      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      expect(auth.isConfigured()).toBe(false)
    })

    it('should handle escaped newlines in private key', async () => {
      const privateKeyWithEscaped = '-----BEGIN RSA PRIVATE KEY-----\\nline1\\nline2\\n-----END RSA PRIVATE KEY-----'
      process.env.GITHUB_APP_PRIVATE_KEY = privateKeyWithEscaped

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      // Verify it's configured (which means private key was processed correctly)
      expect(auth.isConfigured()).toBe(true)
    })

    it('should provide installation URL', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      const url = auth.getInstallationUrl()
      expect(url).toBe('https://github.com/apps/my-test-app/installations/new')
    })

    it('should throw when getting installation URL without CLIENT_ID', async () => {
      delete process.env.GITHUB_APP_CLIENT_ID

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      expect(() => auth.getInstallationUrl()).toThrow('GITHUB_APP_CLIENT_ID not configured')
    })

    it('should throw when calling getApp on unconfigured instance', async () => {
      delete process.env.GITHUB_APP_ID

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      expect(() => auth.getApp()).toThrow('GitHub App not configured')
    })
  })

  describe('OAuth Flow', () => {
    it('should exchange OAuth code for token', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      const result = await auth.exchangeCode('oauth_code_12345')

      expect(result).toEqual({
        token: 'gho_test_token_1234567890',
        expiresAt: '2025-12-31T23:59:59Z',
        refreshToken: 'ghr_test_refresh_1234567890',
        refreshTokenExpiresAt: '2026-12-31T23:59:59Z',
      })
    })

    it('should throw when exchanging code without configuration', async () => {
      delete process.env.GITHUB_APP_ID

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      await expect(async () => {
        await auth.exchangeCode('oauth_code_12345')
      }).rejects.toThrow('GitHub App not configured')
    })

    it('should refresh expired token', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      const result = await auth.refreshToken('ghr_old_refresh_token')

      expect(result).toEqual({
        token: 'gho_refreshed_token_1234567890',
        expiresAt: '2025-12-31T23:59:59Z',
        refreshToken: 'ghr_refreshed_refresh_1234567890',
        refreshTokenExpiresAt: '2026-12-31T23:59:59Z',
      })
    })

    it('should throw when refreshing token without configuration', async () => {
      delete process.env.GITHUB_APP_PRIVATE_KEY

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      await expect(async () => {
        await auth.refreshToken('ghr_refresh_token')
      }).rejects.toThrow('GitHub App not configured')
    })
  })

  describe('Installation Token', () => {
    it('should get installation token for repository access', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      const token = await auth.getInstallationToken(12345)

      expect(token).toBe('ghs_installation_token_1234567890')
    })

    it('should throw when getting installation token without configuration', async () => {
      delete process.env.GITHUB_APP_CLIENT_SECRET

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      await expect(async () => {
        await auth.getInstallationToken(12345)
      }).rejects.toThrow('GitHub App not configured')
    })

    it('should list user installations', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      const installations = await auth.getUserInstallations('gho_user_token')

      expect(installations).toHaveLength(2)
      expect(installations[0]).toEqual({
        id: 12345,
        account: { login: 'test-org' },
      })
      expect(installations[1]).toEqual({
        id: 67890,
        account: { login: 'test-user' },
      })
    })

    it('should throw when listing installations without configuration', async () => {
      delete process.env.GITHUB_APP_ID

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      await expect(async () => {
        await auth.getUserInstallations('gho_user_token')
      }).rejects.toThrow('GitHub App not configured')
    })
  })

  describe('Security: Private Key Protection', () => {
    it('should NEVER log private key in any form', async () => {
      const privateKey = '-----BEGIN RSA PRIVATE KEY-----\\nMIIEpAIBAAKCAQEA...\\n-----END RSA PRIVATE KEY-----'
      process.env.GITHUB_APP_PRIVATE_KEY = privateKey

      const { createLogger } = await import('@/lib/logging/logger')
      const logger = createLogger({ module: 'github-app-auth' })

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      new GitHubAppAuth()

      // Check all log calls
      const allCalls = [
        ...logger.info.mock.calls,
        ...logger.error.mock.calls,
        ...logger.warn.mock.calls,
        ...logger.debug.mock.calls,
      ]

      for (const call of allCalls) {
        const callStr = JSON.stringify(call)

        // Should not contain private key
        expect(callStr).not.toContain('BEGIN RSA PRIVATE KEY')
        expect(callStr).not.toContain('BEGIN PRIVATE KEY')
        expect(callStr).not.toContain('MIIEpAIBAAKCAQEA')

        // Should not contain the actual private key value
        expect(callStr).not.toContain(privateKey)
        expect(callStr).not.toContain(privateKey.replace(/\\n/g, '\n'))
      }
    })

    it('should NEVER log access tokens', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      const { createLogger } = await import('@/lib/logging/logger')
      const logger = createLogger({ module: 'github-app-auth' })

      await auth.exchangeCode('oauth_code_12345')

      // Check all log calls
      const allCalls = [
        ...logger.info.mock.calls,
        ...logger.error.mock.calls,
        ...logger.warn.mock.calls,
        ...logger.debug.mock.calls,
      ]

      for (const call of allCalls) {
        const callStr = JSON.stringify(call)

        // Should not contain tokens
        expect(callStr).not.toContain('gho_test_token_1234567890')
        expect(callStr).not.toContain('gho_')
        expect(callStr).not.toContain('ghr_')
        expect(callStr).not.toContain('ghs_')
      }
    })

    it('should NEVER log refresh tokens', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      const { createLogger } = await import('@/lib/logging/logger')
      const logger = createLogger({ module: 'github-app-auth' })

      await auth.refreshToken('ghr_old_refresh_token')

      // Check all log calls
      const allCalls = [
        ...logger.info.mock.calls,
        ...logger.error.mock.calls,
        ...logger.warn.mock.calls,
        ...logger.debug.mock.calls,
      ]

      for (const call of allCalls) {
        const callStr = JSON.stringify(call)

        // Should not contain refresh tokens
        expect(callStr).not.toContain('ghr_old_refresh_token')
        expect(callStr).not.toContain('ghr_refreshed_refresh_1234567890')
        expect(callStr).not.toContain('ghr_')
      }
    })

    it('should NEVER log installation tokens', async () => {
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      const { createLogger } = await import('@/lib/logging/logger')
      const logger = createLogger({ module: 'github-app-auth' })

      await auth.getInstallationToken(12345)

      // Check all log calls
      const allCalls = [
        ...logger.info.mock.calls,
        ...logger.error.mock.calls,
        ...logger.warn.mock.calls,
        ...logger.debug.mock.calls,
      ]

      for (const call of allCalls) {
        const callStr = JSON.stringify(call)

        // Should not contain installation tokens
        expect(callStr).not.toContain('ghs_installation_token_1234567890')
        expect(callStr).not.toContain('ghs_')
      }
    })

    it('should NEVER log client secret', async () => {
      const clientSecret = 'secret_abc123def456ghi789'
      process.env.GITHUB_APP_CLIENT_SECRET = clientSecret

      const { createLogger } = await import('@/lib/logging/logger')
      const logger = createLogger({ module: 'github-app-auth' })

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      new GitHubAppAuth()

      // Check all log calls
      const allCalls = [
        ...logger.info.mock.calls,
        ...logger.error.mock.calls,
        ...logger.warn.mock.calls,
        ...logger.debug.mock.calls,
      ]

      for (const call of allCalls) {
        const callStr = JSON.stringify(call)

        // Should not contain client secret
        expect(callStr).not.toContain(clientSecret)
        expect(callStr).not.toContain('secret_')
      }
    })
  })

  describe('Error Handling', () => {
    it('should throw when not configured before OAuth operations', async () => {
      delete process.env.GITHUB_APP_ID

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      await expect(async () => {
        await auth.exchangeCode('code')
      }).rejects.toThrow('GitHub App not configured')
    })

    it('should throw when not configured before installation operations', async () => {
      delete process.env.GITHUB_APP_PRIVATE_KEY

      vi.resetModules()
      const { GitHubAppAuth } = await import('@/lib/auth/github-app')
      const auth = new GitHubAppAuth()

      await expect(async () => {
        await auth.getInstallationToken(12345)
      }).rejects.toThrow('GitHub App not configured')
    })
  })
})
