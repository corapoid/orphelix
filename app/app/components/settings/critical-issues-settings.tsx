'use client'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useCriticalIssuesSettings, type CriticalIssueResourceType } from '@/lib/core/store'
import { useTheme } from '@/lib/ui'

const RESOURCE_OPTIONS: Array<{
  key: CriticalIssueResourceType
  label: string
  description: string
}> = [
  {
    key: 'pods',
    label: 'Failed Pods',
    description: 'Monitor pods in Failed or CrashLoopBackOff state',
  },
  {
    key: 'nodes',
    label: 'Node Health',
    description: 'Monitor nodes that are not ready',
  },
  {
    key: 'deployments',
    label: 'Degraded Deployments',
    description: 'Monitor deployments with unavailable replicas',
  },
  {
    key: 'pv',
    label: 'Unbound Volumes',
    description: 'Monitor persistent volumes that are not bound',
  },
]

export function CriticalIssuesSettings() {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const { isResourceEnabled, toggleResource } = useCriticalIssuesSettings()

  return (
    <Paper
      elevation={isGlass ? 0 : 1}
      sx={{
        p: 3,
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        ...(isGlass && {
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
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
              : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
        }),
      }}
    >
      <Typography variant="body2" color="text.secondary" paragraph>
        Select which resource types should be monitored for critical issues on the dashboard.
      </Typography>

      <FormGroup>
        {RESOURCE_OPTIONS.map((option) => (
          <FormControlLabel
            key={option.key}
            control={
              <Switch
                checked={isResourceEnabled(option.key)}
                onChange={() => toggleResource(option.key)}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {option.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.description}
                </Typography>
              </Box>
            }
            sx={{ mb: 1.5 }}
          />
        ))}
      </FormGroup>
    </Paper>
  )
}
