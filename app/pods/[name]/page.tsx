'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePod, usePodEvents, usePodLogs } from '@/lib/hooks/use-pods'
import { useRestartPod } from '@/lib/hooks/use-restart-pod'
import { StatusBadge } from '@/components/common/status-badge'
import { LogsViewer } from '@/app/components/pods/logs-viewer'
import { formatAge } from '@/lib/utils'
import { RestartPodDialog } from '@/app/components/pods/restart-pod-dialog'
import { DetailSkeleton } from '@/components/common/detail-skeleton'
import { ErrorState } from '@/components/common/error-state'

export default function PodDetailPage() {
  const params = useParams()
  const router = useRouter()
  const name = params.name as string

  const { data: pod, isLoading, error, refetch } = usePod(name)
  const { data: events, isLoading: eventsLoading } = usePodEvents(name)

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
        <Box p={3}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/pods')}
            sx={{ mb: 2 }}
          >
            Back to Pods
          </Button>
        </Box>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.push('/pods')}>
          Back to Pods
        </Button>
        <Button
          variant="outlined"
          color="warning"
          startIcon={<RestartAltIcon />}
          onClick={handleRestartClick}
        >
          Restart Pod
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h4">{pod.name}</Typography>
          <StatusBadge status={pod.status} size="medium" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Namespace: {pod.namespace} • Node: {pod.nodeName} • Age: {formatAge(pod.age)}
        </Typography>
      </Box>

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
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              ConfigMaps
            </Typography>
            {pod.configMaps.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {pod.configMaps.map((cm) => (
                  <Chip
                    key={cm}
                    label={cm}
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => router.push(`/configmaps/${encodeURIComponent(cm)}`)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No ConfigMaps
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Secrets
            </Typography>
            {pod.secrets.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {pod.secrets.map((secret) => (
                  <Chip
                    key={secret}
                    label={secret}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => router.push(`/secrets/${encodeURIComponent(secret)}`)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No Secrets
              </Typography>
            )}
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
        <Box sx={{ mb: 3 }}>
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
      )}

      <Paper>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Events</Typography>
        </Box>
        {eventsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : events && events.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={100}>Type</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell width={80} align="center">
                    Count
                  </TableCell>
                  <TableCell width={100}>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Chip
                        label={event.type}
                        size="small"
                        color={event.type === 'Warning' ? 'warning' : 'success'}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {event.reason}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{event.message}</Typography>
                    </TableCell>
                    <TableCell align="center">{event.count}</TableCell>
                    <TableCell>{formatAge(event.lastTimestamp)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 2 }}>
            <Alert severity="info">No events found for this pod</Alert>
          </Box>
        )}
      </Paper>

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
