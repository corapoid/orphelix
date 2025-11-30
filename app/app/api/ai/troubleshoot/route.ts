/**
 * AI-Powered Troubleshooting API
 *
 * Analyzes Kubernetes cluster issues using OpenAI to provide intelligent diagnostics
 * and remediation suggestions.
 */

import { NextRequest } from 'next/server'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { rateLimit } from '@/lib/security/rate-limiter'
import { AI_QUERY_LIMIT } from '@/lib/security/rate-limit-configs'
import { aiQuerySchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Create rate limiter for AI queries
const limiter = rateLimit(AI_QUERY_LIMIT)

/**
 * POST /api/ai/troubleshoot
 * Streaming AI troubleshooting endpoint
 *
 * Rate Limited: 5 requests per 60 seconds
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const body = await request.json()

    // Validate input using Zod schema
    const validated = aiQuerySchema.parse(body)
    const { query, context, apiKey } = validated

    // Build context string
    let contextStr = ''

    if (context?.resource) {
      contextStr += `\n## Resource Information\n`
      contextStr += `- Type: ${context.resource.type}\n`
      contextStr += `- Name: ${context.resource.name}\n`
      contextStr += `- Namespace: ${context.resource.namespace}\n`
      if (context.resource.status) {
        contextStr += `- Status: ${context.resource.status}\n`
      }
      if (context.resource.data) {
        contextStr += `\n### Resource Details:\n\`\`\`json\n${JSON.stringify(context.resource.data, null, 2).substring(0, 2000)}\n\`\`\`\n`
      }
    }

    if (context?.events && context.events.length > 0) {
      contextStr += `\n## Recent Events\n`
      context.events.forEach((event, i) => {
        if (i < 10) { // Limit to 10 most recent events
          contextStr += `- [${event.type}] ${event.reason}: ${event.message}`
          if (event.count > 1) contextStr += ` (×${event.count})`
          contextStr += '\n'
        }
      })
    }

    if (context?.logs && context.logs.length > 0) {
      contextStr += `\n## Recent Logs\n\`\`\`\n${context.logs.slice(-20).join('\n')}\n\`\`\`\n`
    }

    if (context?.metrics) {
      contextStr += `\n## Resource Metrics\n`
      if (context.metrics.cpu) contextStr += `- CPU: ${context.metrics.cpu}\n`
      if (context.metrics.memory) contextStr += `- Memory: ${context.metrics.memory}\n`
    }

    const systemPrompt = `You are a Kubernetes troubleshooting expert. Your role is to help users diagnose and resolve issues with their Kubernetes clusters.

When analyzing issues:
1. **Identify the Problem**: Clearly state what the issue is based on the provided context
2. **Root Cause Analysis**: Explain the likely root cause(s)
3. **Impact Assessment**: Describe what impact this has on the system
4. **Solution Steps**: Provide clear, actionable steps to resolve the issue
5. **Prevention**: Suggest how to prevent this issue in the future

Guidelines:
- Be concise but thorough
- Use bullet points for clarity
- Include relevant kubectl commands when helpful
- Prioritize safety - always suggest backing up or testing in non-production first
- If you need more information, ask specific questions
- Format code blocks with proper syntax highlighting

Available context (if provided):
${contextStr || 'No specific context provided - this is a general query.'}
`

    const userPrompt = `User Question: ${query}

Please provide a detailed troubleshooting response following the structure above.`

    // Create OpenAI client with user's API key
    const openaiClient = createOpenAI({
      apiKey,
    })

    const result = await streamText({
      model: openaiClient('gpt-4o-mini'),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3, // Lower temperature for more focused troubleshooting
    })

    // Return streaming response
    return result.toTextStreamResponse()
  } catch (error) {
    return handleApiError(error)
  }
}
