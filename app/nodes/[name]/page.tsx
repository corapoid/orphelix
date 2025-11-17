'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useNode, useNodePods } from '@/lib/hooks/use-nodes'
import { StatusBadge } from '@/app/components/common/status-badge'
import { formatAge } from '@/lib/core/utils'
import type { Pod } from '@/types/kubernetes'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import Link from 'next/link'

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
  const [docsOpen, setDocsOpen] = useState(true)

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
          `Age: ${formatAge(node.age)}`,
        ]}
        breadcrumbs={[
          { label: 'Nodes', href: '/nodes' },
          { label: node.name },
        ]}
        onRefresh={refetch}
        isRefreshing={isLoading}
        headerActions={
          <IconButton
            onClick={() => setDocsOpen(!docsOpen)}
            size="medium"
            title={docsOpen ? "Hide documentation" : "Show documentation"}
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <InfoOutlinedIcon />
          </IconButton>
        }
      />

      <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12 }}>
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
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Pods ({pods?.length || 0})
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
          </Paper>
        </Box>

        {/* Right Sidebar - Documentation */}
        <Box
          sx={{
            width: 520,
            flexShrink: 0,
            mt: -12,
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
            maxHeight: '100vh',
          }}
        >
          <GlassPanel
            open={docsOpen}
            closeable
            onClose={() => setDocsOpen(false)}
            animationType="fade"
            sx={{ p: 3, overflow: 'auto', maxHeight: '100vh' }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                About Nodes
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              Nodes are the worker machines in Kubernetes. A node may be a VM or physical machine, depending on the cluster. Each node contains the services necessary to run Pods and is managed by the control plane. The services on a node include the container runtime, kubelet, and kube-proxy.
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Node Components
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  <strong>kubelet:</strong> An agent that runs on each node and ensures containers are running in a Pod.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>kube-proxy:</strong> Maintains network rules on nodes for Pod networking.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>Container Runtime:</strong> Software responsible for running containers (e.g., containerd, CRI-O).
                </Typography>
              </li>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Node Status Conditions
            </Typography>

            <Box component="ul" sx={{ pl: 2, mb: 2, '& li': { mb: 1.5, lineHeight: 1.7 } }}>
              <li>
                <Typography variant="caption">
                  <strong>Ready:</strong> Node is healthy and ready to accept Pods.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>MemoryPressure:</strong> Node memory is low.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>DiskPressure:</strong> Node disk capacity is low.
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  <strong>NetworkUnavailable:</strong> Node network is not correctly configured.
                </Typography>
              </li>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
              Node Capacity vs Allocatable
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Capacity:</strong> Total resources available on the node.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Allocatable:</strong> Resources available for Pods (Capacity minus system reserved resources).
            </Typography>

            <Box sx={{
              mt: 3,
              pt: 2,
              borderTop: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
            }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                }}
              >
                Learn more in the{' '}
                <Link
                  href="https://kubernetes.io/docs/concepts/architecture/nodes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    official Kubernetes docs
                  </Typography>
                  <Box component="span" sx={{ fontSize: '0.65rem' }}>↗</Box>
                </Link>
              </Typography>
            </Box>
          </GlassPanel>
        </Box>
      </Box>
    </Box>
  )
}
