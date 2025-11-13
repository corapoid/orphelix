/**
 * AI-Powered File Matching API
 *
 * Uses OpenAI to intelligently match Kubernetes resources to repository files.
 */

import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface MatchRequest {
  resourceName: string
  namespace: string
  resourceType: string
  files: Array<{ path: string; name: string }>
  apiKey: string // User's OpenAI API key from localStorage
}

/**
 * POST /api/ai/match-file
 * AI-powered file matching using OpenAI
 */
export async function POST(request: NextRequest) {
  try {
    const body: MatchRequest = await request.json()
    const { resourceName, namespace, resourceType, files, apiKey } = body

    if (!resourceName || !namespace || !resourceType || !files || !apiKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('[AI Matcher] Matching resource:', resourceName, 'type:', resourceType, 'namespace:', namespace)
    console.log('[AI Matcher] Total files:', files.length)

    // Prepare file list for AI (limit to first 100 for token efficiency)
    const fileList = files.slice(0, 100).map(f => f.path).join('\n')

    const prompt = `You are a Kubernetes expert helping match deployed resources to their source YAML files in a Git repository.

TASK: Find the YAML file that defines this Kubernetes resource:
- Resource Name: ${resourceName}
- Resource Type: ${resourceType}
- Namespace: ${namespace}

REPOSITORY STRUCTURE:
The repository follows a Kustomize-like structure with:
- base/ directory: Contains generic/template YAML files
- Environment directories (c2a-int/, prod/, dev/, staging/, etc.): Contains environment-specific configurations

AVAILABLE FILES:
${fileList}

MATCHING RULES:
1. ALWAYS prefer environment-specific files (c2a-int/, prod/, dev/, etc.) over base/ files
2. Match the resource name to directory/file names (accounting for case differences and separators like - vs _)
3. Look for files like helm-release.yaml or application.yaml which typically define deployments
4. The resource name might have suffixes like "-main" that aren't in the file path

RESPONSE FORMAT:
Return ONLY a JSON object with this exact structure (no markdown, no explanation):
{
  "matchedFile": "path/to/file.yaml",
  "confidence": 95,
  "reasoning": "Brief explanation of why this file matches"
}

If no good match is found, set matchedFile to null and confidence to 0.`

    const startTime = Date.now()

    const result = await generateText({
      model: openai('gpt-4o-mini', {
        apiKey,
      }),
      prompt,
      temperature: 0.1, // Low temperature for consistent results
    })

    const duration = Date.now() - startTime
    console.log(`[AI Matcher] AI response received in ${duration}ms`)

    // Parse AI response
    const response = JSON.parse(result.text.trim())

    console.log('[AI Matcher] Match result:', response.matchedFile, 'confidence:', response.confidence)
    console.log('[AI Matcher] Reasoning:', response.reasoning)

    return NextResponse.json({
      matchedFile: response.matchedFile,
      confidence: response.confidence,
      reasoning: response.reasoning,
      duration,
    })
  } catch (error) {
    console.error('[AI Matcher] Error:', error)
    return NextResponse.json(
      {
        error: 'AI matching failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
