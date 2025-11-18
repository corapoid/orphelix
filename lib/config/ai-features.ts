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
  CRITICAL_ALERTS_EXPLAIN: {
    id: 'critical-alerts-explain',
    name: 'Critical Alerts AI Explanation',
    description: 'Get AI-powered explanations for critical issues with pod logs and root cause analysis',
    requiredProvider: 'openai',
    enabled: true,
  },
  YAML_EDITOR: {
    id: 'yaml-editor',
    name: 'AI-Powered YAML Editor',
    description: 'Intelligent file matching for Kubernetes manifests using AI',
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
