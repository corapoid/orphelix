/**
 * AI Features Configuration
 *
 * Defines which features require AI/LLM capabilities and are only available
 * when user provides necessary API keys.
 */

export interface AIFeature {
  id: string
  name: string
  description: string
  requiredProvider: 'openai' | 'anthropic'
  enabled: boolean
}

export const AI_FEATURES: Record<string, AIFeature> = {
  YAML_EDITOR: {
    id: 'yaml-editor',
    name: 'AI-Powered YAML Editor',
    description: 'Intelligent file matching for Kubernetes manifests using AI',
    requiredProvider: 'openai',
    enabled: true,
  },
  TROUBLESHOOTING: {
    id: 'troubleshooting',
    name: 'AI Troubleshooting Assistant',
    description: 'Get intelligent help diagnosing and fixing Kubernetes issues',
    requiredProvider: 'openai',
    enabled: true,
  },
  ISSUE_DETECTION: {
    id: 'issue-detection',
    name: 'Automated Issue Detection',
    description: 'Automatic detection of common problems like crash loops and resource exhaustion',
    requiredProvider: 'openai',
    enabled: true,
  },
  ROOT_CAUSE_ANALYSIS: {
    id: 'root-cause-analysis',
    name: 'Root Cause Analysis',
    description: 'Deep analysis of events, logs, and resource state to find root causes',
    requiredProvider: 'openai',
    enabled: true,
  },
}

/**
 * Check if a specific AI feature is available based on configured API keys
 */
export function isAIFeatureAvailable(
  featureId: string,
  apiKeys: { openai?: string; anthropic?: string }
): boolean {
  const feature = Object.values(AI_FEATURES).find(f => f.id === featureId)

  if (!feature || !feature.enabled) {
    return false
  }

  switch (feature.requiredProvider) {
    case 'openai':
      return !!apiKeys.openai
    case 'anthropic':
      return !!apiKeys.anthropic
    default:
      return false
  }
}

/**
 * Get all available AI features based on configured API keys
 */
export function getAvailableAIFeatures(apiKeys: {
  openai?: string
  anthropic?: string
}): AIFeature[] {
  return Object.values(AI_FEATURES).filter(
    feature => feature.enabled && isAIFeatureAvailable(feature.id, apiKeys)
  )
}
