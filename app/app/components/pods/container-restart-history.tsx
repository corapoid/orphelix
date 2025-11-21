import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { GlassPanel } from '../common/glass-panel'
import type { ContainerStatus } from '@/types/kubernetes'

interface ContainerRestartHistoryProps {
  containerStatuses?: ContainerStatus[]
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'Unknown'
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export function ContainerRestartHistory({ containerStatuses }: ContainerRestartHistoryProps) {
  if (!containerStatuses || containerStatuses.length === 0) {
    return null
  }

  const containersWithRestarts = containerStatuses.filter(
    (cs) => cs.restartCount > 0 || cs.lastState?.terminated
  )

  if (containersWithRestarts.length === 0) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Container Status
        </Typography>
        <GlassPanel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleOutlineIcon sx={{ color: 'success.main' }} />
            <Typography variant="body2" color="text.secondary">
              All containers are healthy with no restarts
            </Typography>
          </Box>
        </GlassPanel>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Container Status
      </Typography>
      <GlassPanel>
        {containersWithRestarts.map((cs) => (
          <Box
            key={cs.name}
            sx={{
              mb: 2,
              pb: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { mb: 0, pb: 0, borderBottom: 'none' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2" fontWeight={700}>
                {cs.name}
              </Typography>
              <Chip
                icon={<RestartAltIcon />}
                label={`${cs.restartCount} restart${cs.restartCount !== 1 ? 's' : ''}`}
                size="small"
                color={cs.restartCount > 5 ? 'error' : cs.restartCount > 2 ? 'warning' : 'default'}
              />
            </Box>

            {/* Current State */}
            {cs.state.waiting && (
              <Alert severity="warning" sx={{ mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  Waiting: {cs.state.waiting.reason}
                </Typography>
                {cs.state.waiting.message && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                    {cs.state.waiting.message}
                  </Typography>
                )}
              </Alert>
            )}

            {cs.state.running && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'success.main' }} />
                <Typography variant="body2" color="text.secondary">
                  Running since {formatDate(cs.state.running.startedAt)}
                </Typography>
              </Box>
            )}

            {cs.state.terminated && (
              <Alert severity="error" sx={{ mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  Terminated: {cs.state.terminated.reason} (exit code: {cs.state.terminated.exitCode})
                </Typography>
                {cs.state.terminated.message && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                    {cs.state.terminated.message}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                  Finished {formatDate(cs.state.terminated.finishedAt)}
                </Typography>
              </Alert>
            )}

            {/* Last Terminated State */}
            {cs.lastState?.terminated && (
              <Box sx={{ mt: 1, p: 1, bgcolor: 'action.hover', borderRadius: (theme) => `${theme.shape.borderRadius}px` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <ErrorOutlineIcon sx={{ fontSize: 16, color: 'error.main' }} />
                  <Typography variant="caption" fontWeight={600} color="error">
                    Last Failure
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  Reason: {cs.lastState.terminated.reason}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  Exit Code: {cs.lastState.terminated.exitCode}
                </Typography>
                {cs.lastState.terminated.message && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {cs.lastState.terminated.message}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  Failed {formatDate(cs.lastState.terminated.finishedAt)}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </GlassPanel>

      {/* Recommendations */}
      {containersWithRestarts.some((cs) => cs.restartCount > 5) && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            High Restart Count Detected
          </Typography>
          <Typography variant="caption">
            Containers with frequent restarts may indicate configuration issues, resource constraints, or application bugs.
            Consider checking:
          </Typography>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li><Typography variant="caption">Application logs for error messages</Typography></li>
            <li><Typography variant="caption">Resource limits (CPU/memory)</Typography></li>
            <li><Typography variant="caption">Health check configurations</Typography></li>
            <li><Typography variant="caption">Dependencies and external services</Typography></li>
          </ul>
        </Alert>
      )}
    </Box>
  )
}
