'use client'

import Typography from '@mui/material/Typography'
import StorageIcon from '@mui/icons-material/Storage'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useStatefulSets } from '@/lib/hooks/use-statefulsets'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import { StatefulSetCard } from '@/app/components/statefulsets/statefulset-card'
import type { StatefulSet, DeploymentStatus } from '@/types/kubernetes'

export default function StatefulSetsPage() {
  const navigateTo = useNavigateTo()
  const searchParams = useSearchParams()
  const [statusFilter, setStatusFilter] = useState<DeploymentStatus | ''>('')
  const { data: statefulsets, isLoading, error, refetch } = useStatefulSets()

  // Set filter from URL on mount
  useEffect(() => {
    const status = searchParams.get('status')
    if (status && (status === 'Healthy' || status === 'Degraded' || status === 'Not Ready')) {
      setStatusFilter(status as DeploymentStatus)
    }
  }, [searchParams])

  const columns: TableColumn<StatefulSet>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (sts) => (
        <Typography variant="body2" fontWeight="medium">
          {sts.name}
        </Typography>
      ),
    },
    {
      field: 'status',
      label: 'Status',
      render: (sts) => <StatusBadge status={sts.status} />,
    },
    {
      field: 'replicas',
      label: 'Replicas',
      align: 'center',
      render: (sts) => `${sts.replicas.ready}/${sts.replicas.desired}`,
      customSortFn: (a, b, order) => {
        const aVal = a.replicas.ready
        const bVal = b.replicas.ready
        return order === 'asc' ? aVal - bVal : bVal - aVal
      },
    },
    {
      field: 'current',
      label: 'Current',
      align: 'center',
      render: (sts) => sts.replicas.current,
      customSortFn: (a, b, order) => {
        const aVal = a.replicas.current
        const bVal = b.replicas.current
        return order === 'asc' ? aVal - bVal : bVal - aVal
      },
    },
    {
      field: 'updated',
      label: 'Updated',
      align: 'center',
      render: (sts) => sts.replicas.updated,
      customSortFn: (a, b, order) => {
        const aVal = a.replicas.updated
        const bVal = b.replicas.updated
        return order === 'asc' ? aVal - bVal : bVal - aVal
      },
    },
    {
      field: 'age',
      label: 'Age',
    },
    {
      field: 'serviceName',
      label: 'Service',
    },
  ]

  return (
    <ResourceListView
      title="StatefulSets"
        resourceName="statefulset"
        resourceNamePlural="statefulsets"
        icon={StorageIcon}
        data={statefulsets}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        searchPlaceholder="Search statefulsets..."
        searchFilter={(sts, query) =>
          sts.name.toLowerCase().includes(query.toLowerCase())
        }
        customFilter={
          statusFilter
            ? (sts) => sts.status === statusFilter
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
        getRowKey={(sts) => sts.name}
        onRowClick={(sts) => navigateTo(`/statefulsets/${sts.name}`)}
        renderCard={(sts, onClick) => (
          <StatefulSetCard statefulSet={sts} onClick={onClick} />
        )}
        emptyStateDescription="There are no statefulsets in this namespace."
      />
  )
}
