import { NextRequest, NextResponse } from 'next/server'
import { fetchResourcesWithLabels, indexLabels, searchByLabelSelector } from '@/lib/k8s/api'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const namespace = searchParams.get('namespace') || 'default'
    const context = searchParams.get('context') || ''
    const selector = searchParams.get('selector') || ''

    // Fetch all resources with labels
    const resources = await fetchResourcesWithLabels(namespace, context)

    // Filter by selector if provided
    const filteredResources = selector
      ? searchByLabelSelector(resources, selector)
      : resources

    // Index labels from filtered resources
    const labels = indexLabels(filteredResources)

    return NextResponse.json({
      labels,
      resources: filteredResources,
      totalResources: filteredResources.length,
    })
  } catch (error) {
    console.error('[API] Failed to fetch labels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch labels' },
      { status: 500 }
    )
  }
}
