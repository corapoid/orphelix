'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import { useParams } from 'next/navigation'
import { useCronJob } from '@/lib/hooks/use-cronjobs'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'

export default function CronJobDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: cronjob, isLoading, error, refetch } = useCronJob(name)

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
        {/* CronJob Details */}
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
                <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.95rem' }}>
                  {cronjob.schedule}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={cronjob.suspend ? 'Suspended' : 'Active'}
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
                <Typography variant="body1" fontWeight="medium">
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

        {/* Execution History */}
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
                <Typography variant="body1">
                  {cronjob.lastSchedule || 'Never'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Last Successful Time
                </Typography>
                <Typography variant="body1">
                  {cronjob.lastSuccessfulTime || 'Never'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

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
