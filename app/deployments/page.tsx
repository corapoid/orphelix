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
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useDeployments } from '@/lib/hooks/use-deployments'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { StatusBadge } from '@/app/components/common/status-badge'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { ClusterConnectionAlert } from '@/app/components/common/cluster-connection-alert'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { SearchBar } from '@/app/components/common/search-bar'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable, SortFunction } from '@/lib/hooks/use-table-sort'
import type { Deployment } from '@/types/kubernetes'

export default function DeploymentsPage() {
  const router = useRouter()
  const { data: deployments, isLoading, error, refetch } = useDeployments()
  const [searchQuery, setSearchQuery] = useState('')

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredDeployments = useMemo(() => {
    if (!deployments) return []
    if (!searchQuery) return deployments

    return deployments.filter((deployment) =>
      deployment.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [deployments, searchQuery])

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Deployment>(
    filteredDeployments,
    'name',
    'asc'
  )

  // Custom sort functions for nested properties
  const sortByReady: SortFunction<Deployment> = (a, b, order) => {
    const aVal = a.replicas.ready
    const bVal = b.replicas.ready
    return order === 'asc' ? aVal - bVal : bVal - aVal
  }

  const sortByAvailable: SortFunction<Deployment> = (a, b, order) => {
    const aVal = a.replicas.available
    const bVal = b.replicas.available
    return order === 'asc' ? aVal - bVal : bVal - aVal
  }

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Deployments" onRefresh={refetch} />
        <TableSkeleton rows={8} columns={8} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Deployments" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Deployments" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Deployments"
        subtitle={`${deployments?.length || 0} deployment${deployments?.length === 1 ? '' : 's'} in this namespace`}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search deployments..."
        />
      </Box>

      <ClusterConnectionAlert minimal />

      {!deployments || deployments.length === 0 ? (
        <EmptyState
          icon={RocketLaunchIcon}
          title="No deployments found"
          description="There are no deployments in this namespace. Deploy your first application to get started."
        />
      ) : filteredDeployments.length === 0 ? (
        <EmptyState
          icon={RocketLaunchIcon}
          title="No matching deployments"
          description={`No deployments match "${searchQuery}". Try adjusting your search.`}
          action={{
            label: 'Clear search',
            onClick: () => setSearchQuery(''),
          }}
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
                  field="status"
                  label="Status"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="replicas.ready"
                  label="Replicas"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                  customSortFn={sortByReady}
                  align="center"
                />
                <SortableTableCell
                  field="replicas.available"
                  label="Available"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                  customSortFn={sortByAvailable}
                  align="center"
                />
                <TableCell align="center">Unavailable</TableCell>
                <SortableTableCell
                  field="age"
                  label="Age"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="strategy"
                  label="Strategy"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((deployment) => (
                <TableRow
                  key={deployment.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/deployments/${deployment.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {deployment.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={deployment.status} />
                  </TableCell>
                  <TableCell align="center">
                    {deployment.replicas.ready}/{deployment.replicas.desired}
                  </TableCell>
                  <TableCell align="center">{deployment.replicas.available}</TableCell>
                  <TableCell align="center">{deployment.replicas.unavailable}</TableCell>
                  <TableCell>{deployment.age}</TableCell>
                  <TableCell>{deployment.strategy}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/deployments/${deployment.name}`)
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
