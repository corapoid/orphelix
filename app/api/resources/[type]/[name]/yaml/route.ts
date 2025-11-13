/**
 * API Route: Get resource YAML from cluster
 *
 * Returns the raw YAML manifest for a resource from the Kubernetes cluster.
 * Supports: deployments, configmaps, secrets
 */

import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import {
  fetchDeploymentYaml,
  fetchConfigMapYaml,
  fetchSecretYaml
} from '@/lib/k8s/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; name: string }> }
) {
  try {
    const { type, name } = await params
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    let yaml: string | null = null

    switch (type) {
      case 'deployments':
        yaml = await fetchDeploymentYaml(name, namespace)
        break
      case 'configmaps':
        yaml = await fetchConfigMapYaml(name, namespace)
        break
      case 'secrets':
        yaml = await fetchSecretYaml(name, namespace)
        break
      default:
        return NextResponse.json(
          { error: `Unsupported resource type: ${type}` },
          { status: 400 }
        )
    }

    if (!yaml) {
      return NextResponse.json(
        { error: `Resource not found: ${type}/${name}` },
        { status: 404 }
      )
    }

    return NextResponse.json({ yaml })
  } catch (error) {
    console.error(`[API] Failed to fetch ${params} YAML:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch resource YAML' },
      { status: 500 }
    )
  }
}
