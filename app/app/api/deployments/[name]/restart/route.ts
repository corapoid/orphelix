import { NextRequest, NextResponse } from 'next/server'
import { getKubeConfig } from '@/lib/k8s/client'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import * as https from 'https'

/**
 * POST /api/deployments/[name]/restart
 * Restart a deployment using Strategic Merge Patch (same as kubectl rollout restart)
 *
 * This adds/updates the kubectl.kubernetes.io/restartedAt annotation to trigger a rollout
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const namespace = getNamespaceFromRequest(request)

    if (!namespace) {
      return NextResponse.json(
        { error: 'Namespace parameter is required' },
        { status: 400 }
      )
    }

    const kc = getKubeConfig()
    const cluster = kc.getCurrentCluster()

    if (!cluster) {
      throw new Error('Kubernetes configuration not found')
    }

    // Prepare the patch payload (same as kubectl rollout restart)
    const now = new Date().toISOString()
    const patch = {
      spec: {
        template: {
          metadata: {
            annotations: {
              'kubectl.kubernetes.io/restartedAt': now,
            },
          },
        },
      },
    }

    // Get authentication options from kubeconfig
    const opts: Record<string, unknown> = {}
    await kc.applyToHTTPSOptions(opts)

    // Make HTTPS request to Kubernetes API with Strategic Merge Patch
    const url = new URL(`/apis/apps/v1/namespaces/${namespace}/deployments/${name}`, cluster.server)

    return new Promise<Response>((resolve, reject) => {
      const requestOptions: https.RequestOptions = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/strategic-merge-patch+json',
          ...(opts.headers as Record<string, string> || {}),
        },
        ca: opts.ca as Buffer | undefined,
        cert: opts.cert as Buffer | undefined,
        key: opts.key as Buffer | undefined,
        rejectUnauthorized: cluster.skipTLSVerify ? false : true,
      }

      const req = https.request(requestOptions, (res) => {
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(
              NextResponse.json({
                success: true,
                message: `Deployment ${name} restart initiated`,
                restartedAt: now,
              })
            )
          } else {
            reject(new Error(`Kubernetes API error: ${res.statusCode} - ${data}`))
          }
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.write(JSON.stringify(patch))
      req.end()
    })
  } catch (error: unknown) {
    const err = error as { body?: { message?: string }; message?: string }
    console.error('[API] Failed to restart deployment:', err)
    return NextResponse.json(
      { error: err.body?.message || err.message || 'Failed to restart deployment' },
      { status: 500 }
    )
  }
}
