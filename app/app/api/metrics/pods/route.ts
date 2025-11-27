import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { generateMockPodMetrics } from '@/lib/mocks/data'

const execAsync = promisify(exec)

interface PodMetrics {
  podName: string
  containerName: string
  cpu: string
  memory: string
  cpuValue: number // in millicores
  memoryValue: number // in bytes
}

interface ResourceRequirements {
  podName: string
  containerName: string
  requests: {
    cpu: string
    memory: string
    cpuValue: number
    memoryValue: number
  }
  limits: {
    cpu: string
    memory: string
    cpuValue: number
    memoryValue: number
  }
}

/**
 * Parse CPU value to millicores
 * Examples: "100m" -> 100, "1" -> 1000, "0.5" -> 500
 */
function parseCPU(cpu: string): number {
  if (!cpu) return 0
  if (cpu.endsWith('m')) {
    return parseInt(cpu.slice(0, -1))
  }
  if (cpu.endsWith('n')) {
    return parseInt(cpu.slice(0, -1)) / 1000000
  }
  return parseFloat(cpu) * 1000
}

/**
 * Parse memory value to bytes
 * Examples: "128Mi" -> bytes, "1Gi" -> bytes, "512Ki" -> bytes
 */
function parseMemory(memory: string): number {
  if (!memory) return 0

  const units: { [key: string]: number } = {
    'Ki': 1024,
    'Mi': 1024 * 1024,
    'Gi': 1024 * 1024 * 1024,
    'Ti': 1024 * 1024 * 1024 * 1024,
    'K': 1000,
    'M': 1000 * 1000,
    'G': 1000 * 1000 * 1000,
    'T': 1000 * 1000 * 1000 * 1000,
  }

  for (const [unit, multiplier] of Object.entries(units)) {
    if (memory.endsWith(unit)) {
      return parseInt(memory.slice(0, -unit.length)) * multiplier
    }
  }

  // If no unit, assume bytes
  return parseInt(memory)
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const namespace = searchParams.get('namespace') || 'default'
  const deploymentName = searchParams.get('deployment')
  const mode = searchParams.get('mode') || 'real'

  if (!deploymentName) {
    return NextResponse.json(
      { error: 'deployment parameter is required' },
      { status: 400 }
    )
  }

  // Return mock data in demo/mock mode
  if (mode === 'demo' || mode === 'demo') {
    const mockData = generateMockPodMetrics(deploymentName, namespace)
    return NextResponse.json(mockData)
  }

  try {
    // Get deployment to find pod selector
    const { stdout: deploymentJson } = await execAsync(
      `kubectl get deployment ${deploymentName} -n ${namespace} -o json`
    )
    const deployment = JSON.parse(deploymentJson)

    // Get pods for this deployment
    const labelSelector = Object.entries(deployment.spec.selector.matchLabels)
      .map(([key, value]) => `${key}=${value}`)
      .join(',')

    // Get pod metrics from metrics-server
    const { stdout: metricsOutput } = await execAsync(
      `kubectl top pods -n ${namespace} -l ${labelSelector} --no-headers`
    )

    // Get pod details for resource requests/limits
    const { stdout: podsJson } = await execAsync(
      `kubectl get pods -n ${namespace} -l ${labelSelector} -o json`
    )
    const podsData = JSON.parse(podsJson)

    // Parse metrics
    const metrics: PodMetrics[] = []
    const lines = metricsOutput.trim().split('\n').filter(line => line.trim())

    for (const line of lines) {
      const parts = line.split(/\s+/)
      if (parts.length >= 3) {
        const podName = parts[0]
        const cpu = parts[1]
        const memory = parts[2]

        // Find pod details
        interface K8sPodItem {
          metadata: { name: string }
          spec: { containers: Array<{ name: string }> }
        }
        const pod = podsData.items.find((p: K8sPodItem) => p.metadata.name === podName)

        if (pod) {
          for (const container of pod.spec.containers) {
            metrics.push({
              podName,
              containerName: container.name,
              cpu,
              memory,
              cpuValue: parseCPU(cpu),
              memoryValue: parseMemory(memory),
            })
          }
        }
      }
    }

    // Get resource requirements from pod specs
    const requirements: ResourceRequirements[] = []

    for (const pod of podsData.items) {
      const podName = pod.metadata.name

      for (const container of pod.spec.containers) {
        const requests = container.resources?.requests || {}
        const limits = container.resources?.limits || {}

        requirements.push({
          podName,
          containerName: container.name,
          requests: {
            cpu: requests.cpu || '0',
            memory: requests.memory || '0',
            cpuValue: parseCPU(requests.cpu || '0'),
            memoryValue: parseMemory(requests.memory || '0'),
          },
          limits: {
            cpu: limits.cpu || '0',
            memory: limits.memory || '0',
            cpuValue: parseCPU(limits.cpu || '0'),
            memoryValue: parseMemory(limits.memory || '0'),
          },
        })
      }
    }

    return NextResponse.json({
      deployment: deploymentName,
      namespace,
      metrics,
      requirements,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Failed to fetch pod metrics:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch pod metrics',
        details: error instanceof Error ? error.message : 'Unknown error',
        suggestion: 'Make sure metrics-server is installed in your cluster: kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml'
      },
      { status: 500 }
    )
  }
}
