'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Chip from '@mui/material/Chip'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useModeStore } from '@/lib/core/store'

/**
 * Flux GitOps integration page
 *
 * Shows information about Flux CD integration and GitOps workflows
 */
export default function FluxPage() {
  const mode = useModeStore((state) => state.mode)

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4">Flux GitOps</Typography>
        <Chip
          icon={<GitHubIcon />}
          label="GitOps Ready"
          color="primary"
          variant="outlined"
        />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>Flux CD Integration</AlertTitle>
          This dashboard is ready for Flux CD integration. Flux CD is a GitOps tool that keeps
          Kubernetes clusters in sync with Git repositories.
        </Alert>

        <Typography variant="h6" gutterBottom>
          Supported Flux Resources
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>
            <strong>GitRepository</strong> - Git repository sources for manifests
          </li>
          <li>
            <strong>Kustomization</strong> - Kustomize overlay applications
          </li>
          <li>
            <strong>HelmRelease</strong> - Helm chart deployments
          </li>
        </Box>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Features
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>Real-time reconciliation status</li>
          <li>Git repository health monitoring</li>
          <li>Automatic deployment tracking</li>
          <li>Rollback capabilities</li>
        </Box>

        {mode === 'mock' && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            <AlertTitle>Demo Mode</AlertTitle>
            Flux integration requires a live Kubernetes cluster with Flux CD installed.
            Switch to <strong>LIVE</strong> mode to see real Flux resources.
          </Alert>
        )}

        {mode === 'real' && (
          <Alert severity="info" sx={{ mt: 3 }}>
            <AlertTitle>Next Steps</AlertTitle>
            To use Flux CD:
            <ol>
              <li>Install Flux CD on your cluster: <code>flux bootstrap</code></li>
              <li>Configure Git repository sources</li>
              <li>Create Kustomization or HelmRelease resources</li>
              <li>Monitor deployments in real-time through this dashboard</li>
            </ol>
          </Alert>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Learn More
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Flux CD documentation and resources:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>
            <a
              href="https://fluxcd.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              Official Flux CD Documentation
            </a>
          </li>
          <li>
            <a
              href="https://fluxcd.io/flux/get-started/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              Getting Started Guide
            </a>
          </li>
          <li>
            <a
              href="https://github.com/fluxcd/flux2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              Flux GitHub Repository
            </a>
          </li>
        </Box>
      </Paper>
    </Box>
  )
}
