import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StorageIcon from '@mui/icons-material/Storage'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceCard } from '@/app/components/common/resource-card'
import type { StatefulSet } from '@/types/kubernetes'

interface StatefulSetCardProps {
  statefulSet: StatefulSet
  onClick?: () => void
}

export function StatefulSetCard({ statefulSet, onClick }: StatefulSetCardProps) {
  const resourceColor = '#7C3AED' // Purple for statefulsets

  return (
    <ResourceCard
      name={statefulSet.name}
      resourceType="StatefulSet"
      resourceColor={resourceColor}
      icon={StorageIcon}
      onClick={onClick}
      statusBadge={<StatusBadge status={statefulSet.status} />}
      metrics={
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Replicas
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {statefulSet.replicas.ready}/{statefulSet.replicas.desired}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Updated
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {statefulSet.replicas.updated}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Service
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {statefulSet.serviceName || '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              PVCs
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {statefulSet.persistentVolumeClaims.length || 0}
            </Typography>
          </Box>
        </Box>
      }
      footer={
        <Typography variant="caption" color="text.secondary">
          Age: {statefulSet.age}
        </Typography>
      }
    />
  )
}
