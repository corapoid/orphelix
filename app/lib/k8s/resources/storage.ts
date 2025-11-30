/**
 * Kubernetes Storage API (PVs and PVCs)
 */

import { getCoreApi } from '../client'
import { calculateAge } from '../utils/helpers'
import type { PersistentVolume, PersistentVolumeClaim, PVStatus, PVCStatus } from '@/types/kubernetes'

/**
 * Fetch all persistent volumes in the cluster
 */
export async function fetchPVs(contextName?: string): Promise<PersistentVolume[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listPersistentVolume({})

  return response.items.map((pv) => ({
    name: pv.metadata?.name || '',
    capacity: pv.spec?.capacity?.storage || '0',
    accessModes: pv.spec?.accessModes || [],
    reclaimPolicy: pv.spec?.persistentVolumeReclaimPolicy || 'Retain',
    status: (pv.status?.phase as PVStatus) || 'Unknown',
    claim: pv.spec?.claimRef
      ? `${pv.spec.claimRef.namespace}/${pv.spec.claimRef.name}`
      : '',
    storageClass: pv.spec?.storageClassName || '',
    age: calculateAge(pv.metadata?.creationTimestamp),
  }))
}

/**
 * Fetch all persistent volume claims in a namespace
 */
export async function fetchPVCs(namespace: string, contextName?: string): Promise<PersistentVolumeClaim[]> {
  const coreApi = getCoreApi(contextName)
  const response = await coreApi.listNamespacedPersistentVolumeClaim({ namespace })

  return response.items.map((pvc) => ({
    name: pvc.metadata?.name || '',
    namespace: pvc.metadata?.namespace || namespace,
    status: (pvc.status?.phase as PVCStatus) || 'Unknown',
    volume: pvc.spec?.volumeName || '',
    capacity: pvc.status?.capacity?.storage || '0',
    accessModes: pvc.spec?.accessModes || [],
    storageClass: pvc.spec?.storageClassName || '',
    age: calculateAge(pvc.metadata?.creationTimestamp),
    labels: pvc.metadata?.labels || {},
  }))
}
