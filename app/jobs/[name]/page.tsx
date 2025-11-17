'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useParams } from 'next/navigation'
import { useJob } from '@/lib/hooks/use-jobs'
import { usePods } from '@/lib/hooks/use-pods'
import { StatusBadge } from '@/app/components/common/status-badge'
import { LiquidGlassChip } from '@/app/components/common/liquid-glass-chip'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import Link from 'next/link'

export default function JobDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: job, isLoading, error, refetch } = useJob(name)
  const { data: allPods } = usePods()

  // Filter pods owned by this job
  const jobPods = allPods?.filter((pod) => {
    // Check if pod is owned by this job via labels
    return pod.labels['job-name'] === name
  }) || []

  // Auto-refresh
  useAutoRefresh(refetch)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !job) {
    return (
      <Box>
        <PageHeader
          title="Job Details"
          breadcrumbs={[
            { label: 'Jobs', href: '/jobs' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('Job not found')}
          onRetry={() => refetch()}
          title="Failed to Load Job"
        />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {job.name}
            <StatusBadge status={job.status} size="medium" />
          </Box>
        }
        metadata={[
          `Age: ${job.age}`,
        ]}
        breadcrumbs={[
          { label: 'Jobs', href: '/jobs' },
          { label: job.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Left Column - Details + Statistics */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Details */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Details
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
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
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Completions:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {job.succeeded} / {job.completions}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Duration:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                    {job.duration || 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Execution Statistics */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Execution Statistics
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
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
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Succeeded:
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="success.main">
                    {job.succeeded}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Failed:
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="error.main">
                    {job.failed}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Active:
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="info.main">
                    {job.active}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Right Column - Resource Info */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            About Jobs
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 3,
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
              borderRadius: 3,
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              A <strong>Job</strong> creates one or more Pods and ensures that a specified number of them successfully terminate.
              As pods successfully complete, the Job tracks the successful completions.
            </Typography>

            <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600, fontSize: '1rem' }}>
              Key Concepts
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="body2">
                  <strong>Completions:</strong> The number of pods that need to successfully complete for the job to be considered done.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Parallelism:</strong> The maximum number of pods that can run concurrently.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Backoff Limit:</strong> The number of retries before considering the job as failed.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>TTL After Finished:</strong> Automatic cleanup time after job completion.
                </Typography>
              </li>
            </Box>

            <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600, fontSize: '1rem' }}>
              Common Use Cases
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="body2">
                  Batch processing and data transformation tasks
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Database migrations and backups
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Report generation and analytics
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  CI/CD pipeline steps and deployment tasks
                </Typography>
              </li>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Related Pods */}
      {jobPods.length > 0 && (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Pods ({jobPods.length})
            </Typography>
            <Paper
              elevation={0}
              sx={{
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
                borderRadius: 3,
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Restarts</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Node</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobPods.map((pod) => (
                      <TableRow
                        key={pod.name}
                        hover
                        component={Link}
                        href={`/pods/${pod.name}`}
                        sx={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {pod.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={pod.status} size="small" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color={pod.restartCount > 0 ? 'error.main' : 'text.secondary'}>
                            {pod.restartCount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {pod.age}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {pod.nodeName}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
        </Box>
      )}

      {/* Conditions */}
      {job.conditions && job.conditions.length > 0 && (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Conditions
            </Typography>
            <Paper
              elevation={0}
              sx={{
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
                borderRadius: 3,
              }}
            >
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {job.conditions.map((condition, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {condition.type}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <LiquidGlassChip
                            label={condition.status}
                            size="small"
                            color={condition.status === 'True' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{condition.reason || '-'}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {condition.message || '-'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
        </Box>
      )}

      {/* Labels */}
      {Object.keys(job.labels).length > 0 && (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Labels
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {Object.entries(job.labels).map(([key, value]) => (
                <Paper
                  key={key}
                  elevation={0}
                  sx={{
                    px: 2,
                    py: 1,
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
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
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
  )
}
