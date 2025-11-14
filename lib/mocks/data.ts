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
  Service,
  ServiceType,
  Ingress,
  Job,
  JobStatus,
  CronJob,
  Namespace,
  ResourceQuota,
  LimitRange,
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
let cachedServices: Service[] | null = null
let cachedIngresses: Ingress[] | null = null
let cachedJobs: Job[] | null = null
let cachedCronJobs: CronJob[] | null = null
let cachedNamespaces: Namespace[] | null = null
let cachedResourceQuotas: ResourceQuota[] | null = null
let cachedLimitRanges: LimitRange[] | null = null

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
 * Generates mock Services
 */
export function generateMockServices(): Service[] {
  if (cachedServices) return cachedServices

  const services: Service[] = [
    {
      name: 'frontend-service',
      namespace: 'demo',
      type: 'LoadBalancer',
      clusterIP: '10.100.15.42',
      externalIPs: ['52.29.145.78'],
      ports: [
        { protocol: 'TCP', port: 80, targetPort: 8080 },
        { protocol: 'TCP', port: 443, targetPort: 8443 },
      ],
      selector: { app: 'frontend', tier: 'web' },
      age: '15d',
      labels: { app: 'frontend', environment: 'production', version: 'v2.1.0' },
    },
    {
      name: 'backend-api-service',
      namespace: 'demo',
      type: 'ClusterIP',
      clusterIP: '10.100.23.15',
      ports: [
        { name: 'http', protocol: 'TCP', port: 8080, targetPort: 8080 },
        { name: 'metrics', protocol: 'TCP', port: 9090, targetPort: 9090 },
      ],
      selector: { app: 'backend-api', tier: 'backend' },
      age: '12d',
      labels: { app: 'backend-api', environment: 'production', version: 'v1.8.3' },
    },
    {
      name: 'database-service',
      namespace: 'demo',
      type: 'ClusterIP',
      clusterIP: '10.100.45.200',
      ports: [
        { name: 'postgres', protocol: 'TCP', port: 5432, targetPort: 5432 },
      ],
      selector: { app: 'database', tier: 'data' },
      age: '30d',
      labels: { app: 'database', environment: 'production', version: 'v14.5' },
    },
    {
      name: 'redis-cache',
      namespace: 'demo',
      type: 'ClusterIP',
      clusterIP: '10.100.67.89',
      ports: [
        { name: 'redis', protocol: 'TCP', port: 6379, targetPort: 6379 },
      ],
      selector: { app: 'redis', tier: 'cache' },
      age: '22d',
      labels: { app: 'redis', environment: 'production' },
    },
    {
      name: 'admin-panel',
      namespace: 'demo',
      type: 'NodePort',
      clusterIP: '10.100.89.123',
      ports: [
        { name: 'http', protocol: 'TCP', port: 80, targetPort: 3000, nodePort: 30080 },
      ],
      selector: { app: 'admin', tier: 'web' },
      age: '8d',
      labels: { app: 'admin', environment: 'production' },
    },
    {
      name: 'monitoring-service',
      namespace: 'demo',
      type: 'ClusterIP',
      clusterIP: '10.100.112.45',
      ports: [
        { name: 'prometheus', protocol: 'TCP', port: 9090, targetPort: 9090 },
        { name: 'grafana', protocol: 'TCP', port: 3000, targetPort: 3000 },
      ],
      selector: { app: 'monitoring' },
      age: '45d',
      labels: { app: 'monitoring', component: 'observability' },
    },
    {
      name: 'message-queue',
      namespace: 'demo',
      type: 'ClusterIP',
      clusterIP: '10.100.134.67',
      ports: [
        { name: 'amqp', protocol: 'TCP', port: 5672, targetPort: 5672 },
        { name: 'management', protocol: 'TCP', port: 15672, targetPort: 15672 },
      ],
      selector: { app: 'rabbitmq', tier: 'messaging' },
      age: '18d',
      labels: { app: 'rabbitmq', environment: 'production' },
    },
    {
      name: 'external-api',
      namespace: 'demo',
      type: 'ExternalName',
      clusterIP: '',
      externalIPs: ['api.external-service.com'],
      ports: [],
      selector: {},
      age: '60d',
      labels: { type: 'external' },
    },
  ]

  cachedServices = services
  return services
}

