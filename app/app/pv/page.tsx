'use client'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import StorageIcon from '@mui/icons-material/Storage'
import { useState } from 'react'
import { usePVs, usePVCs } from '@/lib/hooks/use-pv'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { PageHeader } from '@/app/components/common/page-header'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import { StatusBadge } from '@/app/components/common/status-badge'
import type { PersistentVolume, PersistentVolumeClaim } from '@/types/kubernetes'

export default function PersistentVolumesPage() {
  const [tab, setTab] = useState(0)

  const { data: pvs, isLoading: pvsLoading, error: pvsError, refetch: refetchPVs } = usePVs()
  const { data: pvcs, isLoading: pvcsLoading, error: pvcsError, refetch: refetchPVCs } = usePVCs()

  // Auto-refresh
  useAutoRefresh(() => {
    refetchPVs()
    refetchPVCs()
  })

  const isLoading = tab === 0 ? pvsLoading : pvcsLoading
  const error = tab === 0 ? pvsError : pvcsError
  const refetch = tab === 0 ? refetchPVs : refetchPVCs

  const pvColumns: TableColumn<PersistentVolume>[] = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'status',
      label: 'Status',
      render: (pv) => <StatusBadge status={pv.status} />,
    },
    {
      field: 'capacity',
      label: 'Capacity',
    },
    {
      field: 'accessModes',
      label: 'Access Modes',
      render: (pv) => pv.accessModes.join(', '),
      sortable: false,
    },
    {
      field: 'reclaimPolicy',
      label: 'Reclaim Policy',
    },
    {
      field: 'storageClass',
      label: 'Storage Class',
    },
    {
      field: 'claim',
      label: 'Claim',
      render: (pv) => pv.claim || '-',
    },
    {
      field: 'age',
      label: 'Age',
    },
  ]

  const pvcColumns: TableColumn<PersistentVolumeClaim>[] = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'namespace',
      label: 'Namespace',
    },
    {
      field: 'status',
      label: 'Status',
      render: (pvc) => <StatusBadge status={pvc.status} />,
    },
    {
      field: 'volume',
      label: 'Volume',
    },
    {
      field: 'capacity',
      label: 'Capacity',
    },
    {
      field: 'accessModes',
      label: 'Access Modes',
      render: (pvc) => pvc.accessModes.join(', '),
      sortable: false,
    },
    {
      field: 'storageClass',
      label: 'Storage Class',
    },
    {
      field: 'age',
      label: 'Age',
    },
  ]

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Persistent Volumes" onRefresh={refetch} />
        <TableSkeleton rows={5} columns={5} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Persistent Volumes" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Persistent Volumes" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Persistent Volumes"
        subtitle={tab === 0
          ? `${pvs?.length || 0} PersistentVolume${pvs?.length === 1 ? '' : 's'}`
          : `${pvcs?.length || 0} PersistentVolumeClaim${pvcs?.length === 1 ? '' : 's'} in this namespace`
        }
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={`PersistentVolumes (${pvs?.length || 0})`} />
          <Tab label={`PersistentVolumeClaims (${pvcs?.length || 0})`} />
        </Tabs>
      </Box>

      {tab === 0 ? (
        <ResourceListView
          title=""
          resourceName="PersistentVolume"
          resourceNamePlural="PersistentVolumes"
          icon={StorageIcon}
          data={pvs}
          isLoading={pvsLoading}
          error={pvsError}
          refetch={refetchPVs}
          searchPlaceholder="Search..."
          searchFilter={(pv, query) =>
            pv.name.toLowerCase().includes(query.toLowerCase())
          }
          columns={pvColumns}
          defaultSortField="name"
          defaultSortOrder="asc"
          getRowKey={(pv) => pv.name}
          emptyStateDescription="There are no PersistentVolumes in the cluster."
          showClusterAlert={false}
        />
      ) : (
        <ResourceListView
          title=""
          resourceName="PersistentVolumeClaim"
          resourceNamePlural="PersistentVolumeClaims"
          icon={StorageIcon}
          data={pvcs}
          isLoading={pvcsLoading}
          error={pvcsError}
          refetch={refetchPVCs}
          searchPlaceholder="Search..."
          searchFilter={(pvc, query) =>
            pvc.name.toLowerCase().includes(query.toLowerCase())
          }
          columns={pvcColumns}
          defaultSortField="name"
          defaultSortOrder="asc"
          getRowKey={(pvc) => pvc.name}
          emptyStateDescription="There are no PersistentVolumeClaims in this namespace."
          showClusterAlert={false}
        />
      )}
    </Box>
  )
}
