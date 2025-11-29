/**
 * Tests for GitHub Client
 *
 * Tests repository operations, file access, and GitHub API integration.
 * Security: Ensures tokens are never logged.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockLoggerModule } from '../../helpers/mocks'

// Mock logger
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


// Mock @octokit/rest
const mockOctokit = {
  repos: {
    listForAuthenticatedUser: vi.fn(),
    getContent: vi.fn(),
    listBranches: vi.fn(),
    createOrUpdateFileContents: vi.fn(),
  },
  git: {
    getRef: vi.fn(),
    createRef: vi.fn(),
  },
  pulls: {
    merge: vi.fn(),
    create: vi.fn(),
    checkIfMerged: vi.fn(),
    list: vi.fn(),
    listFiles: vi.fn(),
  },
}

vi.mock('@octokit/rest', () => ({
  Octokit: class MockOctokit {
    repos = mockOctokit.repos
    git = mockOctokit.git
    pulls = mockOctokit.pulls
  },
}))

describe('GitHub Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Repository Operations', () => {
    it('should list user repositories', async () => {
      mockOctokit.repos.listForAuthenticatedUser.mockResolvedValue({
        data: [
          {
            owner: { login: 'test-user' },
            name: 'my-repo',
            full_name: 'test-user/my-repo',
            default_branch: 'main',
          },
          {
            owner: { login: 'test-user' },
            name: 'another-repo',
            full_name: 'test-user/another-repo',
            default_branch: 'master',
          },
        ],
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const repos = await client.listRepositories()

      expect(repos).toHaveLength(2)
      expect(repos[0]).toEqual({
        owner: 'test-user',
        repo: 'my-repo',
        fullName: 'test-user/my-repo',
        defaultBranch: 'main',
      })
      expect(repos[1]).toEqual({
        owner: 'test-user',
        repo: 'another-repo',
        fullName: 'test-user/another-repo',
        defaultBranch: 'master',
      })
    })

    it('should use default branch "main" if not specified', async () => {
      mockOctokit.repos.listForAuthenticatedUser.mockResolvedValue({
        data: [
          {
            owner: { login: 'test-user' },
            name: 'repo-without-branch',
            full_name: 'test-user/repo-without-branch',
            default_branch: null,
          },
        ],
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const repos = await client.listRepositories()

      expect(repos[0].defaultBranch).toBe('main')
    })
  })

  describe('File Operations', () => {
    it('should list YAML files in repository', async () => {
      mockOctokit.repos.getContent.mockResolvedValue({
        data: [
          {
            name: 'deployment.yaml',
            path: 'k8s/deployment.yaml',
            type: 'file',
            sha: 'abc123',
          },
          {
            name: 'service.yml',
            path: 'k8s/service.yml',
            type: 'file',
            sha: 'def456',
          },
          {
            name: 'README.md',
            path: 'k8s/README.md',
            type: 'file',
            sha: 'ghi789',
          },
        ],
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const files = await client.listYamlFiles('test-user', 'my-repo', 'k8s')

      expect(files).toHaveLength(2)
      expect(files[0]).toEqual({
        name: 'deployment.yaml',
        path: 'k8s/deployment.yaml',
        type: 'file',
        sha: 'abc123',
      })
      expect(files[1]).toEqual({
        name: 'service.yml',
        path: 'k8s/service.yml',
        type: 'file',
        sha: 'def456',
      })
    })

    it('should get file content', async () => {
      const content = 'apiVersion: v1\nkind: Deployment'
      const base64Content = Buffer.from(content).toString('base64')

      mockOctokit.repos.getContent.mockResolvedValue({
        data: {
          name: 'deployment.yaml',
          path: 'k8s/deployment.yaml',
          type: 'file',
          sha: 'abc123',
          content: base64Content,
        },
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const result = await client.getFileContent('test-user', 'my-repo', 'k8s/deployment.yaml')

      expect(result).toEqual({
        content,
        sha: 'abc123',
      })
    })

    it('should throw error when path is not a file', async () => {
      mockOctokit.repos.getContent.mockResolvedValue({
        data: {
          name: 'k8s',
          path: 'k8s',
          type: 'dir',
        },
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      await expect(async () => {
        await client.getFileContent('test-user', 'my-repo', 'k8s')
      }).rejects.toThrow('Path is not a file')
    })
  })

  describe('Kustomize Detection', () => {
    it('should detect kustomization.yaml', async () => {
      mockOctokit.repos.getContent.mockResolvedValue({
        data: [
          { name: 'kustomization.yaml', type: 'file' },
          { name: 'deployment.yaml', type: 'file' },
        ],
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const hasKustomize = await client.detectKustomization('test-user', 'my-repo', 'k8s/base')

      expect(hasKustomize).toBe(true)
    })

    it('should detect kustomization.yml', async () => {
      mockOctokit.repos.getContent.mockResolvedValue({
        data: [
          { name: 'kustomization.yml', type: 'file' },
          { name: 'deployment.yaml', type: 'file' },
        ],
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const hasKustomize = await client.detectKustomization('test-user', 'my-repo', 'k8s/base')

      expect(hasKustomize).toBe(true)
    })

    it('should return false when no kustomization file', async () => {
      mockOctokit.repos.getContent.mockResolvedValue({
        data: [
          { name: 'deployment.yaml', type: 'file' },
          { name: 'service.yaml', type: 'file' },
        ],
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const hasKustomize = await client.detectKustomization('test-user', 'my-repo', 'k8s')

      expect(hasKustomize).toBe(false)
    })

    it('should return false on error', async () => {
      mockOctokit.repos.getContent.mockRejectedValue(new Error('Not found'))

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const hasKustomize = await client.detectKustomization('test-user', 'my-repo', 'nonexistent')

      expect(hasKustomize).toBe(false)
    })
  })

  describe('Branch Operations', () => {
    it('should list branches', async () => {
      mockOctokit.repos.listBranches.mockResolvedValue({
        data: [
          { name: 'main', protected: true },
          { name: 'develop', protected: false },
          { name: 'feature/new-feature', protected: false },
        ],
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const branches = await client.listBranches('test-user', 'my-repo')

      expect(branches).toHaveLength(3)
      expect(branches[0]).toEqual({ name: 'main', protected: true })
      expect(branches[1]).toEqual({ name: 'develop', protected: false })
    })

    it('should create new branch', async () => {
      mockOctokit.git.getRef.mockResolvedValue({
        data: { object: { sha: 'base_sha_123' } },
      })
      mockOctokit.git.createRef.mockResolvedValue({})

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      await client.createBranch('test-user', 'my-repo', 'main', 'feature/new-feature')

      expect(mockOctokit.git.getRef).toHaveBeenCalledWith({
        owner: 'test-user',
        repo: 'my-repo',
        ref: 'heads/main',
      })
      expect(mockOctokit.git.createRef).toHaveBeenCalledWith({
        owner: 'test-user',
        repo: 'my-repo',
        ref: 'refs/heads/feature/new-feature',
        sha: 'base_sha_123',
      })
    })
  })

  describe('Pull Request Operations', () => {
    it('should create pull request', async () => {
      mockOctokit.pulls.create.mockResolvedValue({
        data: {
          number: 42,
          html_url: 'https://github.com/test-user/my-repo/pull/42',
        },
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const pr = await client.createPullRequest(
        'test-user',
        'my-repo',
        'Update deployment',
        'feature/update',
        'main',
        'This PR updates the deployment configuration'
      )

      expect(pr).toEqual({
        number: 42,
        url: 'https://github.com/test-user/my-repo/pull/42',
      })
    })

    it('should merge pull request', async () => {
      mockOctokit.pulls.merge.mockResolvedValue({
        data: { message: 'Pull Request successfully merged' },
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const result = await client.mergePullRequest('test-user', 'my-repo', 42, 'squash')

      expect(result).toEqual({
        merged: true,
        message: 'Pull Request successfully merged',
      })
    })

    it('should handle merge failure', async () => {
      mockOctokit.pulls.merge.mockRejectedValue(new Error('Cannot merge - conflicts'))

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const result = await client.mergePullRequest('test-user', 'my-repo', 42)

      expect(result).toEqual({
        merged: false,
        message: 'Cannot merge - conflicts',
      })
    })

    it('should check if PR is merged', async () => {
      mockOctokit.pulls.checkIfMerged.mockResolvedValue({})

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const isMerged = await client.isPullRequestMerged('test-user', 'my-repo', 42)

      expect(isMerged).toBe(true)
    })

    it('should return false when PR is not merged', async () => {
      mockOctokit.pulls.checkIfMerged.mockRejectedValue(new Error('Not merged'))

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const isMerged = await client.isPullRequestMerged('test-user', 'my-repo', 42)

      expect(isMerged).toBe(false)
    })

    it('should get open PRs for file', async () => {
      mockOctokit.pulls.list.mockResolvedValue({
        data: [
          { number: 10, title: 'Update config', html_url: 'https://github.com/test/repo/pull/10' },
          { number: 11, title: 'Fix bug', html_url: 'https://github.com/test/repo/pull/11' },
        ],
      })

      mockOctokit.pulls.listFiles
        .mockResolvedValueOnce({
          data: [
            { filename: 'k8s/deployment.yaml' },
            { filename: 'k8s/service.yaml' },
          ],
        })
        .mockResolvedValueOnce({
          data: [{ filename: 'README.md' }],
        })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const prs = await client.getOpenPRsForFile('test-user', 'my-repo', 'k8s/deployment.yaml')

      expect(prs).toHaveLength(1)
      expect(prs[0]).toEqual({
        number: 10,
        title: 'Update config',
        url: 'https://github.com/test/repo/pull/10',
      })
    })
  })

  describe('Commit Operations', () => {
    it('should commit file changes', async () => {
      mockOctokit.repos.createOrUpdateFileContents.mockResolvedValue({})

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const content = 'apiVersion: v1\nkind: Deployment'
      await client.commitFile(
        'test-user',
        'my-repo',
        'feature/update',
        'k8s/deployment.yaml',
        content,
        'old_sha_123',
        'Update deployment replicas'
      )

      expect(mockOctokit.repos.createOrUpdateFileContents).toHaveBeenCalledWith({
        owner: 'test-user',
        repo: 'my-repo',
        path: 'k8s/deployment.yaml',
        message: 'Update deployment replicas',
        content: Buffer.from(content).toString('base64'),
        branch: 'feature/update',
        sha: 'old_sha_123',
      })
    })
  })

  describe('Repository Tree', () => {
    it('should get repository tree for directory', async () => {
      mockOctokit.repos.getContent.mockResolvedValue({
        data: [
          { name: 'deployment.yaml', path: 'k8s/deployment.yaml', type: 'file', size: 1024 },
          { name: 'base', path: 'k8s/base', type: 'dir' },
        ],
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const tree = await client.getRepositoryTree('test-user', 'my-repo', 'main', 'k8s')

      expect(tree).toHaveLength(2)
      expect(tree[0]).toEqual({
        name: 'deployment.yaml',
        path: 'k8s/deployment.yaml',
        type: 'file',
        size: 1024,
      })
      expect(tree[1]).toEqual({
        name: 'base',
        path: 'k8s/base',
        type: 'dir',
        size: undefined,
      })
    })

    it('should handle single file response', async () => {
      mockOctokit.repos.getContent.mockResolvedValue({
        data: {
          name: 'deployment.yaml',
          path: 'k8s/deployment.yaml',
          type: 'file',
          size: 1024,
        },
      })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const tree = await client.getRepositoryTree('test-user', 'my-repo', 'main', 'k8s/deployment.yaml')

      expect(tree).toHaveLength(1)
      expect(tree[0]).toEqual({
        name: 'deployment.yaml',
        path: 'k8s/deployment.yaml',
        type: 'file',
        size: 1024,
      })
    })

    it('should return empty array on error', async () => {
      mockOctokit.repos.getContent.mockRejectedValue(new Error('Not found'))

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient('gho_test_token')

      const tree = await client.getRepositoryTree('test-user', 'my-repo', 'main', 'nonexistent')

      expect(tree).toEqual([])
    })
  })

  describe('Security: Token Protection', () => {
    it('should NEVER log access token', async () => {
      const accessToken = 'gho_super_secret_token_1234567890'

      mockOctokit.repos.listForAuthenticatedUser.mockResolvedValue({ data: [] })

      const { createLogger } = await import('@/lib/logging/logger')
      const logger = createLogger({ module: 'github-client' })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient(accessToken)
      await client.listRepositories()

      // Check all log calls
      const allCalls = [
        ...logger.info.mock.calls,
        ...logger.error.mock.calls,
        ...logger.warn.mock.calls,
        ...logger.debug.mock.calls,
      ]

      for (const call of allCalls) {
        const callStr = JSON.stringify(call)

        // Should not contain access token
        expect(callStr).not.toContain(accessToken)
        expect(callStr).not.toContain('gho_')
      }
    })

    it('should NEVER log token in error messages', async () => {
      const accessToken = 'gho_secret_token_abc123'

      mockOctokit.repos.getContent.mockRejectedValue(new Error('API error'))

      const { createLogger } = await import('@/lib/logging/logger')
      const logger = createLogger({ module: 'github-client' })

      const { GitHubClient } = await import('@/lib/github/client')
      const client = new GitHubClient(accessToken)

      await client.listYamlFiles('test-user', 'my-repo', 'k8s')

      // Check error logs
      const errorCalls = logger.error.mock.calls

      for (const call of errorCalls) {
        const callStr = JSON.stringify(call)

        // Should not contain token
        expect(callStr).not.toContain(accessToken)
        expect(callStr).not.toContain('gho_')
      }
    })
  })
})
