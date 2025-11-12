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

let kc: k8s.KubeConfig | null = null
let k8sAppsApi: k8s.AppsV1Api | null = null
let k8sCoreApi: k8s.CoreV1Api | null = null
let k8sAutoscalingApi: k8s.AutoscalingV2Api | null = null
let k8sEventsApi: k8s.EventsV1Api | null = null

/**
 * Initialize Kubernetes client
 * Tries in-cluster config first, then falls back to kubeconfig file
 */
export function initK8sClient(): void {
  if (kc) {
    return // Already initialized
  }

  kc = new k8s.KubeConfig()

  try {
    // Try in-cluster configuration first (when running inside a pod)
    kc.loadFromCluster()
    // eslint-disable-next-line no-console
    console.log('[K8s] Using in-cluster configuration')
  } catch {
    try {
      // Fall back to kubeconfig file
      kc.loadFromDefault()
      // eslint-disable-next-line no-console
      console.log('[K8s] Using kubeconfig file')
    } catch (error) {
      console.error('[K8s] Failed to load Kubernetes configuration:', error)
      throw new Error('Failed to initialize Kubernetes client. Make sure kubeconfig is properly configured.')
    }
  }

  // Initialize API clients
  k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api)
  k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api)
  k8sAutoscalingApi = kc.makeApiClient(k8s.AutoscalingV2Api)
  k8sEventsApi = kc.makeApiClient(k8s.EventsV1Api)
}

/**
 * Get Apps V1 API client (for Deployments, StatefulSets, DaemonSets)
 */
export function getAppsApi(): k8s.AppsV1Api {
  if (!k8sAppsApi) {
    initK8sClient()
  }
  return k8sAppsApi!
}

/**
 * Get Core V1 API client (for Pods, Services, ConfigMaps, Secrets, Nodes, PVs, PVCs)
 */
export function getCoreApi(): k8s.CoreV1Api {
  if (!k8sCoreApi) {
    initK8sClient()
  }
  return k8sCoreApi!
}

/**
 * Get Autoscaling V2 API client (for HPAs)
 */
export function getAutoscalingApi(): k8s.AutoscalingV2Api {
  if (!k8sAutoscalingApi) {
    initK8sClient()
  }
  return k8sAutoscalingApi!
}

/**
 * Get Events V1 API client
 */
export function getEventsApi(): k8s.EventsV1Api {
  if (!k8sEventsApi) {
    initK8sClient()
  }
  return k8sEventsApi!
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
    console.error('[K8s] Connection check failed:', error)
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
}
