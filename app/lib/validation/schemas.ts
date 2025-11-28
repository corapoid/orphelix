/**
 * Validation Schemas
 *
 * Zod schemas for validating all user inputs across the application.
 * This is a critical security layer to prevent injection attacks and invalid data.
 *
 * @module lib/validation/schemas
 */

import { z } from 'zod'
import * as yaml from 'js-yaml'

/**
 * Kubernetes Resource Name Validation
 * Must follow DNS-1123 subdomain standard
 * @see https://kubernetes.io/docs/concepts/overview/working-with-objects/names/
 */
export const k8sNameSchema = z.string()
  .trim()
  .min(1, 'Resource name is required')
  .max(253, 'Resource name must not exceed 253 characters')
  .regex(
    /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/,
    'Resource name must consist of lowercase alphanumeric characters or hyphens, and must start and end with an alphanumeric character'
  )

/**
 * Kubernetes Namespace Validation
 * Stricter than resource names (max 63 chars)
 */
export const namespaceSchema = z.string()
  .trim()
  .min(1, 'Namespace is required')
  .max(63, 'Namespace must not exceed 63 characters')
  .regex(
    /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/,
    'Namespace must consist of lowercase alphanumeric characters or hyphens, and must start and end with an alphanumeric character'
  )

/**
 * Kubernetes Context Name Validation
 * More permissive than resource names
 */
export const contextNameSchema = z.string()
  .min(1, 'Context name is required')
  .max(255, 'Context name must not exceed 255 characters')
  .regex(
    /^[a-zA-Z0-9_.-]+$/,
    'Context name must consist of alphanumeric characters, underscores, dots, or hyphens'
  )

/**
 * Pod Log Tail Parameter Validation
 * Limits the number of log lines to prevent memory issues
 */
export const logTailSchema = z.number()
  .int('Tail must be an integer')
  .min(1, 'Tail must be at least 1')
  .max(10000, 'Tail must not exceed 10000 lines')
  .default(100)

/**
 * Container Name Validation
 * Similar to k8s names but allows dots
 */
export const containerNameSchema = z.string()
  .min(1, 'Container name is required')
  .max(253, 'Container name must not exceed 253 characters')
  .regex(
    /^[a-z0-9]([-a-z0-9.]*[a-z0-9])?$/,
    'Container name must consist of lowercase alphanumeric characters, hyphens, or dots'
  )

/**
 * YAML Content Validation
 * Ensures valid YAML syntax and reasonable size
 */
export const yamlContentSchema = z.string()
  .min(1, 'YAML content cannot be empty')
  .max(1048576, 'YAML content must not exceed 1MB') // 1MB limit
  .refine((val) => {
    try {
      yaml.load(val)
      return true
    } catch {
      return false
    }
  }, 'Invalid YAML syntax')

/**
 * GitHub Owner Validation
 * @see https://github.com/dead-claudia/github-limits
 * Rules: alphanumeric or single hyphens, cannot start/end with hyphen, no consecutive hyphens
 */
export const githubOwnerSchema = z.string()
  .min(1, 'Owner is required')
  .max(39, 'Owner must not exceed 39 characters')
  .regex(
    /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/,
    'Invalid GitHub owner format'
  )

/**
 * GitHub Repository Name Validation
 */
export const githubRepoNameSchema = z.string()
  .min(1, 'Repository name is required')
  .max(100, 'Repository name must not exceed 100 characters')
  .regex(
    /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*$/,
    'Repository name must consist of alphanumeric characters, dots, underscores, or hyphens'
  )
  .refine(
    (name) => !name.startsWith('.') && !name.endsWith('.'),
    'Repository name cannot start or end with a dot'
  )

/**
 * GitHub Branch Name Validation
 */
export const githubBranchSchema = z.string()
  .min(1, 'Branch name is required')
  .max(255, 'Branch name must not exceed 255 characters')
  .regex(
    /^[a-zA-Z0-9._/-]+$/,
    'Branch name must consist of alphanumeric characters, dots, underscores, slashes, or hyphens'
  )

/**
 * GitHub Repository Schema (combined)
 */
export const githubRepoSchema = z.object({
  owner: githubOwnerSchema,
  repo: githubRepoNameSchema,
  branch: githubBranchSchema.optional().default('main'),
})

/**
 * GitHub File Path Validation
 * Prevents path traversal attacks
 */
export const githubFilePathSchema = z.string()
  .min(1, 'File path is required')
  .max(4096, 'File path must not exceed 4096 characters')
  .refine(
    (path) => !path.includes('..'),
    'File path must not contain parent directory references (..)'
  )
  .refine(
    (path) => !path.startsWith('/'),
    'File path must not start with /'
  )

/**
 * OpenAI API Key Validation
 * Format: sk-... or sk-proj-...
 */
export const openaiApiKeySchema = z.string()
  .min(10, 'API key is too short')
  .max(200, 'API key is too long')
  .regex(
    /^sk-(proj-)?[a-zA-Z0-9]+$/,
    'Invalid OpenAI API key format (must start with sk- or sk-proj-)'
  )

/**
 * AI Query Validation
 */
export const aiQuerySchema = z.object({
  query: z.string()
    .min(1, 'Query is required')
    .max(10000, 'Query must not exceed 10000 characters'),

  apiKey: openaiApiKeySchema,

  context: z.object({
    resource: z.object({
      type: z.string().min(1),
      name: k8sNameSchema,
      namespace: namespaceSchema,
      status: z.string().optional(),
      data: z.record(z.string(), z.unknown()).optional(),
    }).optional(),

    events: z.array(
      z.object({
        type: z.string(),
        reason: z.string(),
        message: z.string(),
        count: z.number().int().min(1),
      })
    ).max(100).optional(), // Limit events array size

    logs: z.array(z.string())
      .max(100)
      .optional(), // Limit logs array size

    metrics: z.object({
      cpu: z.string().optional(),
      memory: z.string().optional(),
    }).optional(),
  }).optional(),
})

