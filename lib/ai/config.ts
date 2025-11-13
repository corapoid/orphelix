/**
 * AI Configuration for Local LLM
 *
 * This module configures a local Ollama instance for AI-powered file matching.
 * Ollama runs locally and doesn't send data to external services.
 */

import { ollama } from 'ollama-ai-provider'

// Default Ollama configuration
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:1b' // Small, fast model

/**
 * Check if Ollama is available and configured
 */
export function isAIEnabled(): boolean {
  // AI is enabled if OLLAMA_ENABLED is explicitly set to 'true'
  // or if OLLAMA_HOST/OLLAMA_MODEL are provided
  const explicitlyEnabled = process.env.OLLAMA_ENABLED === 'true'
  const hasCustomConfig = !!(process.env.OLLAMA_HOST || process.env.OLLAMA_MODEL)

  return explicitlyEnabled || hasCustomConfig
}

/**
 * Get configured Ollama model instance
 */
export function getAIModel() {
  if (!isAIEnabled()) {
    throw new Error('AI is not enabled. Set OLLAMA_ENABLED=true or configure OLLAMA_HOST/OLLAMA_MODEL')
  }

  return ollama(OLLAMA_MODEL)
}

/**
 * Configuration details for logging/debugging
 */
export function getAIConfig() {
  return {
    enabled: isAIEnabled(),
    host: OLLAMA_HOST,
    model: OLLAMA_MODEL,
  }
}

/**
 * Check if Ollama server is reachable
 */
export async function checkOllamaHealth(): Promise<{ available: boolean; error?: string }> {
  if (!isAIEnabled()) {
    return { available: false, error: 'AI is not enabled' }
  }

  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    if (!response.ok) {
      return { available: false, error: `Ollama server returned ${response.status}` }
    }

    const data = await response.json()
    const models = data.models || []

    // Check if the configured model is available
    const modelAvailable = models.some((m: any) => m.name === OLLAMA_MODEL || m.name.startsWith(OLLAMA_MODEL))

    if (!modelAvailable) {
      return {
        available: false,
        error: `Model '${OLLAMA_MODEL}' not found. Available models: ${models.map((m: any) => m.name).join(', ')}`
      }
    }

    return { available: true }
  } catch (error) {
    return {
      available: false,
      error: error instanceof Error ? error.message : 'Unknown error connecting to Ollama'
    }
  }
}
