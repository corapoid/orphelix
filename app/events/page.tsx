'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
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
import { useState } from 'react'
import { useRecentEvents } from '@/lib/hooks/use-dashboard'
import { TableSkeleton } from '@/app/components/common/table-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { SortableTableCell } from '@/app/components/common/sortable-table-cell'
import { useSortableTable } from '@/lib/hooks/use-table-sort'
import { formatAge } from '@/lib/utils'
import type { Event } from '@/types/kubernetes'

export default function EventsPage() {
  const [typeFilter, setTypeFilter] = useState<'Normal' | 'Warning' | ''>('')
  const [timeRange, setTimeRange] = useState(24) // Time range in hours

  const { data: events, isLoading, error, refetch } = useRecentEvents(timeRange)

  const filteredEvents = events?.filter((event) =>
    typeFilter ? event.type === typeFilter : true
  ) || []

  const { sortedData, sortField, sortOrder, handleSort } = useSortableTable<Event>(
    filteredEvents,
    'lastTimestamp',
    'desc'
  )

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <TableSkeleton rows={10} columns={6} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <ErrorState error={error} onRetry={() => refetch()} title="Failed to Load Events" />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Events</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
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
      </Box>

      {filteredEvents && filteredEvents.length === 0 ? (
        <Alert severity="info">No events found</Alert>
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
