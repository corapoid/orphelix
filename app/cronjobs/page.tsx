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
import ScheduleIcon from '@mui/icons-material/Schedule'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCronJobs } from '@/lib/hooks/use-cronjobs'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { ClusterConnectionAlert } from '@/app/components/common/cluster-connection-alert'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import { usePageSearch } from '@/lib/contexts/search-context'
import type { CronJob } from '@/types/kubernetes'

export default function CronJobsPage() {
  const router = useRouter()
  const { data: cronjobs, isLoading, error, refetch } = useCronJobs()
  const searchQuery = usePageSearch('Search cronjobs...')

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredCronJobs = useMemo(() => {
    if (!cronjobs) return []

    // Filter by search query
    if (searchQuery) {
      return cronjobs.filter((cronjob) =>
        cronjob.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return cronjobs
  }, [cronjobs, searchQuery])

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<CronJob>(
    filteredCronJobs,
    'name',
    'asc'
  )

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="CronJobs" onRefresh={refetch} />
        <TableSkeleton rows={8} columns={6} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="CronJobs" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load CronJobs" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="CronJobs"
        subtitle={`${cronjobs?.length || 0} cronjob${cronjobs?.length === 1 ? '' : 's'} in this namespace`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'CronJobs' },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <ClusterConnectionAlert minimal />

      {!cronjobs || cronjobs.length === 0 ? (
        <EmptyState
          icon={ScheduleIcon}
          title="No cronjobs found"
          description="There are no cronjobs in this namespace. CronJobs create jobs on a schedule."
        />
      ) : filteredCronJobs.length === 0 ? (
        <EmptyState
          icon={ScheduleIcon}
          title="No matching cronjobs"
          description={`No cronjobs match "${searchQuery}". Try adjusting your search.`}
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
                  field="schedule"
                  label="Schedule"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableCell>Status</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell>Last Schedule</TableCell>
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
              {sortedData.map((cronjob) => (
                <TableRow
                  key={cronjob.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/cronjobs/${cronjob.name}`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {cronjob.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {cronjob.schedule}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cronjob.suspend ? 'Suspended' : 'Active'}
                      size="small"
                      color={cronjob.suspend ? 'default' : 'success'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">{cronjob.active}</TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {cronjob.lastSchedule || 'Never'}
                    </Typography>
                  </TableCell>
                  <TableCell>{cronjob.age}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/cronjobs/${cronjob.name}`)
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
