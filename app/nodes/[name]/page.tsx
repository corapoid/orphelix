'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useParams } from 'next/navigation'
import { useNode, useNodePods } from '@/lib/hooks/use-nodes'
import { StatusBadge } from '@/app/components/common/status-badge'
import type { Pod } from '@/types/kubernetes'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'

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
  const name = params.name as string

  const { data: node, isLoading, error, refetch } = useNode(name)
  const { data: pods, isLoading: podsLoading } = useNodePods(name)
  // const [docsOpen, setDocsOpen] = useState(true)

  // Auto-refresh
  useAutoRefresh(refetch)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error || !node) {
    return (
      <Box>
        <PageHeader
          title="Node Details"
          breadcrumbs={[
            { label: 'Nodes', href: '/nodes' },
            { label: name },
          ]}
        />
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
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {node.name}
            <StatusBadge status={node.status} size="medium" />
          </Box>
        }
        metadata={[
          `Version: ${node.version}`,
          `Age: ${node.age}`,
        ]}
        breadcrumbs={[
          { label: 'Nodes', href: '/nodes' },
          { label: node.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Box sx={{ maxWidth: '50%' }}>
        {/* Main Content */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Resources
            </Typography>
            <GlassPanel>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            </GlassPanel>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Pods ({pods?.length || 0})
          </Typography>
          <GlassPanel sx={{ p: 0, overflow: 'hidden' }}>
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
              <Box sx={{ p: 3 }}>
                <Alert severity="info">No pods running on this node</Alert>
              </Box>
            )}
          </GlassPanel>
      </Box>
      {/* Documentation content preserved for future use:
        Right Sidebar - Documentation
        About Nodes
        Nodes are the worker machines in Kubernetes. A node may be a VM or physical machine.
        Node Components: kubelet, kube-proxy, Container Runtime
        Node Status Conditions: Ready, MemoryPressure, DiskPressure, NetworkUnavailable
        Node Capacity vs Allocatable
        Learn more: https://kubernetes.io/docs/concepts/architecture/nodes/
      */}
    </Box>
  )
}
