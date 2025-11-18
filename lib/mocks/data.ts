import type {
  Pod,
  Deployment,
  StatefulSet,
  DaemonSet,
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
  Ingress,
  Job,
  CronJob,
  Namespace,
  ResourceQuota,
  LimitRange,
} from '@/types/kubernetes'

/**
 * Generates mock Kubernetes data for demo purposes
 */

// Use global cache that survives HMR and navigation
// Only resets on full page reload (F5)
declare global {
  interface Window {
    __mockDataCache?: {
      pods: Pod[] | null
      deployments: Deployment[] | null
      statefulSets: StatefulSet[] | null
      daemonSets: DaemonSet[] | null
      nodes: Node[] | null
      configMaps: ConfigMap[] | null
      secrets: Secret[] | null
      hpas: HPA[] | null
      pvs: PersistentVolume[] | null
      pvcs: PersistentVolumeClaim[] | null
      events: Event[] | null
      services: Service[] | null
      ingresses: Ingress[] | null
      jobs: Job[] | null
      cronJobs: CronJob[] | null
      namespaces: Namespace[] | null
      resourceQuotas: ResourceQuota[] | null
      limitRanges: LimitRange[] | null
    }
  }
}

// Initialize cache if it doesn't exist
if (typeof window !== 'undefined' && !window.__mockDataCache) {
  window.__mockDataCache = {
    pods: null,
    deployments: null,
    statefulSets: null,
    daemonSets: null,
    nodes: null,
    configMaps: null,
    secrets: null,
    hpas: null,
    pvs: null,
    pvcs: null,
    events: null,
    services: null,
    ingresses: null,
    jobs: null,
    cronJobs: null,
    namespaces: null,
    resourceQuotas: null,
    limitRanges: null,
  }
}

