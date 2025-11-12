import { describe, it, expect } from 'vitest'
import {
  generateMockPods,
  generateMockDeployments,
  generateMockDashboardSummary,
  generateMockNodes,
  generateMockConfigMaps,
  generateMockSecrets,
  generateMockHPAs,
  generateMockPVs,
  generateMockPVCs,
  generateMockEvents,
} from '@/lib/mock-data'
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
} from '@/types/kubernetes'

describe('generateMockPods', () => {
  it('should return an array of pods', () => {
    // Act
    const pods = generateMockPods()

    // Assert
    expect(Array.isArray(pods)).toBe(true)
    expect(pods.length).toBeGreaterThan(0)
  })

  it('should return pods with correct structure', () => {
    // Act
    const pods = generateMockPods()
    const pod = pods[0] as Pod

    // Assert
    expect(pod).toHaveProperty('name')
    expect(pod).toHaveProperty('namespace')
    expect(pod).toHaveProperty('status')
    expect(pod).toHaveProperty('restartCount')
    expect(pod).toHaveProperty('age')
    expect(pod).toHaveProperty('nodeName')
    expect(pod).toHaveProperty('ip')
    expect(pod).toHaveProperty('containers')
    expect(pod).toHaveProperty('labels')
    expect(pod).toHaveProperty('ownerReferences')
  })

  it('should have required fields with correct types', () => {
    // Act
    const pods = generateMockPods()
    const pod = pods[0] as Pod

    // Assert
    expect(typeof pod.name).toBe('string')
    expect(typeof pod.namespace).toBe('string')
    expect(typeof pod.status).toBe('string')
    expect(typeof pod.restartCount).toBe('number')
    expect(typeof pod.age).toBe('string')
    expect(typeof pod.nodeName).toBe('string')
    expect(typeof pod.ip).toBe('string')
    expect(Array.isArray(pod.containers)).toBe(true)
    expect(typeof pod.labels).toBe('object')
  })

  it('should have containers with proper structure', () => {
    // Act
    const pods = generateMockPods()
    const pod = pods[0] as Pod
    const container = pod.containers[0]

    // Assert
    expect(container).toHaveProperty('name')
    expect(container).toHaveProperty('image')
    expect(container).toHaveProperty('ready')
    expect(container).toHaveProperty('restartCount')
    expect(typeof container.name).toBe('string')
    expect(typeof container.image).toBe('string')
    expect(typeof container.ready).toBe('boolean')
    expect(typeof container.restartCount).toBe('number')
  })

  it('should have valid pod status values', () => {
    // Act
    const pods = generateMockPods()

    // Assert
    const validStatuses = ['Running', 'Pending', 'Failed', 'CrashLoopBackOff']
    pods.forEach((pod) => {
      expect(validStatuses).toContain(pod.status)
    })
  })

  it('should have namespace set to default', () => {
    // Act
    const pods = generateMockPods()

    // Assert
    pods.forEach((pod) => {
      expect(pod.namespace).toBe('default')
    })
  })

  it('should have labels object with app property', () => {
    // Act
    const pods = generateMockPods()

    // Assert
    pods.forEach((pod) => {
      expect(pod.labels).toHaveProperty('app')
      expect(typeof pod.labels.app).toBe('string')
    })
  })
})

