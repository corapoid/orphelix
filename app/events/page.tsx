'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
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
import { formatAge } from '@/lib/utils'

export default function EventsPage() {
  const [typeFilter, setTypeFilter] = useState<'Normal' | 'Warning' | ''>('')
  const [limit, setLimit] = useState(50)

  const { data: events, isLoading, error } = useRecentEvents(100)

  const filteredEvents = events?.filter((event) =>
    typeFilter ? event.type === typeFilter : true
  ).slice(0, limit)

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <Alert severity="error">
          Failed to load events: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
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
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Limit</InputLabel>
            <Select
              value={limit}
              label="Limit"
              onChange={(e) => setLimit(e.target.value as number)}
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
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
                <TableCell>Type</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Kind</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents?.map((event, index) => (
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
