'use client'

import { useCallback, useMemo, useState, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Panel,
  type OnNodesChange,
  type OnEdgesChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
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

function TopologyGraphInner({ data, height = 600 }: TopologyGraphProps) {
  const router = useRouter()
  const reactFlowRef = useRef<HTMLDivElement>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges)

  // Update nodes and edges when data changes
  useMemo(() => {
    setNodes(data.nodes)
    setEdges(data.edges)
  }, [data, setNodes, setEdges])

  // Get connected node IDs for a given node
  const getConnectedNodeIds = useCallback((nodeId: string): Set<string> => {
    const connected = new Set<string>()
    edges.forEach((edge) => {
      if (edge.source === nodeId) {
        connected.add(edge.target)
      } else if (edge.target === nodeId) {
        connected.add(edge.source)
      }
    })
    return connected
  }, [edges])

  // Apply highlighting styles based on hover state
  const styledNodes = useMemo(() => {
    if (!hoveredNodeId) return nodes

    const connectedIds = getConnectedNodeIds(hoveredNodeId)

    return nodes.map((node) => {
      const isHovered = node.id === hoveredNodeId
      const isConnected = connectedIds.has(node.id)
      const isDimmed = !isHovered && !isConnected

      return {
        ...node,
        style: {
          ...node.style,
          opacity: isDimmed ? 0.3 : 1,
          transition: 'opacity 0.2s ease-in-out',
        },
      }
    })
  }, [nodes, hoveredNodeId, getConnectedNodeIds])

  // Apply highlighting styles to edges based on hover state
  const styledEdges = useMemo(() => {
    if (!hoveredNodeId) return edges

    return edges.map((edge) => {
      const isConnected = edge.source === hoveredNodeId || edge.target === hoveredNodeId
      const isDimmed = !isConnected

      return {
        ...edge,
        style: {
          ...edge.style,
          opacity: isDimmed ? 0.2 : 1,
          strokeWidth: isConnected ? 3 : 2,
        },
        animated: isConnected,
      }
    })
  }, [edges, hoveredNodeId])

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    setFullscreen((prev) => !prev)
  }, [])

  // Handle node hover - highlight connected nodes
  const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: { id: string }) => {
    setHoveredNodeId(node.id)
  }, [])

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNodeId(null)
  }, [])

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

  const graphContent = (
    <Box ref={reactFlowRef} sx={{ height: fullscreen ? '100vh' : height, position: 'relative' }}>
      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges}
        onNodesChange={onNodesChange as OnNodesChange}
        onEdgesChange={onEdgesChange as OnEdgesChange}
        onNodeClick={onNodeClick}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
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
        <Panel position="top-right">
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Download button temporarily disabled due to technical issues */}
            {/* <Tooltip title="Download as PNG">
              <IconButton
                onClick={handleDownload}
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'background.paper', boxShadow: 2 },
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
              <IconButton
                onClick={toggleFullscreen}
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'background.paper', boxShadow: 2 },
                }}
              >
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Panel>
      </ReactFlow>
    </Box>
  )

  if (fullscreen) {
    return (
      <Dialog open={fullscreen} onClose={toggleFullscreen} maxWidth={false} fullScreen>
        {graphContent}
      </Dialog>
    )
  }

  return <Paper sx={{ height, position: 'relative' }}>{graphContent}</Paper>
}

export function TopologyGraph(props: TopologyGraphProps) {
  return (
    <ReactFlowProvider>
      <TopologyGraphInner {...props} />
    </ReactFlowProvider>
  )
}
