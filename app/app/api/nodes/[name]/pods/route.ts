import { NextRequest, NextResponse } from 'next/server'
import { fetchNodePods } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_DETAIL_LIMIT } from '@/lib/security/rate-limit-configs'
import { k8sClusterResourceSchema, namespaceSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

// Create rate limiter for K8s detail operations
const limiter = rateLimit(K8S_DETAIL_LIMIT)

/**
 * GET /api/nodes/[name]/pods?namespace=xxx
 *
 * Retrieves all Pods running on a specific Node (optionally filtered by namespace)
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
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace')

    // Validate node name
    const validatedNode = k8sClusterResourceSchema.parse({ name })

    // Validate namespace if provided
    const validatedNamespace = namespace ? namespaceSchema.parse(namespace) : undefined

    const pods = await fetchNodePods(validatedNode.name, validatedNamespace)
    return NextResponse.json(pods)
  } catch (error) {
    return handleApiError(error)
  }
}
