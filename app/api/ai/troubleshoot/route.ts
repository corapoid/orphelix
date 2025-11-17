/**
 * AI-Powered Troubleshooting API
 *
 * Analyzes Kubernetes cluster issues using OpenAI to provide intelligent diagnostics
 * and remediation suggestions.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface TroubleshootRequest {
  query: string
  context?: {
    resource?: {
      type: string
      name: string
      namespace: string
      status?: string
      data?: Record<string, unknown>
    }
    events?: Array<{
      type: string
      reason: string
      message: string
      count: number
    }>
    logs?: string[]
    metrics?: {
      cpu?: string
      memory?: string
    }
  }
  apiKey: string // User's OpenAI API key
}

/**
 * POST /api/ai/troubleshoot
 * Streaming AI troubleshooting endpoint
 */
export async function POST(request: NextRequest) {
  try {
    const body: TroubleshootRequest = await request.json()
    const { query, context, apiKey } = body

    if (!query || !apiKey) {
      return NextResponse.json(
        { error: 'Missing required fields: query and apiKey' },
        { status: 400 }
      )
    }

    console.log('[AI Troubleshoot] Query:', query.substring(0, 100))
    console.log('[AI Troubleshoot] Has context:', !!context)

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
      maxTokens: 2000,
    })

    // Return streaming response
    return result.toDataStreamResponse()
  } catch (error) {
    console.error('[AI Troubleshoot] Error:', error)
    return NextResponse.json(
      {
        error: 'AI troubleshooting failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
