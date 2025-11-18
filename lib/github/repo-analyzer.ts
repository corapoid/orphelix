/**
 * Repository Structure Analyzer
 *
 * Analyzes GitHub repository structure to detect:
 * - Kustomize usage (base/overlays pattern)
 * - Directory structure (flat, kustomize, helm)
 * - Naming patterns
 * - Namespaces
 */

export interface RepoStructure {
  hasKustomize: boolean
  structure: 'kustomize' | 'flat' | 'helm' | 'unknown'
  baseDir: string | null
  overlayDirs: string[]
  namespaces: string[]
  deploymentDirs: string[]
  serviceDirs: string[]
  commonPatterns: {
    namePrefix?: string
    nameSuffix?: string
    hasEnvironments: boolean
  }
}

interface TreeItem {
  name: string
  path: string
  type: 'file' | 'dir'
}

/**
 * Analyze repository structure
 */
export async function analyzeRepository(
  owner: string,
  repo: string,
  branch: string,
  mode?: 'mock'
): Promise<RepoStructure> {
  const modeParam = mode === 'mock' ? '&mode=mock' : ''

  // Get root directory structure
  const rootResponse = await fetch(
    `/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${modeParam}`
  )

  if (!rootResponse.ok) {
    throw new Error('Failed to fetch repository structure')
  }

  const rootItems: TreeItem[] = await rootResponse.json()

  // Initialize structure
  const structure: RepoStructure = {
    hasKustomize: false,
    structure: 'unknown',
    baseDir: null,
    overlayDirs: [],
    namespaces: [],
    deploymentDirs: [],
    serviceDirs: [],
    commonPatterns: {
      hasEnvironments: false,
    },
  }

  // Look for k8s-related directories
  const k8sDirs = rootItems.filter(item =>
    item.type === 'dir' && (
      item.name.toLowerCase().includes('k8s') ||
      item.name.toLowerCase().includes('kubernetes') ||
      item.name.toLowerCase().includes('manifests') ||
      item.name.toLowerCase().includes('deploy')
    )
  )

  // If no k8s dirs found, check root for YAML files
  if (k8sDirs.length === 0) {
    const hasYamlInRoot = rootItems.some(item =>
      item.type === 'file' && (item.name.endsWith('.yaml') || item.name.endsWith('.yml'))
    )

    if (hasYamlInRoot) {
      structure.structure = 'flat'
      await analyzeDirectory('', rootItems, structure, owner, repo, branch, modeParam)
      return structure
    }

    return structure // Unknown structure
  }

  // Analyze k8s directories
  for (const k8sDir of k8sDirs) {
    const dirResponse = await fetch(
      `/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${encodeURIComponent(k8sDir.path)}${modeParam}`
    )

    if (!dirResponse.ok) continue

    const dirItems: TreeItem[] = await dirResponse.json()

    // Check for Kustomize structure
    const hasKustomization = dirItems.some(item =>
      item.type === 'file' && (
        item.name === 'kustomization.yaml' ||
        item.name === 'kustomization.yml'
      )
    )

    if (hasKustomization) {
      structure.hasKustomize = true
      structure.structure = 'kustomize'
    }

    // Look for base directory
    const baseDir = dirItems.find(item =>
      item.type === 'dir' && item.name === 'base'
    )

    if (baseDir) {
      structure.baseDir = baseDir.path
      structure.structure = 'kustomize'
      structure.hasKustomize = true
    }

    // Look for overlays directory
    const overlaysDir = dirItems.find(item =>
      item.type === 'dir' && (item.name === 'overlays' || item.name === 'environments')
    )

    if (overlaysDir) {
      const overlaysResponse = await fetch(
        `/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${encodeURIComponent(overlaysDir.path)}${modeParam}`
      )

      if (overlaysResponse.ok) {
        const overlayItems: TreeItem[] = await overlaysResponse.json()
        structure.overlayDirs = overlayItems
          .filter(item => item.type === 'dir')
          .map(item => item.path)

        if (structure.overlayDirs.length > 0) {
          structure.commonPatterns.hasEnvironments = true
        }
      }
    }

    // Analyze subdirectories
    await analyzeDirectory(k8sDir.path, dirItems, structure, owner, repo, branch, modeParam)
  }

  // If we found Kustomize indicators but structure is still unknown, set it
  if (structure.hasKustomize && structure.structure === 'unknown') {
    structure.structure = 'kustomize'
  }

  // If no Kustomize but we have deployments/services dirs, it's flat structure
  if (!structure.hasKustomize && (structure.deploymentDirs.length > 0 || structure.serviceDirs.length > 0)) {
    structure.structure = 'flat'
  }

  return structure
}

/**
 * Analyze a directory and extract patterns
 */
async function analyzeDirectory(
  _basePath: string,
  items: TreeItem[],
  structure: RepoStructure,
  owner: string,
  repo: string,
  branch: string,
  modeParam: string
): Promise<void> {
  for (const item of items) {
    if (item.type !== 'dir') continue

    const dirName = item.name.toLowerCase()

    // Check for deployment directories
    if (dirName.includes('deployment') || dirName.includes('deploy')) {
      structure.deploymentDirs.push(item.path)
    }

    // Check for service directories
    if (dirName.includes('service') || dirName.includes('svc')) {
      structure.serviceDirs.push(item.path)
    }

    // Check for namespace patterns (common namespace names)
    const namespaceKeywords = ['namespace', 'ns', 'default', 'kube-system', 'kube-public']
    if (namespaceKeywords.some(kw => dirName.includes(kw))) {
      // Fetch YAML files in this directory
      const nsResponse = await fetch(
        `/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${encodeURIComponent(item.path)}${modeParam}`
      )

      if (nsResponse.ok) {
        const nsItems: TreeItem[] = await nsResponse.json()
        const yamlFiles = nsItems.filter(f =>
          f.type === 'file' && (f.name.endsWith('.yaml') || f.name.endsWith('.yml'))
        )

        // Extract namespace names from YAML filenames
        for (const file of yamlFiles) {
          const match = file.name.match(/^([a-z0-9-]+)\.ya?ml$/i)
          if (match && !structure.namespaces.includes(match[1])) {
            structure.namespaces.push(match[1])
          }
        }
      }
    }
  }

  // Detect common naming patterns
  const allFileNames = items
    .filter(item => item.type === 'file' && (item.name.endsWith('.yaml') || item.name.endsWith('.yml')))
    .map(item => item.name.replace(/\.ya?ml$/i, ''))

  if (allFileNames.length > 2) {
    // Look for common prefix
    const commonPrefix = findCommonPrefix(allFileNames)
    if (commonPrefix && commonPrefix.length > 2) {
      structure.commonPatterns.namePrefix = commonPrefix
    }

    // Look for common suffix
    const commonSuffix = findCommonSuffix(allFileNames)
    if (commonSuffix && commonSuffix.length > 2) {
      structure.commonPatterns.nameSuffix = commonSuffix
    }
  }
}

/**
 * Find common prefix in array of strings
 */
function findCommonPrefix(strings: string[]): string | null {
  if (strings.length === 0) return null

  let prefix = strings[0]

  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1)
      if (prefix === '') return null
    }
  }

  // Remove trailing dashes/underscores
  return prefix.replace(/[-_]+$/, '')
}

/**
 * Find common suffix in array of strings
 */
function findCommonSuffix(strings: string[]): string | null {
  if (strings.length === 0) return null

  const reversed = strings.map(s => s.split('').reverse().join(''))
  const prefix = findCommonPrefix(reversed)

  if (!prefix) return null

  return prefix.split('').reverse().join('').replace(/^[-_]+/, '')
}
