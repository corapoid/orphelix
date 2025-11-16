import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LayersIcon from '@mui/icons-material/Layers'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceCard } from '@/app/components/common/resource-card'
import type { Deployment } from '@/types/kubernetes'

interface DeploymentCardProps {
  deployment: Deployment
  onClick?: () => void
}

export function DeploymentCard({ deployment, onClick }: DeploymentCardProps) {
  const resourceColor = '#3F51B5' // Indigo for deployments

  return (
    <ResourceCard
      name={deployment.name}
      resourceType="Deployment"
      resourceColor={resourceColor}
      icon={LayersIcon}
      onClick={onClick}
      statusBadge={<StatusBadge status={deployment.status} />}
      metrics={
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Replicas
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {deployment.replicas.ready}/{deployment.replicas.desired}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Available
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {deployment.replicas.available}
            </Typography>
          </Box>
        </Box>
      }
      footer={
        <Typography variant="caption" color="text.secondary">
          Age: {deployment.age}
        </Typography>
      }
    />
  )
}
