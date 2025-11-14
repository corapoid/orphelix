'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useParams } from 'next/navigation'
import { useCronJob } from '@/lib/hooks/use-cronjobs'
import { useJobs } from '@/lib/hooks/use-jobs'
import { StatusBadge } from '@/app/components/common/status-badge'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import Link from 'next/link'

export default function CronJobDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: cronjob, isLoading, error, refetch } = useCronJob(name)
  const { data: allJobs } = useJobs()

  // Filter jobs owned by this cronjob
  const cronJobs = allJobs?.filter((job) => {
    // Check if job is owned by this cronjob via labels or name pattern
    return job.labels['cronjob'] === name || job.name.startsWith(`${name}-`)
  }) || []

  // Sort by age (newest first)
  const sortedJobs = [...cronJobs].sort((a, b) => {
    // Simple age comparison - newer jobs have smaller age strings typically
    if (a.startTime && b.startTime) {
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    }
    return 0
  })

  // Auto-refresh
  useAutoRefresh(refetch)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !cronjob) {
    return (
      <Box>
        <PageHeader
          title="CronJob Details"
          breadcrumbs={[
            { label: 'CronJobs', href: '/cronjobs' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('CronJob not found')}
          onRetry={() => refetch()}
          title="Failed to Load CronJob"
        />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {cronjob.name}
            <Chip
              label={cronjob.suspend ? 'Suspended' : 'Active'}
              size="medium"
              color={cronjob.suspend ? 'default' : 'success'}
              variant="outlined"
            />
          </Box>
        }
        metadata={[
          `Namespace: ${cronjob.namespace}`,
          `Age: ${cronjob.age}`,
        ]}
        breadcrumbs={[
          { label: 'CronJobs', href: '/cronjobs' },
          { label: cronjob.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Grid container spacing={3}>
        {/* CronJob Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              CronJob Information
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Schedule
                </Typography>
                <Typography variant="body1" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                  {cronjob.schedule}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Suspend
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={cronjob.suspend ? 'Yes' : 'No'}
                    size="small"
                    color={cronjob.suspend ? 'default' : 'success'}
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Active Jobs
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="info.main">
                  {cronjob.active}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Age
                </Typography>
                <Typography variant="body1">{cronjob.age}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Last Execution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Execution History
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Last Schedule Time
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {cronjob.lastSchedule || 'Never'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Last Successful Time
                </Typography>
                <Typography variant="body1" fontWeight="medium" color="success.main">
                  {cronjob.lastSuccessfulTime || 'Never'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Total Jobs Created
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {sortedJobs.length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Related Jobs */}
        {sortedJobs.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Jobs ({sortedJobs.length})
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Jobs created by this CronJob (showing last 10)
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Completions</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Age</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedJobs.slice(0, 10).map((job) => (
                      <TableRow
                        key={job.name}
                        hover
                        component={Link}
                        href={`/jobs/${job.name}`}
                        sx={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {job.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={job.status} size="small" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {job.succeeded} / {job.completions}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {job.duration || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {job.age}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        )}

        {/* Labels */}
        {Object.keys(cronjob.labels).length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {Object.entries(cronjob.labels).map(([key, value]) => (
                  <Chip
                    key={key}
                    label={`${key}=${value}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
