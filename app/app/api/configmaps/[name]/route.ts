import { NextRequest, NextResponse } from 'next/server'
import { fetchConfigMap } from '@/lib/k8s/api'
import { getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sResourceDetailSchema } from '@/lib/validation/schemas'
import { handleApiError, NotFoundError } from '@/lib/api/errors'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/configmaps/[name]
 *
 * Retrieves a specific ConfigMap by name
 *
 * Rate Limited: 60 requests per 60 seconds
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { name } = await params
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)

    // Validate input
    const validated = k8sResourceDetailSchema.parse({ name, namespace })

    const configMap = await fetchConfigMap(validated.name, validated.namespace, context)

    if (!configMap) {
      throw new NotFoundError('ConfigMap', validated.name)
    }

    return NextResponse.json(configMap)
  } catch (error) {
    return handleApiError(error)
  }
}
