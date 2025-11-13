/**
 * AI-Powered File Matching API
 *
 * Uses OpenAI to intelligently match Kubernetes resources to repository files.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createOpenAI } from '@ai-sdk/openai'
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

    const prompt = `You are a Kubernetes GitOps expert. Your task is to find which YAML file in a Git repository defines a specific deployed Kubernetes resource.

DEPLOYED RESOURCE TO FIND:
- Name: "${resourceName}"
- Type: ${resourceType}
- Namespace: ${namespace}

IMPORTANT MATCHING LOGIC:
1. The resource name "${resourceName}" may appear in the file path or directory name
2. Common patterns:
   - Resource "video-cms-api-main" → directory "videocmsapi/" or "video-cms-api/"
   - Resource "my-service-main" → directory "myservice/" or "my-service/"
   - Suffixes like "-main" are often NOT in the directory name
3. Look for these typical file names: helm-release.yaml, application.yaml, deployment.yaml, kustomization.yaml
4. ALWAYS prefer environment-specific directories (c2a-int/, prod/, dev/, staging/) over base/

AVAILABLE FILES IN REPOSITORY:
${fileList}

STEP-BY-STEP ANALYSIS:
1. Extract the base name from "${resourceName}" (remove suffixes like -main, -dev, etc.)
2. Find directories that match this base name (ignoring case and separators - vs _)
3. In those directories, look for typical deployment definition files
4. Prefer environment-specific paths over base/

RESPONSE FORMAT (return ONLY valid JSON, no markdown):
{
  "matchedFile": "path/to/file.yaml",
  "confidence": 85,
  "reasoning": "Found videocmsapi/c2a-int/helm-release.yaml which matches resource video-cms-api-main"
}

If no good match exists, return:
{
  "matchedFile": null,
  "confidence": 0,
  "reasoning": "No file path matches the resource name pattern"
}`

    const startTime = Date.now()

    // Create OpenAI client with user's API key
    const openaiClient = createOpenAI({
      apiKey,
    })

    const result = await generateText({
      model: openaiClient('gpt-4o-mini'),
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
