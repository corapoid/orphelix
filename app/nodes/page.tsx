'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useNodes } from '@/lib/hooks/use-nodes'
import { usePods } from '@/lib/hooks/use-pods'
import { useModeStore } from '@/lib/store'
import { StatusBadge } from '@/components/common/status-badge'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { ErrorState } from '@/components/common/error-state'
import { SortableTableCell } from '@/components/common/sortable-table-cell'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import type { Node } from '@/types/kubernetes'

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

export default function NodesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const selectedNamespace = useModeStore((state) => state.selectedNamespace)

  const { data: nodes, isLoading, error, refetch } = useNodes()
  const { data: pods } = usePods()

  // Get unique node names from pods in selected namespace
  const nodesWithPods = useMemo(() => {
    if (!pods || !selectedNamespace) return new Set<string>()
    return new Set(pods.map(pod => pod.nodeName).filter(Boolean))
  }, [pods, selectedNamespace])

  // Filter nodes by:
  // 1. Search query
  // 2. Only show nodes with pods in selected namespace (if namespace is set)
  const filteredNodes = useMemo(() => {
    if (!nodes) return []

    let filtered = nodes

    // Filter by namespace (only show nodes with pods in selected namespace)
    if (selectedNamespace && nodesWithPods.size > 0) {
      filtered = filtered.filter(node => nodesWithPods.has(node.name))
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((node) =>
        node.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [nodes, selectedNamespace, nodesWithPods, searchQuery])

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Node>(
    filteredNodes,
    'name',
    'asc'
  )

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Nodes
        </Typography>
        <TableSkeleton rows={5} columns={6} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Nodes
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Nodes" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4">Nodes</Typography>
          {selectedNamespace && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Showing nodes with pods in namespace: <strong>{selectedNamespace}</strong>
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 250 }}
          />
        </Box>
      </Box>

      {filteredNodes && filteredNodes.length === 0 ? (
        <Alert severity="info">
          {searchQuery
            ? `No nodes match your search "${searchQuery}"`
            : 'No nodes found'}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <SortableTableCell
                  field="name"
                  label="Name"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="status"
                  label="Status"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="version"
                  label="Version"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableCell>CPU</TableCell>
                <TableCell>Memory</TableCell>
                <TableCell>Pods</TableCell>
                <SortableTableCell
                  field="age"
                  label="Age"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((node) => (
                <TableRow
                  key={node.name}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/nodes/${node.name}`)}
                >
                  <TableCell>{node.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={node.status} />
                  </TableCell>
                  <TableCell>{node.version}</TableCell>
                  <TableCell>
                    {node.allocatable.cpu} / {node.capacity.cpu} ({calculatePercentage(node.allocatable.cpu, node.capacity.cpu)}%)
                  </TableCell>
                  <TableCell>
                    {node.allocatable.memory} / {node.capacity.memory} ({calculatePercentage(node.allocatable.memory, node.capacity.memory)}%)
                  </TableCell>
                  <TableCell>
                    {node.allocatable.pods} / {node.capacity.pods}
                  </TableCell>
                  <TableCell>{node.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
