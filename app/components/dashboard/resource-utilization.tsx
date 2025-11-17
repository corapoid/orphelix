import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { GlassPanel } from '@/app/components/common/glass-panel'
import type { ResourceQuota } from '@/types/kubernetes'

interface ResourceUtilizationProps {
  quotas?: ResourceQuota[]
}

interface ResourceUsage {
  name: string
  used: number
  total: number
  unit: string
}

function parseResourceValue(value: string): { value: number; unit: string } {
  if (!value) return { value: 0, unit: '' }

  const match = value.match(/^([0-9.]+)([a-zA-Z]*)$/)
  if (!match) return { value: parseFloat(value) || 0, unit: '' }

  const num = parseFloat(match[1])
  const unit = match[2]

  // Convert to base units
  if (unit === 'm') {
    // millicores to cores
    return { value: num / 1000, unit: 'cores' }
  }
  if (unit === 'Gi') {
    return { value: num, unit: 'Gi' }
  }
  if (unit === 'Mi') {
    return { value: num / 1024, unit: 'Gi' }
  }
  if (unit === 'Ti') {
    return { value: num * 1024, unit: 'Gi' }
  }

  return { value: num, unit: unit || '' }
}

function aggregateQuotas(quotas: ResourceQuota[]): ResourceUsage[] {
  const aggregated: Record<string, { used: number; total: number; unit: string }> = {}

  quotas.forEach((quota) => {
    Object.entries(quota.hard).forEach(([key, hardValue]) => {
      const usedValue = quota.used[key] || '0'

      const hard = parseResourceValue(hardValue)
      const used = parseResourceValue(usedValue)

      if (!aggregated[key]) {
        aggregated[key] = { used: 0, total: 0, unit: hard.unit }
      }

      aggregated[key].used += used.value
      aggregated[key].total += hard.value
    })
  })

  return Object.entries(aggregated).map(([name, data]) => ({
    name,
    used: data.used,
    total: data.total,
    unit: data.unit,
  }))
}

function getProgressColor(percentage: number): 'success' | 'warning' | 'error' {
  if (percentage < 70) return 'success'
  if (percentage < 90) return 'warning'
  return 'error'
}

export function ResourceUtilization({ quotas }: ResourceUtilizationProps) {
  if (!quotas || quotas.length === 0) {
    return null
  }

  const resources = aggregateQuotas(quotas)

  // Filter to show only CPU, Memory, and Storage
  const displayResources = resources.filter((r) =>
    r.name === 'requests.cpu' ||
    r.name === 'limits.cpu' ||
    r.name === 'requests.memory' ||
    r.name === 'limits.memory' ||
    r.name === 'requests.storage'
  )

  if (displayResources.length === 0) {
    return null
  }

  const getLabelForResource = (name: string): string => {
    const labels: Record<string, string> = {
      'requests.cpu': 'CPU Requests',
      'limits.cpu': 'CPU Limits',
      'requests.memory': 'Memory Requests',
      'limits.memory': 'Memory Limits',
      'requests.storage': 'Storage Requests',
    }
    return labels[name] || name
  }

  return (
    <GlassPanel sx={{ p: 3, mt: 5 }}>
      <Typography variant="body1" gutterBottom sx={{ fontWeight: 700 }}>
        Cluster Resource Utilization
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Aggregated resource usage across all namespaces with quotas
      </Typography>

      {displayResources.map((resource) => {
        const percentage = resource.total > 0 ? (resource.used / resource.total) * 100 : 0
        const color = getProgressColor(percentage)

        return (
          <Box key={resource.name} sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                {getLabelForResource(resource.name)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {resource.used.toFixed(1)} / {resource.total.toFixed(1)} {resource.unit}
                <Typography component="span" variant="caption" color={`${color}.main`} sx={{ ml: 1 }}>
                  ({percentage.toFixed(0)}%)
                </Typography>
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(percentage, 100)}
              color={color}
              sx={{
                height: 8,
                borderRadius: 1,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        )
      })}
    </GlassPanel>
  )
}
