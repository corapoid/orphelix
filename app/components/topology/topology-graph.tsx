'use client'

import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type OnNodesChange,
  type OnEdgesChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/navigation'
import { TopologyNode } from './topology-node'
import type { TopologyGraphData } from '@/types/topology'

interface TopologyGraphProps {
  data: TopologyGraphData
  height?: number | string
}

const nodeTypes = {
  default: TopologyNode,
}

export function TopologyGraph({ data, height = 600 }: TopologyGraphProps) {
  const router = useRouter()
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges)

  // Update nodes and edges when data changes
  useMemo(() => {
    setNodes(data.nodes)
    setEdges(data.edges)
  }, [data, setNodes, setEdges])

  // Handle node click - navigate to resource detail page
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: { id: string; data: { resourceType: string; label: string } }) => {
      const { resourceType, label } = node.data

      // Navigate based on resource type
      switch (resourceType) {
        case 'Deployment':
          router.push(`/deployments/${encodeURIComponent(label)}`)
          break
        case 'Pod':
          router.push(`/pods/${encodeURIComponent(label)}`)
          break
        case 'ConfigMap':
          router.push(`/configmaps/${encodeURIComponent(label)}`)
          break
        case 'Secret':
          router.push(`/secrets/${encodeURIComponent(label)}`)
          break
        default:
          break
      }
    },
    [router]
  )

  return (
    <Paper sx={{ height, position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange as OnNodesChange}
        onEdgesChange={onEdgesChange as OnEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes as any}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.2}
        maxZoom={2}
      >
        <Background />
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          style={{
            backgroundColor: '#f5f5f5',
          }}
        />
      </ReactFlow>
    </Paper>
  )
}
