/**
 * Kubernetes Manifest Template Generator
 *
 * Generates Deployment, Service, and Kustomization manifests
 * based on user input and repository structure
 */

import type { RepoStructure } from './repo-analyzer'

export interface ResourcePreset {
  name: 'small' | 'medium' | 'large' | 'custom'
  requests: { memory: string; cpu: string }
  limits: { memory: string; cpu: string }
}

export interface AppTemplate {
  name: string
  namespace: string
  replicas: number
  resources: ResourcePreset
  image: string
  port?: number
  type: 'deployment' | 'statefulset'
  env?: Array<{ name: string; value: string }>
  repoUrl?: string
  autoscaling?: {
    enabled: boolean
    minReplicas: number
    maxReplicas: number
    targetCPU: number
    targetMemory: number
  }
}

export interface GeneratedFile {
  path: string
  content: string
  sha?: string // For existing files that need update
}

export interface GeneratedFiles {
  deployment: GeneratedFile
  service?: GeneratedFile
  hpa?: GeneratedFile
  kustomization?: GeneratedFile
  overlays?: GeneratedFile[]
}

/**
 * Resource presets for common workload sizes
 */
export const RESOURCE_PRESETS: Record<string, ResourcePreset> = {
  small: {
    name: 'small',
    requests: { memory: '128Mi', cpu: '250m' },
    limits: { memory: '256Mi', cpu: '500m' },
  },
  medium: {
    name: 'medium',
    requests: { memory: '256Mi', cpu: '500m' },
    limits: { memory: '512Mi', cpu: '1000m' },
  },
  large: {
    name: 'large',
    requests: { memory: '512Mi', cpu: '1000m' },
    limits: { memory: '1Gi', cpu: '2000m' },
  },
}

/**
 * Generate all necessary manifests for a new application
 */
export function generateManifests(
  template: AppTemplate,
  repoStructure: RepoStructure
): GeneratedFiles {
  const files: GeneratedFiles = {
    deployment: generateDeployment(template, repoStructure),
  }

  // Generate service if port is specified
  if (template.port) {
    files.service = generateService(template, repoStructure)
  }

  // Generate HPA if autoscaling is enabled
  if (template.autoscaling?.enabled) {
    files.hpa = generateHPA(template, repoStructure)
  }

  // Generate/update kustomization.yaml if repo uses Kustomize
  if (repoStructure.hasKustomize && repoStructure.baseDir) {
    files.kustomization = generateKustomization(template, repoStructure, files)

    // Generate overlay kustomizations for each environment
    if (repoStructure.overlayDirs.length > 0) {
      files.overlays = generateOverlays(template, repoStructure)
    }
  }

  return files
}

/**
 * Generate Deployment or StatefulSet manifest
 */
function generateDeployment(
  template: AppTemplate,
  repoStructure: RepoStructure
): GeneratedFile {
  const { name, namespace, replicas, resources, image, port, type, env, repoUrl } = template

  // Determine file path based on repo structure
  let path: string
  if (repoStructure.structure === 'kustomize' && repoStructure.baseDir) {
    path = `${repoStructure.baseDir}/${name}-${type}.yaml`
  } else if (repoStructure.deploymentDirs.length > 0) {
    path = `${repoStructure.deploymentDirs[0]}/${name}.yaml`
  } else {
    // Default to k8s/deployments
    path = `k8s/deployments/${name}.yaml`
  }

  const kind = type === 'statefulset' ? 'StatefulSet' : 'Deployment'
  const apiVersion = type === 'statefulset' ? 'apps/v1' : 'apps/v1'

  // Build container spec
  const containerPorts = port
    ? `\n        ports:\n        - containerPort: ${port}\n          protocol: TCP`
    : ''

  const envVars = env && env.length > 0
    ? `\n        env:\n` + env.map(e => `        - name: ${e.name}\n          value: "${e.value}"`).join('\n')
    : ''

  // Build annotations
  const annotations = repoUrl
    ? `\n  annotations:\n    orphelix.io/repository: "${repoUrl}"`
    : ''

  // Generate YAML content
  const content = `apiVersion: ${apiVersion}
kind: ${kind}
metadata:
  name: ${name}
  namespace: ${namespace}${annotations}
  labels:
    app: ${name}
    managed-by: orphelix
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${name}
  template:
    metadata:
      labels:
        app: ${name}
    spec:
      containers:
      - name: ${name}
        image: ${image}${containerPorts}${envVars}
        resources:
          requests:
            memory: "${resources.requests.memory}"
            cpu: "${resources.requests.cpu}"
          limits:
            memory: "${resources.limits.memory}"
            cpu: "${resources.limits.cpu}"
${type === 'statefulset' ? `  serviceName: ${name}` : ''}
`

  return { path, content }
}

/**
 * Generate Service manifest
 */
