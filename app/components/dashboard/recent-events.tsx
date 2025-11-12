import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
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
      <Card>
        <CardHeader title="Recent Events" />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader title="Recent Events" />
        <CardContent>
          <Alert severity="error">Failed to load events: {error.message}</Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader title="Recent Events" subheader={`Last ${events.length} events`} />
      <CardContent sx={{ pt: 0 }}>
        {events.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
            No events found
          </Typography>
        ) : (
          <List sx={{ pt: 0 }}>
            {events.map((event, index) => (
              <ListItem
                key={`${event.name}-${event.reason}-${index}`}
                alignItems="flex-start"
                sx={{
                  borderBottom: index < events.length - 1 ? 1 : 0,
                  borderColor: 'divider',
                  px: 0,
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
      </CardContent>
    </Card>
  )
}
