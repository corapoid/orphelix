import type {
  Pod,
  Deployment,
  Node,
  ConfigMap,
  Secret,
  HPA,
  PersistentVolume,
  PersistentVolumeClaim,
  Event,
  DashboardSummary,
  PodStatus,
  DeploymentStatus,
  NodeStatus,
} from '@/types/kubernetes'

/**
 * Generates mock Kubernetes data for demo purposes
 */

// Cache for mock data to ensure consistency across calls
let cachedPods: Pod[] | null = null
let cachedDeployments: Deployment[] | null = null
let cachedNodes: Node[] | null = null
let cachedConfigMaps: ConfigMap[] | null = null
let cachedSecrets: Secret[] | null = null
let cachedHPAs: HPA[] | null = null
let cachedPVs: PersistentVolume[] | null = null
let cachedPVCs: PersistentVolumeClaim[] | null = null
let cachedEvents: Event[] | null = null

// Helper to generate random date in the past
function randomDate(daysAgo: number): Date {
  const now = new Date()
  const ms = Math.random() * daysAgo * 24 * 60 * 60 * 1000
  return new Date(now.getTime() - ms)
}

// Helper to generate random item from array
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Helper to calculate age from date
function calculateAge(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      return `${diffMins}m`
    }
    return `${diffHours}h`
  }
  return `${diffDays}d`
}

/**
 * Generates mock pods
 */
