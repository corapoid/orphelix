'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
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
import { LiquidGlassButton } from '@/app/components/common/liquid-glass-button'
import { LiquidGlassChip } from '@/app/components/common/liquid-glass-chip'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { usePod, usePodLogs } from '@/lib/hooks/use-pods'
import { useRestartPod } from '@/lib/hooks/use-restart-pod'
import { StatusBadge } from '@/app/components/common/status-badge'
import { LogsViewer } from '@/app/components/pods/logs-viewer'
import { RestartPodDialog } from '@/app/components/pods/restart-pod-dialog'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'

export default function PodDetailPage() {
  const params = useParams()
  const name = params.name as string

  const { data: pod, isLoading, error, refetch } = usePod(name)

  // Auto-refresh
  useAutoRefresh(refetch)

  const [selectedContainer, setSelectedContainer] = useState('')
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
  } = usePodLogs(name, selectedContainer, 100)

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
      <Box>
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
    <Box>
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
          <LiquidGlassButton
            startIcon={<RestartAltIcon />}
            onClick={handleRestartClick}
            sx={{
              color: (theme) => theme.palette.warning.main,
              borderColor: (theme) => theme.palette.warning.main,
            }}
          >
            Restart Pod
          </LiquidGlassButton>
        }
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Details
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Container:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {pod.containers.length > 0 ? pod.containers[0].name : 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Node:
                </Typography>
                <Link
                  href={`/nodes/${encodeURIComponent(pod.nodeName)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    sx={{
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
                <Typography variant="body2" color="text.secondary">
                  IP Address:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {pod.ip}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Containers
          </Typography>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
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
                          <LiquidGlassChip
                            label={container.restartCount}
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
            </TableContainer>
          </Paper>
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
                elevation={0}
                sx={{
                  p: 2.5,
                  minWidth: 200,
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
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(59, 130, 246, 0.5)'
                        : 'rgba(59, 130, 246, 0.4)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="info.main" fontWeight={600}>
                    ConfigMap
                  </Typography>
                  <OpenInNewIcon fontSize="small" sx={{ color: 'info.main', opacity: 0.6 }} />
                </Box>
                <Typography variant="body1" fontWeight={500}>
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
                elevation={0}
                sx={{
                  p: 2.5,
                  minWidth: 200,
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
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(234, 179, 8, 0.5)'
                        : 'rgba(234, 179, 8, 0.4)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="warning.main" fontWeight={600}>
                    Secret
                  </Typography>
                  <OpenInNewIcon fontSize="small" sx={{ color: 'warning.main', opacity: 0.6 }} />
                </Box>
                <Typography variant="body1" fontWeight={500}>
                  {secret}
                </Typography>
              </Paper>
            </Link>
          ))}
          </Box>
        </Box>
      )}

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