describe('generateMockDeployments', () => {
  it('should return an array of deployments', () => {
    // Act
    const deployments = generateMockDeployments()

    // Assert
    expect(Array.isArray(deployments)).toBe(true)
    expect(deployments.length).toBeGreaterThan(0)
  })

  it('should return deployments with correct structure', () => {
    // Act
    const deployments = generateMockDeployments()
    const deployment = deployments[0] as Deployment

    // Assert
    expect(deployment).toHaveProperty('name')
    expect(deployment).toHaveProperty('namespace')
    expect(deployment).toHaveProperty('replicas')
    expect(deployment).toHaveProperty('status')
    expect(deployment).toHaveProperty('age')
    expect(deployment).toHaveProperty('labels')
    expect(deployment).toHaveProperty('selector')
    expect(deployment).toHaveProperty('strategy')
    expect(deployment).toHaveProperty('configMaps')
    expect(deployment).toHaveProperty('secrets')
  })

  it('should have valid deployment status values', () => {
    // Act
    const deployments = generateMockDeployments()

    // Assert
    const validStatuses = ['Available', 'Progressing', 'Degraded']
    deployments.forEach((deployment) => {
      expect(validStatuses).toContain(deployment.status)
    })
  })

  it('should have replicas object with required fields', () => {
    // Act
    const deployments = generateMockDeployments()
    const deployment = deployments[0] as Deployment

    // Assert
    expect(deployment.replicas).toHaveProperty('desired')
    expect(deployment.replicas).toHaveProperty('ready')
    expect(deployment.replicas).toHaveProperty('available')
    expect(deployment.replicas).toHaveProperty('unavailable')
    expect(typeof deployment.replicas.desired).toBe('number')
    expect(typeof deployment.replicas.ready).toBe('number')
    expect(typeof deployment.replicas.available).toBe('number')
    expect(typeof deployment.replicas.unavailable).toBe('number')
  })

  it('should have unavailable count match difference', () => {
    // Act
    const deployments = generateMockDeployments()

    // Assert
    deployments.forEach((deployment) => {
      const { desired, ready, unavailable } = deployment.replicas
      expect(unavailable).toBe(desired - ready)
    })
  })

  it('should have configMaps and secrets as arrays', () => {
    // Act
    const deployments = generateMockDeployments()
    const deployment = deployments[0] as Deployment

    // Assert
    expect(Array.isArray(deployment.configMaps)).toBe(true)
    expect(Array.isArray(deployment.secrets)).toBe(true)
    expect(deployment.configMaps.length).toBeGreaterThan(0)
    expect(deployment.secrets.length).toBeGreaterThan(0)
  })

  it('should have namespace set to default', () => {
    // Act
    const deployments = generateMockDeployments()

    // Assert
    deployments.forEach((deployment) => {
      expect(deployment.namespace).toBe('default')
    })
  })
})

describe('generateMockDashboardSummary', () => {
  it('should return a valid dashboard summary object', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    expect(summary).toHaveProperty('deployments')
    expect(summary).toHaveProperty('pods')
    expect(summary).toHaveProperty('nodes')
    expect(summary).toHaveProperty('configMaps')
    expect(summary).toHaveProperty('secrets')
    expect(summary).toHaveProperty('hpa')
    expect(summary).toHaveProperty('pv')
  })

  it('should have deployments summary with correct structure', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    expect(summary.deployments).toHaveProperty('total')
    expect(summary.deployments).toHaveProperty('healthy')
    expect(summary.deployments).toHaveProperty('degraded')
    expect(typeof summary.deployments.total).toBe('number')
    expect(typeof summary.deployments.healthy).toBe('number')
    expect(typeof summary.deployments.degraded).toBe('number')
  })

  it('should have pods summary with correct structure', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    expect(summary.pods).toHaveProperty('total')
    expect(summary.pods).toHaveProperty('running')
    expect(summary.pods).toHaveProperty('pending')
    expect(summary.pods).toHaveProperty('failed')
    expect(typeof summary.pods.total).toBe('number')
    expect(typeof summary.pods.running).toBe('number')
    expect(typeof summary.pods.pending).toBe('number')
    expect(typeof summary.pods.failed).toBe('number')
  })

  it('should have nodes summary with correct structure', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    expect(summary.nodes).toHaveProperty('total')
    expect(summary.nodes).toHaveProperty('ready')
    expect(summary.nodes).toHaveProperty('notReady')
    expect(typeof summary.nodes.total).toBe('number')
    expect(typeof summary.nodes.ready).toBe('number')
    expect(typeof summary.nodes.notReady).toBe('number')
  })

  it('should have PV summary with correct structure', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    expect(summary.pv).toHaveProperty('total')
    expect(summary.pv).toHaveProperty('bound')
    expect(typeof summary.pv.total).toBe('number')
    expect(typeof summary.pv.bound).toBe('number')
  })

  it('should have valid counts for all resources', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    expect(summary.deployments.total).toBeGreaterThan(0)
    expect(summary.pods.total).toBeGreaterThan(0)
    expect(summary.nodes.total).toBeGreaterThan(0)
    expect(summary.configMaps).toBeGreaterThan(0)
    expect(summary.secrets).toBeGreaterThan(0)
    expect(summary.hpa).toBeGreaterThan(0)
    expect(summary.pv.total).toBeGreaterThan(0)
  })

  it('should have deployment counts add up correctly', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    expect(summary.deployments.healthy + summary.deployments.degraded).toBeLessThanOrEqual(
      summary.deployments.total
    )
  })

  it('should have pod counts add up correctly', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    const sumOfPodStatuses = summary.pods.running + summary.pods.pending + summary.pods.failed
    expect(sumOfPodStatuses).toBe(summary.pods.total)
  })

  it('should have node counts add up correctly', () => {
    // Act
    const summary = generateMockDashboardSummary()

    // Assert
    expect(summary.nodes.ready + summary.nodes.notReady).toBe(summary.nodes.total)
  })
})

