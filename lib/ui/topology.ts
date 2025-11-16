import type { Deployment, Pod, ConfigMap, Secret, HPA } from '@/types/kubernetes'
import type {
  TopologyNode,
  TopologyEdge,
  TopologyGraphData,
  ResourceStatus,
  ResourceType,
} from '@/types/topology'

/**
 * Map Kubernetes resource status to topology status
 */
function getResourceStatus(
  resourceType: ResourceType,
  resource: Deployment | Pod | ConfigMap | Secret
): ResourceStatus {
  if (resourceType === 'Deployment') {
    const deployment = resource as Deployment
    if (deployment.status === 'Available') return 'healthy'
    if (deployment.status === 'Progressing') return 'warning'
    if (deployment.status === 'Degraded') return 'error'
    return 'unknown'
  }

  if (resourceType === 'Pod') {
    const pod = resource as Pod
    if (pod.status === 'Running') return 'healthy'
    if (pod.status === 'Pending') return 'warning'
    if (pod.status === 'Failed' || pod.status === 'CrashLoopBackOff') return 'error'
    return 'unknown'
  }

  return 'healthy' // ConfigMaps and Secrets are always healthy
}

/**
 * Build topology graph for a deployment and its related resources
 */
export function buildDeploymentTopology(
  deployment: Deployment,
  pods: Pod[],
  configMaps: ConfigMap[],
  secrets: Secret[],
  hpas: HPA[] = []
): TopologyGraphData {
  const nodes: TopologyNode[] = []
  const edges: TopologyEdge[] = []

  // Filter HPAs that target this deployment
  const relatedHPAs = hpas.filter(
    (hpa) => hpa.targetRef.kind === 'Deployment' && hpa.targetRef.name === deployment.name
  )

  // Calculate vertical centering based on number of resources on left
  const leftResourcesCount = configMaps.length + secrets.length
  const deploymentY = Math.max(300, leftResourcesCount * 80)

  // Add HPA nodes (above deployment)
  relatedHPAs.forEach((hpa, index) => {
    const nodeId = `hpa-${hpa.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 500, y: deploymentY - 200 - index * 150 },
      data: {
        label: hpa.name,
        resourceType: 'HPA',
        status: 'healthy',
        namespace: hpa.namespace,
        details: {
          min: `${hpa.minReplicas}`,
          max: `${hpa.maxReplicas}`,
          current: `${hpa.currentReplicas}`,
        },
      },
    })

    // Connect HPA to Deployment (from HPA bottom to deployment top)
    edges.push({
      id: `${nodeId}-deployment`,
      source: nodeId,
      target: `deployment-${deployment.name}`,
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'default',
      animated: true,
    })
  })

  // Add deployment node (center)
  nodes.push({
    id: `deployment-${deployment.name}`,
    type: 'default',
    position: { x: 500, y: deploymentY },
    data: {
      label: deployment.name,
      resourceType: 'Deployment',
      status: getResourceStatus('Deployment', deployment),
      namespace: deployment.namespace,
      details: {
        replicas: `${deployment.replicas.ready}/${deployment.replicas.desired}`,
        strategy: deployment.strategy,
      },
    },
  })

  // Add ConfigMap nodes (left side) - increased spacing to 150px
  configMaps.forEach((cm, index) => {
    const nodeId = `configmap-${cm.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 50, y: 50 + index * 150 },
      data: {
        label: cm.name,
        resourceType: 'ConfigMap',
        status: 'healthy',
        namespace: cm.namespace,
        details: {
          keys: `${Object.keys(cm.data).length} keys`,
        },
      },
    })

    // Connect ConfigMap to Deployment
    edges.push({
      id: `${nodeId}-deployment`,
      source: nodeId,
      target: `deployment-${deployment.name}`,
      type: 'default',
      animated: false,
    })
  })

  // Add Secret nodes (left side, below ConfigMaps) - increased spacing to 150px
  secrets.forEach((secret, index) => {
    const nodeId = `secret-${secret.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 50, y: 50 + (configMaps.length + index) * 150 },
      data: {
        label: secret.name,
        resourceType: 'Secret',
        status: 'healthy',
        namespace: secret.namespace,
        details: {
          type: secret.type,
          keys: `${secret.keys.length} keys`,
        },
      },
    })

    // Connect Secret to Deployment
    edges.push({
      id: `${nodeId}-deployment`,
      source: nodeId,
      target: `deployment-${deployment.name}`,
      type: 'default',
      animated: false,
    })
  })

  // Add Pod nodes (right side) - increased spacing to 150px
  pods.forEach((pod, index) => {
    const nodeId = `pod-${pod.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 950, y: 50 + index * 150 },
      data: {
        label: pod.name,
        resourceType: 'Pod',
        status: getResourceStatus('Pod', pod),
        namespace: pod.namespace,
        details: {
          node: pod.nodeName,
          restarts: `${pod.restartCount}`,
        },
      },
    })

    // Connect Deployment to Pod
    edges.push({
      id: `deployment-${nodeId}`,
      source: `deployment-${deployment.name}`,
      target: nodeId,
      type: 'default',
      animated: pod.status === 'Running',
    })
  })

  return { nodes, edges }
}

