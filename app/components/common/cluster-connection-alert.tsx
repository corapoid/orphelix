'use client'

import { Alert, Box, Button, Link, Typography } from '@mui/material'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useClusterHealth } from '@/lib/hooks/use-cluster-health'

interface ClusterConnectionAlertProps {
  minimal?: boolean
}

export function ClusterConnectionAlert({ minimal = false }: ClusterConnectionAlertProps) {
  const { data: health, isLoading, refetch } = useClusterHealth()

  // Don't show anything while loading
  if (isLoading) {
    return null
  }

  // Don't show anything if connected
  if (health?.status === 'connected') {
    return null
  }

  // Minimal version - just a small banner
  if (minimal) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2">
            No cluster connection. {health?.message || 'Unable to reach Kubernetes cluster.'}
          </Typography>
          <Button size="small" startIcon={<RefreshIcon />} onClick={() => refetch()}>
            Retry
          </Button>
        </Box>
      </Alert>
    )
  }

  // Full version - detailed error with liquid glass styling
  return (
    <Box
      sx={{
        m: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 30, 46, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 100, 100, 0.3)'
            : 'rgba(211, 47, 47, 0.3)',
        borderRadius: '12px',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 4px 16px 0 rgba(211, 47, 47, 0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        <CloudOffIcon sx={{ fontSize: 32, color: 'error.main', mt: 0.5 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Cluster Connection Failed
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {health?.message || 'Unable to connect to Kubernetes cluster.'}
          </Typography>

          <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
            Troubleshooting Steps:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2.5, mb: 0, '& li': { mb: 0.5 } }}>
            <li>
              <Typography variant="body2">
                Check your <code style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>kubeconfig</code> file is properly configured
              </Typography>
            </li>
            <li>
              <Typography variant="body2">Verify your cluster credentials are valid and not expired</Typography>
            </li>
            <li>
              <Typography variant="body2">Ensure you have network access to your cluster</Typography>
            </li>
            <li>
              <Typography variant="body2">
                Run <code style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>kubectl cluster-info</code> to verify connectivity
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Check the{' '}
                <Link
                  href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/"
                  target="_blank"
                  rel="noopener"
                  sx={{ fontWeight: 500 }}
                >
                  Kubernetes documentation
                </Link>{' '}
                for help
              </Typography>
            </li>
          </Box>

          {health?.code && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Error Code: {health.code}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={() => refetch()}
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          Retry
        </Button>
      </Box>
    </Box>
  )
}
