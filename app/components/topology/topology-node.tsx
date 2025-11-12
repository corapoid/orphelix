import { Handle, Position } from '@xyflow/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
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
    <Paper
      elevation={selected ? 8 : 2}
      sx={{
        minWidth: 180,
        borderRadius: 2,
        borderLeft: `4px solid ${statusColor}`,
        transition: 'all 0.2s',
        '&:hover': {
          elevation: 4,
          transform: 'scale(1.02)',
        },
      }}
    >
      <Handle type="target" position={Position.Left} />

      <Box sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Icon sx={{ fontSize: 20, color: statusColor }} />
          <Typography variant="body2" fontWeight="bold" sx={{ flex: 1 }}>
            {data.label}
          </Typography>
          <StatusIcon sx={{ fontSize: 16, color: statusColor }} />
        </Box>

        <Chip
          label={data.resourceType}
          size="small"
          variant="outlined"
          sx={{
            fontSize: 10,
            height: 20,
            borderColor: statusColor,
            color: statusColor,
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
                sx={{ fontSize: 10 }}
              >
                {key}: {String(value)}
              </Typography>
            ))}
          </Box>
        )}
      </Box>

      <Handle type="source" position={Position.Right} />
    </Paper>
  )
}

export const TopologyNode = TopologyNodeComponent
