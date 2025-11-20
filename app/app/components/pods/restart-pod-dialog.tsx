'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
} from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

interface RestartPodDialogProps {
  open: boolean
  podName: string
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

/**
 * Confirmation dialog for pod restart
 *
 * Displays warning about pod restart implications
 */
export function RestartPodDialog({
  open,
  podName,
  isLoading,
  onConfirm,
  onCancel,
}: RestartPodDialogProps) {
  return (
    <Dialog open={open} onClose={isLoading ? undefined : onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        Restart Pod
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Are you sure you want to restart pod <strong>{podName}</strong>?
        </DialogContentText>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Important</AlertTitle>
          <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
            <li>The pod will be deleted and recreated by its controller (Deployment/StatefulSet)</li>
            <li>Active connections will be terminated</li>
            <li>There may be brief downtime</li>
            <li>Standalone pods (not managed by controllers) will be permanently deleted</li>
          </Box>
        </Alert>

        <DialogContentText variant="body2" color="text.secondary">
          This action cannot be undone. The pod will go through initialization again.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="warning"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} /> : <RestartAltIcon />}
        >
          {isLoading ? 'Restarting...' : 'Restart Pod'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