describe('generateMockNodes', () => {
  it('should return an array of nodes', () => {
    // Act
    const nodes = generateMockNodes()

    // Assert
    expect(Array.isArray(nodes)).toBe(true)
    expect(nodes.length).toBeGreaterThan(0)
  })

  it('should have required node fields', () => {
    // Act
    const nodes = generateMockNodes()
    const node = nodes[0] as Node

    // Assert
    expect(node).toHaveProperty('name')
    expect(node).toHaveProperty('status')
    expect(node).toHaveProperty('roles')
    expect(node).toHaveProperty('age')
    expect(node).toHaveProperty('version')
    expect(node).toHaveProperty('capacity')
    expect(node).toHaveProperty('allocatable')
    expect(node).toHaveProperty('conditions')
  })

  it('should have valid node status', () => {
    // Act
    const nodes = generateMockNodes()

    // Assert
    const validStatuses = ['Ready', 'NotReady']
    nodes.forEach((node) => {
      expect(validStatuses).toContain(node.status)
    })
  })
})

describe('generateMockConfigMaps', () => {
  it('should return an array of config maps', () => {
    // Act
    const configMaps = generateMockConfigMaps()

    // Assert
    expect(Array.isArray(configMaps)).toBe(true)
    expect(configMaps.length).toBeGreaterThan(0)
  })

  it('should have required config map fields', () => {
    // Act
    const configMaps = generateMockConfigMaps()
    const configMap = configMaps[0] as ConfigMap

    // Assert
    expect(configMap).toHaveProperty('name')
    expect(configMap).toHaveProperty('namespace')
    expect(configMap).toHaveProperty('age')
    expect(configMap).toHaveProperty('data')
    expect(configMap).toHaveProperty('labels')
  })
})

describe('generateMockSecrets', () => {
  it('should return an array of secrets', () => {
    // Act
    const secrets = generateMockSecrets()

    // Assert
    expect(Array.isArray(secrets)).toBe(true)
    expect(secrets.length).toBeGreaterThan(0)
  })

  it('should have required secret fields', () => {
    // Act
    const secrets = generateMockSecrets()
    const secret = secrets[0] as Secret

    // Assert
    expect(secret).toHaveProperty('name')
    expect(secret).toHaveProperty('namespace')
    expect(secret).toHaveProperty('type')
    expect(secret).toHaveProperty('age')
    expect(secret).toHaveProperty('keys')
    expect(secret).toHaveProperty('labels')
  })
})

