import { NextResponse } from 'next/server'
import { fetchPodLogs } from '@/lib/k8s-api'

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get('namespace') || ''
    const container = searchParams.get('container') || undefined
    const tail = parseInt(searchParams.get('tail') || '100')

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const logsRaw = await fetchPodLogs(name, namespace, container, tail)

    // Parse logs into structured format
    const lines = logsRaw.split('\n')
    const parsedLogs = lines.map((line, index) => parseLogLine(line, index + 1))

    return NextResponse.json({
      logs: logsRaw, // Keep raw for backwards compatibility
      parsed: parsedLogs,
      totalLines: parsedLogs.length,
    })
  } catch (error) {
    console.error('[API] Failed to fetch pod logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pod logs' },
      { status: 500 }
    )
  }
}
