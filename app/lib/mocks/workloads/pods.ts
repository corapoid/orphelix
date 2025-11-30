/**
 * Mock data generator for Pods
 */

import type { Pod, PodStatus } from '@/types/kubernetes'
import { getCachedPods, setCachedPods } from '../cache'
import { randomDate, randomItem, calculateAge } from '../utils'

export function generateMockPods(): Pod[] {
  const cached = getCachedPods()
  if (cached) {
    return cached
  }

  const statuses: PodStatus[] = ['Running', 'Pending', 'Failed', 'CrashLoopBackOff']
  const apps = ['web-app', 'api-server', 'worker', 'cache', 'database']
  const nodes = ['node-1', 'node-2', 'node-3', 'node-4']

  const pods: Pod[] = []

  apps.forEach((app) => {
    const replicas = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < replicas; i++) {
      const status = i === 0 && Math.random() > 0.8 ? randomItem(statuses) : 'Running'
      const hash = Math.random().toString(36).substring(2, 12)

      const restartCount = status === 'CrashLoopBackOff' ? Math.floor(Math.random() * 10) : 0
      const hasProbes = Math.random() > 0.3 // 70% of pods have probes

      pods.push({
        name: `${app}-${hash}`,
        namespace: 'default',
        status,
        restartCount,
        age: calculateAge(randomDate(30)),
        nodeName: randomItem(nodes),
        ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        containers: [
          {
            name: app,
            image: `${app}:latest`,
            ready: status === 'Running',
            restartCount,
            livenessProbe: hasProbes
              ? {
                  type: 'httpGet' as const,
                  httpGet: {
                    path: '/healthz',
                    port: 8080,
                    scheme: 'HTTP',
                  },
                  initialDelaySeconds: 15,
                  periodSeconds: 10,
                  timeoutSeconds: 1,
                  successThreshold: 1,
                  failureThreshold: 3,
                }
              : undefined,
            readinessProbe: hasProbes
              ? {
                  type: 'httpGet' as const,
                  httpGet: {
                    path: '/ready',
                    port: 8080,
                    scheme: 'HTTP',
                  },
                  initialDelaySeconds: 5,
                  periodSeconds: 5,
                  timeoutSeconds: 1,
                  successThreshold: 1,
                  failureThreshold: 3,
                }
              : undefined,
          },
        ],
        containerStatuses: [
          {
            name: app,
            ready: status === 'Running',
            restartCount,
            state:
              status === 'Running'
                ? {
                    running: {
                      startedAt: randomDate(7).toISOString(),
                    },
                  }
                : status === 'CrashLoopBackOff'
                  ? {
                      waiting: {
                        reason: 'CrashLoopBackOff',
                        message: 'Back-off 5m0s restarting failed container',
                      },
                    }
                  : {
                      waiting: {
                        reason: 'ContainerCreating',
                      },
                    },
            lastState:
              restartCount > 0
                ? {
                    terminated: {
                      exitCode: 1,
                      reason: 'Error',
                      message: 'Application crashed due to uncaught exception',
                      startedAt: randomDate(7).toISOString(),
                      finishedAt: randomDate(6).toISOString(),
                    },
                  }
                : undefined,
          },
        ],
        labels: {
          app,
          version: 'v1',
        },
        ownerReferences: [
          {
            kind: 'ReplicaSet',
            name: `${app}-${hash.substring(0, 5)}`,
            uid: Math.random().toString(36).substring(2),
          },
        ],
        configMaps: Math.random() > 0.7 ? [`${app}-config`] : [],
        secrets: Math.random() > 0.5 ? [`${app}-secret`] : [],
      })
    }
  })

  setCachedPods(pods)
  return pods
}

/**
 * Get mock pod logs
 */
export function getMockPodLogs(podName: string, podStatus?: string): string {
  // Get pod status from cached pods if not provided
  if (!podStatus) {
    const pods = getCachedPods()
    const pod = pods?.find((p) => p.name === podName)
    podStatus = pod?.status
  }

  // Return failure logs for crashed/failing pods
  if (podStatus === 'Failed' || podStatus === 'CrashLoopBackOff' || podStatus === 'Error') {
    const appName = podName.split('-')[0] || 'app'
    return `2025-01-17T10:30:45.123Z [INFO] Starting ${appName} service v2.1.0
2025-01-17T10:30:45.234Z [INFO] Loading configuration from /etc/config/app.yaml
2025-01-17T10:30:45.345Z [ERROR] Failed to load configuration: ENOENT: no such file or directory, open '/etc/config/app.yaml'
2025-01-17T10:30:45.456Z [ERROR] Required configuration file not found
2025-01-17T10:30:45.567Z [ERROR] Cannot start service without configuration
2025-01-17T10:30:45.678Z [FATAL] Fatal error during startup
2025-01-17T10:30:45.789Z [FATAL] Exiting with code 1
Error: ENOENT: no such file or directory, open '/etc/config/app.yaml'
    at Object.openSync (node:fs:590:3)
    at Object.readFileSync (node:fs:458:35)
    at loadConfig (/app/src/config.js:42:18)
    at startup (/app/src/index.js:12:5)
Process exited with code 1`
  }

  // Return healthy logs for running pods
  const appName = podName.split('-')[0] || 'app'
  return `2025-01-17T10:20:00.000Z [INFO] ${appName} service v2.1.0 started successfully
2025-01-17T10:20:05.123Z [INFO] Health check passed
2025-01-17T10:20:10.234Z [INFO] Listening on port 8080
2025-01-17T10:20:15.345Z [INFO] Ready to accept connections
2025-01-17T10:20:20.456Z [INFO] GET /health 200 - 3ms
2025-01-17T10:20:25.567Z [INFO] GET /metrics 200 - 5ms
2025-01-17T10:20:30.678Z [INFO] All systems operational`
}
