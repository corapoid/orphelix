'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useParams, useRouter } from 'next/navigation'
import { useJob } from '@/lib/hooks/use-jobs'
import { usePods } from '@/lib/hooks/use-pods'
import { useBuildPath } from '@/lib/hooks/use-navigate-to'
import { StatusBadge } from '@/app/components/common/status-badge'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@orphelix/ui'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'

export default function JobDetailPage() {
  const params = useParams()
  const name = params.name as string
  const router = useRouter()
  const buildPath = useBuildPath()

  const { data: job, isLoading, error, refetch } = useJob(name)
  const { data: allPods } = usePods()
  // const [docsOpen, setDocsOpen] = useState(true)

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

      <Box sx={{ maxWidth: '50%' }}>
        {/* Main Content */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
          {/* Details */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Details
            </Typography>
            <GlassPanel>
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
            </GlassPanel>
          </Box>

          {/* Execution Statistics */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Execution Statistics
            </Typography>
            <GlassPanel>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Succeeded:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {job.succeeded}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Failed:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {job.failed}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Active:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {job.active}
                  </Typography>
                </Box>
              </Box>
            </GlassPanel>
          </Box>
        </Box>

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
                    {jobPods.map((pod) => {
                      const podPath = buildPath(`/pods/${pod.name}`)
                      return (
                      <TableRow
                        key={pod.name}
                        hover
                        onClick={() => router.push(podPath as any)}
                        sx={{
                          cursor: 'pointer',
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
                      )
                    })}
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
            <GlassPanel sx={{ p: 0, overflow: 'hidden' }}>
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
                          <StatusBadge
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
            </GlassPanel>
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
      {/* Documentation content preserved for future use:
        Right Sidebar - Documentation
        About Jobs
        A Job creates one or more Pods and will continue to retry execution of the Pods until a specified number of them successfully terminate.
        Running an example Job: computes π to 2000 places
        Key Concepts: Completions, Parallelism, Backoff Limit, TTL After Finished
        Learn more: https://kubernetes.io/docs/concepts/workloads/controllers/job/
      */}
    </Box>
  )
}
