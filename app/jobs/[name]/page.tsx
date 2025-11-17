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
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
        <Grid size={{ xs: 12, md: 9 }}>
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
            <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.8 }}>
              A Job creates one or more Pods and will continue to retry execution of the Pods until a specified number of them successfully terminate.
              As pods successfully complete, the Job tracks the successful completions. When a specified number of successful completions is reached,
              the task (ie, Job) is complete. Deleting a Job will clean up the Pods it created. Suspending a Job will delete its active Pods until
              the Job is resumed again.
            </Typography>

            <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.8 }}>
              A simple case is to create one Job object in order to reliably run one Pod to completion. The Job object will start a new Pod if
              the first Pod fails or is deleted (for example due to a node hardware failure or a node reboot). You can also use a Job to run
              multiple Pods in parallel.
            </Typography>

            <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 600, fontSize: '1.05rem' }}>
              Running an example Job
            </Typography>

            <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.8 }}>
              Here is an example Job config that computes π to 2000 places and prints it out. It takes around 10s to complete:
            </Typography>

            <Box
              component="pre"
              sx={{
                p: 2,
                mb: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.3)'
                    : 'rgba(0, 0, 0, 0.05)',
                borderRadius: 2,
                overflow: 'auto',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                fontFamily: 'monospace',
              }}
            >
{`apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl:5.34.0
        command: ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4`}
            </Box>

            <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 600, fontSize: '1.05rem' }}>
              Key Concepts
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, mb: 3, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li>
                <Typography variant="body2">
                  <strong>Completions:</strong> Specifies the desired number of successfully finished pods the job should be run with.
                  Setting to null means that the success of any pod signals the success of all pods.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Parallelism:</strong> Specifies the maximum desired number of pods the job should run at any given time.
                  The actual number of pods running in steady state will be less than this number when work is left to do.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Backoff Limit:</strong> Specifies the number of retries before marking this job failed. Defaults to 6.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Active Deadline Seconds:</strong> Specifies the duration in seconds relative to the startTime that the job may be active
                  before the system tries to terminate it.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>TTL After Finished:</strong> Limits the lifetime of a Job that has finished execution (either Complete or Failed).
                  After TTL seconds, the Job is eligible to be automatically deleted.
                </Typography>
              </li>
            </Box>

            <Box sx={{
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
            }}>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'text.secondary',
                }}
              >
                Learn more in the{' '}
                <Link
                  href="https://kubernetes.io/docs/concepts/workloads/controllers/job/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    official Kubernetes documentation
                  </Typography>
                  <Box component="span" sx={{ fontSize: '0.75rem' }}>↗</Box>
                </Link>
              </Typography>
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
