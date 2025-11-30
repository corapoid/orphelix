import { NextRequest, NextResponse } from 'next/server'
import { fetchPodLogs } from '@/lib/k8s/api'
import { getMockPodLogs } from '@/lib/mocks/data'
import { rateLimit } from '@/lib/security/rate-limiter'
import { LOGS_FETCH_LIMIT } from '@/lib/security/rate-limit-configs'
import { podLogsRequestSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'

interface LogLine {
  line: number
  timestamp?: string
  level?: string
  message: string
  raw: string
  isJson: boolean
  data?: Record<string, unknown>
}

function parseLogLine(line: string, lineNumber: number): LogLine {
  const trimmed = line.trim()
  if (!trimmed) {
    return {
      line: lineNumber,
      message: '',
      raw: line,
      isJson: false,
    }
  }

  // Try to parse as JSON
  try {
    const parsed = JSON.parse(trimmed)
    if (typeof parsed === 'object' && parsed !== null) {
      // Extract common fields
      const timestamp = parsed.timestamp || parsed.time || parsed.ts || parsed['@timestamp']
      const level = parsed.level || parsed.severity || parsed.loglevel
      const message = parsed.message || parsed.msg || parsed.text || JSON.stringify(parsed)

      return {
        line: lineNumber,
        timestamp: timestamp ? String(timestamp) : undefined,
        level: level ? String(level).toUpperCase() : undefined,
        message: String(message),
        raw: line,
        isJson: true,
        data: parsed,
      }
    }
  } catch {
    // Not JSON, continue with plain text parsing
  }

  // Try to extract timestamp and level from plain text (common formats)
  // Format: "2024-01-15T10:30:45.123Z [INFO] message"
  const isoTimestampMatch = trimmed.match(/^(\d{4}-\d{2}-\d{2}T[\d:.]+Z?)\s+(?:\[(\w+)\]\s+)?(.*)/)
  if (isoTimestampMatch) {
    return {
      line: lineNumber,
      timestamp: isoTimestampMatch[1],
      level: isoTimestampMatch[2] || undefined,
      message: isoTimestampMatch[3],
      raw: line,
      isJson: false,
    }
  }

  // Format: "[INFO] message" or "INFO: message"
  const levelMatch = trimmed.match(/^(?:\[(\w+)\]|(\w+):)\s+(.*)/)
  if (levelMatch) {
    return {
      line: lineNumber,
      level: levelMatch[1] || levelMatch[2],
      message: levelMatch[3],
      raw: line,
      isJson: false,
    }
  }

  // Plain text
  return {
    line: lineNumber,
    message: trimmed,
    raw: line,
    isJson: false,
  }
}

// Create rate limiter for pod logs operations
const limiter = rateLimit(LOGS_FETCH_LIMIT)

/**
 * GET /api/pods/[name]/logs
 *
 * Fetches logs from a specific pod
 *
 * Rate Limited: 30 requests per 60 seconds
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

    // Validate input using Zod schema
    const validated = podLogsRequestSchema.parse({
      name,
      namespace: searchParams.get('namespace'),
      container: searchParams.get('container') || undefined,
      tail: searchParams.get('tail') ? parseInt(searchParams.get('tail')!) : undefined,
      previous: searchParams.get('previous') === 'true',
      timestamps: searchParams.get('timestamps') === 'true',
      sinceSeconds: searchParams.get('sinceSeconds') ? parseInt(searchParams.get('sinceSeconds')!) : undefined,
    })

    const context = searchParams.get('context') || undefined

    // Try to fetch real logs, fall back to mock if it fails (demo mode)
    let logsRaw: string
    try {
      logsRaw = await fetchPodLogs(
        validated.name,
        validated.namespace,
        context,
        validated.container,
        validated.tail,
        validated.previous
      )
    } catch {
      // If real cluster is unavailable, use mock logs
      logsRaw = getMockPodLogs(validated.name)
    }

    // Parse logs into structured format
    const lines = logsRaw.split('\n')
    const parsedLogs = lines.map((line, index) => parseLogLine(line, index + 1))

    return NextResponse.json({
      logs: logsRaw, // Keep raw for backwards compatibility
      parsed: parsedLogs,
      totalLines: parsedLogs.length,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
