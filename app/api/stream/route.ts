import { NextRequest } from 'next/server'
import { initK8sClient } from '@/lib/k8s-client'
import * as k8s from '@kubernetes/client-node'

/**
 * SSE endpoint for real-time Kubernetes updates
 *
 * Streams events for:
 * - Pods changes
 * - Deployments changes
 * - Kubernetes Events
 */
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  // Create ReadableStream for SSE
  const stream = new ReadableStream({
    async start(controller) {
      // Helper to send SSE message
      const sendEvent = (type: string, data: unknown) => {
        const message = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`
        controller.enqueue(encoder.encode(message))
      }

      // Send initial connection message
      sendEvent('connected', { timestamp: new Date().toISOString() })

      // Heartbeat interval to keep connection alive
      const heartbeatInterval = setInterval(() => {
        try {
          sendEvent('heartbeat', { timestamp: new Date().toISOString() })
        } catch (error) {
          console.error('[SSE] Heartbeat error:', error)
          clearInterval(heartbeatInterval)
        }
      }, 30000) // Every 30 seconds

      try {
        // Initialize Kubernetes client
        initK8sClient()

        // Initialize KubeConfig for Watch API
        const kc = new k8s.KubeConfig()

        try {
          kc.loadFromCluster()
        } catch {
          kc.loadFromDefault()
        }

        // Watch for Deployment changes
        const deploymentWatch = new k8s.Watch(kc)
        const deploymentWatchRequest = deploymentWatch.watch(
          '/apis/apps/v1/namespaces/default/deployments',
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
              console.error('[SSE] Deployment watch error:', err)
              sendEvent('error', { message: 'Deployment watch failed', error: err.message })
            }
          }
        )

        // Watch for Pod changes
        const podWatch = new k8s.Watch(kc)
        const podWatchRequest = podWatch.watch(
          '/api/v1/namespaces/default/pods',
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
              console.error('[SSE] Pod watch error:', err)
              sendEvent('error', { message: 'Pod watch failed', error: err.message })
            }
          }
        )

        // Watch for Kubernetes Events
        const eventWatch = new k8s.Watch(kc)
        const eventWatchRequest = eventWatch.watch(
          '/api/v1/namespaces/default/events',
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
              console.error('[SSE] Event watch error:', err)
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
            console.error('[SSE] Error aborting watches:', err)
          }

          controller.close()
        })
      } catch (error) {
        console.error('[SSE] Failed to initialize Kubernetes watches:', error)
        sendEvent('error', {
          message: 'Failed to connect to Kubernetes cluster',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        clearInterval(heartbeatInterval)
        controller.close()
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
