'use client'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import { ResourceQuota } from '@/types/kubernetes'

interface QuotaUsageCardProps {
  quota: ResourceQuota
}

function parseResourceValue(value: string): number {
  // Parse Kubernetes resource values (e.g., "100", "200Gi", "500m")
  if (!value) return 0

  // Remove units and parse
  const num = parseFloat(value.replace(/[a-zA-Z]/g, ''))

  // Handle millicores (m)
  if (value.includes('m')) {
    return num / 1000
  }

  // Handle Gi/Mi/Ki
  if (value.includes('Gi')) {
    return num
  }
  if (value.includes('Mi')) {
    return num / 1024
  }
  if (value.includes('Ki')) {
    return num / 1024 / 1024
  }

  return num
}

function getUsagePercentage(used: string, hard: string): number {
  const usedNum = parseResourceValue(used)
  const hardNum = parseResourceValue(hard)

  if (hardNum === 0) return 0
  return Math.round((usedNum / hardNum) * 100)
}

function getProgressColor(percentage: number): 'success' | 'warning' | 'error' {
  if (percentage < 70) return 'success'
  if (percentage < 90) return 'warning'
  return 'error'
}

export function QuotaUsageCard({ quota }: QuotaUsageCardProps) {
  const resources = Object.keys(quota.hard).filter(key => quota.hard[key])

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Resource Quota: {quota.name}
      </Typography>

      <Box sx={{ mt: 2 }}>
        {resources.map((resource) => {
          const used = quota.used[resource] || '0'
          const hard = quota.hard[resource]
          const percentage = getUsagePercentage(used, hard)
          const color = getProgressColor(percentage)

          return (
            <Box key={resource} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {resource}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {used} / {hard} ({percentage}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(percentage, 100)}
                color={color}
                sx={{ height: 8, borderRadius: (theme) => `${theme.shape.borderRadius}px` }}
              />
            </Box>
          )
        })}

        {resources.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No resource quotas defined
          </Typography>
        )}
      </Box>
    </Paper>
  )
}
