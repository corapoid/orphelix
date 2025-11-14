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
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Link from 'next/link'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  const router = useRouter()
  const name = params.name as string

  const { data: pod, isLoading, error, refetch } = usePod(name)

  // Auto-refresh
  useAutoRefresh(refetch)

  const [selectedContainer, setSelectedContainer] = useState('')
  const [restartDialogOpen, setRestartDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [logsExpanded, setLogsExpanded] = useState(false)

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
          `Namespace: ${pod.namespace}`,
          <Typography key="node" variant="body2" color="text.secondary">
            Node: <Link
              href={`/nodes/${encodeURIComponent(pod.nodeName)}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                component="span"
                variant="body2"
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
          </Typography>,
          `Age: ${pod.age}`,
        ]}
        breadcrumbs={[
          { label: 'Pods', href: '/pods' },
          { label: pod.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
        actions={
          <Button
            variant="outlined"
            color="warning"
            startIcon={<RestartAltIcon />}
            onClick={handleRestartClick}
          >
            Restart Pod
          </Button>
        }
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  IP Address:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {pod.ip}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Restart Count:
                </Typography>
                <Chip
                  label={pod.restartCount}
                  size="small"
                  color={pod.restartCount > 5 ? 'error' : pod.restartCount > 0 ? 'warning' : 'success'}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Containers:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {pod.containers.length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Labels
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(pod.labels).map(([key, value]) => (
                <Chip key={key} label={`${key}: ${value}`} size="small" variant="outlined" />
              ))}
            </Box>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {pod.configMaps.length > 0 ? (
                pod.configMaps.map((cm) => (
                  <Chip
                    key={cm}
                    label={`ConfigMap: ${cm}`}
                    size="small"
                    color="info"
                    clickable
                    onClick={() => router.push(`/configmaps/${encodeURIComponent(cm)}`)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No ConfigMaps
                </Typography>
              )}
              {pod.secrets.length > 0 ? (
                pod.secrets.map((secret) => (
                  <Chip
                    key={secret}
                    label={`Secret: ${secret}`}
                    size="small"
                    color="warning"
                    clickable
                    onClick={() => router.push(`/secrets/${encodeURIComponent(secret)}`)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))
              ) : pod.configMaps.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No Secrets
                </Typography>
              ) : null}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Containers</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="center">Ready</TableCell>
                <TableCell align="center">Restarts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pod.containers.map((container) => (
                <TableRow key={container.name} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {container.name}
                    </Typography>
                  </TableCell>
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
                      <Chip
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

      {pod.containers.length > 0 && (
        <Paper sx={{ mb: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              p: 2,
              borderBottom: logsExpanded ? 1 : 0,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
            onClick={() => setLogsExpanded(!logsExpanded)}
          >
            <Typography variant="h6">Container Logs</Typography>
            <IconButton
              size="small"
              disableRipple
              sx={{
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              {logsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={logsExpanded}>
            <Box sx={{ p: 2 }}>
              {pod.containers.length > 1 && (
                <Box sx={{ mb: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 200 }}>
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
                </Box>
              )}
              <LogsViewer
                logs={logs}
                parsed={parsedLogs}
                isLoading={logsLoading}
                error={logsError}
                containerName={selectedContainer}
                onRefresh={() => refetchLogs()}
              />
            </Box>
          </Collapse>
        </Paper>
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
