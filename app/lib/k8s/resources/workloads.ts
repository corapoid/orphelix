/**
 * Kubernetes Jobs and CronJobs API
 */

import * as k8s from '@kubernetes/client-node'
import { getBatchApi } from '../client'
import { calculateAge } from '../utils/helpers'
import { createLogger } from '@/lib/logging/logger'
import type { Job, JobStatus, JobCondition, CronJob } from '@/types/kubernetes'

const logger = createLogger({ module: 'k8s-workloads' })

/**
 * Helper: Calculate duration from start to completion time
 */
function calculateDuration(startTime?: string, completionTime?: string): string | undefined {
  if (!startTime) return undefined

  const start = new Date(startTime)
  const end = completionTime ? new Date(completionTime) : new Date()
  const diffMs = end.getTime() - start.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) return `${hours}h ${minutes % 60}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

/**
 * Helper: Determine job status from K8s job object
 */
function determineJobStatus(job: k8s.V1Job): JobStatus {
  const conditions = job.status?.conditions || []
  const succeeded = job.status?.succeeded || 0
  const failed = job.status?.failed || 0
  const active = job.status?.active || 0

  // Check conditions
  const completeCondition = conditions.find(c => c.type === 'Complete' && c.status === 'True')
  const failedCondition = conditions.find(c => c.type === 'Failed' && c.status === 'True')

  if (completeCondition) return 'Complete'
  if (failedCondition) return 'Failed'
  if (active > 0) return 'Running'
  if (succeeded === 0 && failed === 0 && active === 0) return 'Pending'

  return 'Unknown'
}

/**
 * Fetch all jobs in a namespace
 */
export async function fetchJobs(namespace: string, contextName?: string): Promise<Job[]> {
  const batchApi = getBatchApi(contextName)
  const response = await batchApi.listNamespacedJob({ namespace })

  return response.items.map((job: k8s.V1Job) => {
    const completions = job.spec?.completions || 1
    const succeeded = job.status?.succeeded || 0
    const failed = job.status?.failed || 0
    const active = job.status?.active || 0
    const status = determineJobStatus(job)

    const conditions: JobCondition[] = (job.status?.conditions || []).map(c => ({
      type: c.type || '',
      status: c.status || '',
      lastProbeTime: c.lastProbeTime?.toISOString(),
      lastTransitionTime: c.lastTransitionTime?.toISOString(),
      reason: c.reason,
      message: c.message,
    }))

    return {
      name: job.metadata?.name || '',
      namespace: job.metadata?.namespace || namespace,
      status,
      completions,
      succeeded,
      failed,
      active,
      startTime: job.status?.startTime?.toISOString(),
      completionTime: job.status?.completionTime?.toISOString(),
      duration: calculateDuration(job.status?.startTime?.toISOString(), job.status?.completionTime?.toISOString()),
      age: calculateAge(job.metadata?.creationTimestamp),
      labels: job.metadata?.labels || {},
      conditions,
    }
  })
}

/**
 * Fetch a single job by name
 */
export async function fetchJob(
  name: string,
  namespace: string,
  contextName?: string
): Promise<Job | null> {
  try {
    const batchApi = getBatchApi(contextName)
    const response = await batchApi.readNamespacedJob({ name, namespace })
    const job = response

    const completions = job.spec?.completions || 1
    const succeeded = job.status?.succeeded || 0
    const failed = job.status?.failed || 0
    const active = job.status?.active || 0
    const status = determineJobStatus(job)

    interface K8sJobCondition {
      type?: string
      status?: string
      lastProbeTime?: Date | string
      lastTransitionTime?: Date | string
      reason?: string
      message?: string
    }

    const conditions: JobCondition[] = (job.status?.conditions || []).map((c: K8sJobCondition) => ({
      type: c.type || '',
      status: c.status || '',
      lastProbeTime: c.lastProbeTime instanceof Date ? c.lastProbeTime.toISOString() : c.lastProbeTime,
      lastTransitionTime: c.lastTransitionTime instanceof Date ? c.lastTransitionTime.toISOString() : c.lastTransitionTime,
      reason: c.reason,
      message: c.message,
    }))

    return {
      name: job.metadata?.name || '',
      namespace: job.metadata?.namespace || namespace,
      status,
      completions,
      succeeded,
      failed,
      active,
      startTime: job.status?.startTime?.toISOString(),
      completionTime: job.status?.completionTime?.toISOString(),
      duration: calculateDuration(job.status?.startTime?.toISOString(), job.status?.completionTime?.toISOString()),
      age: calculateAge(job.metadata?.creationTimestamp),
      labels: job.metadata?.labels || {},
      conditions,
    }
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch job'
    )
    return null
  }
}

/**
 * Fetch all cronjobs in a namespace
 */
export async function fetchCronJobs(namespace: string, contextName?: string): Promise<CronJob[]> {
  const batchApi = getBatchApi(contextName)
  const response = await batchApi.listNamespacedCronJob({ namespace })

  return response.items.map((cronJob: k8s.V1CronJob) => {
    return {
      name: cronJob.metadata?.name || '',
      namespace: cronJob.metadata?.namespace || namespace,
      schedule: cronJob.spec?.schedule || '',
      suspend: cronJob.spec?.suspend || false,
      active: cronJob.status?.active?.length || 0,
      lastSchedule: cronJob.status?.lastScheduleTime?.toISOString(),
      lastSuccessfulTime: cronJob.status?.lastSuccessfulTime?.toISOString(),
      age: calculateAge(cronJob.metadata?.creationTimestamp),
      labels: cronJob.metadata?.labels || {},
    }
  })
}

/**
 * Fetch a single cronjob by name
 */
export async function fetchCronJob(
  name: string,
  namespace: string,
  contextName?: string
): Promise<CronJob | null> {
  try {
    const batchApi = getBatchApi(contextName)
    const response = await batchApi.readNamespacedCronJob({ name, namespace })
    const cronJob = response

    return {
      name: cronJob.metadata?.name || '',
      namespace: cronJob.metadata?.namespace || namespace,
      schedule: cronJob.spec?.schedule || '',
      suspend: cronJob.spec?.suspend || false,
      active: cronJob.status?.active?.length || 0,
      lastSchedule: cronJob.status?.lastScheduleTime?.toISOString(),
      lastSuccessfulTime: cronJob.status?.lastSuccessfulTime?.toISOString(),
      age: calculateAge(cronJob.metadata?.creationTimestamp),
      labels: cronJob.metadata?.labels || {},
    }
  } catch (error) {
    logger.error(
      { error, name, namespace, context: contextName },
      'Failed to fetch cronjob'
    )
    return null
  }
}
