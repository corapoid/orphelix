'use client'

import { Alert, AlertTitle, Box, Button, Link, Typography } from '@mui/material'
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

  // Full version - detailed error message
  return (
    <Alert
      severity="error"
      icon={<CloudOffIcon fontSize="large" />}
      sx={{ mb: 3 }}
      action={
        <Button color="inherit" size="small" startIcon={<RefreshIcon />} onClick={() => refetch()}>
          Retry Connection
        </Button>
      }
    >
      <AlertTitle>Cluster Connection Failed</AlertTitle>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {health?.message || 'Unable to connect to Kubernetes cluster.'}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Troubleshooting:
        </Typography>
        <Box component="ul" sx={{ mt: 1, pl: 2, mb: 0 }}>
          <li>
            <Typography variant="body2">
              Check your <code>kubeconfig</code> file is properly configured
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
              Run <code>kubectl cluster-info</code> to verify cluster connectivity
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Check the{' '}
              <Link
                href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/"
                target="_blank"
                rel="noopener"
              >
                Kubernetes documentation
              </Link>{' '}
              for configuration help
            </Typography>
          </li>
        </Box>
      </Box>

      {health?.code && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Error Code: {health.code}
        </Typography>
      )}
    </Alert>
  )
}