/**
 * Generates mock Ingress resources
 */
export function generateMockIngresses(): Ingress[] {
  if (cachedIngresses) return cachedIngresses

  const ingresses: Ingress[] = [
    {
      name: 'frontend-ingress',
      namespace: 'demo',
      className: 'nginx',
      hosts: ['app.example.com', 'www.example.com'],
      rules: [
        {
          host: 'app.example.com',
          paths: [
            {
              path: '/',
              pathType: 'Prefix',
              backend: {
                service: {
                  name: 'frontend-service',
                  port: { number: 80 },
                },
              },
            },
            {
              path: '/api',
              pathType: 'Prefix',
              backend: {
                service: {
                  name: 'backend-api-service',
                  port: { number: 8080 },
                },
              },
            },
          ],
        },
        {
          host: 'www.example.com',
          paths: [
            {
              path: '/',
              pathType: 'Prefix',
              backend: {
                service: {
                  name: 'frontend-service',
                  port: { number: 80 },
                },
              },
            },
          ],
        },
      ],
      tls: [
        {
          hosts: ['app.example.com', 'www.example.com'],
          secretName: 'example-com-tls',
        },
      ],
      age: '15d',
      labels: { app: 'frontend', environment: 'production' },
    },
    {
      name: 'admin-ingress',
      namespace: 'demo',
      className: 'nginx',
      hosts: ['admin.example.com'],
      rules: [
        {
          host: 'admin.example.com',
          paths: [
            {
              path: '/',
              pathType: 'Prefix',
              backend: {
                service: {
                  name: 'admin-panel',
                  port: { number: 80 },
                },
              },
            },
          ],
        },
      ],
      tls: [
        {
          hosts: ['admin.example.com'],
          secretName: 'admin-tls',
        },
      ],
      age: '8d',
      labels: { app: 'admin', environment: 'production' },
    },
    {
      name: 'monitoring-ingress',
      namespace: 'demo',
      className: 'nginx',
      hosts: ['monitoring.example.com'],
      rules: [
        {
          host: 'monitoring.example.com',
          paths: [
            {
              path: '/prometheus',
              pathType: 'Prefix',
              backend: {
                service: {
                  name: 'monitoring-service',
                  port: { number: 9090 },
                },
              },
            },
            {
              path: '/grafana',
              pathType: 'Prefix',
              backend: {
                service: {
                  name: 'monitoring-service',
                  port: { number: 3000 },
                },
              },
            },
          ],
        },
      ],
      age: '45d',
      labels: { app: 'monitoring', component: 'observability' },
    },
  ]

  cachedIngresses = ingresses
  return ingresses
}

/**
 * Generates mock Jobs
 */
export function generateMockJobs(): Job[] {
  if (cachedJobs) return cachedJobs

  const jobs: Job[] = [
    {
      name: 'data-migration-20241114',
      namespace: 'demo',
      status: 'Complete',
      completions: 1,
      succeeded: 1,
      failed: 0,
      active: 0,
      startTime: '2024-11-14T08:00:00Z',
      completionTime: '2024-11-14T08:15:23Z',
      duration: '15m 23s',
      age: '6h',
      labels: { app: 'migration', type: 'batch' },
      conditions: [
        {
          type: 'Complete',
          status: 'True',
          lastTransitionTime: '2024-11-14T08:15:23Z',
        },
      ],
    },
    {
      name: 'backup-database',
      namespace: 'demo',
      status: 'Running',
      completions: 1,
      succeeded: 0,
      failed: 0,
      active: 1,
      startTime: '2024-11-14T14:30:00Z',
      duration: '5m 12s',
      age: '5m',
      labels: { app: 'backup', type: 'batch' },
      conditions: [],
    },
    {
      name: 'report-generation-failed',
      namespace: 'demo',
      status: 'Failed',
      completions: 1,
      succeeded: 0,
      failed: 1,
      active: 0,
      startTime: '2024-11-14T12:00:00Z',
      completionTime: '2024-11-14T12:02:15Z',
      duration: '2m 15s',
      age: '2h',
      labels: { app: 'reporting', type: 'batch' },
      conditions: [
        {
          type: 'Failed',
          status: 'True',
          lastTransitionTime: '2024-11-14T12:02:15Z',
          reason: 'BackoffLimitExceeded',
          message: 'Job has reached the specified backoff limit',
        },
      ],
    },
    {
      name: 'cleanup-temp-files',
      namespace: 'demo',
      status: 'Complete',
      completions: 1,
      succeeded: 1,
      failed: 0,
      active: 0,
      startTime: '2024-11-14T06:00:00Z',
      completionTime: '2024-11-14T06:03:45Z',
      duration: '3m 45s',
      age: '8h',
      labels: { app: 'cleanup', type: 'maintenance' },
      conditions: [
        {
          type: 'Complete',
          status: 'True',
          lastTransitionTime: '2024-11-14T06:03:45Z',
        },
      ],
    },
    {
      name: 'image-processing-batch',
      namespace: 'demo',
      status: 'Complete',
      completions: 5,
      succeeded: 5,
      failed: 0,
      active: 0,
      startTime: '2024-11-14T10:00:00Z',
      completionTime: '2024-11-14T10:45:30Z',
      duration: '45m 30s',
      age: '4h',
      labels: { app: 'image-processor', type: 'batch' },
      conditions: [
        {
          type: 'Complete',
          status: 'True',
          lastTransitionTime: '2024-11-14T10:45:30Z',
        },
      ],
    },
  ]

  cachedJobs = jobs
  return jobs
}