/**
 * Build topology graph for a pod and its related resources
 */
export function buildPodTopology(
  pod: Pod,
  configMaps: ConfigMap[],
  secrets: Secret[]
): TopologyGraphData {
  const nodes: TopologyNode[] = []
  const edges: TopologyEdge[] = []

  // Add pod node (center)
  nodes.push({
    id: `pod-${pod.name}`,
    type: 'default',
    position: { x: 400, y: 200 },
    data: {
      label: pod.name,
      resourceType: 'Pod',
      status: getResourceStatus('Pod', pod),
      namespace: pod.namespace,
      details: {
        node: pod.nodeName,
        ip: pod.ip,
        restarts: `${pod.restartCount}`,
      },
    },
  })

  // Add ConfigMap nodes (left side)
  configMaps.forEach((cm, index) => {
    const nodeId = `configmap-${cm.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 50, y: 100 + index * 120 },
      data: {
        label: cm.name,
        resourceType: 'ConfigMap',
        status: 'healthy',
        namespace: cm.namespace,
      },
    })

    edges.push({
      id: `${nodeId}-pod`,
      source: nodeId,
      target: `pod-${pod.name}`,
      type: 'default',
      animated: false,
    })
  })

  // Add Secret nodes (left side, below ConfigMaps)
  secrets.forEach((secret, index) => {
    const nodeId = `secret-${secret.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 50, y: 100 + (configMaps.length + index) * 120 },
      data: {
        label: secret.name,
        resourceType: 'Secret',
        status: 'healthy',
        namespace: secret.namespace,
      },
    })

    edges.push({
      id: `${nodeId}-pod`,
      source: nodeId,
      target: `pod-${pod.name}`,
      type: 'default',
      animated: false,
    })
  })

  // Add container nodes (right side)
  pod.containers.forEach((container, index) => {
    const nodeId = `container-${pod.name}-${container.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 750, y: 100 + index * 120 },
      data: {
        label: container.name,
        resourceType: 'Pod', // Use Pod type for containers
        status: container.ready ? 'healthy' : 'error',
        namespace: pod.namespace,
        details: {
          image: container.image,
          restarts: `${container.restartCount}`,
        },
      },
    })

    edges.push({
      id: `pod-${nodeId}`,
      source: `pod-${pod.name}`,
      target: nodeId,
      type: 'default',
      animated: container.ready,
    })
  })

  return { nodes, edges }
}

/**
 * Build namespace-wide topology graph
 */
export function buildNamespaceTopology(
  deployments: Deployment[],
  pods: Pod[],
  configMaps: ConfigMap[],
  secrets: Secret[]
): TopologyGraphData {
  const nodes: TopologyNode[] = []
  const edges: TopologyEdge[] = []

  // Add Deployment nodes (top row)
  deployments.forEach((deployment, index) => {
    const nodeId = `deployment-${deployment.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 200 + index * 250, y: 50 },
      data: {
        label: deployment.name,
        resourceType: 'Deployment',
        status: getResourceStatus('Deployment', deployment),
        namespace: deployment.namespace,
        details: {
          replicas: `${deployment.replicas.ready}/${deployment.replicas.desired}`,
        },
      },
    })

    // Find and add pods for this deployment
    const deploymentPods = pods.filter((pod) =>
      pod.labels.app === deployment.name
    )

    deploymentPods.forEach((pod, podIndex) => {
      const podNodeId = `pod-${pod.name}`
      nodes.push({
        id: podNodeId,
        type: 'default',
        position: { x: 200 + index * 250, y: 200 + podIndex * 100 },
        data: {
          label: pod.name,
          resourceType: 'Pod',
          status: getResourceStatus('Pod', pod),
          namespace: pod.namespace,
        },
      })

      edges.push({
        id: `${nodeId}-${podNodeId}`,
        source: nodeId,
        target: podNodeId,
        type: 'default',
        animated: pod.status === 'Running',
      })
    })
  })

  // Add ConfigMap nodes (left column)
  configMaps.forEach((cm, index) => {
    const nodeId = `configmap-${cm.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 50, y: 50 + index * 100 },
      data: {
        label: cm.name,
        resourceType: 'ConfigMap',
        status: 'healthy',
        namespace: cm.namespace,
      },
    })
  })

  // Add Secret nodes (left column, below ConfigMaps)
  secrets.forEach((secret, index) => {
    const nodeId = `secret-${secret.name}`
    nodes.push({
      id: nodeId,
      type: 'default',
      position: { x: 50, y: 50 + (configMaps.length + index) * 100 },
      data: {
        label: secret.name,
        resourceType: 'Secret',
        status: 'healthy',
        namespace: secret.namespace,
      },
    })
  })

  return { nodes, edges }
}

/**
 * Build topology graph showing relationships between ConfigMaps/Secrets and Deployments
 * Filters resources by Flux kustomize namespace label
 */
export function buildConfigSecretsTopology(
  deployments: Deployment[],
  configMaps: ConfigMap[],
  secrets: Secret[],
  namespace: string
): TopologyGraphData {
  const nodes: TopologyNode[] = []
  const edges: TopologyEdge[] = []

  // Filter ConfigMaps and Secrets by Flux kustomize namespace label
  const filteredConfigMaps = configMaps.filter(
    (cm) => cm.labels['kustomize.toolkit.fluxcd.io/namespace'] === namespace
  )

  const filteredSecrets = secrets.filter(
    (s) => s.labels['kustomize.toolkit.fluxcd.io/namespace'] === namespace
  )

  if (filteredConfigMaps.length === 0 && filteredSecrets.length === 0) {
    return { nodes: [], edges: [] }
  }

  // Calculate layout positions
  const leftColumnX = 100
  const rightColumnX = 800

  // Add ConfigMaps on the left
  filteredConfigMaps.forEach((cm, index) => {
    nodes.push({
      id: `configmap-${cm.name}`,
      position: { x: leftColumnX, y: index * 120 + 50 },
      data: {
        label: cm.name,
        resourceType: 'ConfigMap',
        status: 'healthy',
        namespace: cm.namespace,
      },
    })

    // Find deployments that use this ConfigMap
    deployments.forEach((deployment) => {
      if (deployment.configMaps.includes(cm.name)) {
        edges.push({
          id: `configmap-${cm.name}-${deployment.name}`,
          source: `configmap-${cm.name}`,
          target: `deployment-${deployment.name}`,
          type: 'default',
          animated: false,
        })
      }
    })
  })

  // Add Secrets below ConfigMaps on the left
  filteredSecrets.forEach((secret, index) => {
    const yPosition = (filteredConfigMaps.length + index) * 120 + 50

    nodes.push({
      id: `secret-${secret.name}`,
      position: { x: leftColumnX, y: yPosition },
      data: {
        label: secret.name,
        resourceType: 'Secret',
        status: 'healthy',
        namespace: secret.namespace,
      },
    })

    // Find deployments that use this Secret
    deployments.forEach((deployment) => {
      if (deployment.secrets.includes(secret.name)) {
        edges.push({
          id: `secret-${secret.name}-${deployment.name}`,
          source: `secret-${secret.name}`,
          target: `deployment-${deployment.name}`,
          type: 'default',
          animated: false,
        })
      }
    })
  })

  // Add Deployments on the right (only those connected to filtered ConfigMaps/Secrets)
  const connectedDeployments = new Set<string>()
  edges.forEach((edge) => {
    const deploymentId = edge.target
    if (deploymentId.startsWith('deployment-')) {
      connectedDeployments.add(deploymentId.replace('deployment-', ''))
    }
  })

  Array.from(connectedDeployments).forEach((deploymentName, index) => {
    const deployment = deployments.find((d) => d.name === deploymentName)
    if (!deployment) return

    nodes.push({
      id: `deployment-${deployment.name}`,
      position: { x: rightColumnX, y: index * 120 + 50 },
      data: {
        label: deployment.name,
        resourceType: 'Deployment',
        status: getResourceStatus('Deployment', deployment),
        namespace: deployment.namespace,
      },
    })
  })

  return { nodes, edges }
}
