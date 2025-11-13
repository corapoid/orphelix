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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams, useRouter } from 'next/navigation'
import { useNode, useNodePods } from '@/lib/hooks/use-nodes'
import { StatusBadge } from '@/app/components/common/status-badge'
import { formatAge } from '@/lib/core/utils'
import type { Pod } from '@/types/kubernetes'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'

// Helper function to parse Kubernetes resource quantities
function parseQuantity(value: string): number {
  const units: Record<string, number> = {
    'Ki': 1024,
    'Mi': 1024 * 1024,
    'Gi': 1024 * 1024 * 1024,
    'Ti': 1024 * 1024 * 1024 * 1024,
    'k': 1000,
    'M': 1000 * 1000,
    'G': 1000 * 1000 * 1000,
    'T': 1000 * 1000 * 1000 * 1000,
    'm': 0.001, // milli (for CPU)
  }

  const match = value.match(/^(\d+(?:\.\d+)?)(.*?)$/)
  if (!match) return 0

  const num = parseFloat(match[1])
  const unit = match[2]

  return unit ? num * (units[unit] || 1) : num
}

// Calculate percentage used
function calculatePercentage(allocatable: string, capacity: string): number {
  const allocNum = parseQuantity(allocatable)
  const capNum = parseQuantity(capacity)
  if (capNum === 0) return 0
  return Math.round((allocNum / capNum) * 100)
}

export default function NodeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const name = params.name as string

  const { data: node, isLoading, error, refetch } = useNode(name)
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
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  CPU:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {node.allocatable.cpu} / {node.capacity.cpu} ({calculatePercentage(node.allocatable.cpu, node.capacity.cpu)}%)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Memory:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {node.allocatable.memory} / {node.capacity.memory} ({calculatePercentage(node.allocatable.memory, node.capacity.memory)}%)
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
    </Box>
  )
}
