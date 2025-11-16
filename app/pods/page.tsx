'use client'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePods } from '@/lib/hooks/use-pods'
import { StatusBadge } from '@/app/components/common/status-badge'
import { PodCard } from '@/app/components/pods/pod-card'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import type { Pod, PodStatus } from '@/types/kubernetes'

export default function PodsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [statusFilter, setStatusFilter] = useState<PodStatus | ''>('')
  const { data: pods, isLoading, error, refetch } = usePods(statusFilter || undefined)

  // Set filter from URL on mount
  useEffect(() => {
    const status = searchParams.get('status')
    if (status && ['Running', 'Pending', 'Failed', 'Succeeded', 'Unknown', 'CrashLoopBackOff'].includes(status)) {
      setStatusFilter(status as PodStatus)
    }
  }, [searchParams])

  const columns: TableColumn<Pod>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (pod) => (
        <Typography variant="body2" fontWeight="medium">
          {pod.name}
        </Typography>
      ),
    },
    {
      field: 'status',
      label: 'Status',
      render: (pod) => <StatusBadge status={pod.status} />,
    },
    {
      field: 'node',
      label: 'Node',
      render: (pod) => pod.node || 'N/A',
    },
    {
      field: 'ip',
      label: 'IP',
    },
    {
      field: 'containers',
      label: 'Containers',
      align: 'center',
      render: (pod) => pod.containers.length,
      customSortFn: (a, b, order) => {
        const aVal = a.containers.length
        const bVal = b.containers.length
        return order === 'asc' ? aVal - bVal : bVal - aVal
      },
    },
    {
      field: 'restarts',
      label: 'Restarts',
      align: 'center',
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
      render: (pod) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/pods/${pod.name}`)
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <ResourceListView
      title="Pods"
      resourceName="pod"
      resourceNamePlural="pods"
      icon={ViewInArIcon}
      data={pods}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search pods..."
      searchFilter={(pod, query) => pod.name.toLowerCase().includes(query.toLowerCase())}
      filters={[
        {
          label: 'Status',
          value: statusFilter,
          options: [
            { label: 'All Statuses', value: '' },
            { label: 'Running', value: 'Running' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Failed', value: 'Failed' },
            { label: 'Succeeded', value: 'Succeeded' },
            { label: 'CrashLoopBackOff', value: 'CrashLoopBackOff' },
          ],
          onChange: (value) => setStatusFilter(value as PodStatus | ''),
        },
      ]}
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(pod) => pod.name}
      onRowClick={(pod) => router.push(`/pods/${pod.name}`)}
      renderCard={(pod, onClick) => <PodCard pod={pod} onClick={onClick} />}
      emptyStateDescription="There are no pods in this namespace yet."
      showClusterAlert={false}
    />
  )
}
