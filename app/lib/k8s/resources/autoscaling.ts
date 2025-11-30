/**
 * Kubernetes Autoscaling API (HPAs)
 */

import { getAutoscalingApi } from '../client'
import { calculateAge } from '../utils/helpers'
import type { HPA } from '@/types/kubernetes'

/**
 * Fetch all horizontal pod autoscalers in a namespace
 */
export async function fetchHPAs(namespace: string, contextName?: string): Promise<HPA[]> {
  const autoscalingApi = getAutoscalingApi(contextName)
  const response = await autoscalingApi.listNamespacedHorizontalPodAutoscaler({ namespace })

  return response.items.map((hpa) => {
    const currentReplicas = hpa.status?.currentReplicas || 0
    const desiredReplicas = hpa.status?.desiredReplicas || 0
    const minReplicas = hpa.spec?.minReplicas || 1
    const maxReplicas = hpa.spec?.maxReplicas || 1

    // Extract CPU metrics
    const cpuMetric = hpa.status?.currentMetrics?.find(
      (m) => m.type === 'Resource' && m.resource?.name === 'cpu'
    )
    const cpuCurrent = cpuMetric?.resource?.current?.averageUtilization || 0

    const cpuTargetMetric = hpa.spec?.metrics?.find(
      (m) => m.type === 'Resource' && m.resource?.name === 'cpu'
    )
    const cpuTarget = cpuTargetMetric?.resource?.target?.averageUtilization || 0

    return {
      name: hpa.metadata?.name || '',
      namespace: hpa.metadata?.namespace || namespace,
      targetRef: {
        kind: hpa.spec?.scaleTargetRef?.kind || '',
        name: hpa.spec?.scaleTargetRef?.name || '',
      },
      minReplicas,
      maxReplicas,
      currentReplicas,
      desiredReplicas,
      metrics: [
        {
          type: 'Resource' as const,
          resource: {
            name: 'cpu',
            target: {
              type: 'Utilization' as const,
              averageUtilization: cpuTarget,
            },
            current: {
              averageUtilization: cpuCurrent,
            },
          },
        },
      ],
      age: calculateAge(hpa.metadata?.creationTimestamp),
      labels: hpa.metadata?.labels || {},
    }
  })
}
