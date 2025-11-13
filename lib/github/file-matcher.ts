/**
 * Intelligent File Matcher with Pattern Matching
 *
 * Matches Kubernetes resources to YAML files using:
 * - Name normalization (case, separators: -, _, etc.)
 * - Directory path matching
 * - Namespace matching
 * - YAML content comparison (when cluster YAML provided)
 * - Scoring system for best match
 */

import { compareYaml } from './yaml-comparator'

export interface YamlFile {
  path: string
  name: string
  sha?: string
  content?: string // Optional: YAML content for comparison
}

export interface KubernetesResource {
  name: string
  namespace: string
  type: 'deployment' | 'configmap' | 'secret'
  clusterYaml?: string // Optional: YAML from cluster for content comparison
}

export interface MatchResult {
  file: YamlFile | null
  method: 'content' | 'exact' | 'directory' | 'namespace' | 'fuzzy' | 'none'
  confidence?: number
  score?: number
}

interface ScoredMatch {
  file: YamlFile
  score: number
  method: string
}

/**
 * Normalize a name for comparison
 * - Lowercase
 * - Remove separators: -, _, spaces
 * - Remove common prefixes/suffixes
 */
function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/[-_\s]/g, '') // Remove separators
    .replace(/^(k8s|kube|app|service|svc|deploy|deployment|cm|configmap|config|secret|sec)[-_]?/i, '') // Remove prefixes
    .replace(/[-_]?(deployment|deploy|service|svc|configmap|cm|config|secret|sec)$/i, '') // Remove suffixes
    .trim()
}

/**
 * Extract directory names from path
 * e.g., "k8s/base/deployments/nginx/deployment.yaml" -> ["nginx", "deployments", "base", "k8s"]
 */
function extractDirectories(path: string): string[] {
  const parts = path.split('/')
  // Remove filename, return directories in reverse order (closest first)
  return parts.slice(0, -1).reverse()
}

/**
 * Calculate similarity score between two normalized strings
 * Returns 0-100 score
 */
function similarity(a: string, b: string): number {
  if (a === b) return 100
  if (a.includes(b) || b.includes(a)) return 80

  // Levenshtein-like simple check
  const longer = a.length > b.length ? a : b
  const shorter = a.length > b.length ? b : a

  if (longer.length === 0) return 100

  let matches = 0
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) matches++
  }

  return Math.floor((matches / longer.length) * 100)
}

/**
 * Check if file likely contains a specific resource type
 * Based on filename and path patterns
 */
function matchesResourceType(file: YamlFile, resourceType: string): boolean {
  const path = file.path.toLowerCase()
  const name = file.name.toLowerCase()

  // Blacklist: files that are NOT Kubernetes resources
  const blacklist = [
    'kustomization.yaml',
    'kustomization.yml',
    'kustomize.yaml',
    'kustomize.yml',
    '.helmignore',
    'chart.yaml',
    'chart.yml',
    'values.yaml',
    'values.yml',
    'readme.md',
    'readme.txt',
  ]

  if (blacklist.includes(name)) {
    return false
  }

  // Define patterns for each resource type
  const patterns: Record<string, string[]> = {
    deployment: ['deployment', 'deploy'],
    configmap: ['configmap', 'config-map', 'cm'],
    secret: ['secret', 'sec'],
  }

  const typePatterns = patterns[resourceType] || []

  // Check if filename or path contains type indicators
  for (const pattern of typePatterns) {
    if (name.includes(pattern) || path.includes(`/${pattern}/`) || path.includes(`/${pattern}s/`)) {
      return true
    }
  }

  // If filename explicitly mentions another type, exclude it
  const otherTypes = Object.keys(patterns).filter(t => t !== resourceType)
  for (const otherType of otherTypes) {
    for (const pattern of patterns[otherType]) {
      // Exclude files that explicitly mention another resource type
      if (name.includes(pattern)) {
        return false
      }
    }
  }

  // Default: include (could be generic like "app.yaml")
  return true
}

/**
 * File Matcher class with intelligent pattern matching
 */
