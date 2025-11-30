/**
 * YAML Comparator
 *
 * Compares Kubernetes YAML manifests to find matching files.
 * Used for matching cluster resources with repository files.
 */

import yaml from 'js-yaml'
import { createLogger } from '@/lib/logging/logger'

const logger = createLogger({ module: 'yaml-comparator' })

interface K8sObject {
  kind?: string
  metadata?: {
    name?: string
    namespace?: string
    labels?: Record<string, string>
    uid?: string
    resourceVersion?: string
    generation?: number
    creationTimestamp?: string
    managedFields?: unknown
    selfLink?: string
  }
  spec?: Record<string, unknown>
  status?: unknown
}

/**
 * Compare two YAML strings and return similarity score (0-100)
 */
export function compareYaml(clusterYaml: string, repoYaml: string): number {
  try {
    const clusterObj = yaml.load(clusterYaml) as K8sObject
    const repoObj = yaml.load(repoYaml) as K8sObject

    if (!clusterObj || !repoObj) return 0

    // Remove cluster-specific fields that shouldn't be compared
    const cleanCluster = cleanK8sObject(clusterObj)
    const cleanRepo = cleanK8sObject(repoObj)

    // Compare key sections
    let score = 0
    let totalChecks = 0

    // 1. Kind and APIVersion match (25 points)
    if (cleanCluster.kind === cleanRepo.kind) {
      score += 25
    }
    totalChecks += 25

    // 2. Name match (15 points)
    if (cleanCluster.metadata?.name === cleanRepo.metadata?.name) {
      score += 15
    }
    totalChecks += 15

    // 3. Namespace match (10 points)
    if (cleanCluster.metadata?.namespace === cleanRepo.metadata?.namespace) {
      score += 10
    }
    totalChecks += 10

    // 4. Labels similarity (15 points)
    score += compareMaps(
      cleanCluster.metadata?.labels,
      cleanRepo.metadata?.labels
    ) * 15
    totalChecks += 15

    // 5. Spec similarity (35 points)
    score += compareObjects(
      cleanCluster.spec,
      cleanRepo.spec,
      ['replicas', 'template', 'selector', 'data']
    ) * 35
    totalChecks += 35

    return Math.round((score / totalChecks) * 100)
  } catch (error) {
    logger.error({ error }, 'YAML comparison error')
    return 0
  }
}

/**
 * Remove cluster-specific fields from K8s object
 */
function cleanK8sObject(obj: K8sObject): K8sObject {
  if (!obj) return obj

  const cleaned = JSON.parse(JSON.stringify(obj))

  // Remove cluster-managed fields
  if (cleaned.metadata) {
    delete cleaned.metadata.uid
    delete cleaned.metadata.resourceVersion
    delete cleaned.metadata.generation
    delete cleaned.metadata.creationTimestamp
    delete cleaned.metadata.managedFields
    delete cleaned.metadata.selfLink
  }

  delete cleaned.status

  return cleaned
}

/**
 * Compare two maps/objects and return similarity (0-1)
 */
function compareMaps(map1: Record<string, unknown> | undefined, map2: Record<string, unknown> | undefined): number {
  if (!map1 && !map2) return 1
  if (!map1 || !map2) return 0

  const keys1 = Object.keys(map1)
  const keys2 = Object.keys(map2)

  if (keys1.length === 0 && keys2.length === 0) return 1
  if (keys1.length === 0 || keys2.length === 0) return 0

  let matches = 0
  const total = Math.max(keys1.length, keys2.length)

  for (const key of keys1) {
    if (map2[key] === map1[key]) {
      matches++
    }
  }

  return matches / total
}

/**
 * Compare two objects deeply on specific fields
 */
function compareObjects(obj1: Record<string, unknown> | undefined, obj2: Record<string, unknown> | undefined, fields: string[]): number {
  if (!obj1 && !obj2) return 1
  if (!obj1 || !obj2) return 0

  let totalScore = 0
  let checkedFields = 0

  for (const field of fields) {
    if (obj1[field] !== undefined || obj2[field] !== undefined) {
      checkedFields++

      if (JSON.stringify(obj1[field]) === JSON.stringify(obj2[field])) {
        totalScore += 1
      } else {
        // Partial match for nested objects
        if (typeof obj1[field] === 'object' && typeof obj2[field] === 'object' && obj1[field] !== null && obj2[field] !== null) {
          totalScore += compareMaps(obj1[field] as Record<string, unknown>, obj2[field] as Record<string, unknown>) * 0.5
        }
      }
    }
  }

  return checkedFields > 0 ? totalScore / checkedFields : 0
}

/**
 * Batch compare cluster YAML against multiple repo files
 * Returns files sorted by similarity score
 */
export function findBestMatchingFile(
  clusterYaml: string,
  repoFiles: Array<{ path: string; content: string }>
): Array<{ path: string; score: number }> {
  const results = repoFiles.map(file => ({
    path: file.path,
    score: compareYaml(clusterYaml, file.content)
  }))

  // Sort by score descending
  results.sort((a, b) => b.score - a.score)

  return results
}
