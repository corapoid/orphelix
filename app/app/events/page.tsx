'use client'

import EventNoteIcon from '@mui/icons-material/EventNote'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useRecentEvents } from '@/lib/hooks/use-dashboard'
import { formatAge } from '@/lib/core/utils'
import { StatusBadge } from '@/app/components/common/status-badge'
import { ResourceListView, TableColumn } from '@/app/components/common/resource-list-view'
import type { Event } from '@/types/kubernetes'

export default function EventsPage() {
  const [typeFilter, setTypeFilter] = useState<'Normal' | 'Warning' | ''>('')
  const [timeRange, setTimeRange] = useState(24) // Time range in hours

  const { data: events, isLoading, error, refetch } = useRecentEvents(timeRange)

  const columns: TableColumn<Event>[] = [
    {
      field: 'type',
      label: 'Type',
      render: (event) => <StatusBadge status={event.type} />,
    },
    {
      field: 'reason',
      label: 'Reason',
    },
    {
      field: 'kind',
      label: 'Kind',
    },
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'message',
      label: 'Message',
      sortable: false,
      render: (event) => (
        <Tooltip title={event.message} placement="top-start" arrow>
          <Typography variant="body2" sx={{
            maxWidth: 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {event.message}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'count',
      label: 'Count',
    },
    {
      field: 'lastTimestamp',
      label: 'Age',
      render: (event) => formatAge(event.lastTimestamp),
    },
  ]

  return (
    <ResourceListView
      title="Events"
      resourceName="event"
      resourceNamePlural="events"
      icon={EventNoteIcon}
      data={events}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      searchPlaceholder="Search events..."
      searchFilter={(event, query) => {
        const q = query.toLowerCase()
        return (
          event.name.toLowerCase().includes(q) ||
          event.reason.toLowerCase().includes(q) ||
          event.message.toLowerCase().includes(q) ||
          event.kind.toLowerCase().includes(q)
        )
      }}
      customFilter={typeFilter ? (event) => event.type === typeFilter : undefined}
      filters={[
        {
          label: 'Type',
          value: typeFilter,
          options: [
            { label: 'All Types', value: '' },
            { label: 'Normal', value: 'Normal' },
            { label: 'Warning', value: 'Warning' },
          ],
          onChange: (value) => setTypeFilter(value as 'Normal' | 'Warning' | ''),
        },
        {
          label: 'Time Range',
          value: String(timeRange),
          options: [
            { label: 'Last 1 Hour', value: '1' },
            { label: 'Last 6 Hours', value: '6' },
            { label: 'Last 12 Hours', value: '12' },
            { label: 'Last 24 Hours', value: '24' },
          ],
          onChange: (value) => setTimeRange(Number(value)),
        },
      ]}
      columns={columns}
      defaultSortField="lastTimestamp"
      defaultSortOrder="desc"
      getRowKey={(event, index) => `${event.name}-${event.lastTimestamp}-${index}`}
      emptyStateDescription={`No events found in the last ${timeRange} hour${timeRange === 1 ? '' : 's'}.`}
      showClusterAlert={false}
    />
  )
}
