import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

interface KubeContext {
  name: string
  cluster: string
  user: string
  namespace?: string
  current: boolean
}

export async function GET() {
  try {
    // Get contexts with details
    const output = execSync('kubectl config get-contexts', { encoding: 'utf-8' })

    const lines = output.split('\n').filter(line => line.trim())
    const contexts: KubeContext[] = []

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim()) continue

      const isCurrent = line.startsWith('*')
      const parts = line.replace(/^\*?\s+/, '').split(/\s+/)

      if (parts.length >= 3) {
        contexts.push({
          name: parts[0],
          cluster: parts[1],
          user: parts[2],
          // Use namespace from context, fallback to 'default'
          namespace: parts[3] || 'default',
          current: isCurrent,
        })
      }
    }

    return NextResponse.json({ contexts })
  } catch (error) {
    console.error('[API] Failed to get kubectl contexts:', error)
    return NextResponse.json(
      {
        error: 'Failed to get kubectl contexts',
        details: error instanceof Error ? error.message : 'Unknown error',
        contexts: [],
      },
      { status: 500 }
    )
  }
}
