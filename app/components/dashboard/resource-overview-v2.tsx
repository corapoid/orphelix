import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import WidgetsIcon from '@mui/icons-material/Widgets'
import WorkIcon from '@mui/icons-material/Work'
import ScheduleIcon from '@mui/icons-material/Schedule'
import CloudIcon from '@mui/icons-material/Cloud'
import HttpIcon from '@mui/icons-material/Http'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { ResourceCard } from '@/app/components/common/resource-card'
import { useRouter } from 'next/navigation'
import type { DashboardSummary } from '@/types/kubernetes'

interface ResourceOverviewV2Props {
  summary: DashboardSummary
}

export function ResourceOverviewV2({ summary }: ResourceOverviewV2Props) {
  const router = useRouter()

  return (
    <Box>
      {/* Main Title */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Resources
      </Typography>

      {/* Workloads Section */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: 'text.secondary',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Workloads
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gridAutoRows: '1fr',
          gap: 2,
          mb: 4,
        }}
      >
        {/* Deployments */}
        <ResourceCard
          name="Deployments"
          resourceType={`${summary.deployments.total} total`}
          resourceColor="#3F51B5"
          icon={AccountTreeIcon}
          onClick={() => router.push('/deployments')}
          metrics={
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Healthy
                </Typography>
                <Typography variant="h6" fontWeight={700} color="success.main">
                  {summary.deployments.healthy}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Degraded
                </Typography>
                <Typography variant="h6" fontWeight={700} color="error.main">
                  {summary.deployments.degraded}
                </Typography>
              </Box>
            </Box>
          }
        />

        {/* Pods */}
        <ResourceCard
          name="Pods"
          resourceType={`${summary.pods.total} total`}
          resourceColor="#9C27B0"
          icon={WidgetsIcon}
          onClick={() => router.push('/pods')}
          metrics={
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Running
                </Typography>
                <Typography variant="h6" fontWeight={700} color="success.main">
                  {summary.pods.running}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Failed
                </Typography>
                <Typography variant="h6" fontWeight={700} color="error.main">
                  {summary.pods.failed}
                </Typography>
              </Box>
            </Box>
          }
        />

        {/* Jobs */}
        <ResourceCard
          name="Jobs"
          resourceType={`${summary.jobs?.total || 0} total`}
          resourceColor="#FF9800"
          icon={WorkIcon}
          onClick={() => router.push('/jobs')}
          metrics={
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Active
                </Typography>
                <Typography variant="h6" fontWeight={700} color="info.main">
                  {summary.jobs?.active || 0}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Succeeded
                </Typography>
                <Typography variant="h6" fontWeight={700} color="success.main">
                  {summary.jobs?.succeeded || 0}
                </Typography>
              </Box>
            </Box>
          }
        />

        {/* CronJobs */}
        <ResourceCard
          name="CronJobs"
          resourceType={`${summary.cronjobs?.total || 0} total`}
          resourceColor="#4CAF50"
          icon={ScheduleIcon}
          onClick={() => router.push('/cronjobs')}
          metrics={
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Active
                </Typography>
                <Typography variant="h6" fontWeight={700} color="info.main">
                  {summary.cronjobs?.active || 0}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Suspended
                </Typography>
                <Typography variant="h6" fontWeight={700} color="warning.main">
                  {summary.cronjobs?.suspended || 0}
                </Typography>
              </Box>
            </Box>
          }
        />
      </Box>

      {/* Network & Storage Section - side by side on wide screens */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
        {/* Network */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: 'text.secondary',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Network
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gridAutoRows: '1fr',
              gap: 2,
            }}
          >
            {/* Services */}
            <ResourceCard
              name="Services"
              resourceType={`${summary.services || 0} total`}
              resourceColor="#00BCD4"
              icon={CloudIcon}
              onClick={() => router.push('/services')}
              metrics={
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {summary.services || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Click to view details
                  </Typography>
                </Box>
              }
            />

            {/* Ingress */}
            <ResourceCard
              name="Ingress"
              resourceType={`${summary.ingress || 0} total`}
              resourceColor="#0EA5E9"
              icon={HttpIcon}
              onClick={() => router.push('/ingress')}
              metrics={
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {summary.ingress || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Click to view details
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Box>

        {/* Storage */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: 'text.secondary',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Storage
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gridAutoRows: '1fr',
              gap: 2,
            }}
          >
            {/* Persistent Volumes */}
            <ResourceCard
              name="Persistent Volumes"
              resourceType={`${summary.pv.total} total`}
              resourceColor="#F59E0B"
              icon={FolderOpenIcon}
              onClick={() => router.push('/pv')}
              metrics={
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Bound
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="success.main">
                      {summary.pv.bound}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Unbound
                    </Typography>
                    <Typography variant="h6" fontWeight={700} color="warning.main">
                      {summary.pv.total - summary.pv.bound}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
