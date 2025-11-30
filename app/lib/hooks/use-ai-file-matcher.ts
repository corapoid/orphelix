/**
 * Custom hook for AI-powered file matching
 */

import { useState, useEffect } from 'react'
import { createLogger } from '@/lib/logging/logger'
import { useApiKey } from './use-api-key'

const logger = createLogger({ module: 'use-ai-file-matcher' })

interface MatchResult {
  matchedFile: string | null
  confidence: number
  reasoning: string
  duration?: number
}

export function useAIFileMatcher(
  resourceName: string,
  namespace: string,
  resourceType: string,
  files: Array<{ path: string; name: string }> | undefined,
  enabled: boolean
) {
  const [matching, setMatching] = useState(false)
  const [result, setResult] = useState<MatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Get API key from encrypted storage
  const { apiKey, loading: apiKeyLoading } = useApiKey('openai')

  useEffect(() => {
    if (!enabled || !files || files.length === 0) {
      return
    }

    // Wait for API key to load
    if (apiKeyLoading) {
      return
    }

    const performMatching = async () => {
      setMatching(true)
      setError(null)

      try {
        // Check for OpenAI API key
        if (!apiKey?.trim()) {
          setError('OpenAI API key not configured')
          setMatching(false)
          return
        }

        const response = await fetch('/api/ai/match-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resourceName,
            namespace,
            resourceType,
            files,
            apiKey,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'AI matching failed')
        }

        const data: MatchResult = await response.json()
        setResult(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        logger.error({ error: err, resourceName, namespace, resourceType }, 'AI matcher error')
        setError(message)
      } finally {
        setMatching(false)
      }
    }

    performMatching()
  }, [resourceName, namespace, resourceType, files, enabled, apiKey, apiKeyLoading])

  return {
    matching,
    result,
    error,
  }
}
