'use client'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloudIcon from '@mui/icons-material/Cloud'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { LiquidGlassChip } from '@/app/components/common/liquid-glass-chip'
import { useState } from 'react'
import { useNavigateTo } from 'next/navigation'
import { useServices } from '@/lib/hooks/use-services'
import { TableOnlyResourceList, TableColumn } from '@/app/components/common/table-only-resource-list'
import type { Service, ServiceType } from '@/types/kubernetes'

export default function ServicesPage() {
  const navigateTo = useNavigateTo()
  const [typeFilter, setTypeFilter] = useState<ServiceType | ''>('')
  const { data: services, isLoading, error, refetch } = useServices()

  const getServiceTypeColor = (type: ServiceType): 'success' | 'info' | 'default' | 'warning' => {
    switch (type) {
      case 'LoadBalancer':
        return 'success'
      case 'NodePort':
        return 'info'
      case 'ClusterIP':
        return 'default'
      case 'ExternalName':
        return 'warning'
      default:
        return 'default'
    }
  }

  const columns: TableColumn<Service>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (service) => (
        <Typography variant="body2" fontWeight="medium">
          {service.name}
        </Typography>
      ),
    },
    {
      field: 'type',
      label: 'Type',
      render: (service) => (
        <LiquidGlassChip label={service.type} size="small" color={getServiceTypeColor(service.type)} />
      ),
    },
    {
      field: 'clusterIP',
      label: 'Cluster IP',
    },
    {
      field: 'externalIP',
      label: 'External IP',
      render: (service) => service.externalIP || '-',
    },
    {
      field: 'ports',
      label: 'Ports',
      render: (service) => service.ports.map(p => `${p.port}/${p.protocol}`).join(', '),
      sortable: false,
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
      render: (service) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            navigateTo(`/services/${service.name}`)
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <TableOnlyResourceList
      title="Services"
      resourceName="service"
      resourceNamePlural="services"
      icon={CloudIcon}
      data={services}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search services..."
      searchFilter={(service, query) =>
        service.name.toLowerCase().includes(query.toLowerCase())
      }
      customFilter={typeFilter ? (service) => service.type === typeFilter : undefined}
      filters={[
        {
          label: 'Type',
          value: typeFilter,
          options: [
            { label: 'All Types', value: '' },
            { label: 'ClusterIP', value: 'ClusterIP' },
            { label: 'NodePort', value: 'NodePort' },
            { label: 'LoadBalancer', value: 'LoadBalancer' },
            { label: 'ExternalName', value: 'ExternalName' },
          ],
          onChange: (value) => setTypeFilter(value as ServiceType | ''),
        },
      ]}
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(service) => service.name}
      onRowClick={(service) => navigateTo(`/services/${service.name}`)}
      emptyStateDescription="There are no services in this namespace. Create a service to expose your applications."
    />
  )
}
