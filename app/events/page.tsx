'use client'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { useState } from 'react'
import { useRecentEvents } from '@/lib/hooks/use-dashboard'
import { useAutoRefresh } from '@/lib/hooks/use-auto-refresh'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { PageHeader } from '@/app/components/common/page-header'
import { SearchBar } from '@/app/components/common/search-bar'
import { EmptyState } from '@/app/components/common/empty-state'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import { formatAge } from '@/lib/core/utils'
import type { Event } from '@/types/kubernetes'

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'Normal' | 'Warning' | ''>('')
  const [timeRange, setTimeRange] = useState(24) // Time range in hours

  const { data: events, isLoading, error, refetch } = useRecentEvents(timeRange)

  // Auto-refresh
  useAutoRefresh(refetch)

  const filteredEvents = events?.filter((event) => {
    if (typeFilter && event.type !== typeFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        event.name.toLowerCase().includes(query) ||
        event.reason.toLowerCase().includes(query) ||
        event.message.toLowerCase().includes(query) ||
        event.kind.toLowerCase().includes(query)
      )
    }
    return true
  }) || []

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Event>(
    filteredEvents,
    'lastTimestamp',
    'desc'
  )

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Events" onRefresh={refetch} />
        <TableSkeleton rows={10} columns={6} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Events" onRefresh={refetch} />
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Events" />
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title="Events"
        subtitle={`${events?.length || 0} event${events?.length === 1 ? '' : 's'} in the last ${timeRange} hour${timeRange === 1 ? '' : 's'}`}
        onRefresh={refetch}
        isRefreshing={isLoading}
      />

      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search events..."
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Type Filter</InputLabel>
          <Select
            value={typeFilter}
            label="Type Filter"
            onChange={(e) => setTypeFilter(e.target.value as 'Normal' | 'Warning' | '')}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Warning">Warning</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value as number)}
          >
            <MenuItem value={1}>Last 1 Hour</MenuItem>
            <MenuItem value={6}>Last 6 Hours</MenuItem>
            <MenuItem value={12}>Last 12 Hours</MenuItem>
            <MenuItem value={24}>Last 24 Hours</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {!events || events.length === 0 ? (
        <EmptyState
          icon={EventNoteIcon}
          title="No events found"
          description={`No events found in the last ${timeRange} hour${timeRange === 1 ? '' : 's'}.`}
        />
      ) : filteredEvents.length === 0 ? (
        <EmptyState
          icon={EventNoteIcon}
          title="No matching events"
          description={searchQuery
            ? `No events match "${searchQuery}". Try adjusting your search or filters.`
            : 'No events match your filters. Try adjusting them.'
          }
          action={{
            label: 'Clear filters',
            onClick: () => {
              setSearchQuery('')
              setTypeFilter('')
            },
          }}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <SortableTableCell
                  field="type"
                  label="Type"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="reason"
                  label="Reason"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="kind"
                  label="Kind"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="name"
                  label="Name"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableCell>Message</TableCell>
                <SortableTableCell
                  field="count"
                  label="Count"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableCell
                  field="lastTimestamp"
                  label="Age"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((event, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Chip
                      label={event.type}
                      size="small"
                      color={event.type === 'Warning' ? 'warning' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{event.reason}</TableCell>
                  <TableCell>{event.kind}</TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell sx={{ maxWidth: 400 }}>
                    {event.message}
                  </TableCell>
                  <TableCell>{event.count}</TableCell>
                  <TableCell>{formatAge(event.lastTimestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
