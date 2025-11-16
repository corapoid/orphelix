'use client'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDeployments } from '@/lib/hooks/use-deployments'
import { StatusBadge } from '@/app/components/common/status-badge'
import { DeploymentCard } from '@/app/components/deployments/deployment-card'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import type { Deployment, DeploymentStatus } from '@/types/kubernetes'

export default function DeploymentsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [statusFilter, setStatusFilter] = useState<DeploymentStatus | ''>('')
  const { data: deployments, isLoading, error, refetch } = useDeployments()

  // Set filter from URL on mount
  useEffect(() => {
    const status = searchParams.get('status')
    if (status && (status === 'Available' || status === 'Progressing' || status === 'Degraded')) {
      setStatusFilter(status as DeploymentStatus)
    }
  }, [searchParams])

  const columns: TableColumn<Deployment>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (deployment) => (
        <Typography variant="body2" fontWeight="medium">
          {deployment.name}
        </Typography>
      ),
    },
    {
      field: 'status',
      label: 'Status',
      render: (deployment) => <StatusBadge status={deployment.status} />,
    },
    {
      field: 'replicas',
      label: 'Replicas',
      align: 'center',
      render: (deployment) => `${deployment.replicas.ready}/${deployment.replicas.desired}`,
      customSortFn: (a, b, order) => {
        const aVal = a.replicas.ready
        const bVal = b.replicas.ready
        return order === 'asc' ? aVal - bVal : bVal - aVal
      },
    },
    {
      field: 'available',
      label: 'Available',
      align: 'center',
      render: (deployment) => deployment.replicas.available,
      customSortFn: (a, b, order) => {
        const aVal = a.replicas.available
        const bVal = b.replicas.available
        return order === 'asc' ? aVal - bVal : bVal - aVal
      },
    },
    {
      field: 'unavailable',
      label: 'Unavailable',
      align: 'center',
      sortable: false,
      render: (deployment) => deployment.replicas.unavailable,
    },
    {
      field: 'age',
      label: 'Age',
    },
    {
      field: 'strategy',
      label: 'Strategy',
    },
    {
      field: 'actions',
      label: 'Actions',
      align: 'right',
      sortable: false,
      render: (deployment) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/deployments/${deployment.name}`)
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <ResourceListView
      title="Deployments"
      resourceName="deployment"
      resourceNamePlural="deployments"
      icon={RocketLaunchIcon}
      data={deployments}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search deployments..."
      searchFilter={(deployment, query) =>
        deployment.name.toLowerCase().includes(query.toLowerCase())
      }
      customFilter={
        statusFilter
          ? (deployment) => deployment.status === statusFilter
          : undefined
      }
      filters={[
        {
          label: 'Status',
          value: statusFilter,
          options: [
            { label: 'All Statuses', value: '' },
            { label: 'Available', value: 'Available' },
            { label: 'Progressing', value: 'Progressing' },
            { label: 'Degraded', value: 'Degraded' },
          ],
          onChange: (value) => setStatusFilter(value as DeploymentStatus | ''),
        },
      ]}
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(deployment) => deployment.name}
      onRowClick={(deployment) => router.push(`/deployments/${deployment.name}`)}
      renderCard={(deployment, onClick) => (
        <DeploymentCard deployment={deployment} onClick={onClick} />
      )}
      emptyStateDescription="There are no deployments in this namespace. Deploy your first application to get started."
    />
  )
}
