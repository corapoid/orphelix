import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Use 'kubectl version' to test API connectivity
    // Removed --short flag as it's deprecated in newer kubectl versions
    const { stdout, stderr } = await execAsync('kubectl version', {
      timeout: 5000, // 5 second timeout
    })

    // Check if we got any output that indicates successful connection
    // kubectl version will show both client and server versions if connected
    if (stdout && (stdout.includes('Server Version') || stdout.includes('serverVersion'))) {
      return NextResponse.json({
        success: true,
        message: 'Successfully connected to cluster'
      })
    }

    // If we have output but no server version, connection failed
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to connect to cluster',
        details: stderr || stdout || 'No server version found'
      },
      { status: 500 }
    )
  } catch (error: any) {
    console.error('Cluster connection test failed:', error)

    // Check if it's a permission error (this shouldn't happen with kubectl version)
    const errorMessage = error.message || ''
    const isPermissionError = errorMessage.includes('Forbidden') || errorMessage.includes('forbidden')

    return NextResponse.json(
      {
        success: false,
        error: isPermissionError
          ? 'Connection successful but limited permissions detected'
          : (error instanceof Error ? error.message : 'Unknown error'),
        details: isPermissionError
          ? 'Connected to cluster but with restricted permissions. This is normal for namespace-scoped users.'
          : 'Unable to connect to Kubernetes cluster. Make sure kubectl is configured correctly.',
      },
      { status: isPermissionError ? 200 : 500 }
    )
  }
}
