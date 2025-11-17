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

  // Full version - centered modal with liquid glass
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: '100%',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 46, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(209, 213, 219, 0.4)',
          borderRadius: '16px',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
              : '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <CloudOffIcon sx={{ fontSize: 48, color: 'error.main' }} />
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Cluster Connection Failed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {health?.message || 'Unable to connect to Kubernetes cluster.'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Troubleshooting Steps:
          </Typography>
          <Box component="ul" sx={{ mt: 1.5, pl: 2.5, mb: 0, '& li': { mb: 1 } }}>
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
        </Box>

        {health?.code && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            Error Code: {health.code}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => refetch()}
            sx={{
              px: 3,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Retry Connection
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
