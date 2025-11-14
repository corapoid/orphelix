'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import { useParams } from 'next/navigation'
import { useJob } from '@/lib/hooks/use-jobs'
import { StatusBadge } from '@/app/components/common/status-badge'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'

export default function JobDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: job, isLoading, error, refetch } = useJob(name)

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
          `Namespace: ${job.namespace}`,
          `Age: ${job.age}`,
        ]}
        breadcrumbs={[
          { label: 'Jobs', href: '/jobs' },
          { label: job.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Grid container spacing={3}>
        {/* Job Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Job Information
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <StatusBadge status={job.status} />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Completions
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {job.succeeded} / {job.completions}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Duration
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                  {job.duration || 'N/A'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Age
                </Typography>
                <Typography variant="body1">{job.age}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Execution Stats */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Execution Statistics
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Succeeded
                </Typography>
                <Typography variant="body1" fontWeight="medium" color="success.main">
                  {job.succeeded}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Failed
                </Typography>
                <Typography variant="body1" fontWeight="medium" color="error.main">
                  {job.failed}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Active
                </Typography>
                <Typography variant="body1" fontWeight="medium" color="info.main">
                  {job.active}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Labels */}
        {Object.keys(job.labels).length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Labels
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                {Object.entries(job.labels).map(([key, value]) => (
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
