'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Link from 'next/link'
import { GlassButton } from '@/lib/ui'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { usePod, usePodLogs } from '@/lib/hooks/use-pods'
import { useRestartPod } from '@/lib/hooks/use-restart-pod'
import { StatusBadge } from '@/app/components/common/status-badge'
import { LogsViewer } from '@/app/components/pods/logs-viewer'
import { RestartPodDialog } from '@/app/components/pods/restart-pod-dialog'
import { HealthCheckSection } from '@/app/components/pods/health-check-section'
import { ContainerRestartHistory } from '@/app/components/pods/container-restart-history'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { GlassPanel } from '@/lib/ui'
import { useTheme } from '@/lib/ui'

export default function PodDetailPage() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const params = useParams()
  const name = params.name as string

  const { data: pod, isLoading, error, refetch } = usePod(name)

  // Auto-refresh
  useAutoRefresh(refetch)

  const [selectedContainer, setSelectedContainer] = useState('')
  const [logLines, setLogLines] = useState(100)
  const [restartDialogOpen, setRestartDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  const restartMutation = useRestartPod(name)

  // Set default container when pod loads
  if (pod && !selectedContainer && pod.containers.length > 0) {
    setSelectedContainer(pod.containers[0].name)
  }

  const {
    data: logsData,
    isLoading: logsLoading,
    error: logsError,
    refetch: refetchLogs,
  } = usePodLogs(name, selectedContainer, logLines)

  const logs = logsData?.logs || ''
  const parsedLogs = logsData?.parsed

  const handleRestartClick = () => {
    setRestartDialogOpen(true)
  }

  const handleRestartConfirm = () => {
    restartMutation.mutate(undefined, {
      onSuccess: (data) => {
        setRestartDialogOpen(false)
        setSnackbarMessage(data.message)
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
      },
      onError: (error) => {
        setRestartDialogOpen(false)
        setSnackbarMessage(error.error || 'Failed to restart pod')
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
      },
    })
  }

  const handleRestartCancel = () => {
    setRestartDialogOpen(false)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !pod) {
    return (
      <Box sx={{ px: 2 }}>
        <PageHeader
          title="Pod Details"
          breadcrumbs={[
            { label: 'Pods', href: '/pods' },
            { label: name },
          ]}
        />
        <ErrorState
          error={error || new Error('Pod not found')}
          onRetry={() => refetch()}
          title="Failed to Load Pod"
        />
      </Box>
    )
  }

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {pod.name}
            <StatusBadge status={pod.status} size="medium" />
          </Box>
        }
        metadata={[
          `Age: ${pod.age}`,
        ]}
        breadcrumbs={[
          { label: 'Pods', href: '/pods' },
          { label: pod.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
        actions={
          <GlassButton
            startIcon={<RestartAltIcon />}
            onClick={handleRestartClick}
            sx={{
              color: (theme) => theme.palette.warning.main,
              borderColor: (theme) => theme.palette.warning.main,
            }}
          >
            Restart Pod
          </GlassButton>
        }
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Details
          </Typography>
          <GlassPanel sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '110px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  Container:
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  {pod.containers.length > 0 ? pod.containers[0].name : 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  Node:
                </Typography>
                <Link
                  href={`/nodes/${encodeURIComponent(pod.nodeName)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: 'primary.main',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                      cursor: 'pointer',
                    }}
                  >
                    {pod.nodeName}
                  </Typography>
                </Link>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  IP Address:
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  {pod.ip}
                </Typography>
              </Box>
            </Box>
          </GlassPanel>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Containers
          </Typography>
          <GlassPanel sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px' }}>
            <Table size="small" sx={{ height: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell align="center">Ready</TableCell>
                    <TableCell align="center">Restarts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pod.containers.map((container) => (
                    <TableRow key={container.name} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                          {container.image}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {container.ready ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <ErrorIcon color="error" fontSize="small" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {container.restartCount > 0 ? (
                          <StatusBadge
                            label={container.restartCount.toString()}
                            size="small"
                            color={container.restartCount > 5 ? 'error' : 'warning'}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            0
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </GlassPanel>
        </Grid>
      </Grid>

      {/* Labels Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Labels
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {Object.entries(pod.labels).map(([key, value]) => (
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
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                {value}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Resources Section */}
      {(pod.configMaps.length > 0 || pod.secrets.length > 0) && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Resources
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {pod.configMaps.map((cm) => (
            <Link
              key={cm}
              href={`/configmaps/${encodeURIComponent(cm)}`}
              style={{ textDecoration: 'none' }}
            >
              <Paper
                elevation={isGlass ? 0 : 1}
                sx={{
                  p: 2.5,
                  minWidth: 200,
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
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
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    ...(isGlass && {
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(59, 130, 246, 0.5)'
                          : 'rgba(59, 130, 246, 0.4)',
                    }),
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="info.main" fontWeight={600}>
                    ConfigMap
                  </Typography>
                  <OpenInNewIcon fontSize="small" sx={{ color: 'info.main', opacity: 0.6 }} />
                </Box>
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                  {cm}
                </Typography>
              </Paper>
            </Link>
          ))}
          {pod.secrets.map((secret) => (
            <Link
              key={secret}
              href={`/secrets/${encodeURIComponent(secret)}`}
              style={{ textDecoration: 'none' }}
            >
              <Paper
                elevation={isGlass ? 0 : 1}
                sx={{
                  p: 2.5,
                  minWidth: 200,
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
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
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    ...(isGlass && {
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(234, 179, 8, 0.5)'
                          : 'rgba(234, 179, 8, 0.4)',
                    }),
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="warning.main" fontWeight={600}>
                    Secret
                  </Typography>
                  <OpenInNewIcon fontSize="small" sx={{ color: 'warning.main', opacity: 0.6 }} />
                </Box>
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                  {secret}
                </Typography>
              </Paper>
            </Link>
          ))}
          </Box>
        </Box>
      )}

      {/* Health Checks Section */}
      <Box sx={{ mb: 3 }}>
        <HealthCheckSection containers={pod.containers} />
      </Box>

      {/* Container Status/Restart History */}
      <Box sx={{ mb: 3 }}>
        <ContainerRestartHistory containerStatuses={pod.containerStatuses} />
      </Box>

      {/* Container Logs Section */}
      {pod.containers.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Container Logs
            </Typography>
            {pod.containers.length > 1 && (
              <FormControl
                size="small"
                sx={{
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
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
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              >
                <InputLabel>Select Container</InputLabel>
                <Select
                  value={selectedContainer}
                  label="Select Container"
                  onChange={(e) => setSelectedContainer(e.target.value)}
                >
                  {pod.containers.map((container) => (
                    <MenuItem key={container.name} value={container.name}>
                      {container.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          <LogsViewer
            logs={logs}
            parsed={parsedLogs}
            isLoading={logsLoading}
            error={logsError}
            containerName={selectedContainer}
            onRefresh={() => refetchLogs()}
            logLines={logLines}
            onLogLinesChange={setLogLines}
          />
        </Box>
      )}

      {/* Restart confirmation dialog */}
      <RestartPodDialog
        open={restartDialogOpen}
        podName={name}
        isLoading={restartMutation.isPending}
        onConfirm={handleRestartConfirm}
        onCancel={handleRestartCancel}
      />

      {/* Success/Error snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
