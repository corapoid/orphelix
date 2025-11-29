import { NextRequest } from 'next/server'
import * as k8s from '@kubernetes/client-node'
import { rateLimit } from '@/lib/security/rate-limiter'
import { STREAM_LIMIT } from '@/lib/security/rate-limit-configs'
import { namespaceSchema } from '@/lib/validation/schemas'
import { ValidationError } from '@/lib/api/errors'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'api-stream' })

// Create rate limiter for SSE stream operations
const limiter = rateLimit(STREAM_LIMIT)

/**
 * GET /api/stream
 *
 * SSE endpoint for real-time Kubernetes updates
 *
 * Streams events for:
 * - Pods changes
 * - Deployments changes
 * - Kubernetes Events
 *
 * Rate Limited: 5 requests per 60 seconds
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await limiter(request)
  if (rateLimitResult) return rateLimitResult

  const encoder = new TextEncoder()

  // Get namespace and context from query parameters
  const searchParams = request.nextUrl.searchParams
  const namespaceParam = searchParams.get('namespace') || ''
  const contextName = searchParams.get('context') || undefined

  // Namespace is required for SSE
  if (!namespaceParam) {
    throw new ValidationError('Namespace parameter is required')
  }

  // Validate namespace
  const namespace = namespaceSchema.parse(namespaceParam)

  // Create ReadableStream for SSE
  const stream = new ReadableStream({
    async start(controller) {
      let isClosed = false

      // Helper to safely close the controller
      const safeClose = () => {
        if (!isClosed) {
          isClosed = true
          try {
            controller.close()
          } catch (error) {
            // Controller already closed, ignore
            logger.debug('SSE controller already closed', { error })
          }
        }
      }

      // Helper to send SSE message
      const sendEvent = (type: string, data: unknown) => {
        if (isClosed) return
        try {
          const message = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`
          controller.enqueue(encoder.encode(message))
        } catch (error) {
          logger.error({ error, eventType: type }, 'Failed to send SSE event')
          safeClose()
        }
      }

      // Send initial connection message
      sendEvent('connected', { timestamp: new Date().toISOString(), namespace, context: contextName })

      // Heartbeat interval to keep connection alive
      const heartbeatInterval = setInterval(() => {
        if (isClosed) {
          clearInterval(heartbeatInterval)
          return
        }
        try {
          sendEvent('heartbeat', { timestamp: new Date().toISOString() })
        } catch (error) {
          logger.error({ error }, 'SSE heartbeat error')
          clearInterval(heartbeatInterval)
          safeClose()
        }
      }, 30000) // Every 30 seconds

      try {
        // Initialize KubeConfig for Watch API
        const kc = new k8s.KubeConfig()

        try {
          kc.loadFromDefault()

          // Switch to specified context if provided
          if (contextName) {
            kc.setCurrentContext(contextName)
          }
        } catch (error) {
          logger.error({ error, context: contextName }, 'Failed to load Kubernetes config')
          sendEvent('error', {
            message: 'Kubernetes configuration not available. Real-time updates disabled.'
          })
          clearInterval(heartbeatInterval)
          safeClose()
          return
        }

        // Validate cluster configuration
        const cluster = kc.getCurrentCluster()
        if (!cluster?.server) {
          logger.error({ context: contextName }, 'Cluster server URL not configured')
          sendEvent('error', {
            message: 'Kubernetes cluster not configured. Real-time updates disabled.'
          })
          clearInterval(heartbeatInterval)
          safeClose()
          return
        }

        // Watch for Deployment changes
        const deploymentWatch = new k8s.Watch(kc)
        const deploymentWatchRequest = deploymentWatch.watch(
          `/apis/apps/v1/namespaces/${namespace}/deployments`,
          {},
          (type, apiObj) => {
            sendEvent('deployment', {
              type,
              object: {
                name: apiObj.metadata?.name,
                namespace: apiObj.metadata?.namespace,
                replicas: {
                  desired: apiObj.spec?.replicas || 0,
                  ready: apiObj.status?.readyReplicas || 0,
                  available: apiObj.status?.availableReplicas || 0,
                },
              },
            })
          },
          (err) => {
            if (err) {
              logger.error({ error: err, namespace }, 'Deployment watch error')
              sendEvent('error', { message: 'Deployment watch failed', error: err.message })
            }
          }
        )

        // Watch for Pod changes
        const podWatch = new k8s.Watch(kc)
        const podWatchRequest = podWatch.watch(
          `/api/v1/namespaces/${namespace}/pods`,
          {},
          (type, apiObj) => {
            sendEvent('pod', {
              type,
              object: {
                name: apiObj.metadata?.name,
                namespace: apiObj.metadata?.namespace,
                status: apiObj.status?.phase,
                nodeName: apiObj.spec?.nodeName,
              },
            })
          },
          (err) => {
            if (err) {
              logger.error({ error: err, namespace }, 'Pod watch error')
              sendEvent('error', { message: 'Pod watch failed', error: err.message })
            }
          }
        )

        // Watch for Kubernetes Events
        const eventWatch = new k8s.Watch(kc)
        const eventWatchRequest = eventWatch.watch(
          `/api/v1/namespaces/${namespace}/events`,
          {},
          (type, apiObj) => {
            sendEvent('event', {
              type,
              object: {
                type: apiObj.type,
                reason: apiObj.reason,
                message: apiObj.message,
                kind: apiObj.involvedObject?.kind,
                name: apiObj.involvedObject?.name,
                count: apiObj.count,
                lastTimestamp: apiObj.lastTimestamp,
              },
            })
          },
          (err) => {
            if (err) {
              logger.error({ error: err, namespace }, 'Event watch error')
              sendEvent('error', { message: 'Event watch failed', error: err.message })
            }
          }
        )

        // Cleanup on connection close
        request.signal.addEventListener('abort', async () => {
          clearInterval(heartbeatInterval)

          // Abort all watches (they return Promises)
          try {
            const abortControllers = await Promise.all([
              deploymentWatchRequest,
              podWatchRequest,
              eventWatchRequest,
            ])
            abortControllers.forEach((ac) => ac?.abort())
          } catch (err) {
            logger.error({ error: err }, 'Error aborting watches')
          }

          safeClose()
        })
      } catch (error) {
        logger.error({ error, namespace, context: contextName }, 'Failed to initialize Kubernetes watches')
        sendEvent('error', {
          message: 'Failed to connect to Kubernetes cluster',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        clearInterval(heartbeatInterval)
        safeClose()
      }
    },
  })

  // Return SSE response
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable buffering in nginx
    },
  })
}
