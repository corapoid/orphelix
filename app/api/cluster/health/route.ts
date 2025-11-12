import { NextResponse } from 'next/server'
import { getCoreApi } from '@/lib/k8s-client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const coreV1Api = getCoreApi()

    // Try to list namespaces as a health check
    // This is a lightweight operation that requires basic cluster access
    await coreV1Api.listNamespace()

    return NextResponse.json({
      status: 'connected',
      message: 'Successfully connected to Kubernetes cluster',
    })
  } catch (error: unknown) {
    console.error('[Health Check] Cluster connection failed:', error)

    const err = error as { code?: number; message?: string; body?: { message?: string } }
    const statusCode = err.code || 500
    const message = err.body?.message || err.message || 'Unknown error'

    // Return specific error information
    return NextResponse.json(
      {
        status: 'disconnected',
        message:
          statusCode === 401
            ? 'Unauthorized: Invalid or expired cluster credentials'
            : statusCode === 403
              ? 'Forbidden: Insufficient permissions to access cluster'
              : statusCode === 404
                ? 'Cluster not found: Check your kubeconfig'
                : `Failed to connect to cluster: ${message}`,
        code: statusCode,
      },
      { status: 200 } // Return 200 so the client can handle the disconnected state
    )
  }
}
