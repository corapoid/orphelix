/**
 * Mock data generator for Deployments
 */

import type { Deployment, DeploymentStatus } from '@/types/kubernetes'
import { getCachedDeployments, setCachedDeployments } from '../cache'
import { randomDate, randomItem, calculateAge } from '../utils'

export function generateMockDeployments(): Deployment[] {
  const cached = getCachedDeployments()
  if (cached) {
    return cached
  }

  const apps = ['web-app', 'api-server', 'worker', 'cache', 'database']
  const statuses: DeploymentStatus[] = ['Available', 'Progressing', 'Degraded']

  const deployments = apps.map((app) => {
    const desired = Math.floor(Math.random() * 3) + 1
    const status = randomItem(statuses)
    const ready = status === 'Available' ? desired : Math.floor(Math.random() * desired)

    return {
      name: app,
      namespace: 'default',
      replicas: {
        desired,
        ready,
        available: ready,
        unavailable: desired - ready,
      },
      status,
      age: calculateAge(randomDate(90)),
      labels: {
        app,
        tier: randomItem(['frontend', 'backend', 'database']),
      },
      selector: {
        app,
      },
      strategy: 'RollingUpdate',
      configMaps: [`${app}-config`],
      secrets: [`${app}-secret`],
    }
  })

  setCachedDeployments(deployments)
  return deployments
}

export function generateMockPodMetrics(deploymentName: string, namespace: string = 'default') {
  // Dynamic import to avoid circular dependency in mock generators
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { generateMockPods } = require('./pods')
  const pods = generateMockPods().filter(
    (p: { namespace: string; labels: { app?: string } }) =>
      p.namespace === namespace && p.labels['app'] && deploymentName.includes(p.labels['app'])
  )

  if (pods.length === 0) {
    // If no matching pods, generate some generic ones
    const genericPod = {
      name: `${deploymentName}-abc123-xyz`,
      namespace,
      labels: { app: deploymentName },
      metadata: { name: `${deploymentName}-abc123-xyz` },
      spec: { containers: [] },
    }
    pods.push(genericPod)
  }

  const metrics = pods.flatMap((pod: { name: string }) => {
    const containerCount = Math.floor(Math.random() * 2) + 1
    return Array.from({ length: containerCount }, (_, i) => {
      const cpuMillicores = Math.floor(Math.random() * 500) + 50 // 50-550m
      const memoryBytes = Math.floor(Math.random() * 500 * 1024 * 1024) + 100 * 1024 * 1024 // 100-600MB

      return {
        podName: pod.name,
        containerName: i === 0 ? pod.name.split('-')[0] : `sidecar-${i}`,
        cpu: `${cpuMillicores}m`,
        memory: `${Math.floor(memoryBytes / (1024 * 1024))}Mi`,
        cpuValue: cpuMillicores,
        memoryValue: memoryBytes,
      }
    })
  })

  const requirements = pods.flatMap((pod: { name: string }) => {
    const containerCount = Math.floor(Math.random() * 2) + 1
    return Array.from({ length: containerCount }, (_, i) => {
      const cpuRequest = Math.floor(Math.random() * 300) + 100 // 100-400m
      const cpuLimit = cpuRequest + Math.floor(Math.random() * 500) + 200 // higher than request
      const memRequest = Math.floor(Math.random() * 300) + 200 // 200-500MB
      const memLimit = memRequest + Math.floor(Math.random() * 500) + 200 // higher than request

      return {
        podName: pod.name,
        containerName: i === 0 ? pod.name.split('-')[0] : `sidecar-${i}`,
        requests: {
          cpu: `${cpuRequest}m`,
          memory: `${memRequest}Mi`,
          cpuValue: cpuRequest,
          memoryValue: memRequest * 1024 * 1024,
        },
        limits: {
          cpu: `${cpuLimit}m`,
          memory: `${memLimit}Mi`,
          cpuValue: cpuLimit,
          memoryValue: memLimit * 1024 * 1024,
        },
      }
    })
  })

  return {
    deployment: deploymentName,
    namespace,
    metrics,
    requirements,
    timestamp: new Date().toISOString(),
  }
}
