'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { useParams, useRouter } from 'next/navigation'
import { useNode, useNodeEvents, useNodePods } from '@/lib/hooks/use-nodes'
import { StatusBadge } from '@/components/common/status-badge'
import { formatAge } from '@/lib/utils'
import type { Pod } from '@/types/kubernetes'
import { DetailSkeleton } from '@/components/common/detail-skeleton'
import { ErrorState } from '@/components/common/error-state'

export default function NodeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const name = params.name as string

  const { data: node, isLoading, error, refetch } = useNode(name)
  const { data: events, isLoading: eventsLoading } = useNodeEvents(name)
  const { data: pods, isLoading: podsLoading } = useNodePods(name)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !node) {
    return (
      <Box>
        <Box p={3}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/nodes')}
            sx={{ mb: 2 }}
          >
            Back to Nodes
          </Button>
        </Box>
        <ErrorState
          error={error || new Error('Node not found')}
          onRetry={() => refetch()}
          title="Failed to Load Node"
        />
      </Box>
    )
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/nodes')}
        sx={{ mb: 2 }}
      >
        Back to Nodes
      </Button>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h4">{node.name}</Typography>
          <StatusBadge status={node.status} size="medium" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Version: {node.version} • Age: {formatAge(node.age)}
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
                  Roles:
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {node.roles.map((role) => (
                    <Chip key={role} label={role} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  CPU:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {node.allocatable.cpu} / {node.capacity.cpu}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Memory:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {node.allocatable.memory} / {node.capacity.memory}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Pods:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {node.allocatable.pods} / {node.capacity.pods}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Conditions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {node.conditions.map((condition, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {condition.status === 'True' ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <ErrorIcon color="error" fontSize="small" />
                  )}
                  <Typography variant="body2">{condition.type}</Typography>
                  {condition.reason && (
                    <Chip label={condition.reason} size="small" variant="outlined" />
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Pods ({pods?.length || 0})
        </Typography>
        {podsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : pods && pods.length > 0 ? (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Namespace</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Restarts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pods.map((pod: Pod) => (
                  <TableRow key={pod.name} hover>
                    <TableCell>{pod.name}</TableCell>
                    <TableCell>{pod.namespace}</TableCell>
                    <TableCell>
                      <StatusBadge status={pod.status} size="small" />
                    </TableCell>
                    <TableCell>{pod.restartCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No pods running on this node</Alert>
        )}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Events
        </Typography>
        {eventsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : events && events.length > 0 ? (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Chip
                        label={event.type}
                        color={event.type === 'Warning' ? 'warning' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{event.reason}</TableCell>
                    <TableCell sx={{ maxWidth: 400 }}>{event.message}</TableCell>
                    <TableCell>{event.count}</TableCell>
                    <TableCell>{formatAge(event.lastTimestamp)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">No events found for this node</Alert>
        )}
      </Paper>
    </Box>
  )
}
