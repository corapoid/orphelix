import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { ResourceCard } from '@/app/components/common/resource-card'
import type { CronJob } from '@/types/kubernetes'

interface CronJobCardProps {
  cronJob: CronJob
  onClick?: () => void
}

export function CronJobCard({ cronJob, onClick }: CronJobCardProps) {
  const resourceColor = '#4CAF50' // Green for cronjobs

  return (
    <ResourceCard
      name={cronJob.name}
      resourceType="CronJob"
      resourceColor={resourceColor}
      icon={ScheduleIcon}
      onClick={onClick}
      statusBadge={
        <Chip
          label={cronJob.suspend ? 'Suspended' : 'Active'}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 24,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            backgroundColor: (theme) =>
              cronJob.suspend
                ? theme.palette.mode === 'dark'
                  ? 'rgba(255, 152, 0, 0.2)'
                  : 'rgba(255, 152, 0, 0.15)'
                : theme.palette.mode === 'dark'
                ? 'rgba(76, 175, 80, 0.2)'
                : 'rgba(76, 175, 80, 0.15)',
            color: (theme) =>
              cronJob.suspend
                ? theme.palette.mode === 'dark'
                  ? '#FF9F0A'
                  : '#FF9500'
                : theme.palette.mode === 'dark'
                ? '#4CAF50'
                : '#2E7D32',
          }}
        />
      }
      metrics={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Schedule
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontFamily: 'monospace',
              }}
            >
              {cronJob.schedule}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Active Jobs
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {cronJob.active}
            </Typography>
          </Box>
        </Box>
      }
      footer={
        <Typography variant="caption" color="text.secondary">
          Age: {cronJob.age}
        </Typography>
      }
    />
  )
}
