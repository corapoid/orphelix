/**
 * API Route: Get resource YAML from cluster
 *
 * Returns the raw YAML manifest for a resource from the Kubernetes cluster.
 * Supports: deployments, configmaps, secrets
 */

import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'
import {
  fetchDeploymentYaml,
  fetchConfigMapYaml,
  fetchSecretYaml
} from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sResourceDetailSchema } from '@/lib/validation/schemas'
import { handleApiError, NotFoundError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

// Validate resource type
const resourceTypeSchema = z.enum(['deployments', 'configmaps', 'secrets'])

/**
 * GET /api/resources/[type]/[name]/yaml
 *
 * Retrieves YAML manifest for a specific resource
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; name: string }> }
) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { type, name } = await params
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)

    // Validate resource type
    const validatedType = resourceTypeSchema.parse(type)

    // Validate resource identity
    const validated = k8sResourceDetailSchema.parse({ name, namespace })

    let yaml: string | null = null

    switch (validatedType) {
      case 'deployments':
        yaml = await fetchDeploymentYaml(validated.name, validated.namespace, context)
        break
      case 'configmaps':
        yaml = await fetchConfigMapYaml(validated.name, validated.namespace, context)
        break
      case 'secrets':
        yaml = await fetchSecretYaml(validated.name, validated.namespace, context)
        break
    }

    if (!yaml) {
      throw new NotFoundError(validatedType, `${validated.namespace}/${validated.name}`)
    }

    return NextResponse.json({ yaml })
  } catch (error) {
    return handleApiError(error)
  }
}
