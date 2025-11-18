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

    // Validate API key format
    const trimmedApiKey = apiKey.trim()

    // Log last 4 characters for debugging (safe to log)
    console.log('[AI Matcher] API key ends with:', trimmedApiKey.slice(-4))

    if (!trimmedApiKey.startsWith('sk-')) {
      return NextResponse.json(
        { error: 'Invalid API key format. OpenAI API keys should start with "sk-"' },
        { status: 400 }
      )
    }

    // Filter out base/ files if there are environment-specific files available
    const envFiles = files.filter((f: any) => !f.path.startsWith('base/'))

    // Use only environment files if available, otherwise include base files
    const filesToSearch = envFiles.length > 0 ? envFiles : files


    // Prepare file list for AI (limit to first 100 for token efficiency)
    const fileList = filesToSearch.slice(0, 100).map((f: any) => f.path).join('\n')

    const prompt = `You are a Kubernetes GitOps expert. Your task is to find which YAML files in a Git repository might define a specific deployed Kubernetes resource.

DEPLOYED RESOURCE TO FIND:
- Name: "${resourceName}"
- Type: ${resourceType}
- Namespace: ${namespace}

IMPORTANT MATCHING LOGIC:
1. The resource name "${resourceName}" may appear in the file path or directory name
2. Common patterns:
   - Suffixes like "-main", "-dev", "-prod" are often NOT in the directory name
   - Hyphens may be removed or converted to underscores in directory names
   - Case may differ between resource name and directory name
3. Look for these typical file names: helm-release.yaml, application.yaml, deployment.yaml, kustomization.yaml
4. Files from base/ directory have been excluded - only environment-specific files are listed below
5. There may be multiple environment overlays (dev, staging, prod) - return TOP 2 most likely matches

AVAILABLE FILES IN REPOSITORY (environment-specific only):
${fileList}

STEP-BY-STEP ANALYSIS:
1. Extract the base name from "${resourceName}" (remove suffixes like -main, -dev, etc.)
2. Find directories that match this base name (ignoring case and separators - vs _)
3. In those directories, look for typical deployment definition files
4. If multiple environments exist, prioritize based on namespace and resource name hints

RESPONSE FORMAT (return ONLY valid JSON, no markdown):
{
  "matches": [
    {
      "file": "path/to/matched/file1.yaml",
      "confidence": 90,
      "environment": "production",
      "reasoning": "Explanation of why this file matches"
    },
    {
      "file": "path/to/matched/file2.yaml",
      "confidence": 75,
      "environment": "staging",
      "reasoning": "Explanation of why this file matches"
    }
  ]
}

If no good matches exist, return:
{
  "matches": []
}`

    const startTime = Date.now()

    // Create OpenAI client with user's API key
    const openaiClient = createOpenAI({
      apiKey: trimmedApiKey,
    })

    const result = await generateText({
      model: openaiClient('gpt-4o-mini'),
      prompt,
      temperature: 0.1, // Low temperature for consistent results
    })

    const duration = Date.now() - startTime

    // Parse AI response
    const response = JSON.parse(result.text.trim())

    // Support both old and new format
    if (response.matches) {
      // New format with multiple matches
      return NextResponse.json({
        matches: response.matches,
        duration,
      })
    } else {
      // Old format - convert to new format for backwards compatibility
      return NextResponse.json({
        matches: response.matchedFile ? [{
          file: response.matchedFile,
          confidence: response.confidence,
          environment: 'unknown',
          reasoning: response.reasoning,
        }] : [],
        duration,
      })
    }
  } catch (error: any) {
    console.error('[AI Matcher] Error:', error)

    // Check if it's an API key error
    if (error?.statusCode === 401 || error?.message?.includes('API key') || error?.message?.includes('Incorrect API key')) {
      return NextResponse.json(
        { error: 'Invalid or expired OpenAI API key. Please check your API key in Settings > AI Features.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        error: 'AI matching failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
