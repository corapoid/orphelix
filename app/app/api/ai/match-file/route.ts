/**
 * AI-Powered File Matching API
 *
 * Uses OpenAI to intelligently match Kubernetes resources to repository files.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { rateLimit } from '@/lib/security/rate-limiter'
import { AI_QUERY_LIMIT } from '@/lib/security/rate-limit-configs'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Create rate limiter for AI queries
const limiter = rateLimit(AI_QUERY_LIMIT)

// Validate request schema
const matchFileSchema = z.object({
  resourceName: z.string().min(1, 'Resource name is required'),
  namespace: z.string().min(1, 'Namespace is required'),
  resourceType: z.string().min(1, 'Resource type is required'),
  files: z.array(z.object({
    path: z.string(),
    name: z.string(),
  })),
  apiKey: z.string().min(1, 'API key is required').startsWith('sk-', 'Invalid API key format'),
})

/**
 * POST /api/ai/match-file
 *
 * AI-powered file matching using OpenAI
 *
 * Rate Limited: 5 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const body = await request.json()

    // Validate input
    const validated = matchFileSchema.parse(body)
    const { resourceName, namespace, resourceType, files, apiKey } = validated

    // Filter out base/ files if there are environment-specific files available
    const envFiles = files.filter((f: { path: string; name: string }) => !f.path.startsWith('base/'))

    // Use only environment files if available, otherwise include base files
    const filesToSearch = envFiles.length > 0 ? envFiles : files

    // Prepare file list for AI (already pre-filtered in frontend, max 30 files)
    // This reduces tokens and improves response time
    const fileList = filesToSearch.map((f: { path: string; name: string }) => f.path).join('\n')

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
6. Files have been pre-filtered to most relevant matches for faster processing

AVAILABLE FILES IN REPOSITORY (${filesToSearch.length} pre-filtered files):
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
      apiKey: apiKey.trim(),
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
  } catch (error) {
    return handleApiError(error)
  }
}
