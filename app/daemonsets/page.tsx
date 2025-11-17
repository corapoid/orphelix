'use client'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useDaemonSets } from '@/lib/hooks/use-daemonsets'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import { DaemonSetCard } from '@/app/components/daemonsets/daemonset-card'
import type { DaemonSet, DeploymentStatus } from '@/types/kubernetes'

export default function DaemonSetsPage() {
  const navigateTo = useNavigateTo()
  const searchParams = useSearchParams()
  const [statusFilter, setStatusFilter] = useState<DeploymentStatus | ''>('')
  const { data: daemonsets, isLoading, error, refetch } = useDaemonSets()

  // Set filter from URL on mount
  useEffect(() => {
    const status = searchParams.get('status')
    if (status && (status === 'Healthy' || status === 'Degraded' || status === 'Not Ready')) {
      setStatusFilter(status as DeploymentStatus)
    }
  }, [searchParams])

  const columns: TableColumn<DaemonSet>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (ds) => (
        <Typography variant="body2" fontWeight="medium">
          {ds.name}
        </Typography>
      ),
    },
    {
      field: 'status',
      label: 'Status',
      render: (ds) => <StatusBadge status={ds.status} />,
    },
    {
      field: 'desired',
      label: 'Desired',
      align: 'center',
      customSortFn: (a, b, order) => {
        return order === 'asc' ? a.desired - b.desired : b.desired - a.desired
      },
    },
    {
      field: 'current',
      label: 'Current',
      align: 'center',
      customSortFn: (a, b, order) => {
        return order === 'asc' ? a.current - b.current : b.current - a.current
      },
    },
    {
      field: 'ready',
      label: 'Ready',
      align: 'center',
      customSortFn: (a, b, order) => {
        return order === 'asc' ? a.ready - b.ready : b.ready - a.ready
      },
    },
    {
      field: 'upToDate',
      label: 'Up-to-date',
      align: 'center',
      customSortFn: (a, b, order) => {
        return order === 'asc' ? a.upToDate - b.upToDate : b.upToDate - a.upToDate
      },
    },
    {
      field: 'available',
      label: 'Available',
      align: 'center',
      customSortFn: (a, b, order) => {
        return order === 'asc' ? a.available - b.available : b.available - a.available
      },
    },
    {
      field: 'age',
      label: 'Age',
    },
    {
      field: 'actions',
      label: 'Actions',
      align: 'right',
      sortable: false,
      render: (ds) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            navigateTo(`/daemonsets/${ds.name}`)
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <ResourceListView
      title="DaemonSets"
      resourceName="daemonset"
      resourceNamePlural="daemonsets"
      icon={SettingsSystemDaydreamIcon}
      data={daemonsets}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search daemonsets..."
      searchFilter={(ds, query) =>
        ds.name.toLowerCase().includes(query.toLowerCase())
      }
      customFilter={
        statusFilter
          ? (ds) => ds.status === statusFilter
          : undefined
      }
      filters={[
        {
          label: 'Status',
          value: statusFilter,
          options: [
            { label: 'All Statuses', value: '' },
            { label: 'Healthy', value: 'Healthy' },
            { label: 'Degraded', value: 'Degraded' },
            { label: 'Not Ready', value: 'Not Ready' },
          ],
          onChange: (value) => setStatusFilter(value as DeploymentStatus | ''),
        },
      ]}
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(ds) => ds.name}
      onRowClick={(ds) => navigateTo(`/daemonsets/${ds.name}`)}
      renderCard={(ds, onClick) => (
        <DaemonSetCard daemonSet={ds} onClick={onClick} />
      )}
      emptyStateDescription="There are no daemonsets in this namespace."
    />
  )
}