function generateService(
  template: AppTemplate,
  repoStructure: RepoStructure
): GeneratedFile {
  const { name, namespace, port } = template

  // Determine file path
  let path: string
  if (repoStructure.structure === 'kustomize' && repoStructure.baseDir) {
    path = `${repoStructure.baseDir}/${name}-service.yaml`
  } else if (repoStructure.serviceDirs.length > 0) {
    path = `${repoStructure.serviceDirs[0]}/${name}-svc.yaml`
  } else {
    path = `k8s/services/${name}-svc.yaml`
  }

  const content = `apiVersion: v1
kind: Service
metadata:
  name: ${name}-svc
  namespace: ${namespace}
  labels:
    app: ${name}
    managed-by: orphelix
spec:
  type: ClusterIP
  selector:
    app: ${name}
  ports:
  - port: ${port}
    targetPort: ${port}
    protocol: TCP
    name: http
`

  return { path, content }
}

/**
 * Generate HorizontalPodAutoscaler manifest
 */
function generateHPA(
  template: AppTemplate,
  repoStructure: RepoStructure
): GeneratedFile {
  const { name, namespace, autoscaling } = template

  if (!autoscaling) {
    throw new Error('Autoscaling configuration is required')
  }

  // Determine file path
  let path: string
  if (repoStructure.structure === 'kustomize' && repoStructure.baseDir) {
    path = `${repoStructure.baseDir}/${name}-hpa.yaml`
  } else {
    path = `k8s/hpa/${name}-hpa.yaml`
  }

  const content = `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${name}-hpa
  namespace: ${namespace}
  labels:
    app: ${name}
    managed-by: orphelix
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${name}
  minReplicas: ${autoscaling.minReplicas}
  maxReplicas: ${autoscaling.maxReplicas}
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: ${autoscaling.targetCPU}
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: ${autoscaling.targetMemory}
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 15
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 2
        periodSeconds: 15
      selectPolicy: Max
`

  return { path, content }
}

/**
 * Generate or update kustomization.yaml
 */
function generateKustomization(
  template: AppTemplate,
  repoStructure: RepoStructure,
  generatedFiles: Pick<GeneratedFiles, 'deployment' | 'service' | 'hpa'>
): GeneratedFile {
  const { name } = template

  if (!repoStructure.baseDir) {
    throw new Error('Base directory not found for Kustomize structure')
  }

  const path = `${repoStructure.baseDir}/kustomization.yaml`

  // Build list of resources to include
  const resources: string[] = []

  // Add deployment file (just the filename, not full path)
  const deploymentFile = generatedFiles.deployment.path.split('/').pop()!
  resources.push(deploymentFile)

  // Add service file if it exists
  if (generatedFiles.service) {
    const serviceFile = generatedFiles.service.path.split('/').pop()!
    resources.push(serviceFile)
  }

  // Add HPA file if it exists
  if (generatedFiles.hpa) {
    const hpaFile = generatedFiles.hpa.path.split('/').pop()!
    resources.push(hpaFile)
  }

  // Generate kustomization.yaml content
  // Note: In a real implementation, you might want to fetch the existing
  // kustomization.yaml and append to it rather than replacing it
  const content = `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

# Auto-generated by Orphelix
# Application: ${name}

resources:
${resources.map(r => `- ${r}`).join('\n')}

commonLabels:
  managed-by: orphelix
`

  return { path, content }
}

/**
 * Generate overlay kustomization.yaml files for each environment
 */
function generateOverlays(
  template: AppTemplate,
  repoStructure: RepoStructure
): GeneratedFile[] {
  const { name, replicas } = template
  const overlays: GeneratedFile[] = []

  for (const overlayDir of repoStructure.overlayDirs) {
    // Extract environment name from path (e.g., "k8s/overlays/dev" -> "dev")
    const envName = overlayDir.split('/').pop() || 'unknown'

    // Determine replica count based on environment
    // prod gets the requested replicas, dev gets 1, others get 1
    const envReplicas = envName === 'prod' || envName === 'production' ? replicas : 1

    const path = `${overlayDir}/kustomization.yaml`

    const content = `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

# Auto-generated by Orphelix
# Application: ${name}
# Environment: ${envName}

bases:
- ../../base

nameSuffix: -${envName}

replicas:
- name: ${name}
  count: ${envReplicas}

commonLabels:
  environment: ${envName}
`

    overlays.push({ path, content })
  }

  return overlays
}

/**
 * Helper: Validate application name
 */
export function validateAppName(name: string): { valid: boolean; error?: string } {
  if (!name) {
    return { valid: false, error: 'Name is required' }
  }

  if (name.length > 63) {
    return { valid: false, error: 'Name must be 63 characters or less' }
  }

  // Kubernetes naming rules: lowercase alphanumeric + hyphens
  const regex = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/
  if (!regex.test(name)) {
    return {
      valid: false,
      error: 'Name must be lowercase alphanumeric characters or hyphens, and must start/end with alphanumeric'
    }
  }

  return { valid: true }
}

/**
 * Helper: Validate Docker image
 */
export function validateDockerImage(image: string): { valid: boolean; error?: string } {
  if (!image) {
    return { valid: false, error: 'Image is required' }
  }

  // Basic image format validation (registry/repository:tag or repository:tag)
  const regex = /^([a-z0-9.-]+\/)?[a-z0-9._-]+(\/[a-z0-9._-]+)*(:[a-z0-9._-]+)?$/i
  if (!regex.test(image)) {
    return {
      valid: false,
      error: 'Invalid Docker image format. Example: nginx:latest or myregistry.com/myapp:v1.0'
    }
  }

  return { valid: true }
}
