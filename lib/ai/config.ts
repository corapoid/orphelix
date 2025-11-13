/**
 * AI Configuration for Embedded LLM
 *
 * This module configures an embedded LLM using Transformers.js (ONNX).
 * The model is downloaded automatically and runs entirely locally.
 * No external services or data transmission required.
 */

import { pipeline, env } from '@xenova/transformers'

// Configure transformers to cache models in .cache directory
env.cacheDir = './.cache/transformers'

// Default model - small and fast for text generation
const DEFAULT_MODEL = process.env.AI_MODEL || 'Xenova/Qwen2.5-0.5B-Instruct'

// Singleton pipeline instance
let textGenerationPipeline: any = null

/**
 * Check if AI is enabled
 * AI is always available with embedded model (can be disabled via env var)
 */
export function isAIEnabled(): boolean {
  return process.env.AI_ENABLED !== 'false' // Enabled by default
}

/**
 * Get or initialize the text generation pipeline
 */
export async function getAIPipeline() {
  if (!isAIEnabled()) {
    throw new Error('AI is disabled. Set AI_ENABLED=true to enable.')
  }

  if (!textGenerationPipeline) {
    console.log(`[AI] Initializing embedded LLM: ${DEFAULT_MODEL}`)
    console.log('[AI] First run will download the model (~200-500MB), subsequent runs use cache')

    textGenerationPipeline = await pipeline('text-generation', DEFAULT_MODEL, {
      dtype: 'q8', // Quantized to 8-bit for smaller size and faster inference
    } as any)

    console.log('[AI] Model loaded successfully')
  }

  return textGenerationPipeline
}

/**
 * Generate text using the embedded LLM
 */
export async function generateText(prompt: string, options?: {
  maxNewTokens?: number
  temperature?: number
  doSample?: boolean
}): Promise<string> {
  const generator = await getAIPipeline()

  const result = await generator(prompt, {
    max_new_tokens: options?.maxNewTokens || 50,
    temperature: options?.temperature || 0.1,
    do_sample: options?.doSample || false,
    return_full_text: false,
  })

  return result[0].generated_text.trim()
}

/**
 * Configuration details for logging/debugging
 */
export function getAIConfig() {
  return {
    enabled: isAIEnabled(),
    model: DEFAULT_MODEL,
    type: 'embedded-onnx',
    cacheDir: env.cacheDir,
  }
}

/**
 * Check if the embedded model is ready
 * For embedded models, we just check if AI is enabled
 */
export async function checkModelHealth(): Promise<{ available: boolean; error?: string }> {
  if (!isAIEnabled()) {
    return { available: false, error: 'AI is disabled via environment variable' }
  }

  try {
    // Try to initialize the pipeline
    await getAIPipeline()
    return { available: true }
  } catch (error) {
    return {
      available: false,
      error: error instanceof Error ? error.message : 'Unknown error initializing model'
    }
  }
}
