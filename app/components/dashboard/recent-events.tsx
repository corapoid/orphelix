import { useState } from 'react'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { formatAge } from '@/lib/core/utils'
import type { Event } from '@/types/kubernetes'

interface RecentEventsProps {
  events: Event[]
  loading?: boolean
  error?: Error | null
}

export function RecentEvents({ events, loading, error }: RecentEventsProps) {
  const [showAll, setShowAll] = useState(false)
  const PREVIEW_COUNT = 5
  const displayedEvents = showAll ? events : events.slice(0, PREVIEW_COUNT)
  const hasMore = events.length > PREVIEW_COUNT

  if (loading) {
    return (
      <Paper>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Recent Activity</Typography>
          <Typography variant="body2" color="text.secondary">
            Latest cluster events from the last hour
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
          <Typography variant="h6">Recent Activity</Typography>
          <Typography variant="body2" color="text.secondary">
            Latest cluster events from the last hour
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
        <Typography variant="h6">Recent Activity</Typography>
        <Typography variant="body2" color="text.secondary">
          Latest cluster events from the last hour • {events.length} event{events.length !== 1 ? 's' : ''}
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
          <>
            <List sx={{ p: 0 }}>
              {displayedEvents.map((event, index) => (
                <ListItem
                  key={`${event.name}-${event.reason}-${index}`}
                  alignItems="flex-start"
                  sx={{
                    borderBottom: 1,
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
            {hasMore && (
              <Box sx={{ p: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setShowAll(!showAll)}
                  endIcon={showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                  {showAll ? 'Show Less' : `Show ${events.length - PREVIEW_COUNT} More`}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Paper>
  )
}
