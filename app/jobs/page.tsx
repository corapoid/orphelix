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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import WorkIcon from '@mui/icons-material/Work'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useJobs } from '@/lib/hooks/use-jobs'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { StatusBadge } from '@/app/components/common/status-badge'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { ClusterConnectionAlert } from '@/app/components/common/cluster-connection-alert'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import { usePageSearch } from '@/lib/contexts/search-context'
import type { Job, JobStatus } from '@/types/kubernetes'

export default function JobsPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<JobStatus | ''>('')
  const { data: jobs, isLoading, error, refetch } = useJobs()
  const searchQuery = usePageSearch('Search jobs...')

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredJobs = useMemo(() => {
    if (!jobs) return []

    let filtered = jobs

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((job) => job.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((job) =>
        job.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [jobs, searchQuery, statusFilter])

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Job>(
    filteredJobs,
    'name',
    'asc'
  )

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Jobs" onRefresh={refetch} />
        <TableSkeleton rows={8} columns={7} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Jobs" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Jobs" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Jobs"
        subtitle={`${jobs?.length || 0} job${jobs?.length === 1 ? '' : 's'} in this namespace`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Jobs' },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
        filters={
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value as JobStatus | '')}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="Running">Running</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        }
      />

      <ClusterConnectionAlert minimal />

      {!jobs || jobs.length === 0 ? (
        <EmptyState
          icon={WorkIcon}
          title="No jobs found"
          description="There are no jobs in this namespace. Jobs run workloads to completion."
        />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          icon={WorkIcon}
          title="No matching jobs"
          description={`No jobs match "${searchQuery}". Try adjusting your search.`}
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
                <TableCell align="center">Completions</TableCell>
                <TableCell align="center">Succeeded</TableCell>
                <TableCell align="center">Failed</TableCell>
                <TableCell>Duration</TableCell>
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
              {sortedData.map((job) => (
                <TableRow
                  key={job.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/jobs/${job.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {job.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={job.status} />
                  </TableCell>
                  <TableCell align="center">
                    {job.succeeded}/{job.completions}
                  </TableCell>
                  <TableCell align="center">{job.succeeded}</TableCell>
                  <TableCell align="center">{job.failed}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {job.duration || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>{job.age}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/jobs/${job.name}`)
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