describe('generateMockHPAs', () => {
  it('should return an array of HPAs', () => {
    // Act
    const hpas = generateMockHPAs()

    // Assert
    expect(Array.isArray(hpas)).toBe(true)
    expect(hpas.length).toBeGreaterThan(0)
  })

  it('should have required HPA fields', () => {
    // Act
    const hpas = generateMockHPAs()
    const hpa = hpas[0] as HPA

    // Assert
    expect(hpa).toHaveProperty('name')
    expect(hpa).toHaveProperty('namespace')
    expect(hpa).toHaveProperty('targetRef')
    expect(hpa).toHaveProperty('minReplicas')
    expect(hpa).toHaveProperty('maxReplicas')
    expect(hpa).toHaveProperty('currentReplicas')
    expect(hpa).toHaveProperty('desiredReplicas')
    expect(hpa).toHaveProperty('metrics')
    expect(hpa).toHaveProperty('age')
  })

  it('should have current replicas within min/max range', () => {
    // Act
    const hpas = generateMockHPAs()

    // Assert
    hpas.forEach((hpa) => {
      expect(hpa.currentReplicas).toBeGreaterThanOrEqual(hpa.minReplicas)
      expect(hpa.currentReplicas).toBeLessThanOrEqual(hpa.maxReplicas)
    })
  })
})

describe('generateMockPVs', () => {
  it('should return an array of persistent volumes', () => {
    // Act
    const pvs = generateMockPVs()

    // Assert
    expect(Array.isArray(pvs)).toBe(true)
    expect(pvs.length).toBeGreaterThan(0)
  })

  it('should have required PV fields', () => {
    // Act
    const pvs = generateMockPVs()
    const pv = pvs[0] as PersistentVolume

    // Assert
    expect(pv).toHaveProperty('name')
    expect(pv).toHaveProperty('capacity')
    expect(pv).toHaveProperty('accessModes')
    expect(pv).toHaveProperty('reclaimPolicy')
    expect(pv).toHaveProperty('status')
    expect(pv).toHaveProperty('storageClass')
    expect(pv).toHaveProperty('age')
  })
})

describe('generateMockPVCs', () => {
  it('should return an array of persistent volume claims', () => {
    // Act
    const pvcs = generateMockPVCs()

    // Assert
    expect(Array.isArray(pvcs)).toBe(true)
    expect(pvcs.length).toBeGreaterThan(0)
  })

  it('should have required PVC fields', () => {
    // Act
    const pvcs = generateMockPVCs()
    const pvc = pvcs[0] as PersistentVolumeClaim

    // Assert
    expect(pvc).toHaveProperty('name')
    expect(pvc).toHaveProperty('namespace')
    expect(pvc).toHaveProperty('status')
    expect(pvc).toHaveProperty('capacity')
    expect(pvc).toHaveProperty('accessModes')
    expect(pvc).toHaveProperty('storageClass')
    expect(pvc).toHaveProperty('age')
  })
})

describe('generateMockEvents', () => {
  it('should return an array of events', () => {
    // Act
    const events = generateMockEvents()

    // Assert
    expect(Array.isArray(events)).toBe(true)
    expect(events.length).toBeGreaterThan(0)
  })

  it('should have required event fields', () => {
    // Act
    const events = generateMockEvents()
    const event = events[0] as Event

    // Assert
    expect(event).toHaveProperty('type')
    expect(event).toHaveProperty('reason')
    expect(event).toHaveProperty('message')
    expect(event).toHaveProperty('count')
    expect(event).toHaveProperty('firstTimestamp')
    expect(event).toHaveProperty('lastTimestamp')
    expect(event).toHaveProperty('kind')
    expect(event).toHaveProperty('name')
    expect(event).toHaveProperty('namespace')
  })

  it('should have valid event types', () => {
    // Act
    const events = generateMockEvents()

    // Assert
    const validTypes = ['Normal', 'Warning']
    events.forEach((event) => {
      expect(validTypes).toContain(event.type)
    })
  })

  it('should be sorted by lastTimestamp descending', () => {
    // Act
    const events = generateMockEvents()

    // Assert
    for (let i = 0; i < events.length - 1; i++) {
      expect(new Date(events[i].lastTimestamp).getTime()).toBeGreaterThanOrEqual(
        new Date(events[i + 1].lastTimestamp).getTime()
      )
    }
  })
})