export class FileMatcher {
  /**
   * Find the best matching YAML file for a Kubernetes resource
   */
  async findMatchingFile(
    resource: KubernetesResource,
    yamlFiles: YamlFile[]
  ): Promise<MatchResult> {
    // If no files, return immediately
    if (yamlFiles.length === 0) {
      return { file: null, method: 'none', score: 0 }
    }

    console.log(`[FileMatcher] Matching resource: ${resource.name} (${resource.type}) in namespace: ${resource.namespace}`)
    console.log(`[FileMatcher] Total files: ${yamlFiles.length}`)

    // Filter files by resource type first
    const filteredFiles = yamlFiles.filter(f => matchesResourceType(f, resource.type))

    console.log(`[FileMatcher] Files after type filtering: ${filteredFiles.length}`)
    if (filteredFiles.length > 0 && filteredFiles.length <= 10) {
      console.log('[FileMatcher] Filtered files:', filteredFiles.map(f => f.path))
    }

    if (filteredFiles.length === 0) {
      // No files match the resource type - return none
      return { file: null, method: 'none', score: 0 }
    }

    // If only one file matches, return it
    if (filteredFiles.length === 1) {
      console.log(`[FileMatcher] Only one file matches, selecting: ${filteredFiles[0].path}`)
      return { file: filteredFiles[0], method: 'exact', confidence: 1.0, score: 100 }
    }

    // If cluster YAML provided and files have content, use YAML comparison
    if (resource.clusterYaml) {
      console.log('[FileMatcher] Cluster YAML provided, attempting content comparison')
      const filesWithContent = filteredFiles.filter(f => f.content)
      console.log(`[FileMatcher] Files with content: ${filesWithContent.length}`)

      if (filesWithContent.length > 0) {
        const contentMatches = filesWithContent.map(file => ({
          file,
          score: compareYaml(resource.clusterYaml!, file.content!)
        }))

        // Sort by score
        contentMatches.sort((a, b) => b.score - a.score)

        console.log('[FileMatcher] Content comparison scores:')
        contentMatches.slice(0, 5).forEach(m => {
          console.log(`  ${m.file.path}: ${m.score}`)
        })

        const best = contentMatches[0]

        // If content match score is high enough (>= 70), use it
        if (best.score >= 70) {
          console.log(`[FileMatcher] ✓ Content match selected: ${best.file.path} (score: ${best.score})`)
          return {
            file: best.file,
            method: 'content',
            confidence: best.score / 100,
            score: best.score
          }
        } else {
          console.log(`[FileMatcher] Best content score (${best.score}) below threshold (70), falling back to pattern matching`)
        }
      }
    } else {
      console.log('[FileMatcher] No cluster YAML provided, using pattern matching only')
    }

    // Score filtered files using pattern matching
    console.log('[FileMatcher] Using pattern matching to score files')
    const scoredMatches = this.scoreAllFiles(resource, filteredFiles)

    // Sort by score (highest first)
    scoredMatches.sort((a, b) => b.score - a.score)

    // Log top 5 scores
    console.log('[FileMatcher] Pattern matching scores (top 5):')
    scoredMatches.slice(0, 5).forEach(m => {
      console.log(`  ${m.file.path}: ${m.score} (${m.method})`)
    })

    // Get best match
    const bestMatch = scoredMatches[0]

    // If score is too low, don't auto-select
    if (bestMatch.score < 30) {
      console.log(`[FileMatcher] Best score (${bestMatch.score}) below threshold (30), no match`)
      return { file: null, method: 'none', score: bestMatch.score }
    }

    // Determine method based on score
    let method: MatchResult['method'] = 'fuzzy'
    if (bestMatch.score >= 90) method = 'exact'
    else if (bestMatch.score >= 70) method = 'directory'
    else if (bestMatch.score >= 50) method = 'namespace'

    console.log(`[FileMatcher] ✓ Pattern match selected: ${bestMatch.file.path} (score: ${bestMatch.score}, method: ${method})`)

    return {
      file: bestMatch.file,
      method,
      confidence: bestMatch.score / 100,
      score: bestMatch.score,
    }
  }

  /**
   * Score all files against the resource
   */
  private scoreAllFiles(resource: KubernetesResource, files: YamlFile[]): ScoredMatch[] {
    const normalizedResourceName = normalize(resource.name)
    const normalizedNamespace = normalize(resource.namespace)

    return files.map(file => {
      let score = 0
      let method = 'none'

      const fileName = file.name.replace(/\.ya?ml$/i, '') // Remove extension
      const normalizedFileName = normalize(fileName)
      const directories = extractDirectories(file.path)
      const normalizedPath = normalize(file.path)

      // 1. Exact filename match (highest priority)
      if (normalizedFileName === normalizedResourceName) {
        score += 50
        method = 'exact'
      } else if (normalizedFileName.includes(normalizedResourceName)) {
        score += 40
        method = 'filename-partial'
      } else {
        // Similarity score
        const sim = similarity(normalizedFileName, normalizedResourceName)
        score += Math.floor(sim * 0.3) // Max 30 points
      }

      // 2. Directory name matches resource name
      for (let i = 0; i < directories.length; i++) {
        const normalizedDir = normalize(directories[i])
        if (normalizedDir === normalizedResourceName) {
          // Closer directory = higher score
          score += 40 - (i * 5) // First dir: +40, second: +35, etc.
          method = 'directory'
          break
        } else if (normalizedDir.includes(normalizedResourceName) || normalizedResourceName.includes(normalizedDir)) {
          score += 20 - (i * 3)
          if (method === 'none') method = 'directory-partial'
        }
      }

      // 3. Namespace in path
      if (normalizedPath.includes(normalizedNamespace)) {
        score += 15
        if (method === 'none') method = 'namespace'
      }

      // 4. Resource type in path
      const typeKeywords = {
        deployment: ['deployment', 'deploy', 'deployments'],
        configmap: ['configmap', 'config', 'configs', 'cm'],
        secret: ['secret', 'secrets', 'sec'],
      }

      const keywords = typeKeywords[resource.type] || []
      for (const keyword of keywords) {
        if (normalizedPath.includes(keyword)) {
          score += 10
          break
        }
      }

      // 5. Overlay preference (STRONG bonus - overlays are environment-specific)
      if (file.path.includes('/overlays/') || file.path.includes('/overlay/')) {
        score += 30 // Strong preference for overlay files
        if (method === 'none') method = 'overlay'
      } else if (file.path.includes('/base/')) {
        score += 5 // Base gets small bonus (generic configs)
      }

      return { file, score, method }
    })
  }
}

/**
 * Convenience function for quick matching
 */
export async function matchFileToResource(
  resource: KubernetesResource,
  files: YamlFile[]
): Promise<MatchResult> {
  const matcher = new FileMatcher()
  return matcher.findMatchingFile(resource, files)
}
