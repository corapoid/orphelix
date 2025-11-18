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


    // Filter out base/ files if there are environment-specific files available
    const envFiles = files.filter((f: any) => !f.path.startsWith('base/'))

    // Use only environment files if available, otherwise include base files
    const filesToSearch = envFiles.length > 0 ? envFiles : files


    // Prepare file list for AI (limit to first 100 for token efficiency)
    const fileList = filesToSearch.slice(0, 100).map((f: any) => f.path).join('\n')

    const prompt = `You are a Kubernetes GitOps expert. Your task is to find which YAML file in a Git repository defines a specific deployed Kubernetes resource.

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

AVAILABLE FILES IN REPOSITORY (environment-specific only):
${fileList}

STEP-BY-STEP ANALYSIS:
1. Extract the base name from "${resourceName}" (remove suffixes like -main, -dev, etc.)
2. Find directories that match this base name (ignoring case and separators - vs _)
3. In those directories, look for typical deployment definition files

RESPONSE FORMAT (return ONLY valid JSON, no markdown):
{
  "matchedFile": "path/to/matched/file.yaml",
  "confidence": 85,
  "reasoning": "Explanation of why this file matches"
}

If no good match exists, return:
{
  "matchedFile": null,
  "confidence": 0,
  "reasoning": "No matching file found"
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

    // Parse AI response
    const response = JSON.parse(result.text.trim())


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
