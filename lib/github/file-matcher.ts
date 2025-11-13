/**
 * File Matcher with AI-powered matching
 *
 * This module provides intelligent file matching for Kubernetes resources.
 * It uses a two-tier approach:
 * 1. Fast pattern matching (exact name, namespace/name)
 * 2. AI-powered matching with local LLM (Ollama) as fallback
 */

import { generateText } from 'ai'
import { isAIEnabled, getAIModel } from '@/lib/ai/config'

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
  method: 'exact' | 'namespace' | 'ai' | 'none'
  confidence?: number
  aiUsed: boolean
}

/**
 * File Matcher class with AI capabilities
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
      return { file: null, method: 'none', aiUsed: false }
    }

    // If only one file, return it
    if (yamlFiles.length === 1) {
      return { file: yamlFiles[0], method: 'exact', confidence: 1.0, aiUsed: false }
    }

    // 1. Try pattern matching first (fast)
    const patternMatch = this.patternMatch(resource, yamlFiles)
    if (patternMatch) {
      return patternMatch
    }

    // 2. Try AI matching if enabled
    if (isAIEnabled()) {
      try {
        const aiMatch = await this.aiMatch(resource, yamlFiles)
        if (aiMatch) {
          return aiMatch
        }
      } catch (error) {
        console.error('AI matching failed:', error)
        // Continue to return no match instead of failing
      }
    }

    // 3. No match found - user will select manually
    return { file: null, method: 'none', aiUsed: false }
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
      return { file: exactMatch, method: 'exact', confidence: 1.0, aiUsed: false }
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
      return { file: namespaceMatch, method: 'namespace', confidence: 0.9, aiUsed: false }
    }

    return null
  }

  /**
   * AI-powered matching using local Ollama model
   */
  private async aiMatch(resource: KubernetesResource, files: YamlFile[]): Promise<MatchResult | null> {
    try {
      const model = getAIModel()

      // Limit to top 20 files to avoid context overflow
      const filesToAnalyze = files.slice(0, 20)

      const prompt = this.buildPrompt(resource, filesToAnalyze)

      const { text } = await generateText({
        model: model as any, // Type assertion for ollama-ai-provider compatibility
        prompt,
        maxTokens: 50, // Maximum tokens to generate
        temperature: 0.1, // Low temperature for more deterministic results
      } as any) // Type assertion needed for ollama-ai-provider

      // Parse AI response
      const matchIndex = this.parseAIResponse(text, filesToAnalyze.length)

      if (matchIndex !== null) {
        return {
          file: filesToAnalyze[matchIndex],
          method: 'ai',
          confidence: 0.75,
          aiUsed: true,
        }
      }

      return null
    } catch (error) {
      console.error('AI matching error:', error)
      return null
    }
  }

  /**
   * Build a concise prompt for the AI model
   */
  private buildPrompt(resource: KubernetesResource, files: YamlFile[]): string {
    return `Task: Match a Kubernetes ${resource.type} to a YAML manifest file.

Resource Details:
- Type: ${resource.type}
- Name: ${resource.name}
- Namespace: ${resource.namespace}

Available Files:
${files.map((f, i) => `${i + 1}. ${f.path}`).join('\n')}

Instructions:
- Analyze the file paths and names
- Find the file most likely to contain the ${resource.type} named "${resource.name}"
- Return ONLY the number (1-${files.length}) of the best match
- If no good match exists, return 0

Answer (number only):`
  }

  /**
   * Parse AI response to extract file index
   */
  private parseAIResponse(text: string, fileCount: number): number | null {
    // Clean up response
    const cleaned = text.trim().toLowerCase()

    // Try to extract number from various formats
    // e.g., "3", "number 3", "file 3", "3.", etc.
    const numberMatch = cleaned.match(/\b(\d+)\b/)

    if (!numberMatch) {
      return null
    }

    const number = parseInt(numberMatch[1], 10)

    // Validate number is in valid range
    if (number === 0) {
      return null // AI said no match
    }

    if (number >= 1 && number <= fileCount) {
      return number - 1 // Convert to 0-indexed
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
