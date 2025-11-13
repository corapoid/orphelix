'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DnsIcon from '@mui/icons-material/Dns'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useNodes } from '@/lib/hooks/use-nodes'
import { usePods } from '@/lib/hooks/use-pods'
import { useModeStore } from '@/lib/core/store'
import { StatusBadge } from '@/app/components/common/status-badge'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import { PageHeader } from '@/app/components/common/page-header'
import { EmptyState } from '@/app/components/common/empty-state'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
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

  // Auto-refresh
  useAutoRefresh(refetch)

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
        <PageHeader
          title="Nodes"
          onRefresh={refetch}
          isRefreshing={isLoading}
        />
        <TableSkeleton rows={5} columns={6} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader
          title="Nodes"
          onRefresh={refetch}
          isRefreshing={isLoading}
        />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Nodes" />
      </Box>
    )
  }

  const subtitle = selectedNamespace
    ? `Showing nodes with pods in namespace: ${selectedNamespace}`
    : `${nodes?.length || 0} node${nodes?.length === 1 ? '' : 's'} in this cluster`

  return (
    <Box>
      <PageHeader
        title="Nodes"
        subtitle={subtitle}
        onRefresh={refetch}
        isRefreshing={isLoading}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search nodes..."
      />

      {!nodes || nodes.length === 0 ? (
        <EmptyState
          icon={DnsIcon}
          title="No nodes found"
          description="There are no nodes in this cluster yet."
        />
      ) : filteredNodes.length === 0 ? (
        <EmptyState
          icon={DnsIcon}
          title="No matching nodes"
          description={`No nodes match your search "${searchQuery}".`}
          action={{
            label: 'Clear search',
            onClick: () => setSearchQuery(''),
          }}
        />
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
