'use client'

import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { StatusBadge } from '@/app/components/common/status-badge'
import { useQuery } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'

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
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  let size = bytes
  let unitIndex = 0

  while (size >= k && unitIndex < units.length - 1) {
    size /= k
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}

function formatCPU(millicores: number): string {
  if (millicores === 0) return '0m'
  if (millicores >= 1000) {
    return `${(millicores / 1000).toFixed(2)} cores`
  }
  return `${millicores.toFixed(0)}m`
}

function getUsageColor(percentage: number): 'success' | 'warning' | 'error' {
  if (percentage < 70) return 'success'
  if (percentage < 90) return 'warning'
  return 'error'
}

export function ResourceUsageChart({ deploymentName, namespace }: ResourceUsageChartProps) {
  const mode = useModeStore((state) => state.mode)
  const selectedNamespace = useModeStore((state) => state.selectedNamespace)

  const ns = namespace || selectedNamespace || 'default'

  const { data, isLoading, error } = useQuery<MetricsResponse>({
    queryKey: ['pod-metrics', deploymentName, ns, mode],
    queryFn: async () => {
      if (mode === 'mock') {
        // Generate random metrics for demo mode
        const podCount = 3
        const metrics: PodMetrics[] = []
        const requirements: ResourceRequirements[] = []

        for (let i = 0; i < podCount; i++) {
          const podName = `${deploymentName}-${Math.random().toString(36).substring(7)}`

          // Random CPU: 50-400m
          const cpuValue = 50 + Math.random() * 350
          // Random Memory: 100-400MB
          const memoryValue = (100 + Math.random() * 300) * 1024 * 1024

          metrics.push({
            podName,
            containerName: deploymentName,
            cpu: `${cpuValue.toFixed(0)}m`,
            memory: `${(memoryValue / 1024 / 1024).toFixed(0)}Mi`,
            cpuValue,
            memoryValue,
          })

          requirements.push({
            podName,
            containerName: deploymentName,
            requests: {
              cpu: '100m',
              memory: '128Mi',
              cpuValue: 100,
              memoryValue: 128 * 1024 * 1024,
            },
            limits: {
              cpu: '500m',
              memory: '512Mi',
              cpuValue: 500,
              memoryValue: 512 * 1024 * 1024,
            },
          })
        }

        return {
          deployment: deploymentName,
          namespace: ns,
          metrics,
          requirements,
          timestamp: new Date().toISOString(),
        }
      }

      const response = await fetch(`/api/metrics/pods?deployment=${deploymentName}&namespace=${ns}&mode=${mode}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || 'Failed to fetch metrics')
      }
      return response.json()
    },
    enabled: true, // Enable for both demo and real modes
    refetchInterval: mode === 'mock' ? 5000 : 30000, // Refresh every 5s in demo, 30s in real mode
  })

  const aggregatedMetrics = useMemo(() => {
    if (!data) return null

    let totalCpuCurrent = 0
    let totalCpuRequested = 0
    let totalCpuLimit = 0
    let totalMemCurrent = 0
    let totalMemRequested = 0
    let totalMemLimit = 0

    data.metrics.forEach(metric => {
      totalCpuCurrent += metric.cpuValue
      totalMemCurrent += metric.memoryValue
    })

    data.requirements.forEach(req => {
      totalCpuRequested += req.requests.cpuValue
      totalCpuLimit += req.limits.cpuValue
      totalMemRequested += req.requests.memoryValue
      totalMemLimit += req.limits.memoryValue
    })

    const cpuUsagePercent = totalCpuLimit > 0 ? (totalCpuCurrent / totalCpuLimit) * 100 : 0
    const memUsagePercent = totalMemLimit > 0 ? (totalMemCurrent / totalMemLimit) * 100 : 0

    return {
      cpu: {
        current: totalCpuCurrent,
        requested: totalCpuRequested,
        limit: totalCpuLimit,
        usagePercent: cpuUsagePercent,
      },
      memory: {
        current: totalMemCurrent,
        requested: totalMemRequested,
        limit: totalMemLimit,
        usagePercent: memUsagePercent,
      },
      podCount: data.metrics.length,
    }
  }, [data])

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

  if (!data || !aggregatedMetrics) {
    return (
      <Alert severity="warning">
        No metrics available. Make sure metrics-server is installed in your cluster.
      </Alert>
    )
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {/* CPU Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  CPU Usage
                </Typography>
                <Tooltip
                  title="Percentage of current usage vs. resource limit (Current / Limit × 100%)"
                  arrow
                  placement="top"
                >
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'text.secondary', cursor: 'help' }} />
                </Tooltip>
              </Box>
              <Tooltip
                title={`${formatCPU(aggregatedMetrics.cpu.current)} / ${formatCPU(aggregatedMetrics.cpu.limit)}`}
                arrow
              >
                <StatusBadge
                  label={`${aggregatedMetrics.cpu.usagePercent.toFixed(1)}%`}
                  color={getUsageColor(aggregatedMetrics.cpu.usagePercent)}
                  size="small"
                />
              </Tooltip>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Current Usage
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatCPU(aggregatedMetrics.cpu.current)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(aggregatedMetrics.cpu.usagePercent, 100)}
                color={getUsageColor(aggregatedMetrics.cpu.usagePercent)}
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Requested:
                </Typography>
                <Typography variant="caption" fontWeight="medium">
                  {formatCPU(aggregatedMetrics.cpu.requested)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Limit:
                </Typography>
                <Typography variant="caption" fontWeight="medium">
                  {formatCPU(aggregatedMetrics.cpu.limit)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Memory Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Memory Usage
                </Typography>
                <Tooltip
                  title="Percentage of current usage vs. resource limit (Current / Limit × 100%)"
                  arrow
                  placement="top"
                >
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'text.secondary', cursor: 'help' }} />
                </Tooltip>
              </Box>
              <Tooltip
                title={`${formatMemory(aggregatedMetrics.memory.current)} / ${formatMemory(aggregatedMetrics.memory.limit)}`}
                arrow
              >
                <StatusBadge
                  label={`${aggregatedMetrics.memory.usagePercent.toFixed(1)}%`}
                  color={getUsageColor(aggregatedMetrics.memory.usagePercent)}
                  size="small"
                />
              </Tooltip>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Current Usage
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatMemory(aggregatedMetrics.memory.current)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(aggregatedMetrics.memory.usagePercent, 100)}
                color={getUsageColor(aggregatedMetrics.memory.usagePercent)}
                sx={{ height: 8, borderRadius: 1 }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Requested:
                </Typography>
                <Typography variant="caption" fontWeight="medium">
                  {formatMemory(aggregatedMetrics.memory.requested)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Limit:
                </Typography>
                <Typography variant="caption" fontWeight="medium">
                  {formatMemory(aggregatedMetrics.memory.limit)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Aggregated from {aggregatedMetrics.podCount} pod{aggregatedMetrics.podCount !== 1 ? 's' : ''}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Last updated: {new Date(data.timestamp).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  )
}