/**
 * Pod Restart Request Validation
 */
export const podRestartSchema = z.object({
  name: k8sNameSchema,
  namespace: namespaceSchema,
})

/**
 * Deployment Restart Request Validation
 */
export const deploymentRestartSchema = z.object({
  name: k8sNameSchema,
  namespace: namespaceSchema,
})

/**
 * Pod Logs Request Validation
 */
export const podLogsRequestSchema = z.object({
  name: k8sNameSchema,
  namespace: namespaceSchema,
  container: containerNameSchema.optional(),
  tail: logTailSchema.optional(),
  previous: z.boolean().optional().default(false),
  timestamps: z.boolean().optional().default(false),
  sinceSeconds: z.number().int().min(1).max(86400).optional(), // Max 24 hours
})

/**
 * GitHub PR Create Request Validation
 */
export const githubPRCreateSchema = z.object({
  owner: githubOwnerSchema,
  repo: githubRepoNameSchema,
  title: z.string()
    .min(1, 'PR title is required')
    .max(256, 'PR title must not exceed 256 characters'),
  body: z.string()
    .max(65536, 'PR body must not exceed 64KB'),
  head: githubBranchSchema,
  base: githubBranchSchema,
  draft: z.boolean().optional().default(false),
})

/**
 * Settings Update Request Validation
 */
export const settingsUpdateSchema = z.object({
  mode: z.enum(['demo', 'real']).optional(),
  selectedContext: z.object({
    name: contextNameSchema,
    cluster: z.string(),
    user: z.string(),
    namespace: namespaceSchema.optional(),
  }).nullable().optional(),
  selectedNamespace: namespaceSchema.optional(),
  clusterConnected: z.boolean().optional(),
  connectionError: z.string().nullable().optional(),
  realtimeEnabled: z.boolean().optional(),
  autoRefreshEnabled: z.boolean().optional(),
  autoRefreshInterval: z.number().int().min(5).max(300).optional(), // 5s to 5min
  hasCompletedWelcome: z.boolean().optional(),
  themeMode: z.enum(['light', 'dark', 'system']).optional(),
  visualPreset: z.string().optional(),
  compactMode: z.boolean().optional(),
})

/**
 * Cluster Alias Validation
 */
export const clusterAliasSchema = z.object({
  contextName: contextNameSchema,
  alias: z.string()
    .min(1, 'Alias is required')
    .max(100, 'Alias must not exceed 100 characters')
    .regex(
      /^[a-zA-Z0-9 _.-]+$/,
      'Alias must consist of alphanumeric characters, spaces, underscores, dots, or hyphens'
    ),
})

/**
 * Pagination Parameters Validation
 */
export const paginationSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(500).optional().default(50),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
})

/**
 * Search/Filter Parameters Validation
 */
export const searchSchema = z.object({
  query: z.string().max(500).optional(),
  filters: z.record(z.string(), z.string()).optional(),
})

/**
 * Label Selector Validation
 * Format: key=value or key in (value1,value2)
 */
export const labelSelectorSchema = z.string()
  .max(1000, 'Label selector must not exceed 1000 characters')
  .optional()

/**
 * Field Selector Validation
 * Format: metadata.name=value
 */
export const fieldSelectorSchema = z.string()
  .max(1000, 'Field selector must not exceed 1000 characters')
  .optional()

/**
 * Kubernetes Resource List Request Validation
 */
export const k8sListRequestSchema = z.object({
  namespace: namespaceSchema.optional(),
  labelSelector: labelSelectorSchema,
  fieldSelector: fieldSelectorSchema,
  limit: z.number().int().min(1).max(1000).optional(),
  continue: z.string().optional(), // Pagination token
})

/**
 * Helper function to validate request body
 * Returns parsed and validated data or throws ZodError
 */
export function validateRequestBody<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data)
}

/**
 * Helper function to validate query parameters
 * Returns parsed and validated data or throws ZodError
 */
export function validateQueryParams<T>(
  schema: z.ZodSchema<T>,
  searchParams: URLSearchParams
): T {
  const params: Record<string, unknown> = {}

  searchParams.forEach((value, key) => {
    // Try to parse as number
    const numValue = Number(value)
    if (!isNaN(numValue)) {
      params[key] = numValue
      return
    }

    // Try to parse as boolean
    if (value === 'true') {
      params[key] = true
      return
    }
    if (value === 'false') {
      params[key] = false
      return
    }

    // Otherwise keep as string
    params[key] = value
  })

  return schema.parse(params)
}

/**
 * K8s Resource Detail Request Schema
 * For GET requests to fetch a specific resource by name
 */
export const k8sResourceDetailSchema = z.object({
  name: k8sNameSchema,
  namespace: namespaceSchema.default('default'),
})

/**
 * K8s Cluster-Wide Resource Schema
 * For resources that don't belong to a namespace (e.g., Nodes, Namespaces)
 */
export const k8sClusterResourceSchema = z.object({
  name: k8sNameSchema,
})

/**
 * API Key Management Schema
 * Validates API key storage operations
 */
export const apiKeyManagementSchema = z.object({
  keyName: z.string()
    .min(1, 'Key name is required')
    .max(50, 'Key name too long')
    .regex(/^[a-z][a-z0-9_-]*$/, 'Key name must be lowercase alphanumeric with hyphens/underscores'),
  value: z.string()
    .min(1, 'API key value is required')
    .max(500, 'API key too long'),
})