/**
 * Generates mock CronJobs
 */
export function generateMockCronJobs(): CronJob[] {
  if (cachedCronJobs) return cachedCronJobs

  const cronJobs: CronJob[] = [
    {
      name: 'nightly-backup',
      namespace: 'demo',
      schedule: '0 2 * * *',
      suspend: false,
      active: 0,
      lastSchedule: '2024-11-14T02:00:00Z',
      lastSuccessfulTime: '2024-11-14T02:15:00Z',
      age: '60d',
      labels: { app: 'backup', frequency: 'daily' },
    },
    {
      name: 'hourly-reports',
      namespace: 'demo',
      schedule: '0 * * * *',
      suspend: false,
      active: 1,
      lastSchedule: '2024-11-14T14:00:00Z',
      lastSuccessfulTime: '2024-11-14T13:05:00Z',
      age: '30d',
      labels: { app: 'reporting', frequency: 'hourly' },
    },
    {
      name: 'weekly-cleanup',
      namespace: 'demo',
      schedule: '0 3 * * 0',
      suspend: false,
      active: 0,
      lastSchedule: '2024-11-10T03:00:00Z',
      lastSuccessfulTime: '2024-11-10T03:12:00Z',
      age: '45d',
      labels: { app: 'cleanup', frequency: 'weekly' },
    },
    {
      name: 'monthly-archive',
      namespace: 'demo',
      schedule: '0 4 1 * *',
      suspend: false,
      active: 0,
      lastSchedule: '2024-11-01T04:00:00Z',
      lastSuccessfulTime: '2024-11-01T04:30:00Z',
      age: '90d',
      labels: { app: 'archiver', frequency: 'monthly' },
    },
    {
      name: 'test-job-suspended',
      namespace: 'demo',
      schedule: '*/5 * * * *',
      suspend: true,
      active: 0,
      lastSchedule: '2024-11-13T15:00:00Z',
      lastSuccessfulTime: '2024-11-13T15:01:00Z',
      age: '10d',
      labels: { app: 'test', frequency: 'every-5-minutes' },
    },
  ]

  cachedCronJobs = cronJobs
  return cronJobs
}

/**
 * Generates dashboard summary from mock data
 */
