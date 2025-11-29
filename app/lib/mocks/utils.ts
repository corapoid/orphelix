/**
 * Utility functions for generating mock data
 */

/**
 * Generate random date in the past
 */
export function randomDate(daysAgo: number): Date {
  const now = new Date()
  const ms = Math.random() * daysAgo * 24 * 60 * 60 * 1000
  return new Date(now.getTime() - ms)
}

/**
 * Select random item from array
 */
export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Calculate age from date
 */
export function calculateAge(date: Date): string {
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
