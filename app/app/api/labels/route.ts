import { NextRequest, NextResponse } from 'next/server'
import { fetchResourcesWithLabels, indexLabels, searchByLabelSelector } from '@/lib/k8s/api'
import { rateLimit } from '@/lib/security/rate-limiter'
import { K8S_LIST_LIMIT } from '@/lib/security/rate-limit-configs'
import { namespaceSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'
import { z } from 'zod'

// Create rate limiter for labels operations
const limiter = rateLimit(K8S_LIST_LIMIT)

// Validate request parameters
const labelsRequestSchema = z.object({
  namespace: namespaceSchema.default('default'),
  context: z.string().optional(),
  selector: z.string().optional(),
})

/**
 * GET /api/labels
 *
 * Retrieves indexed labels from resources
 *
 * Rate Limited: 120 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const searchParams = request.nextUrl.searchParams

    // Validate input
    const validated = labelsRequestSchema.parse({
      namespace: searchParams.get('namespace') || 'default',
      context: searchParams.get('context') || undefined,
      selector: searchParams.get('selector') || undefined,
    })

    // Fetch all resources with labels
    const resources = await fetchResourcesWithLabels(validated.namespace, validated.context)

    // Filter by selector if provided
    const filteredResources = validated.selector
      ? searchByLabelSelector(resources, validated.selector)
      : resources

    // Index labels from filtered resources
    const labels = indexLabels(filteredResources)

    return NextResponse.json({
      labels,
      resources: filteredResources,
      totalResources: filteredResources.length,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
