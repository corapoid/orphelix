'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import DnsIcon from '@mui/icons-material/Dns'
import { useNodes } from '@/lib/hooks/use-nodes'
import { usePods } from '@/lib/hooks/use-pods'
import { useModeStore } from '@/lib/core/store'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceListView } from '@/app/components/common/resource-list-view'
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
  const navigateTo = useNavigateTo()
  const searchParams = useSearchParams()
  const selectedNamespace = useModeStore((state) => state.selectedNamespace)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const { data: nodes, isLoading, error, refetch } = useNodes()
  const { data: pods } = usePods()

  // Set filter from URL on mount
  useEffect(() => {
    const status = searchParams.get('status')
    if (status && (status === 'Ready' || status === 'NotReady')) {
      setStatusFilter(status)
    }
  }, [searchParams])

  // Get unique node names from pods in selected namespace
  const nodesWithPods = useMemo(() => {
    if (!pods || !selectedNamespace) return new Set<string>()
    return new Set(pods.map(pod => pod.nodeName).filter(Boolean))
  }, [pods, selectedNamespace])

  // Custom filter combining namespace and status
  const customFilter = (node: Node) => {
    // Filter by namespace (only show nodes with pods in selected namespace)
    if (selectedNamespace && nodesWithPods.size > 0) {
      if (!nodesWithPods.has(node.name)) {
        return false
      }
    }

    // Filter by status
    if (statusFilter !== 'all' && node.status !== statusFilter) {
      return false
    }

    return true
  }

  return (
    <ResourceListView<Node>
      title="Nodes"
      resourceName="node"
      resourceNamePlural="nodes"
      icon={DnsIcon}
      data={nodes}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search nodes..."
      searchFilter={(node, query) =>
        node.name.toLowerCase().includes(query.toLowerCase())
      }
      filters={[
        {
          label: 'Status',
          value: statusFilter,
          options: [
            { label: 'All', value: 'all' },
            { label: 'Ready', value: 'Ready' },
            { label: 'Not Ready', value: 'NotReady' },
          ],
          onChange: setStatusFilter,
        },
      ]}
      customFilter={customFilter}
      columns={[
        {
          field: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          field: 'status',
          label: 'Status',
          sortable: true,
          render: (node) => <StatusBadge status={node.status} />,
        },
        {
          field: 'version',
          label: 'Version',
          sortable: true,
        },
        {
          field: 'cpu',
          label: 'CPU',
          render: (node) => (
            <>
              {node.allocatable.cpu} / {node.capacity.cpu} ({calculatePercentage(node.allocatable.cpu, node.capacity.cpu)}%)
            </>
          ),
        },
        {
          field: 'memory',
          label: 'Memory',
          render: (node) => (
            <>
              {node.allocatable.memory} / {node.capacity.memory} ({calculatePercentage(node.allocatable.memory, node.capacity.memory)}%)
            </>
          ),
        },
        {
          field: 'pods',
          label: 'Pods',
          render: (node) => (
            <>
              {node.allocatable.pods} / {node.capacity.pods}
            </>
          ),
        },
        {
          field: 'age',
          label: 'Age',
          sortable: true,
        },
      ]}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(node) => node.name}
      onRowClick={(node) => navigateTo(`/nodes/${node.name}`)}
      emptyStateDescription={
        selectedNamespace
          ? `No nodes have pods in namespace: ${selectedNamespace}`
          : 'There are no nodes in this cluster yet.'
      }
    />
  )
}
