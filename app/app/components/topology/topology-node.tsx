import { Handle, Position } from '@xyflow/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LayersIcon from '@mui/icons-material/Layers'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import CloudIcon from '@mui/icons-material/Cloud'
import DescriptionIcon from '@mui/icons-material/Description'
import LockIcon from '@mui/icons-material/Lock'
import StorageIcon from '@mui/icons-material/Storage'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import HelpIcon from '@mui/icons-material/Help'
import type { ResourceStatus, ResourceType } from '@/types/topology'
import { useTheme } from '@/lib/ui'

const resourceIcons: Record<ResourceType, React.ComponentType<{ sx?: Record<string, unknown> }>> = {
  Deployment: LayersIcon,
  Pod: ViewInArIcon,
  Service: CloudIcon,
  ConfigMap: DescriptionIcon,
  Secret: LockIcon,
  PersistentVolumeClaim: StorageIcon,
  HPA: TrendingUpIcon,
}

const resourceColors: Record<ResourceType, string> = {
  Deployment: '#3F51B5', // Indigo
  Pod: '#9C27B0', // Purple
  Service: '#00BCD4', // Teal
  ConfigMap: '#0288d1', // Blue (info.main)
  Secret: '#ed6c02', // Orange (warning.main)
  PersistentVolumeClaim: '#FF9800', // Orange
  HPA: '#FFEB3B', // Yellow
}

const statusColors: Record<ResourceStatus, string> = {
  healthy: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  unknown: '#9e9e9e',
}

const statusIcons = {
  healthy: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  unknown: HelpIcon,
}

interface TopologyNodeProps {
  data: {
    resourceType: ResourceType
    status: ResourceStatus
    label: string
    details?: {
      restarts?: number
    }
  }
  selected?: boolean
}

function TopologyNodeComponent({ data, selected }: TopologyNodeProps) {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const Icon = resourceIcons[data.resourceType as ResourceType]
  const StatusIcon = statusIcons[data.status as ResourceStatus]
  const statusColor = statusColors[data.status as ResourceStatus]
  const resourceColor = resourceColors[data.resourceType as ResourceType] || '#9e9e9e'

  return (
    <>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />

      <Box
        sx={{
          minWidth: 220,
          maxWidth: 280,
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          // Classic mode - solid background with border
          ...(!isGlass && {
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }),
          // Glass mode - glassmorphism effects
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
            // Glass shine gradient overlay
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%, rgba(0, 0, 0, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 60%, rgba(0, 0, 0, 0.02) 100%)',
              pointerEvents: 'none',
              borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            },
          }),
          ...(selected && {
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? `${resourceColor}60`
                : `${resourceColor}40`,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? `0 0 0 2px ${resourceColor}40, 0 8px 32px 0 rgba(0, 0, 0, 0.4)`
                : `0 0 0 2px ${resourceColor}30, 0 8px 32px 0 rgba(31, 38, 135, 0.12)`,
          }),
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            ...(isGlass && {
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.18)'
                  : 'rgba(209, 213, 219, 0.6)',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(50, 50, 70, 0.7)'
                  : 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 2px 2px 0 rgba(255, 255, 255, 0.12), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px 0 rgba(31, 38, 135, 0.12), inset 0 2px 2px 0 rgba(255, 255, 255, 1), inset 0 -2px 2px 0 rgba(0, 0, 0, 0.08)',
            }),
          },
        }}
      >
        <Box sx={{ p: 1.5, pb: 1.5, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${resourceColor}25 0%, ${resourceColor}15 100%)`
                    : `linear-gradient(135deg, ${resourceColor}30 0%, ${resourceColor}15 100%)`,
                ...(isGlass && {
                  backdropFilter: 'blur(10px)',
                }),
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? `${resourceColor}40`
                    : `${resourceColor}30`,
                flexShrink: 0,
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? `0 2px 8px 0 ${resourceColor}20`
                    : `0 2px 8px 0 ${resourceColor}15`,
              }}
            >
              <Icon sx={{ fontSize: 18, color: resourceColor, opacity: 0.95 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{
                  fontSize: '0.875rem',
                  wordBreak: 'break-word',
                  lineHeight: 1.3,
                  mb: 0.25,
                }}
              >
                {data.label}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8, fontSize: '0.65rem' }}>
                {data.resourceType}
              </Typography>
            </Box>
            <StatusIcon sx={{ fontSize: 16, color: statusColor, flexShrink: 0 }} />
          </Box>

          {data.details && data.details.restarts !== undefined && (
            <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: '0.7rem', lineHeight: 1.4 }}
              >
                Restarts:{' '}
                <Typography component="span" color="text.primary" fontWeight={600} sx={{ fontSize: '0.7rem' }}>
                  {data.details.restarts}
                </Typography>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Top} id="top" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0 }} />
    </>
  )
}

export const TopologyNode = TopologyNodeComponent
