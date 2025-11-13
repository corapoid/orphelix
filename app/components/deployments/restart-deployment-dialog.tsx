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

interface RestartDeploymentDialogProps {
  open: boolean
  deploymentName: string
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

/**
 * Confirmation dialog for deployment restart
 *
 * Displays warning about deployment restart implications
 */
export function RestartDeploymentDialog({
  open,
  deploymentName,
  isLoading,
  onConfirm,
  onCancel,
}: RestartDeploymentDialogProps) {
  return (
    <Dialog open={open} onClose={isLoading ? undefined : onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        Restart Deployment
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Are you sure you want to restart deployment <strong>{deploymentName}</strong>?
        </DialogContentText>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>What happens during restart</AlertTitle>
          <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
            <li>All pods will be recreated with a rolling update strategy</li>
            <li>New pods will be created before old ones are terminated</li>
            <li>Service continuity is maintained (no downtime)</li>
            <li>The restart is triggered by updating the pod template annotation</li>
          </Box>
        </Alert>

        <DialogContentText variant="body2" color="text.secondary">
          This is a safe operation that maintains service availability through rolling updates.
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
          {isLoading ? 'Restarting...' : 'Restart Deployment'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
