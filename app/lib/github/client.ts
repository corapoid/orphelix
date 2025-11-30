import { Octokit } from '@octokit/rest'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'github-client' })

export interface YamlFile {
  name: string
  path: string
  sha: string
  type: 'file' | 'dir'
}

export interface KustomizeStructure {
  hasKustomization: boolean
  basePath: string | null
  overlays: string[]
  baseFiles: YamlFile[]
  overlayFiles: Record<string, YamlFile[]>
}

export class GitHubClient {
  private octokit: Octokit

  constructor(accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken })
  }

  /**
   * List user's repositories
   */
  async listRepositories(): Promise<Array<{ owner: string; repo: string; fullName: string; defaultBranch: string }>> {
    const { data } = await this.octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    })

    return data.map((repo) => ({
      owner: repo.owner.login,
      repo: repo.name,
      fullName: repo.full_name,
      defaultBranch: repo.default_branch || 'main',
    }))
  }

  /**
   * List YAML files in repository (recursive)
   */
  async listYamlFiles(
    owner: string,
    repo: string,
    path: string = '',
    ref: string = 'main'
  ): Promise<YamlFile[]> {
    const files: YamlFile[] = []

    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path,
        ref,
      })

      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.type === 'file' && (item.name.endsWith('.yaml') || item.name.endsWith('.yml'))) {
            files.push({
              name: item.name,
              path: item.path,
              sha: item.sha!,
              type: 'file',
            })
          } else if (item.type === 'dir') {
            // Recursively search subdirectories
            const subFiles = await this.listYamlFiles(owner, repo, item.path, ref)
            files.push(...subFiles)
          }
        }
      }
    } catch (error) {
      logger.error({ error, owner, repo, path, ref }, 'Error listing YAML files')
    }

    return files
  }

  /**
   * Get file content
   */
  async getFileContent(
    owner: string,
    repo: string,
    path: string,
    ref: string = 'main'
  ): Promise<{ content: string; sha: string }> {
    const { data } = await this.octokit.repos.getContent({
      owner,
      repo,
      path,
      ref,
    })

    if ('content' in data && data.type === 'file') {
      const content = Buffer.from(data.content, 'base64').toString('utf-8')
      return { content, sha: data.sha }
    }

    throw new Error('Path is not a file')
  }

  /**
   * Detect if directory contains kustomization.yaml
   */
  async detectKustomization(owner: string, repo: string, dirPath: string, ref: string = 'main'): Promise<boolean> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: dirPath,
        ref,
      })

      if (Array.isArray(data)) {
        return data.some(
          (item) =>
            item.type === 'file' &&
            (item.name === 'kustomization.yaml' || item.name === 'kustomization.yml')
        )
      }

      return false
    } catch {
      return false
    }
  }

  /**
   * Get Kustomize structure (base + overlays)
   */
  async getKustomizeStructure(
    owner: string,
    repo: string,
    filePath: string,
    ref: string = 'main'
  ): Promise<KustomizeStructure> {
    const dirPath = filePath.substring(0, filePath.lastIndexOf('/'))
    const hasKustomization = await this.detectKustomization(owner, repo, dirPath, ref)

    if (!hasKustomization) {
      return {
        hasKustomization: false,
        basePath: null,
        overlays: [],
        baseFiles: [],
        overlayFiles: {},
      }
    }

    // Check if this is a base or overlay directory
    const isBase = dirPath.endsWith('/base') || !dirPath.includes('overlay')
    let basePath: string
    let overlayParentPath: string

    if (isBase) {
      basePath = dirPath
      overlayParentPath = dirPath.replace('/base', '/overlays')
    } else {
      // We're in an overlay
      const overlayMatch = dirPath.match(/(.*)\/overlays\/([^/]+)/)
      if (overlayMatch) {
        basePath = `${overlayMatch[1]}/base`
        overlayParentPath = `${overlayMatch[1]}/overlays`
      } else {
        basePath = dirPath
        overlayParentPath = `${dirPath}/overlays`
      }
    }

    // Get base files
    const baseFiles = await this.listYamlFiles(owner, repo, basePath, ref)

    // Get overlay directories
    const overlays: string[] = []
    const overlayFiles: Record<string, YamlFile[]> = {}

    try {
      const { data: overlayData } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: overlayParentPath,
        ref,
      })

      if (Array.isArray(overlayData)) {
        const overlayDirs = overlayData.filter((item) => item.type === 'dir').map((item) => item.name)
        overlays.push(...overlayDirs)

        // Get files for each overlay
        for (const overlay of overlayDirs) {
          const overlayPath = `${overlayParentPath}/${overlay}`
          overlayFiles[overlay] = await this.listYamlFiles(owner, repo, overlayPath, ref)
        }
      }
    } catch {
      // No overlays directory - this is fine
    }

    return {
      hasKustomization: true,
      basePath,
      overlays,
      baseFiles,
      overlayFiles,
    }
  }

  /**
   * Merge a pull request
   */
  async mergePullRequest(
    owner: string,
    repo: string,
    pullNumber: number,
    mergeMethod: 'merge' | 'squash' | 'rebase' = 'merge'
  ): Promise<{ merged: boolean; message: string }> {
    try {
      const { data } = await this.octokit.pulls.merge({
        owner,
        repo,
        pull_number: pullNumber,
        merge_method: mergeMethod,
      })

      return {
        merged: true,
        message: data.message,
      }
    } catch (error: unknown) {
      return {
        merged: false,
        message: error instanceof Error ? error.message : 'Failed to merge PR',
      }
    }
  }

  /**
   * List all branches in a repository
   */
  async listBranches(owner: string, repo: string): Promise<Array<{ name: string; protected: boolean }>> {
    const { data } = await this.octokit.repos.listBranches({
      owner,
      repo,
      per_page: 100,
    })

    return data.map((branch) => ({
      name: branch.name,
      protected: branch.protected,
    }))
  }

  /**
   * Get full repository tree (all files and directories)
   */
  async getRepositoryTree(
    owner: string,
    repo: string,
    ref: string = 'main',
    path: string = ''
  ): Promise<Array<{ name: string; path: string; type: 'file' | 'dir'; size?: number }>> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path,
        ref,
      })

      if (!Array.isArray(data)) {
        // Single file
        return [{
          name: data.name,
          path: data.path,
          type: 'file',
          size: data.size,
        }]
      }

      // Directory - return all items
      return data.map((item) => ({
        name: item.name,
        path: item.path,
        type: item.type === 'dir' ? 'dir' : 'file',
        size: item.type === 'file' ? item.size : undefined,
      }))
    } catch (error) {
      logger.error({ error, owner, repo, path, ref }, 'Error getting repository tree')
      return []
    }
  }

  /**
   * Create a new branch
   */
  async createBranch(
    owner: string,
    repo: string,
    baseBranch: string,
    newBranch: string
  ): Promise<void> {
    const { data: ref } = await this.octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    })

    await this.octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranch}`,
      sha: ref.object.sha,
    })
  }

  /**
   * Commit file changes
   */
  async commitFile(
    owner: string,
    repo: string,
    branch: string,
    path: string,
    content: string,
    sha: string,
    message: string
  ): Promise<void> {
    await this.octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      branch,
      sha,
    })
  }

  /**
   * Create Pull Request
   */
  async createPullRequest(
    owner: string,
    repo: string,
    title: string,
    head: string,
    base: string,
    body: string
  ): Promise<{ number: number; url: string }> {
    const { data } = await this.octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body,
    })

    return {
      number: data.number,
      url: data.html_url,
    }
  }

  /**
   * Check if PR is merged
   */
  async isPullRequestMerged(owner: string, repo: string, prNumber: number): Promise<boolean> {
    try {
      await this.octokit.pulls.checkIfMerged({
        owner,
        repo,
        pull_number: prNumber,
      })
      return true
    } catch {
      return false
    }
  }

  /**
   * List open PRs for a specific file
   */
  async getOpenPRsForFile(
    owner: string,
    repo: string,
    filePath: string
  ): Promise<Array<{ number: number; title: string; url: string }>> {
    const { data: pulls } = await this.octokit.pulls.list({
      owner,
      repo,
      state: 'open',
      per_page: 100,
    })

    const prsForFile = []

    for (const pull of pulls) {
      const { data: files } = await this.octokit.pulls.listFiles({
        owner,
        repo,
        pull_number: pull.number,
      })

      if (files.some((file) => file.filename === filePath)) {
        prsForFile.push({
          number: pull.number,
          title: pull.title,
          url: pull.html_url,
        })
      }
    }

    return prsForFile
  }
}
