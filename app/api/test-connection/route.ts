import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Try to run a simple kubectl command to test connection
    const { stdout, stderr } = await execAsync('kubectl cluster-info', {
      timeout: 5000, // 5 second timeout
    })

    if (stderr && !stdout) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to connect to cluster',
          details: stderr
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to cluster'
    })
  } catch (error) {
    console.error('Cluster connection test failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Unable to connect to Kubernetes cluster. Make sure kubectl is configured correctly.',
      },
      { status: 500 }
    )
  }
}
