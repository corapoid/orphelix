/**
 * Kubernetes Utility Helpers
 *
 * Common helper functions used across K8s resource modules
 */

/**
 * Calculate age from timestamp
 * Returns human-readable age string (e.g., "5m", "3h", "2d")
 */
export function calculateAge(timestamp: Date | string | undefined): string {
  if (!timestamp) return 'Unknown'

  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
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
