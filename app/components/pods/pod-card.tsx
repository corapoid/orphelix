import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceCard } from '@/app/components/common/resource-card'
import type { Pod } from '@/types/kubernetes'

interface PodCardProps {
  pod: Pod
  onClick?: () => void
}

export function PodCard({ pod, onClick }: PodCardProps) {
  const resourceColor = '#9C27B0' // Purple for pods

  return (
    <ResourceCard
      name={pod.name}
      resourceType="Pod"
      resourceColor={resourceColor}
      icon={ViewInArIcon}
      onClick={onClick}
      statusBadge={<StatusBadge status={pod.status} />}
      metrics={
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Restarts
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {pod.restartCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Node
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.3,
                fontSize: '0.8rem',
              }}
            >
              {pod.nodeName || 'N/A'}
            </Typography>
          </Box>
        </Box>
      }
      footer={
        <Typography variant="caption" color="text.secondary">
          Age: {pod.age}
        </Typography>
      }
    />
  )
}
