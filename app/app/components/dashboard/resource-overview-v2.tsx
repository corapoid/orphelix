'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import WidgetsIcon from '@mui/icons-material/Widgets'
import WorkIcon from '@mui/icons-material/Work'
import ScheduleIcon from '@mui/icons-material/Schedule'
import CloudIcon from '@mui/icons-material/Cloud'
import HttpIcon from '@mui/icons-material/Http'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import StorageIcon from '@mui/icons-material/Storage'
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream'
import ConfigIcon from '@mui/icons-material/Description'
import SecretIcon from '@mui/icons-material/Lock'
import { ResourceCard } from '@/app/components/common/resource-card'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useSidebarPins } from '@/lib/core/store'
import type { DashboardSummary } from '@/types/kubernetes'
import type { SvgIconComponent } from '@mui/icons-material'

interface ResourceOverviewV2Props {
  summary: DashboardSummary
}

interface ResourceConfig {
  path: string
  name: string
  icon: SvgIconComponent
  color: string
  renderMetrics: (summary: DashboardSummary) => React.ReactNode
  getResourceType: (summary: DashboardSummary) => string
}

const resourceConfigs: ResourceConfig[] = [
  // Workloads - in sidebar order
  {
    path: '/deployments',
    name: 'Deployments',
    icon: AccountTreeIcon,
    color: '#6366F1',
    getResourceType: (s) => `${s.deployments.total} total`,
    renderMetrics: (s) => (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Healthy
          </Typography>
          <Typography variant="body1" fontWeight={700} color="success.main">
            {s.deployments.healthy}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Degraded
          </Typography>
          <Typography variant="body1" fontWeight={700} color="error.main">
            {s.deployments.degraded}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    path: '/statefulsets',
    name: 'StatefulSets',
    icon: StorageIcon,
    color: '#7C3AED',
    getResourceType: (s) => `${s.statefulsets?.total || 0} total`,
    renderMetrics: (s) => (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Ready
          </Typography>
          <Typography variant="body1" fontWeight={700} color="success.main">
            {s.statefulsets?.ready || 0}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Not Ready
          </Typography>
          <Typography variant="body1" fontWeight={700} color="error.main">
            {s.statefulsets?.notReady || 0}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    path: '/daemonsets',
    name: 'DaemonSets',
    icon: SettingsSystemDaydreamIcon,
    color: '#9333EA',
    getResourceType: (s) => `${s.daemonsets?.total || 0} total`,
    renderMetrics: (s) => (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Ready
          </Typography>
          <Typography variant="body1" fontWeight={700} color="success.main">
            {s.daemonsets?.ready || 0}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Not Ready
          </Typography>
          <Typography variant="body1" fontWeight={700} color="error.main">
            {s.daemonsets?.notReady || 0}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    path: '/pods',
    name: 'Pods',
    icon: WidgetsIcon,
    color: '#8B5CF6',
    getResourceType: (s) => `${s.pods.total} total`,
    renderMetrics: (s) => (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Running
          </Typography>
          <Typography variant="body1" fontWeight={700} color="success.main">
            {s.pods.running}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Failed
          </Typography>
          <Typography variant="body1" fontWeight={700} color="error.main">
            {s.pods.failed}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    path: '/jobs',
    name: 'Jobs',
    icon: WorkIcon,
    color: '#EC4899',
    getResourceType: (s) => `${s.jobs?.total || 0} total`,
    renderMetrics: (s) => (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Active
          </Typography>
          <Typography variant="body1" fontWeight={700} color="info.main">
            {s.jobs?.active || 0}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Succeeded
          </Typography>
          <Typography variant="body1" fontWeight={700} color="success.main">
            {s.jobs?.succeeded || 0}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    path: '/cronjobs',
    name: 'CronJobs',
    icon: ScheduleIcon,
    color: '#A855F7',
    getResourceType: (s) => `${s.cronjobs?.total || 0} total`,
    renderMetrics: (s) => (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Active
          </Typography>
          <Typography variant="body1" fontWeight={700} color="info.main">
            {s.cronjobs?.active || 0}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Suspended
          </Typography>
          <Typography variant="body1" fontWeight={700} color="warning.main">
            {s.cronjobs?.suspended || 0}
          </Typography>
        </Box>
      </Box>
    ),
  },
  // Network
  {
    path: '/services',
    name: 'Services',
    icon: CloudIcon,
    color: '#3B82F6',
    getResourceType: (s) => `${s.services || 0} total`,
    renderMetrics: (s) => (
      <Box>
        <Typography variant="body1" fontWeight={700}>
          {s.services || 0}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Click to view details
        </Typography>
      </Box>
    ),
  },
  {
    path: '/ingress',
    name: 'Ingress',
    icon: HttpIcon,
    color: '#0EA5E9',
    getResourceType: (s) => `${s.ingress || 0} total`,
    renderMetrics: (s) => (
      <Box>
        <Typography variant="body1" fontWeight={700}>
          {s.ingress || 0}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Click to view details
        </Typography>
      </Box>
    ),
  },
  // Config & Storage
  {
    path: '/configmaps',
    name: 'ConfigMaps',
    icon: ConfigIcon,
    color: '#10B981',
    getResourceType: (s) => `${s.configMaps || 0} total`,
    renderMetrics: (s) => (
      <Box>
        <Typography variant="body1" fontWeight={700}>
          {s.configMaps || 0}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Click to view details
        </Typography>
      </Box>
    ),
  },
  {
    path: '/secrets',
    name: 'Secrets',
    icon: SecretIcon,
    color: '#F43F5E',
    getResourceType: (s) => `${s.secrets || 0} total`,
    renderMetrics: (s) => (
      <Box>
        <Typography variant="body1" fontWeight={700}>
          {s.secrets || 0}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Click to view details
        </Typography>
      </Box>
    ),
  },
  {
    path: '/pv',
    name: 'Persistent Volumes',
    icon: FolderOpenIcon,
    color: '#F59E0B',
    getResourceType: (s) => `${s.pv.total} total`,
    renderMetrics: (s) => (
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Bound
          </Typography>
          <Typography variant="body1" fontWeight={700} color="success.main">
            {s.pv.bound}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Unbound
          </Typography>
          <Typography variant="body1" fontWeight={700} color="warning.main">
            {s.pv.total - s.pv.bound}
          </Typography>
        </Box>
      </Box>
    ),
  },
]

interface SectionConfig {
  title: string
  resourcePaths: string[]
}

const sections: SectionConfig[] = [
  { title: 'Workloads', resourcePaths: ['/deployments', '/statefulsets', '/daemonsets', '/pods', '/jobs', '/cronjobs'] },
  { title: 'Network', resourcePaths: ['/services', '/ingress'] },
  { title: 'Config & Storage', resourcePaths: ['/configmaps', '/secrets', '/pv'] },
]

export function ResourceOverviewV2({ summary }: ResourceOverviewV2Props) {
  const navigateTo = useNavigateTo()
  const { isPinned } = useSidebarPins()

  return (
    <Box>
      {sections.map((section, sectionIndex) => {
        const visibleResources = section.resourcePaths
          .map((path) => resourceConfigs.find((rc) => rc.path === path))
          .filter((rc): rc is ResourceConfig => rc !== undefined && isPinned(rc.path))

        if (visibleResources.length === 0) {
          return null
        }

        return (
          <Box key={section.title} sx={{ mb: sectionIndex < sections.length - 1 ? 3 : 0 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {section.title}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gridAutoRows: '1fr',
                gap: 2,
              }}
            >
              {visibleResources.map((resource) => (
                <ResourceCard
                  key={resource.path}
                  name={resource.name}
                  resourceType={resource.getResourceType(summary)}
                  resourceColor={resource.color}
                  icon={resource.icon}
                  onClick={() => navigateTo(resource.path)}
                  metrics={resource.renderMetrics(summary)}
                />
              ))}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
