import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import WidgetsIcon from '@mui/icons-material/Widgets'
import WorkIcon from '@mui/icons-material/Work'
import ScheduleIcon from '@mui/icons-material/Schedule'
import LanguageIcon from '@mui/icons-material/Language'
import StorageIcon from '@mui/icons-material/Storage'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import type { DashboardSummary } from '@/types/kubernetes'

interface ResourceOverviewProps {
  summary: DashboardSummary
}

interface ResourceItem {
  label: string
  count: number
  icon: React.ReactNode
  link: string
  status?: {
    healthy?: number
    degraded?: number
    running?: number
    pending?: number
    failed?: number
  }
}

export function ResourceOverview({ summary }: ResourceOverviewProps) {
  const workloads: ResourceItem[] = [
    {
      label: 'Deployments',
      count: summary.deployments.total,
      icon: <AccountTreeIcon sx={{ fontSize: 20 }} />,
      link: '/deployments',
      status: {
        healthy: summary.deployments.healthy,
        degraded: summary.deployments.degraded,
      },
    },
    {
      label: 'Pods',
      count: summary.pods.total,
      icon: <WidgetsIcon sx={{ fontSize: 20 }} />,
      link: '/pods',
      status: {
        running: summary.pods.running,
        pending: summary.pods.pending,
        failed: summary.pods.failed,
      },
    },
    {
      label: 'Jobs',
      count: summary.jobs?.total || 0,
      icon: <WorkIcon sx={{ fontSize: 20 }} />,
      link: '/jobs',
    },
    {
      label: 'CronJobs',
      count: summary.cronjobs?.total || 0,
      icon: <ScheduleIcon sx={{ fontSize: 20 }} />,
      link: '/cronjobs',
    },
  ]

  const network: ResourceItem[] = [
    {
      label: 'Services',
      count: summary.services || 0,
      icon: <LanguageIcon sx={{ fontSize: 20 }} />,
      link: '/services',
    },
    {
      label: 'Ingress',
      count: summary.ingress || 0,
      icon: <LanguageIcon sx={{ fontSize: 20 }} />,
      link: '/ingress',
    },
  ]

  const storage: ResourceItem[] = [
    {
      label: 'Persistent Volumes',
      count: summary.pv.total,
      icon: <FolderOpenIcon sx={{ fontSize: 20 }} />,
      link: '/pv',
      status: {
        healthy: summary.pv.bound,
      },
    },
  ]

  const renderResourceGroup = (title: string, resources: ResourceItem[], color: string) => (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper
        sx={{
          p: 3,
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.2s',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            borderColor: color,
            boxShadow: 2,
          },
        }}
        onClick={() => {
          if (resources[0]?.link) {
            window.location.href = resources[0].link
          }
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color }}>
          {title}
        </Typography>

        {resources.map((resource, index) => (
          <Box key={resource.label}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1.5,
              }}
              onClick={(e) => {
                e.stopPropagation()
                window.location.href = resource.link
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'text.secondary' }}>{resource.icon}</Box>
                <Typography variant="body2" color="text.secondary">
                  {resource.label}
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold">
                {resource.count}
              </Typography>
            </Box>

            {resource.status && (
              <Box sx={{ display: 'flex', gap: 2, mb: 1, ml: 4 }}>
                {resource.status.healthy !== undefined && (
                  <Box>
                    <Typography variant="caption" color="success.main">
                      {resource.status.healthy} healthy
                    </Typography>
                  </Box>
                )}
                {resource.status.degraded !== undefined && resource.status.degraded > 0 && (
                  <Box>
                    <Typography variant="caption" color="error.main">
                      {resource.status.degraded} degraded
                    </Typography>
                  </Box>
                )}
                {resource.status.running !== undefined && (
                  <Box>
                    <Typography variant="caption" color="success.main">
                      {resource.status.running} running
                    </Typography>
                  </Box>
                )}
                {resource.status.pending !== undefined && resource.status.pending > 0 && (
                  <Box>
                    <Typography variant="caption" color="warning.main">
                      {resource.status.pending} pending
                    </Typography>
                  </Box>
                )}
                {resource.status.failed !== undefined && resource.status.failed > 0 && (
                  <Box>
                    <Typography variant="caption" color="error.main">
                      {resource.status.failed} failed
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {index < resources.length - 1 && <Divider sx={{ mt: 1 }} />}
          </Box>
        ))}
      </Paper>
    </Grid>
  )

  const headerColor = '#6366F1' // Unified color for all headers

  return (
    <Grid container spacing={3}>
      {renderResourceGroup('Workloads', workloads, headerColor)}
      {renderResourceGroup('Network', network, headerColor)}
      {renderResourceGroup('Storage', storage, headerColor)}
    </Grid>
  )
}
