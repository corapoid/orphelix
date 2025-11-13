/**
 * API Route: Match YAML file to Kubernetes resource
 *
 * This endpoint uses AI-powered file matching to find the best YAML file
 * for a given Kubernetes resource (Deployment, ConfigMap, or Secret).
 */

import { NextRequest, NextResponse } from 'next/server'
import { matchFileToResource, KubernetesResource, YamlFile } from '@/lib/github/file-matcher'
import { getAIConfig } from '@/lib/ai/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resource, yamlFiles } = body

    // Validate input
    if (!resource || !resource.name || !resource.namespace || !resource.type) {
      return NextResponse.json(
        { error: 'Invalid resource. Required: name, namespace, type' },
        { status: 400 }
      )
    }

    if (!yamlFiles || !Array.isArray(yamlFiles)) {
      return NextResponse.json(
        { error: 'Invalid yamlFiles. Expected an array' },
        { status: 400 }
      )
    }

    // Perform matching
    const result = await matchFileToResource(
      resource as KubernetesResource,
      yamlFiles as YamlFile[]
    )

    // Get AI config for debugging
    const aiConfig = getAIConfig()

    return NextResponse.json({
      matchedFile: result.file,
      method: result.method,
      confidence: result.confidence,
      aiUsed: result.aiUsed,
      aiConfig: {
        enabled: aiConfig.enabled,
        model: aiConfig.model,
      },
    })
  } catch (error) {
    console.error('File matching error:', error)
    return NextResponse.json(
      {
        error: 'Failed to match file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint to check if AI matching is available
 */
export async function GET() {
  const aiConfig = getAIConfig()

  return NextResponse.json({
    aiEnabled: aiConfig.enabled,
    aiConfig: {
      host: aiConfig.host,
      model: aiConfig.model,
    },
  })
}
