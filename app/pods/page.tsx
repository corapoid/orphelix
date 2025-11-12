'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { usePods } from '@/lib/hooks/use-pods'
import { StatusBadge } from '@/components/common/status-badge'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { ErrorState } from '@/components/common/error-state'
import { SortableTableCell } from '@/components/common/sortable-table-cell'
import { useSortableTable, SortFunction } from '@/lib/hooks/use-table-sort'
import type { PodStatus, Pod } from '@/types/kubernetes'

export default function PodsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PodStatus | ''>('')

  const { data: pods, isLoading, error, refetch } = usePods(statusFilter || undefined)

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
        <Typography variant="h4" gutterBottom>
          Pods
        </Typography>
        <TableSkeleton rows={10} columns={7} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Pods
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Pods" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Pods</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-filter-label">Status Filter</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter-select"
              value={statusFilter}
              label="Status Filter"
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
          <TextField
            size="small"
            placeholder="Search pods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Box>
      </Box>

      {filteredPods.length === 0 ? (
        <Alert severity="info">
          {searchQuery || statusFilter ? 'No pods match your filters' : 'No pods found'}
        </Alert>
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
