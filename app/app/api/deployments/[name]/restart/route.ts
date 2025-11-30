import { NextRequest, NextResponse } from 'next/server'
import { getKubeConfig } from '@/lib/k8s/client'
import { getNamespaceFromRequest } from '@/lib/core/api-helpers'
import { rateLimit } from '@/lib/security/rate-limiter'
import { DEPLOYMENT_RESTART_LIMIT } from '@/lib/security/rate-limit-configs'
import { deploymentRestartSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/api/errors'
import * as https from 'https'

// Create rate limiter for deployment restart operations
const limiter = rateLimit(DEPLOYMENT_RESTART_LIMIT)

/**
 * POST /api/deployments/[name]/restart
 * Restart a deployment using Strategic Merge Patch (same as kubectl rollout restart)
 *
 * This adds/updates the kubectl.kubernetes.io/restartedAt annotation to trigger a rollout
 *
 * Rate Limited: 10 requests per 60 seconds
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  try {
    const { name } = await params
    const namespace = getNamespaceFromRequest(request)

    // Validate input using Zod schema
    const validated = deploymentRestartSchema.parse({
      name,
      namespace,
    })

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
    const url = new URL(`/apis/apps/v1/namespaces/${validated.namespace}/deployments/${validated.name}`, cluster.server)

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
                message: `Deployment ${validated.name} restart initiated`,
                deploymentName: validated.name,
                namespace: validated.namespace,
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
    return handleApiError(error)
  }
}
