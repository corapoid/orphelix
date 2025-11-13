import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { formatAge } from '@/lib/utils'
import type { Event } from '@/types/kubernetes'

interface RecentEventsProps {
  events: Event[]
  loading?: boolean
  error?: Error | null
}

export function RecentEvents({ events, loading, error }: RecentEventsProps) {
  if (loading) {
    return (
      <Paper>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Recent Events</Typography>
          <Typography variant="body2" color="text.secondary">
            Latest cluster events from the last 24 hours
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Recent Events</Typography>
          <Typography variant="body2" color="text.secondary">
            Latest cluster events from the last 24 hours
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Alert severity="error">Failed to load events: {error.message}</Alert>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Recent Events</Typography>
        <Typography variant="body2" color="text.secondary">
          Latest cluster events from the last 24 hours • {events.length} events
        </Typography>
      </Box>
      <Box>
        {events.length === 0 ? (
          <Box sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              No events found
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {events.map((event, index) => (
              <ListItem
                key={`${event.name}-${event.reason}-${index}`}
                alignItems="flex-start"
                sx={{
                  borderBottom: index < events.length - 1 ? 1 : 0,
                  borderColor: 'divider',
                  px: 3,
                  py: 2,
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Chip
                        label={event.type}
                        size="small"
                        color={event.type === 'Warning' ? 'warning' : 'success'}
                        sx={{ minWidth: 80 }}
                      />
                      <Typography variant="body2" fontWeight="medium">
                        {event.reason}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {formatAge(event.lastTimestamp)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {event.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.kind}: {event.name}
                        {event.count > 1 && ` (×${event.count})`}
                      </Typography>
                    </Box>
                  }
                  primaryTypographyProps={{ component: 'div' }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  )
}