// Helper getters and setters for cache
const getCache = () => (typeof window !== 'undefined' ? window.__mockDataCache : null)
const getCachedPods = () => getCache()?.pods || null
const setCachedPods = (data: Pod[]) => { if (getCache()) getCache()!.pods = data }
const getCachedDeployments = () => getCache()?.deployments || null
const setCachedDeployments = (data: Deployment[]) => { if (getCache()) getCache()!.deployments = data }
const getCachedStatefulSets = () => getCache()?.statefulSets || null
const setCachedStatefulSets = (data: StatefulSet[]) => { if (getCache()) getCache()!.statefulSets = data }
const getCachedDaemonSets = () => getCache()?.daemonSets || null
const setCachedDaemonSets = (data: DaemonSet[]) => { if (getCache()) getCache()!.daemonSets = data }
const getCachedNodes = () => getCache()?.nodes || null
const setCachedNodes = (data: Node[]) => { if (getCache()) getCache()!.nodes = data }
const getCachedConfigMaps = () => getCache()?.configMaps || null
const setCachedConfigMaps = (data: ConfigMap[]) => { if (getCache()) getCache()!.configMaps = data }
const getCachedSecrets = () => getCache()?.secrets || null
const setCachedSecrets = (data: Secret[]) => { if (getCache()) getCache()!.secrets = data }
const getCachedHPAs = () => getCache()?.hpas || null
const setCachedHPAs = (data: HPA[]) => { if (getCache()) getCache()!.hpas = data }
const getCachedPVs = () => getCache()?.pvs || null
const setCachedPVs = (data: PersistentVolume[]) => { if (getCache()) getCache()!.pvs = data }
const getCachedPVCs = () => getCache()?.pvcs || null
const setCachedPVCs = (data: PersistentVolumeClaim[]) => { if (getCache()) getCache()!.pvcs = data }
const getCachedEvents = () => getCache()?.events || null
const setCachedEvents = (data: Event[]) => { if (getCache()) getCache()!.events = data }
const getCachedServices = () => getCache()?.services || null
const setCachedServices = (data: Service[]) => { if (getCache()) getCache()!.services = data }
const getCachedIngresses = () => getCache()?.ingresses || null
const setCachedIngresses = (data: Ingress[]) => { if (getCache()) getCache()!.ingresses = data }
const getCachedJobs = () => getCache()?.jobs || null
const setCachedJobs = (data: Job[]) => { if (getCache()) getCache()!.jobs = data }
const getCachedCronJobs = () => getCache()?.cronJobs || null
const setCachedCronJobs = (data: CronJob[]) => { if (getCache()) getCache()!.cronJobs = data }
const getCachedNamespaces = () => getCache()?.namespaces || null
const setCachedNamespaces = (data: Namespace[]) => { if (getCache()) getCache()!.namespaces = data }
const getCachedResourceQuotas = () => getCache()?.resourceQuotas || null
const setCachedResourceQuotas = (data: ResourceQuota[]) => { if (getCache()) getCache()!.resourceQuotas = data }
const getCachedLimitRanges = () => getCache()?.limitRanges || null
const setCachedLimitRanges = (data: LimitRange[]) => { if (getCache()) getCache()!.limitRanges = data }

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
            livenessProbe: hasProbes ? {
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
            } : undefined,
            readinessProbe: hasProbes ? {
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
            } : undefined,
          },
        ],
        containerStatuses: [
          {
            name: app,
            ready: status === 'Running',
            restartCount,
            state: status === 'Running' ? {
              running: {
                startedAt: randomDate(7).toISOString(),
              },
            } : status === 'CrashLoopBackOff' ? {
              waiting: {
                reason: 'CrashLoopBackOff',
                message: 'Back-off 5m0s restarting failed container',
              },
            } : {
              waiting: {
                reason: 'ContainerCreating',
              },
            },
            lastState: restartCount > 0 ? {
              terminated: {
                exitCode: 1,
                reason: 'Error',
                message: 'Application crashed due to uncaught exception',
                startedAt: randomDate(7).toISOString(),
                finishedAt: randomDate(6).toISOString(),
              },
            } : undefined,
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
 * Generates mock deployments
 */
export function generateMockDeployments(): Deployment[] {
  const cached = getCachedDeployments(); if (cached) {
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

/**
 * Generates mock nodes
 */
export function generateMockNodes(): Node[] {
  const cached = getCachedNodes(); if (cached) {
    return cached
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

  setCachedNodes(nodes)
  return nodes
}

/**
 * Generates mock ConfigMaps
 */
export function generateMockConfigMaps(): ConfigMap[] {
  const cached = getCachedConfigMaps(); if (cached) {
    return cached
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

  setCachedConfigMaps(configMaps)
  return configMaps
}

/**
 * Generates mock Secrets
 */
export function generateMockSecrets(): Secret[] {
  const cached = getCachedSecrets(); if (cached) {
    return cached
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

  setCachedSecrets(secrets)
  return secrets
}

/**
 * Generates mock HPAs
 */
export function generateMockHPAs(): HPA[] {
  const cached = getCachedHPAs(); if (cached) {
    return cached
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

  setCachedHPAs(hpas)
  return hpas
}

/**
 * Generates mock PersistentVolumes
 */
export function generateMockPVs(): PersistentVolume[] {
  const cached = getCachedPVs(); if (cached) {
    return cached
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

  setCachedPVs(pvs)
  return pvs
}

/**
 * Generates mock PersistentVolumeClaims
 */
export function generateMockPVCs(): PersistentVolumeClaim[] {
  const cached = getCachedPVCs(); if (cached) {
    return cached
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

  setCachedPVCs(pvcs)
  return pvcs
}

/**
 * Generates mock Events
 */
export function generateMockEvents(): Event[] {
  const cached = getCachedEvents(); if (cached) {
    return cached
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
  setCachedEvents(sortedEvents)
  return sortedEvents
}

/**
 * Generates mock Services
 */
export function generateMockServices(): Service[] {
  const cached = getCachedServices(); if (cached) return cached

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

  setCachedServices(services)
  return services
}

/**
 * Generates mock Ingress resources
 */
export function generateMockIngresses(): Ingress[] {
  const cached = getCachedIngresses(); if (cached) return cached

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

  setCachedIngresses(ingresses)
  return ingresses
}

/**
 * Generates mock Jobs
 */
export function generateMockJobs(): Job[] {
  const cached = getCachedJobs(); if (cached) return cached

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

  setCachedJobs(jobs)
  return jobs
}

/**
 * Generates mock CronJobs
 */
export function generateMockCronJobs(): CronJob[] {
  const cached = getCachedCronJobs(); if (cached) return cached

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

  setCachedCronJobs(cronJobs)
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
  const jobs = generateMockJobs()
  const cronjobs = generateMockCronJobs()
  const statefulsets = generateMockStatefulSets()
  const daemonsets = generateMockDaemonSets()

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
    jobs: {
      total: jobs.length,
      active: jobs.filter((j) => j.active > 0).length,
      succeeded: jobs.filter((j) => j.succeeded > 0).length,
      failed: jobs.filter((j) => j.failed > 0).length,
    },
    cronjobs: {
      total: cronjobs.length,
      active: jobs.filter((j) => j.active > 0).length,
      suspended: cronjobs.filter((cj) => cj.suspend).length,
    },
    statefulsets: {
      total: statefulsets.length,
      ready: statefulsets.filter((s) => s.replicas.ready === s.replicas.desired).length,
      notReady: statefulsets.filter((s) => s.replicas.ready !== s.replicas.desired).length,
    },
    daemonsets: {
      total: daemonsets.length,
      ready: daemonsets.filter((d) => d.numberReady === d.desiredNumberScheduled).length,
      notReady: daemonsets.filter((d) => d.numberReady !== d.desiredNumberScheduled).length,
    },
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
  const cached = getCachedNamespaces(); if (cached) return cached

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

  setCachedNamespaces(namespaces)
  return namespaces
}

/**
 * Generate mock ResourceQuotas
 */
export function generateMockResourceQuotas(): ResourceQuota[] {
  const cached = getCachedResourceQuotas(); if (cached) return cached

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

  setCachedResourceQuotas(quotas)
  return quotas
}

/**
 * Generate mock LimitRanges
 */
export function generateMockLimitRanges(): LimitRange[] {
  const cached = getCachedLimitRanges(); if (cached) return cached

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

  setCachedLimitRanges(limitRanges)
  return limitRanges
}

/**
 * Generates mock StatefulSets
 */
export function generateMockStatefulSets(): StatefulSet[] {
  const cached = getCachedStatefulSets()
  if (cached) return cached

  const statefulSets: StatefulSet[] = [
    {
      name: 'redis-cluster',
      namespace: 'demo',
      replicas: {
        desired: 3,
        ready: 3,
        current: 3,
        updated: 3,
      },
      status: 'Healthy',
      age: '45d',
      labels: { app: 'redis', component: 'cache' },
      selector: { app: 'redis' },
      serviceName: 'redis-service',
      updateStrategy: 'RollingUpdate',
      podManagementPolicy: 'OrderedReady',
      persistentVolumeClaims: ['redis-data'],
      configMaps: ['redis-config'],
      secrets: ['redis-credentials'],
    },
    {
      name: 'elasticsearch',
      namespace: 'demo',
      replicas: {
        desired: 3,
        ready: 2,
        current: 3,
        updated: 2,
      },
      status: 'Degraded',
      age: '60d',
      labels: { app: 'elasticsearch', tier: 'data' },
      selector: { app: 'elasticsearch' },
      serviceName: 'elasticsearch-service',
      updateStrategy: 'RollingUpdate',
      podManagementPolicy: 'Parallel',
      persistentVolumeClaims: ['elasticsearch-data', 'elasticsearch-logs'],
      configMaps: ['elasticsearch-config'],
      secrets: [],
    },
    {
      name: 'cassandra',
      namespace: 'demo',
      replicas: {
        desired: 5,
        ready: 5,
        current: 5,
        updated: 5,
      },
      status: 'Healthy',
      age: '90d',
      labels: { app: 'cassandra', type: 'database' },
      selector: { app: 'cassandra' },
      serviceName: 'cassandra-service',
      updateStrategy: 'OnDelete',
      podManagementPolicy: 'OrderedReady',
      persistentVolumeClaims: ['cassandra-data'],
      configMaps: ['cassandra-config'],
      secrets: ['cassandra-keystore'],
    },
    {
      name: 'zookeeper',
      namespace: 'demo',
      replicas: {
        desired: 3,
        ready: 3,
        current: 3,
        updated: 3,
      },
      status: 'Healthy',
      age: '120d',
      labels: { app: 'zookeeper', component: 'coordination' },
      selector: { app: 'zookeeper' },
      serviceName: 'zookeeper-service',
      updateStrategy: 'RollingUpdate',
      podManagementPolicy: 'OrderedReady',
      persistentVolumeClaims: ['zookeeper-data', 'zookeeper-logs'],
      configMaps: ['zookeeper-config'],
      secrets: [],
    },
  ]

  setCachedStatefulSets(statefulSets)
  return statefulSets
}

/**
 * Generates mock DaemonSets
 */
export function generateMockDaemonSets(): DaemonSet[] {
  const cached = getCachedDaemonSets()
  if (cached) return cached

  const daemonSets: DaemonSet[] = [
    {
      name: 'node-exporter',
      namespace: 'demo',
      desired: 3,
      current: 3,
      ready: 3,
      upToDate: 3,
      available: 3,
      status: 'Healthy',
      age: '60d',
      labels: { app: 'node-exporter', component: 'monitoring' },
      selector: { app: 'node-exporter' },
      updateStrategy: 'RollingUpdate',
      configMaps: ['node-exporter-config'],
      secrets: [],
    },
    {
      name: 'fluentd',
      namespace: 'demo',
      desired: 3,
      current: 3,
      ready: 2,
      upToDate: 3,
      available: 2,
      status: 'Degraded',
      age: '45d',
      labels: { app: 'fluentd', tier: 'logging' },
      selector: { app: 'fluentd' },
      updateStrategy: 'RollingUpdate',
      configMaps: ['fluentd-config'],
      secrets: ['fluentd-credentials'],
    },
    {
      name: 'kube-proxy',
      namespace: 'demo',
      desired: 3,
      current: 3,
      ready: 3,
      upToDate: 3,
      available: 3,
      status: 'Healthy',
      age: '180d',
      labels: { app: 'kube-proxy', component: 'networking' },
      selector: { app: 'kube-proxy' },
      updateStrategy: 'RollingUpdate',
      configMaps: [],
      secrets: [],
    },
    {
      name: 'nvidia-device-plugin',
      namespace: 'demo',
      desired: 2,
      current: 2,
      ready: 2,
      upToDate: 2,
      available: 2,
      status: 'Healthy',
      age: '30d',
      labels: { app: 'nvidia-device-plugin', type: 'gpu' },
      selector: { app: 'nvidia-device-plugin' },
      updateStrategy: 'OnDelete',
      configMaps: ['nvidia-config'],
      secrets: [],
    },
    {
      name: 'calico-node',
      namespace: 'demo',
      desired: 3,
      current: 3,
      ready: 3,
      upToDate: 3,
      available: 3,
      status: 'Healthy',
      age: '200d',
      labels: { app: 'calico-node', component: 'cni' },
      selector: { app: 'calico-node' },
      updateStrategy: 'RollingUpdate',
      configMaps: ['calico-config'],
      secrets: ['calico-etcd-secrets'],
    },
  ]

  setCachedDaemonSets(daemonSets)
  return daemonSets
}

/**
 * Mock Pod Logs for Demo Mode
 */
export function getMockPodLogs(podName: string, podStatus?: string): string {
  // Get pod status from cached pods if not provided
  if (!podStatus) {
    const pods = getCachedPods()
    const pod = pods?.find(p => p.name === podName)
    podStatus = pod?.status
  }

  // Return failure logs for crashed/failing pods
  if (podStatus === 'Failed' || podStatus === 'CrashLoopBackOff' || podStatus === 'Error') {
    // Generate crash logs based on pod name
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
