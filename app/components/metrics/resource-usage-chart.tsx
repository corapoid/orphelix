'use client'

import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/store'

interface ResourceUsageChartProps {
  deploymentName: string
  namespace?: string
}

interface PodMetrics {
  podName: string
  containerName: string
  cpu: string
  memory: string
  cpuValue: number
  memoryValue: number
}

interface ResourceRequirements {
  podName: string
  containerName: string
  requests: {
    cpu: string
    memory: string
    cpuValue: number
    memoryValue: number
  }
  limits: {
    cpu: string
    memory: string
    cpuValue: number
    memoryValue: number
  }
}

interface MetricsResponse {
  deployment: string
  namespace: string
  metrics: PodMetrics[]
  requirements: ResourceRequirements[]
  timestamp: string
}

function formatMemory(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}

function formatCPU(millicores: number): string {
  if (millicores >= 1000) {
    return `${(millicores / 1000).toFixed(2)} cores`
  }
  return `${millicores.toFixed(0)}m`
}

export function ResourceUsageChart({ deploymentName, namespace }: ResourceUsageChartProps) {
  const mode = useModeStore((state) => state.mode)
  const selectedNamespace = useModeStore((state) => state.selectedNamespace)

  const ns = namespace || selectedNamespace || 'default'

  const { data, isLoading, error } = useQuery<MetricsResponse>({
    queryKey: ['pod-metrics', deploymentName, ns],
    queryFn: async () => {
      const response = await fetch(`/api/metrics/pods?deployment=${deploymentName}&namespace=${ns}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || 'Failed to fetch metrics')
      }
      return response.json()
    },
    enabled: mode === 'real',
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  const chartData = useMemo(() => {
    if (!data) return { cpu: [], memory: [] }

    const cpuData: Array<{ name: string; Current: number; Requested: number; Limit: number }> = []
    const memoryData: Array<{ name: string; Current: number; Requested: number; Limit: number }> = []

    // Aggregate metrics by pod
    const podMap = new Map<string, {
      current: number
      requests: number
      limits: number
      currentMem: number
      requestsMem: number
      limitsMem: number
    }>()

    data.metrics.forEach(metric => {
      const existing = podMap.get(metric.podName) || {
        current: 0,
        requests: 0,
        limits: 0,
        currentMem: 0,
        requestsMem: 0,
        limitsMem: 0,
      }
      existing.current += metric.cpuValue
      existing.currentMem += metric.memoryValue
      podMap.set(metric.podName, existing)
    })

    data.requirements.forEach(req => {
      const existing = podMap.get(req.podName)
      if (existing) {
        existing.requests += req.requests.cpuValue
        existing.limits += req.limits.cpuValue
        existing.requestsMem += req.requests.memoryValue
        existing.limitsMem += req.limits.memoryValue
      }
    })

    podMap.forEach((values, podName) => {
      const shortName = podName.split('-').slice(0, -2).join('-')

      cpuData.push({
        name: shortName,
        'Current': values.current,
        'Requested': values.requests,
        'Limit': values.limits,
      })

      memoryData.push({
        name: shortName,
        'Current': values.currentMem,
        'Requested': values.requestsMem,
        'Limit': values.limitsMem,
      })
    })

    return { cpu: cpuData, memory: memoryData }
  }, [data])

  if (mode === 'mock') {
    return (
      <Alert severity="info">
        Metrics are only available in Real Cluster mode. Switch to Real Cluster mode in Settings to view resource usage.
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error">
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Failed to load metrics
        </Typography>
        <Typography variant="caption">
          {error instanceof Error ? error.message : 'Unknown error'}
        </Typography>
      </Alert>
    )
  }

  if (!data || (chartData.cpu.length === 0 && chartData.memory.length === 0)) {
    return (
      <Alert severity="warning">
        No metrics available. Make sure metrics-server is installed in your cluster.
      </Alert>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* CPU Usage */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          CPU Usage
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.cpu}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{ value: 'Millicores', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => formatCPU(value)}
            />
            <Tooltip
              formatter={(value: number) => formatCPU(value)}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
            />
            <Legend />
            <Bar dataKey="Current" fill="#2196f3" />
            <Bar dataKey="Requested" fill="#4caf50" />
            <Bar dataKey="Limit" fill="#ff9800" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Memory Usage */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Memory Usage
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.memory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{ value: 'Memory', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => formatMemory(value)}
            />
            <Tooltip
              formatter={(value: number) => formatMemory(value)}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
            />
            <Legend />
            <Bar dataKey="Current" fill="#2196f3" />
            <Bar dataKey="Requested" fill="#4caf50" />
            <Bar dataKey="Limit" fill="#ff9800" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Typography variant="caption" color="text.secondary">
        Last updated: {data ? new Date(data.timestamp).toLocaleTimeString() : 'N/A'}
      </Typography>
    </Box>
  )
}
