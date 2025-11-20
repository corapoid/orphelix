import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { GlassPanel } from '../common/glass-panel'
import type { Container, Probe } from '@/types/kubernetes'

interface HealthCheckSectionProps {
  containers: Container[]
}

function ProbeDisplay({ probe, type }: { probe: Probe; type: string }) {
  const getProbeTypeLabel = () => {
    switch (probe.type) {
      case 'httpGet':
        return `HTTP GET ${probe.httpGet?.path} :${probe.httpGet?.port}`
      case 'tcpSocket':
        return `TCP :${probe.tcpSocket?.port}`
      case 'exec':
        return `Exec: ${probe.exec?.command.join(' ')}`
      case 'grpc':
        return 'gRPC'
      default:
        return probe.type
    }
  }

  const getProbeTooltip = () => {
    switch (type) {
      case 'Liveness':
        return 'Determines if the container is running. If the probe fails, Kubernetes will restart the container.'
      case 'Readiness':
        return 'Determines if the container is ready to accept traffic. If the probe fails, the container will be removed from service endpoints.'
      case 'Startup':
        return 'Checks if the application has started. Delays liveness and readiness probes until this succeeds, useful for slow-starting containers.'
      default:
        return ''
    }
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Chip
          label={type}
          size="small"
          color={type === 'Liveness' ? 'error' : type === 'Readiness' ? 'success' : 'info'}
          sx={{ fontWeight: 600 }}
        />
        <Typography variant="body2" fontWeight={500}>
          {getProbeTypeLabel()}
        </Typography>
        <Tooltip title={getProbeTooltip()} arrow placement="top">
          <InfoOutlinedIcon
            sx={{
              fontSize: 16,
              color: 'text.secondary',
              cursor: 'help',
              opacity: 0.7,
              '&:hover': { opacity: 1 }
            }}
          />
        </Tooltip>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, pl: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Initial Delay:
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {probe.initialDelaySeconds || 0}s
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Period:
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {probe.periodSeconds || 10}s
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Timeout:
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {probe.timeoutSeconds || 1}s
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Failure Threshold:
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {probe.failureThreshold || 3}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export function HealthCheckSection({ containers }: HealthCheckSectionProps) {
  const hasAnyProbes = containers.some(
    (c) => c.livenessProbe || c.readinessProbe || c.startupProbe
  )

  if (!hasAnyProbes) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Health Checks
        </Typography>
        <Alert severity="info">
          No health checks configured for this pod. Consider adding liveness and readiness probes for better reliability.
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Health Checks
      </Typography>
      <GlassPanel>
        {containers.map((container) => (
          <Box key={container.name} sx={{ mb: 3, '&:last-child': { mb: 0 } }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>
              Container: {container.name}
            </Typography>

            {!container.livenessProbe && !container.readinessProbe && !container.startupProbe ? (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No probes configured
              </Typography>
            ) : (
              <>
                {container.livenessProbe && (
                  <ProbeDisplay probe={container.livenessProbe} type="Liveness" />
                )}
                {container.readinessProbe && (
                  <ProbeDisplay probe={container.readinessProbe} type="Readiness" />
                )}
                {container.startupProbe && (
                  <ProbeDisplay probe={container.startupProbe} type="Startup" />
                )}
              </>
            )}
          </Box>
        ))}
      </GlassPanel>
    </Box>
  )
}
