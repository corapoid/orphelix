import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import CloudIcon from '@mui/icons-material/Cloud'
import type { Service } from '@/types/kubernetes'

interface ServiceCardProps {
  service: Service
  onClick?: () => void
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  const resourceColor = '#00BCD4' // Cyan for services

  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        p: 2,
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : '#ffffff',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.06)',
        borderLeft: (theme) =>
          `3px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)'}`,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 2px 8px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
            : '0 2px 8px 0 rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
        '&:hover': {
          transform: 'translateY(-2px) scale(1.01)',
          borderLeft: `3px solid ${resourceColor}`,
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.18)'
              : 'rgba(0, 0, 0, 0.1)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 24px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
              : '0 8px 24px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
        },
        '&:active': {
          transform: 'translateY(0px) scale(0.98)',
        },
      }}
    >
      {/* Header with icon and name */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${resourceColor}35 0%, ${resourceColor}20 100%)`
                : `linear-gradient(135deg, ${resourceColor}20 0%, ${resourceColor}10 100%)`,
            flexShrink: 0,
          }}
        >
          <CloudIcon sx={{ fontSize: 22, color: resourceColor }} />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            fontWeight={700}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mb: 0.5,
            }}
          >
            {service.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Service
          </Typography>
        </Box>
      </Box>

      {/* Type Badge */}
      <Box sx={{ mb: 1.5 }}>
        <Chip
          label={service.type}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 24,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(0, 188, 212, 0.2)' : 'rgba(0, 188, 212, 0.15)',
            color: (theme) => (theme.palette.mode === 'dark' ? '#4DD0E1' : '#00BCD4'),
          }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Cluster IP
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {service.clusterIP}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            Ports
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {service.ports.join(', ')}
          </Typography>
        </Box>
      </Box>

      {/* Age */}
      <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">
          Age: {service.age}
        </Typography>
      </Box>
    </Paper>
  )
}
