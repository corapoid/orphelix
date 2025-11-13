/**
 * File Matcher with Pattern Matching
 *
 * This module provides intelligent file matching for Kubernetes resources
 * using pattern matching (exact name, namespace/name patterns).
 */

export interface YamlFile {
  path: string
  name: string
  sha?: string
}

export interface KubernetesResource {
  name: string
  namespace: string
  type: 'deployment' | 'configmap' | 'secret'
}

export interface MatchResult {
  file: YamlFile | null
  method: 'exact' | 'namespace' | 'none'
  confidence?: number
}

/**
 * File Matcher class with pattern matching
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
      return { file: null, method: 'none' }
    }

    // If only one file, return it
    if (yamlFiles.length === 1) {
      return { file: yamlFiles[0], method: 'exact', confidence: 1.0 }
    }

    // Try pattern matching
    const patternMatch = this.patternMatch(resource, yamlFiles)
    if (patternMatch) {
      return patternMatch
    }

    // No match found - user will select manually
    return { file: null, method: 'none' }
  }

  /**
   * Pattern matching: Try exact name and namespace/name patterns
   */
  private patternMatch(resource: KubernetesResource, files: YamlFile[]): MatchResult | null {
    const resourceName = resource.name.toLowerCase()
    const resourceNamespace = resource.namespace.toLowerCase()

    // Try exact name match
    const exactMatch = files.find(f => {
      const fileName = f.name.toLowerCase()
      // Check if file name contains resource name
      // e.g., "nginx-deployment.yaml" matches "nginx"
      return fileName.includes(resourceName) || fileName.replace(/\.ya?ml$/, '') === resourceName
    })

    if (exactMatch) {
      return { file: exactMatch, method: 'exact', confidence: 1.0 }
    }

    // Try namespace + name pattern
    const namespaceMatch = files.find(f => {
      const filePath = f.path.toLowerCase()
      const fileName = f.name.toLowerCase()

      // Check if path includes both namespace and name
      // e.g., "k8s/production/nginx-deployment.yaml" matches namespace="production", name="nginx"
      return (
        filePath.includes(resourceNamespace) &&
        (fileName.includes(resourceName) || fileName.replace(/\.ya?ml$/, '') === resourceName)
      )
    })

    if (namespaceMatch) {
      return { file: namespaceMatch, method: 'namespace', confidence: 0.9 }
    }

    return null
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
