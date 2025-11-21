'use client'

import Typography from '@mui/material/Typography'
import WorkIcon from '@mui/icons-material/Work'
import { useState } from 'react'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'
import { useJobs } from '@/lib/hooks/use-jobs'
import { StatusBadge } from '@/app/components/common/status-badge'
import { JobCard } from '@/app/components/jobs/job-card'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import type { Job, JobStatus } from '@/types/kubernetes'

export default function JobsPage() {
  const navigateTo = useNavigateTo()
  const [statusFilter, setStatusFilter] = useState<JobStatus | ''>('')
  const { data: jobs, isLoading, error, refetch } = useJobs()

  const columns: TableColumn<Job>[] = [
    {
      field: 'name',
      label: 'Name',
      render: (job) => (
        <Typography variant="body2" fontWeight="medium">
          {job.name}
        </Typography>
      ),
    },
    {
      field: 'status',
      label: 'Status',
      render: (job) => <StatusBadge status={job.status} />,
    },
    {
      field: 'completions',
      label: 'Completions',
      align: 'center',
      render: (job) => `${job.succeeded}/${job.completions}`,
    },
    {
      field: 'duration',
      label: 'Duration',
      render: (job) => job.duration || 'N/A',
    },
    {
      field: 'active',
      label: 'Active',
      align: 'center',
    },
    {
      field: 'failed',
      label: 'Failed',
      align: 'center',
    },
    {
      field: 'age',
      label: 'Age',
    },
  ]

  return (
    <ResourceListView
      title="Jobs"
        resourceName="job"
        resourceNamePlural="jobs"
        icon={WorkIcon}
        data={jobs}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        searchPlaceholder="Search jobs..."
        searchFilter={(job, query) => job.name.toLowerCase().includes(query.toLowerCase())}
        customFilter={statusFilter ? (job) => job.status === statusFilter : undefined}
        filters={[
          {
            label: 'Status',
            value: statusFilter,
            options: [
              { label: 'All Statuses', value: '' },
              { label: 'Running', value: 'Running' },
              { label: 'Succeeded', value: 'Succeeded' },
              { label: 'Failed', value: 'Failed' },
            ],
            onChange: (value) => setStatusFilter(value as JobStatus | ''),
          },
        ]}
        columns={columns}
        defaultSortField="name"
        defaultSortOrder="asc"
        getRowKey={(job) => job.name}
        onRowClick={(job) => navigateTo(`/jobs/${job.name}`)}
        renderCard={(job, onClick) => <JobCard job={job} onClick={onClick} />}
        emptyStateDescription="There are no jobs in this namespace. Create a job to run batch tasks."
      />
  )
}
