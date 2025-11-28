/**
 * Kubernetes Client Configuration
 *
 * This module provides a configured Kubernetes client for interacting with
 * a Kubernetes cluster. It supports multiple authentication methods:
 * - Kubeconfig file (~/.kube/config)
 * - In-cluster configuration (for running inside a pod)
 * - Manual configuration
 */

import * as k8s from '@kubernetes/client-node'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'k8s-client' })

let kc: k8s.KubeConfig | null = null
let k8sAppsApi: k8s.AppsV1Api | null = null
let k8sCoreApi: k8s.CoreV1Api | null = null
let k8sAutoscalingApi: k8s.AutoscalingV2Api | null = null
let k8sEventsApi: k8s.EventsV1Api | null = null
let k8sNetworkingApi: k8s.NetworkingV1Api | null = null
let k8sBatchApi: k8s.BatchV1Api | null = null

/**
 * Initialize Kubernetes client
 * Tries in-cluster config first, then falls back to kubeconfig file
 * IMPORTANT: For AWS EKS, we must reload config on every call to refresh tokens
 *
 * @param contextName - Optional context name to switch to. If not provided, uses current context.
 */
export function initK8sClient(contextName?: string): void {
  // Reset client to force reload (needed for AWS EKS exec auth)
  kc = new k8s.KubeConfig()

  // Always use kubeconfig file for development (not in-cluster)
  // In-cluster config is only for when running inside Kubernetes pod
  try {
    // Load from kubeconfig file (~/.kube/config)
    kc.loadFromDefault()

    // Switch to specified context if provided
    if (contextName) {
      kc.setCurrentContext(contextName)
    }

    const cluster = kc.getCurrentCluster()
    const currentCtx = kc.getCurrentContext()

    // Validate cluster configuration
    if (!cluster?.server) {
      throw new Error(`Cluster server URL is not configured for context: ${contextName || currentCtx}`)
    }
  } catch (error) {
    logger.error({ error, contextName }, 'Failed to load Kubernetes configuration')
    throw new Error('Failed to initialize Kubernetes client. Make sure kubeconfig is properly configured.')
  }

  // Initialize API clients (recreate on every call for fresh tokens)
  k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api)
  k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api)
  k8sAutoscalingApi = kc.makeApiClient(k8s.AutoscalingV2Api)
  k8sEventsApi = kc.makeApiClient(k8s.EventsV1Api)
  k8sNetworkingApi = kc.makeApiClient(k8s.NetworkingV1Api)
  k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api)
}

/**
 * Get Apps V1 API client (for Deployments, StatefulSets, DaemonSets)
 * @param contextName - Optional context name to switch to
 */
export function getAppsApi(contextName?: string): k8s.AppsV1Api {
  // Always reinitialize for AWS EKS to refresh tokens
  initK8sClient(contextName)
  return k8sAppsApi!
}

/**
 * Get Core V1 API client (for Pods, Services, ConfigMaps, Secrets, Nodes, PVs, PVCs)
 * @param contextName - Optional context name to switch to
 */
export function getCoreApi(contextName?: string): k8s.CoreV1Api {
  // Always reinitialize for AWS EKS to refresh tokens
  initK8sClient(contextName)
  return k8sCoreApi!
}

/**
 * Get Autoscaling V2 API client (for HPAs)
 * @param contextName - Optional context name to switch to
 */
export function getAutoscalingApi(contextName?: string): k8s.AutoscalingV2Api {
  // Always reinitialize for AWS EKS to refresh tokens
  initK8sClient(contextName)
  return k8sAutoscalingApi!
}

/**
 * Get Events V1 API client
 * @param contextName - Optional context name to switch to
 */
export function getEventsApi(contextName?: string): k8s.EventsV1Api {
  // Always reinitialize for AWS EKS to refresh tokens
  initK8sClient(contextName)
  return k8sEventsApi!
}

/**
 * Get Networking V1 API client (for Ingress)
 * @param contextName - Optional context name to switch to
 */
export function getNetworkingApi(contextName?: string): k8s.NetworkingV1Api {
  // Always reinitialize for AWS EKS to refresh tokens
  initK8sClient(contextName)
  return k8sNetworkingApi!
}

/**
 * Get Batch V1 API client (for Jobs, CronJobs)
 * @param contextName - Optional context name to switch to
 */
export function getBatchApi(contextName?: string): k8s.BatchV1Api {
  // Always reinitialize for AWS EKS to refresh tokens
  initK8sClient(contextName)
  return k8sBatchApi!
}

/**
 * Get KubeConfig instance
 */
export function getKubeConfig(): k8s.KubeConfig {
  if (!kc) {
    initK8sClient()
  }
  return kc!
}

/**
 * Check if client is initialized and can connect to cluster
 */
export async function checkConnection(): Promise<boolean> {
  try {
    const coreApi = getCoreApi()
    await coreApi.listNamespace()
    return true
  } catch (error) {
    logger.error({ error }, 'Connection check failed')
    return false
  }
}

/**
 * Reset client (useful for testing or reconnecting)
 */
export function resetClient(): void {
  kc = null
  k8sAppsApi = null
  k8sCoreApi = null
  k8sAutoscalingApi = null
  k8sEventsApi = null
  k8sNetworkingApi = null
  k8sBatchApi = null
}
