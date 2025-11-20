import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import WorkIcon from '@mui/icons-material/Work'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceCard } from '@/app/components/common/resource-card'
import type { Job } from '@/types/kubernetes'

interface JobCardProps {
  job: Job
  onClick?: () => void
}

export function JobCard({ job, onClick }: JobCardProps) {
  const resourceColor = '#FF9800' // Orange for jobs

  return (
    <ResourceCard
      name={job.name}
      resourceType="Job"
      resourceColor={resourceColor}
      icon={WorkIcon}
      onClick={onClick}
      statusBadge={<StatusBadge status={job.status} />}
      metrics={
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Succeeded
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {job.succeeded}/{job.completions}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Failed
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {job.failed}
            </Typography>
          </Box>
        </Box>
      }
      footer={
        <Typography variant="caption" color="text.secondary">
          Age: {job.age}
        </Typography>
      }
    />
  )
}
