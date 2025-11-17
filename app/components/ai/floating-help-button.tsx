'use client'

import { useState, useEffect } from 'react'
import Fab from '@mui/material/Fab'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import CloseIcon from '@mui/icons-material/Close'
import { TroubleshootingChat } from './troubleshooting-chat'
import { usePathname } from 'next/navigation'

export function FloatingHelpButton() {
  const [open, setOpen] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const pathname = usePathname()

  // Don't show on troubleshooting page itself
  const shouldShow = !pathname.startsWith('/troubleshooting') && !pathname.startsWith('/demo/troubleshooting')

  useEffect(() => {
    // Check if API key is configured
    const apiKey = localStorage.getItem('kubevista_openai_key')
    setHasApiKey(!!apiKey)

    // Listen for API key updates
    const handleKeyUpdate = () => {
      const key = localStorage.getItem('kubevista_openai_key')
      setHasApiKey(!!key)
    }

    window.addEventListener('openai-key-updated', handleKeyUpdate)
    return () => window.removeEventListener('openai-key-updated', handleKeyUpdate)
  }, [])

  if (!shouldShow || !hasApiKey) {
    return null
  }

  return (
    <>
      <Zoom in={true} timeout={500}>
        <Tooltip title="AI Troubleshooting Assistant" placement="left">
          <Fab
            color="primary"
            aria-label="ai help"
            onClick={() => setOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                  : 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
              '&:hover': {
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #D97706 0%, #B45309 100%)'
                    : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              },
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
            }}
          >
            <SmartToyIcon />
          </Fab>
        </Tooltip>
      </Zoom>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            maxHeight: '800px',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SmartToyIcon color="primary" />
            AI Troubleshooting Assistant
          </div>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
          <TroubleshootingChat />
        </DialogContent>
      </Dialog>
    </>
  )
}
