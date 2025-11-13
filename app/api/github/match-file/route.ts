/**
 * File Matching API
 *
 * Matches Kubernetes resources to YAML files using pattern matching.
 */

import { NextRequest, NextResponse } from 'next/server'
import { matchFileToResource } from '@/lib/github/file-matcher'
import type { KubernetesResource, YamlFile } from '@/lib/github/file-matcher'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/github/match-file
 * Match a Kubernetes resource to a YAML file
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resource, yamlFiles } = body

    if (!resource || !yamlFiles) {
      return NextResponse.json(
        { error: 'Missing required fields: resource, yamlFiles' },
        { status: 400 }
      )
    }

    // Perform matching using pattern matching only
    const result = await matchFileToResource(
      resource as KubernetesResource,
      yamlFiles as YamlFile[]
    )

    return NextResponse.json({
      matchedFile: result.file,
      method: result.method,
      confidence: result.confidence,
    })
  } catch (error) {
    console.error('Error matching file:', error)
    return NextResponse.json(
      { error: 'Failed to match file' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/github/match-file
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    method: 'pattern-matching',
  })
}