export function generateMockDashboardSummary(): DashboardSummary {
  const deployments = generateMockDeployments()
  const pods = generateMockPods()
  const nodes = generateMockNodes()
  const pvs = generateMockPVs()
  const services = generateMockServices()
  const ingresses = generateMockIngresses()

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
    services: services.length,
    ingress: ingresses.length,
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

/**
 * Generate mock Namespaces
 */
export function generateMockNamespaces(): Namespace[] {
  if (cachedNamespaces) return cachedNamespaces

  const namespaces: Namespace[] = [
    {
      name: 'default',
      status: 'Active',
      age: '120d',
      labels: {},
      annotations: {},
    },
    {
      name: 'kube-system',
      status: 'Active',
      age: '120d',
      labels: {
        'kubernetes.io/metadata.name': 'kube-system',
      },
      annotations: {},
    },
    {
      name: 'production',
      status: 'Active',
      age: '90d',
      labels: {
        environment: 'production',
        team: 'platform',
      },
      annotations: {
        'description': 'Production workloads',
      },
    },
    {
      name: 'staging',
      status: 'Active',
      age: '90d',
      labels: {
        environment: 'staging',
        team: 'platform',
      },
      annotations: {
        'description': 'Staging environment for testing',
      },
    },
    {
      name: 'development',
      status: 'Active',
      age: '60d',
      labels: {
        environment: 'development',
        team: 'engineering',
      },
      annotations: {
        'description': 'Development workloads',
      },
    },
  ]

  cachedNamespaces = namespaces
  return namespaces
}

/**
 * Generate mock ResourceQuotas
 */
export function generateMockResourceQuotas(): ResourceQuota[] {
  if (cachedResourceQuotas) return cachedResourceQuotas

  const quotas: ResourceQuota[] = [
    {
      name: 'production-quota',
      namespace: 'production',
      age: '90d',
      hard: {
        'requests.cpu': '100',
        'requests.memory': '200Gi',
        'limits.cpu': '200',
        'limits.memory': '400Gi',
        'persistentvolumeclaims': '50',
        'pods': '100',
      },
      used: {
        'requests.cpu': '75',
        'requests.memory': '150Gi',
        'limits.cpu': '150',
        'limits.memory': '300Gi',
        'persistentvolumeclaims': '32',
        'pods': '67',
      },
      labels: {
        environment: 'production',
      },
    },
    {
      name: 'staging-quota',
      namespace: 'staging',
      age: '90d',
      hard: {
        'requests.cpu': '50',
        'requests.memory': '100Gi',
        'limits.cpu': '100',
        'limits.memory': '200Gi',
        'pods': '50',
      },
      used: {
        'requests.cpu': '25',
        'requests.memory': '45Gi',
        'limits.cpu': '50',
        'limits.memory': '90Gi',
        'pods': '28',
      },
      labels: {
        environment: 'staging',
      },
    },
    {
      name: 'dev-quota',
      namespace: 'development',
      age: '60d',
      hard: {
        'requests.cpu': '30',
        'requests.memory': '60Gi',
        'limits.cpu': '60',
        'limits.memory': '120Gi',
        'pods': '30',
      },
      used: {
        'requests.cpu': '12',
        'requests.memory': '24Gi',
        'limits.cpu': '24',
        'limits.memory': '48Gi',
        'pods': '15',
      },
      labels: {
        environment: 'development',
      },
    },
  ]

  cachedResourceQuotas = quotas
  return quotas
}

/**
 * Generate mock LimitRanges
 */
export function generateMockLimitRanges(): LimitRange[] {
  if (cachedLimitRanges) return cachedLimitRanges

  const limitRanges: LimitRange[] = [
    {
      name: 'production-limits',
      namespace: 'production',
      age: '90d',
      limits: [
        {
          type: 'Pod',
          max: {
            cpu: '4',
            memory: '16Gi',
          },
          min: {
            cpu: '100m',
            memory: '128Mi',
          },
        },
        {
          type: 'Container',
          max: {
            cpu: '2',
            memory: '8Gi',
          },
          min: {
            cpu: '50m',
            memory: '64Mi',
          },
          default: {
            cpu: '500m',
            memory: '512Mi',
          },
          defaultRequest: {
            cpu: '100m',
            memory: '128Mi',
          },
        },
        {
          type: 'PersistentVolumeClaim',
          max: {
            storage: '100Gi',
          },
          min: {
            storage: '1Gi',
          },
        },
      ],
      labels: {
        environment: 'production',
      },
    },
    {
      name: 'dev-limits',
      namespace: 'development',
      age: '60d',
      limits: [
        {
          type: 'Container',
          max: {
            cpu: '1',
            memory: '2Gi',
          },
          default: {
            cpu: '200m',
            memory: '256Mi',
          },
          defaultRequest: {
            cpu: '100m',
            memory: '128Mi',
          },
        },
      ],
      labels: {
        environment: 'development',
      },
    },
  ]

  cachedLimitRanges = limitRanges
  return limitRanges
}
