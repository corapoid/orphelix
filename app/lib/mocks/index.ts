/**
 * Mock data generators - Main export file
 *
 * This module provides mock Kubernetes data for demo purposes.
 * Data is organized into logical groups and cached for performance.
 */

// Re-export all generators for backward compatibility
export { generateMockPods, getMockPodLogs } from './workloads/pods'
export { generateMockDeployments, generateMockPodMetrics } from './workloads/deployments'

// Re-export from original data.ts for now
// TODO: Split these into separate modules
export {
  generateMockNodes,
  generateMockConfigMaps,
  generateMockSecrets,
  generateMockHPAs,
  generateMockPVs,
  generateMockPVCs,
  generateMockEvents,
  generateMockServices,
  generateMockIngresses,
  generateMockJobs,
  generateMockCronJobs,
  generateMockStatefulSets,
  generateMockDaemonSets,
  generateMockNamespaces,
  generateMockResourceQuotas,
  generateMockLimitRanges,
  generateMockDashboardSummary,
} from './data'

// Export utilities
export { randomDate, randomItem, calculateAge } from './utils'

// Export cache functions
export * from './cache'
