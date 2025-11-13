import { Handle, Position } from '@xyflow/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import DeploymentIcon from '@mui/icons-material/CloudQueue'
import PodIcon from '@mui/icons-material/Widgets'
import ConfigMapIcon from '@mui/icons-material/Description'
import SecretIcon from '@mui/icons-material/Lock'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import HelpIcon from '@mui/icons-material/Help'
import type { ResourceStatus } from '@/types/topology'

const resourceIcons = {
  Deployment: DeploymentIcon,
  Pod: PodIcon,
  Service: PodIcon,
  ConfigMap: ConfigMapIcon,
  Secret: SecretIcon,
  PersistentVolumeClaim: ConfigMapIcon,
  HPA: DeploymentIcon,
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

function TopologyNodeComponent({ data, selected }: any) {
  const Icon = resourceIcons[data.resourceType as keyof typeof resourceIcons]
  const StatusIcon = statusIcons[data.status as ResourceStatus]
  const statusColor = statusColors[data.status as ResourceStatus]

  return (
    <>
      <Handle type="target" position={Position.Left} style={{ background: '#9e9e9e' }} />

      <Box
        sx={{
          minWidth: 180,
          maxWidth: 220,
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          borderLeft: `3px solid ${statusColor}`,
          transition: 'all 0.2s',
          backgroundColor: 'background.paper',
          ...(selected && {
            borderColor: statusColor,
            boxShadow: `0 0 0 1px ${statusColor}`,
          }),
          '&:hover': {
            borderColor: statusColor,
            boxShadow: 1,
          },
        }}
      >
        <Box sx={{ p: 1.5, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${statusColor}15`,
              }}
            >
              <Icon sx={{ fontSize: 16, color: statusColor }} />
            </Box>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                flex: 1,
                fontSize: '0.875rem',
                wordBreak: 'break-word',
                lineHeight: 1.3,
              }}
            >
              {data.label}
            </Typography>
            <StatusIcon sx={{ fontSize: 14, color: statusColor }} />
          </Box>

          <Chip
            label={data.resourceType}
            size="small"
            sx={{
              height: 18,
              fontSize: '0.65rem',
              fontWeight: 500,
              backgroundColor: `${statusColor}10`,
              color: statusColor,
              border: 'none',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />

          {data.details && Object.keys(data.details).length > 0 && (
            <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
              {Object.entries(data.details).map(([key, value]) => (
                <Typography
                  key={key}
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  sx={{
                    fontSize: '0.7rem',
                    lineHeight: 1.4,
                    wordBreak: 'break-word',
                  }}
                >
                  {key}: {String(value)}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Handle type="source" position={Position.Right} style={{ background: '#9e9e9e' }} />
    </>
  )
}

export const TopologyNode = TopologyNodeComponent
