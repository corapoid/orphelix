import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceCard } from '@/app/components/common/resource-card'
import type { DaemonSet } from '@/types/kubernetes'

interface DaemonSetCardProps {
  daemonSet: DaemonSet
  onClick?: () => void
}

export function DaemonSetCard({ daemonSet, onClick }: DaemonSetCardProps) {
  const resourceColor = '#9333EA' // Purple for daemonsets

  return (
    <ResourceCard
      name={daemonSet.name}
      resourceType="DaemonSet"
      resourceColor={resourceColor}
      icon={SettingsSystemDaydreamIcon}
      onClick={onClick}
      statusBadge={<StatusBadge status={daemonSet.status} />}
      metrics={
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Desired
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {daemonSet.desired}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Ready
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {daemonSet.ready}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Available
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {daemonSet.available}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Up-to-date
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {daemonSet.upToDate}
            </Typography>
          </Box>
        </Box>
      }
      footer={
        <Typography variant="caption" color="text.secondary">
          Age: {daemonSet.age}
        </Typography>
      }
    />
  )
}
