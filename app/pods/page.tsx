'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { usePods } from '@/lib/hooks/use-pods'
import { StatusBadge } from '@/app/components/common/status-badge'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { useSortableTable, SortFunction } from '@/lib/hooks/use-table-sort'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import type { PodStatus, Pod } from '@/types/kubernetes'

export default function PodsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PodStatus | ''>('')

  const { data: pods, isLoading, error, refetch } = usePods(statusFilter || undefined)

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredPods = useMemo(() => {
    if (!pods) return []
    if (!searchQuery) return pods

    return pods.filter((pod) =>
      pod.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [pods, searchQuery])

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Pod>(
    filteredPods,
    'name',
    'asc'
  )

  // Custom sort function for containers (array length)
  const sortByContainers: SortFunction<Pod> = (a, b, order) => {
    const aVal = a.containers.length
    const bVal = b.containers.length
    return order === 'asc' ? aVal - bVal : bVal - aVal
  }

  if (isLoading) {
    return (
      <Box>
        <PageHeader
          title="Pods"
          onRefresh={refetch}
          isRefreshing={isLoading}
        />
        <TableSkeleton rows={10} columns={7} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader
          title="Pods"
          onRefresh={refetch}
          isRefreshing={isLoading}
        />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Pods" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Pods"
        subtitle={`${pods?.length || 0} pod${pods?.length === 1 ? '' : 's'} in this namespace`}
        onRefresh={refetch}
        isRefreshing={isLoading}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search pods..."
        filters={
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter-select"
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value as PodStatus | '')}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Running">Running</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Succeeded">Succeeded</MenuItem>
              <MenuItem value="CrashLoopBackOff">CrashLoopBackOff</MenuItem>
            </Select>
          </FormControl>
        }
      />

      {!pods || pods.length === 0 ? (
        <EmptyState
          icon={ViewInArIcon}
          title="No pods found"
          description="There are no pods in this namespace yet."
        />
      ) : filteredPods.length === 0 ? (
        <EmptyState
          icon={ViewInArIcon}
          title="No matching pods"
          description={`No pods match your search${statusFilter ? ' and status filter' : ''}.`}
          action={{
            label: 'Clear filters',
            onClick: () => {
              setSearchQuery('')
              setStatusFilter('')
            },
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
                  field="nodeName"
                  label="Node"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="ip"
                  label="IP"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="restartCount"
                  label="Restarts"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                  align="center"
                />
                <SortableTableCell
                  field="containers"
                  label="Containers"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                  customSortFn={sortByContainers}
                  align="center"
                />
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
              {sortedData.map((pod) => (
                <TableRow
                  key={pod.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/pods/${pod.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {pod.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={pod.status} />
                  </TableCell>
                  <TableCell>{pod.nodeName}</TableCell>
                  <TableCell>{pod.ip}</TableCell>
                  <TableCell align="center">
                    {pod.restartCount > 0 ? (
                      <Chip
                        label={pod.restartCount}
                        size="small"
                        color={pod.restartCount > 5 ? 'error' : 'warning'}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        0
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {pod.containers.length}
                  </TableCell>
                  <TableCell>{pod.age}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/pods/${pod.name}`)
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
