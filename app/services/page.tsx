'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CloudIcon from '@mui/icons-material/Cloud'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useServices } from '@/lib/hooks/use-services'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { ClusterConnectionAlert } from '@/app/components/common/cluster-connection-alert'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import { usePageSearch } from '@/lib/contexts/search-context'
import type { Service, ServiceType } from '@/types/kubernetes'

export default function ServicesPage() {
  const router = useRouter()
  const [typeFilter, setTypeFilter] = useState<ServiceType | ''>('')
  const { data: services, isLoading, error, refetch } = useServices()
  const searchQuery = usePageSearch('Search services...')

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredServices = useMemo(() => {
    if (!services) return []

    let filtered = services

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter((service) => service.type === typeFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [services, searchQuery, typeFilter])

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Service>(
    filteredServices,
    'name',
    'asc'
  )

  const getServiceTypeColor = (type: ServiceType) => {
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

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Services" onRefresh={refetch} />
        <TableSkeleton rows={8} columns={6} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Services" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Services" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Services"
        subtitle={`${services?.length || 0} service${services?.length === 1 ? '' : 's'} in this namespace`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
        filters={
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value as ServiceType | '')}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="ClusterIP">ClusterIP</MenuItem>
              <MenuItem value="NodePort">NodePort</MenuItem>
              <MenuItem value="LoadBalancer">LoadBalancer</MenuItem>
              <MenuItem value="ExternalName">ExternalName</MenuItem>
            </Select>
          </FormControl>
        }
      />

      <ClusterConnectionAlert minimal />

      {!services || services.length === 0 ? (
        <EmptyState
          icon={CloudIcon}
          title="No services found"
          description="There are no services in this namespace. Create a service to expose your applications."
        />
      ) : filteredServices.length === 0 ? (
        <EmptyState
          icon={CloudIcon}
          title="No matching services"
          description={`No services match "${searchQuery}". Try adjusting your search.`}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <SortableTableCell
                  field="name"
                  label="Name"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="type"
                  label="Type"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableCell>Cluster IP</TableCell>
                <TableCell>External IPs</TableCell>
                <TableCell>Ports</TableCell>
                <SortableTableCell
                  field="age"
                  label="Age"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((service) => (
                <TableRow
                  key={service.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/services/${service.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {service.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={service.type}
                      color={getServiceTypeColor(service.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {service.clusterIP || 'None'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {service.externalIPs && service.externalIPs.length > 0 ? (
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {service.externalIPs.join(', ')}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        None
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {service.ports.slice(0, 3).map((port, idx) => (
                        <Chip
                          key={idx}
                          label={`${port.port}${port.nodePort ? `:${port.nodePort}` : ''}`}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {service.ports.length > 3 && (
                        <Typography variant="caption" color="text.secondary">
                          +{service.ports.length - 3}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{service.age}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/services/${service.name}`)
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
