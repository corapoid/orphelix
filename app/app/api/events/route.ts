import { NextRequest, NextResponse } from 'next/server'
import { getNamespaceFromRequest, getContextFromRequest } from '@/lib/core/api-helpers'
import { fetchEvents } from '@/lib/k8s/api'

export async function GET(request: NextRequest) {
  try {
    const namespace = getNamespaceFromRequest(request)
    const context = getContextFromRequest(request)

    // Require namespace for events (no cluster-wide access)
    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    // Get time range from query params (default: 24 hours, max: 24 hours)
    const { searchParams } = new URL(request.url)
    const timeRangeParam = searchParams.get('timeRange')
    let timeRangeHours = 24 // Default to 24 hours

    if (timeRangeParam) {
      const parsed = parseInt(timeRangeParam, 10)
      if (!isNaN(parsed) && parsed > 0) {
        // Limit to max 24 hours
        timeRangeHours = Math.min(parsed, 24)
      }
    }

    const events = await fetchEvents(namespace, context, timeRangeHours)
    return NextResponse.json(events)
  } catch (error) {
    console.error('[API] Failed to fetch events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