export function generateMockPods(): Pod[] {
  if (cachedPods) {
    return cachedPods
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

      pods.push({
        name: `${app}-${hash}`,
        namespace: 'default',
        status,
        restartCount: status === 'CrashLoopBackOff' ? Math.floor(Math.random() * 10) : 0,
        age: calculateAge(randomDate(30)),
        nodeName: randomItem(nodes),
        ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        containers: [
          {
            name: app,
            image: `${app}:latest`,
            ready: status === 'Running',
            restartCount: status === 'CrashLoopBackOff' ? Math.floor(Math.random() * 10) : 0,
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

  cachedPods = pods
  return pods
}

/**
 * Generates mock deployments
 */
export function generateMockDeployments(): Deployment[] {
  if (cachedDeployments) {
    return cachedDeployments
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

  cachedDeployments = deployments
  return deployments
}

/**
 * Generates mock nodes
 */
export function generateMockNodes(): Node[] {
  if (cachedNodes) {
    return cachedNodes
  }

  const nodes: Node[] = []
  const statuses: NodeStatus[] = ['Ready', 'Ready', 'Ready', 'NotReady'] // 75% ready

  for (let i = 1; i <= 4; i++) {
    nodes.push({
      name: `node-${i}`,
      status: randomItem(statuses),
      roles: i === 1 ? ['control-plane', 'master'] : ['worker'],
      age: calculateAge(randomDate(180)),
      version: 'v1.28.0',
      capacity: {
        cpu: `${Math.floor(Math.random() * 8) + 4}`,
        memory: `${Math.floor(Math.random() * 16) + 8}Gi`,
        pods: '110',
      },
      allocatable: {
        cpu: `${Math.floor(Math.random() * 7) + 3}`,
        memory: `${Math.floor(Math.random() * 14) + 6}Gi`,
        pods: '110',
      },
      labels: {
        'kubernetes.io/hostname': `node-${i}`,
        'node-role.kubernetes.io/worker': '',
      },
      conditions: [
        {
          type: 'Ready',
          status: randomItem(statuses) === 'Ready' ? 'True' : 'False',
          reason: 'KubeletReady',
          message: 'kubelet is posting ready status',
        },
      ],
    })
  }

  cachedNodes = nodes
  return nodes
}

/**
 * Generates mock ConfigMaps
 */
export function generateMockConfigMaps(): ConfigMap[] {
  if (cachedConfigMaps) {
    return cachedConfigMaps
  }

  const apps = ['web-app', 'api-server', 'worker', 'cache', 'database']

  const configMaps = apps.map((app) => ({
    name: `${app}-config`,
    namespace: 'default',
    age: calculateAge(randomDate(60)),
    data: {
      'app.conf': `key=value\napp=${app}`,
      'config.yaml': 'setting: true',
    },
    labels: {
      app,
    },
  }))

  cachedConfigMaps = configMaps
  return configMaps
}

/**
 * Generates mock Secrets
 */
export function generateMockSecrets(): Secret[] {
  if (cachedSecrets) {
    return cachedSecrets
  }

  const apps = ['web-app', 'api-server', 'worker', 'cache', 'database']
  const types = ['Opaque', 'kubernetes.io/tls', 'kubernetes.io/dockerconfigjson']

  const secrets = apps.map((app) => ({
    name: `${app}-secret`,
    namespace: 'default',
    type: randomItem(types),
    age: calculateAge(randomDate(60)),
    keys: ['password', 'api-key', 'token'],
    data: {
      password: btoa('super-secret-password-123'),
      'api-key': btoa('ak-1234567890abcdef'),
      token: btoa('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'),
    },
    labels: {
      app,
    },
  }))

  cachedSecrets = secrets
  return secrets
}

/**
 * Generates mock HPAs
 */
export function generateMockHPAs(): HPA[] {
  if (cachedHPAs) {
    return cachedHPAs
  }

  const apps = ['web-app', 'api-server', 'worker']

  const hpas = apps.map((app) => {
    const min = 2
    const max = 10
    const current = Math.floor(Math.random() * (max - min)) + min

    return {
      name: `${app}-hpa`,
      namespace: 'default',
      targetRef: {
        kind: 'Deployment',
        name: app,
      },
      minReplicas: min,
      maxReplicas: max,
      currentReplicas: current,
      desiredReplicas: current,
      metrics: [
        {
          type: 'Resource' as const,
          resource: {
            name: 'cpu',
            target: {
              type: 'Utilization' as const,
              averageUtilization: 80,
            },
            current: {
              averageUtilization: Math.floor(Math.random() * 100),
            },
          },
        },
      ],
      age: calculateAge(randomDate(30)),
    }
  })

  cachedHPAs = hpas
  return hpas
}

/**
 * Generates mock PersistentVolumes
 */
export function generateMockPVs(): PersistentVolume[] {
  if (cachedPVs) {
    return cachedPVs
  }

  const pvs: PersistentVolume[] = []

  for (let i = 1; i <= 5; i++) {
    pvs.push({
      name: `pv-${i}`,
      capacity: `${Math.floor(Math.random() * 50) + 10}Gi`,
      accessModes: ['ReadWriteOnce'],
      reclaimPolicy: 'Delete',
      status: Math.random() > 0.2 ? 'Bound' : 'Available',
      claim: Math.random() > 0.2 ? `default/pvc-${i}` : undefined,
      storageClass: 'gp2',
      age: calculateAge(randomDate(90)),
    })
  }

  cachedPVs = pvs
  return pvs
}

/**
 * Generates mock PersistentVolumeClaims
 */
export function generateMockPVCs(): PersistentVolumeClaim[] {
  if (cachedPVCs) {
    return cachedPVCs
  }

  const apps = ['database', 'cache']

  const pvcs = apps.map((app, i) => ({
    name: `${app}-pvc`,
    namespace: 'default',
    status: 'Bound' as const,
    volume: `pv-${i + 1}`,
    capacity: `${Math.floor(Math.random() * 50) + 10}Gi`,
    accessModes: ['ReadWriteOnce'],
    storageClass: 'gp2',
    age: calculateAge(randomDate(60)),
  }))

  cachedPVCs = pvcs
  return pvcs
}

/**
 * Generates mock Events
 */
export function generateMockEvents(): Event[] {
  if (cachedEvents) {
    return cachedEvents
  }

  const events: Event[] = []
  const types: Array<'Normal' | 'Warning'> = ['Normal', 'Warning']
  const reasons = [
    'Created',
    'Started',
    'Pulled',
    'Killing',
    'FailedScheduling',
    'BackOff',
    'Unhealthy',
  ]
  const apps = ['web-app', 'api-server', 'worker', 'cache', 'database']

  for (let i = 0; i < 50; i++) {
    const type = randomItem(types)
    const reason = randomItem(reasons)
    const app = randomItem(apps)
    const lastTimestamp = randomDate(1) // Last 24h

    events.push({
      type,
      reason,
      message:
        type === 'Warning'
          ? `Failed to pull image "${app}:latest": connection timeout`
          : `Successfully pulled image "${app}:latest"`,
      kind: randomItem(['Pod', 'Deployment', 'ReplicaSet']),
      name: `${app}-${Math.random().toString(36).substring(2, 12)}`,
      namespace: 'default',
      count: Math.floor(Math.random() * 10) + 1,
      firstTimestamp: randomDate(7).toISOString(),
      lastTimestamp: lastTimestamp.toISOString(),
    })
  }

  // Sort by lastTimestamp descending
  const sortedEvents = events.sort((a, b) =>
    new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime()
  )
  cachedEvents = sortedEvents
  return sortedEvents
}

/**
 * Generates dashboard summary from mock data
 */
export function generateMockDashboardSummary(): DashboardSummary {
  const deployments = generateMockDeployments()
  const pods = generateMockPods()
  const nodes = generateMockNodes()
  const pvs = generateMockPVs()

  return {
    deployments: {
      total: deployments.length,
      healthy: deployments.filter((d) => d.status === 'Available').length,
      degraded: deployments.filter((d) => d.status === 'Degraded').length,
    },
    pods: {
      total: pods.length,
      running: pods.filter((p) => p.status === 'Running').length,
      pending: pods.filter((p) => p.status === 'Pending').length,
      failed: pods.filter((p) => p.status === 'Failed' || p.status === 'CrashLoopBackOff').length,
    },
    nodes: {
      total: nodes.length,
      ready: nodes.filter((n) => n.status === 'Ready').length,
      notReady: nodes.filter((n) => n.status === 'NotReady').length,
    },
    configMaps: generateMockConfigMaps().length,
    secrets: generateMockSecrets().length,
    hpa: generateMockHPAs().length,
    pv: {
      total: pvs.length,
      bound: pvs.filter((pv) => pv.status === 'Bound').length,
    },
    services: 8,
    ingress: 3,
  }
}

export function generateMockPodMetrics(deploymentName: string, namespace: string = 'default') {
  const pods = generateMockPods().filter(p =>
    p.namespace === namespace &&
    p.labels['app'] &&
    deploymentName.includes(p.labels['app'])
  )

  if (pods.length === 0) {
    // If no matching pods, generate some generic ones
    const genericPod = {
      name: `${deploymentName}-abc123-xyz`,
      namespace,
      labels: { app: deploymentName },
    }
    pods.push(genericPod as any)
  }

  const metrics = pods.flatMap(pod => {
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

  const requirements = pods.flatMap(pod => {
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
