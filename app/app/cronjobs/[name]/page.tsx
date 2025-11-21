'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useParams, useRouter } from 'next/navigation'
import { useCronJob } from '@/lib/hooks/use-cronjobs'
import { useJobs } from '@/lib/hooks/use-jobs'
import { useBuildPath } from '@/lib/hooks/use-navigate-to'
import { StatusBadge } from '@/app/components/common/status-badge'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@orphelix/ui'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { useTheme } from '@orphelix/ui'

// Helper function to convert cron schedule to human-readable description
function getScheduleDescription(schedule: string): string {
  const parts = schedule.trim().split(/\s+/)

  if (parts.length !== 5) {
    return 'Custom schedule'
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts

  // Common patterns
  if (schedule === '* * * * *') return 'Every minute'
  if (schedule === '0 * * * *') return 'Every hour'
  if (schedule === '0 0 * * *') return 'Daily at midnight'
  if (schedule === '0 0 * * 0') return 'Weekly on Sunday at midnight'
  if (schedule === '0 0 1 * *') return 'Monthly on the 1st at midnight'

  // Pattern: */N * * * * (every N minutes)
  if (minute.startsWith('*/') && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    const minuteInterval = minute.substring(2)
    return `Every ${minuteInterval} minutes`
  }

  // Pattern: 0 */N * * * (every N hours)
  if (minute === '0' && hour.startsWith('*/') && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    const hourInterval = hour.substring(2)
    return `Every ${hourInterval} hours`
  }

  // Pattern: M H * * * (daily at specific time)
  if (!minute.includes('*') && !hour.includes('*') && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return `Daily at ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
  }

  // Pattern: M H * * N (weekly on specific day)
  if (!minute.includes('*') && !hour.includes('*') && dayOfMonth === '*' && month === '*' && !dayOfWeek.includes('*')) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = days[parseInt(dayOfWeek)] || `day ${dayOfWeek}`
    return `Weekly on ${day} at ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
  }

  // Pattern: M H D * * (monthly on specific day)
  if (!minute.includes('*') && !hour.includes('*') && !dayOfMonth.includes('*') && month === '*' && dayOfWeek === '*') {
    return `Monthly on day ${dayOfMonth} at ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
  }

  return 'Custom schedule'
}

export default function CronJobDetailPage() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const params = useParams()
  const name = params.name as string
  const router = useRouter()
  const buildPath = useBuildPath()

  const { data: cronjob, isLoading, error, refetch } = useCronJob(name)
  const { data: allJobs } = useJobs()
  // const [docsOpen, setDocsOpen] = useState(true)

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
      <Box sx={{ px: 2 }}>
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
    <Box sx={{ px: 2 }}>
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
          `Age: ${cronjob.age}`,
        ]}
        breadcrumbs={[
          { label: 'CronJobs', href: '/cronjobs' },
          { label: cronjob.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Box sx={{ maxWidth: '50%' }}>
        {/* Main Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* CronJob Information */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                CronJob Information
              </Typography>
              <GlassPanel>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Schedule:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                      {cronjob.schedule}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Description:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium" color="primary.main">
                      {getScheduleDescription(cronjob.schedule)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Suspend:
                    </Typography>
                    <Chip
                      label={cronjob.suspend ? 'Yes' : 'No'}
                      size="small"
                      color={cronjob.suspend ? 'default' : 'success'}
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Active Jobs:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium" color="info.main">
                      {cronjob.active}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Age:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {cronjob.age}
                    </Typography>
                  </Box>
                </Box>
              </GlassPanel>
            </Box>

            {/* Execution History */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Execution History
              </Typography>
              <GlassPanel>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Last Schedule Time:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {cronjob.lastSchedule || 'Never'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Last Successful Time:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium" color="success.main">
                      {cronjob.lastSuccessfulTime || 'Never'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isGlass ? "text.secondary" : "text.primary"}>
                      Total Jobs Created:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {sortedJobs.length}
                    </Typography>
                  </Box>
                </Box>
              </GlassPanel>
            </Box>
          </Box>

          {/* Related Jobs */}
          {sortedJobs.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Jobs ({sortedJobs.length})
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Jobs created by this CronJob (showing last 10)
              </Typography>

              <Paper
                elevation={isGlass ? 0 : 1}
                sx={{
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                  ...(isGlass && {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(30, 30, 46, 0.6)'
                        : 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(209, 213, 219, 0.4)',
                  }),
                }}
              >
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
                      {sortedJobs.slice(0, 10).map((job) => {
                        const jobPath = buildPath(`/jobs/${job.name}`)
                        return (
                        <TableRow
                          key={job.name}
                          hover
                          onClick={() => router.push(jobPath as any)}
                          sx={{
                            cursor: 'pointer',
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
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          )}

          {/* Labels */}
          {Object.keys(cronjob.labels).length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {Object.entries(cronjob.labels).map(([key, value]) => (
                  <Paper
                    key={key}
                    elevation={isGlass ? 0 : 1}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      ...(isGlass && {
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(30, 30, 46, 0.6)'
                            : 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid',
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.12)'
                            : 'rgba(209, 213, 219, 0.4)',
                      }),
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      {key}:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {value}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
      </Box>
      {/* Documentation content preserved for future use:
        Right Sidebar - Documentation
        About CronJobs
        A CronJob creates Jobs on a repeating schedule. CronJobs are meant for performing regular scheduled actions such as backups, report generation, and so on.
        Example CronJob with schedule: "every minute"
        Cron Schedule Format
        Common Schedule Examples: every 5 minutes, every hour, daily, weekly
        Learn more: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
      */}
    </Box>
  )
}
