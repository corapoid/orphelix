'use client'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ScheduleIcon from '@mui/icons-material/Schedule'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { LiquidGlassChip } from '@/app/components/common/liquid-glass-chip'
import { useRouter } from 'next/navigation'
import { useCronJobs } from '@/lib/hooks/use-cronjobs'
import { CronJobCard } from '@/app/components/cronjobs/cronjob-card'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import type { CronJob } from '@/types/kubernetes'

export default function CronJobsPage() {
  const router = useRouter()
  const { data: cronjobs, isLoading, error, refetch } = useCronJobs()

  const columns: TableColumn<CronJob>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (cronJob) => (
        <Typography variant="body2" fontWeight="medium">
          {cronJob.name}
        </Typography>
      ),
    },
    {
      field: 'schedule',
      label: 'Schedule',
      render: (cronJob) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {cronJob.schedule}
        </Typography>
      ),
    },
    {
      field: 'suspend',
      label: 'Status',
      render: (cronJob) => (
        <LiquidGlassChip
          label={cronJob.suspend ? 'Suspended' : 'Active'}
          size="small"
          color={cronJob.suspend ? 'warning' : 'success'}
        />
      ),
    },
    {
      field: 'active',
      label: 'Active',
      align: 'center',
    },
    {
      field: 'lastSchedule',
      label: 'Last Schedule',
      render: (cronJob) => cronJob.lastSchedule || 'Never',
    },
    {
      field: 'age',
      label: 'Age',
    },
    {
      field: 'actions',
      label: 'Actions',
      align: 'right',
      sortable: false,
      render: (cronJob) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/cronjobs/${cronJob.name}`)
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <ResourceListView
      title="CronJobs"
      resourceName="cronjob"
      resourceNamePlural="cronjobs"
      icon={ScheduleIcon}
      data={cronjobs}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search cronjobs..."
      searchFilter={(cronJob, query) =>
        cronJob.name.toLowerCase().includes(query.toLowerCase())
      }
      columns={columns}
      defaultSortField="name"
      defaultSortOrder="asc"
      getRowKey={(cronJob) => cronJob.name}
      onRowClick={(cronJob) => router.push(`/cronjobs/${cronJob.name}`)}
      renderCard={(cronJob, onClick) => <CronJobCard cronJob={cronJob} onClick={onClick} />}
      emptyStateDescription="There are no cronjobs in this namespace. Create a cronjob to schedule recurring tasks."
    />
  )
}
