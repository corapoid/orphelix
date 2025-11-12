'use client'

import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { useThemeMode } from '../theme-provider'
import { useModeStore } from '@/lib/store'
import { RealtimeStatus } from './realtime-status'
import { ModeSelector } from './mode-selector'
import { NamespaceSelector } from './namespace-selector'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { mode: themeMode, toggleTheme } = useThemeMode()
  const { mode: appMode, realtimeEnabled, setRealtimeEnabled } = useModeStore()
  const [modeSelectorOpen, setModeSelectorOpen] = useState(false)

  const handleRealtimeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealtimeEnabled(event.target.checked)
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Kubernetes Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Click to change mode" arrow>
            <Chip
              label={appMode === 'mock' ? 'DEMO MODE' : 'REAL CLUSTER'}
              color={appMode === 'mock' ? 'warning' : 'success'}
              size="small"
              onClick={() => setModeSelectorOpen(true)}
              sx={{ cursor: 'pointer' }}
            />
          </Tooltip>

          {/* Namespace selector - only show in real mode */}
          <NamespaceSelector />

          {/* Real-time toggle - only show in real mode */}
          {appMode === 'real' && (
            <Tooltip title="Enable real-time updates via SSE" arrow>
              <FormControlLabel
                control={
                  <Switch
                    checked={realtimeEnabled}
                    onChange={handleRealtimeToggle}
                    color="default"
                    size="small"
                  />
                }
                label="Real-time"
                sx={{
                  color: 'inherit',
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                  },
                }}
              />
            </Tooltip>
          )}

          {/* Real-time status indicator */}
          <RealtimeStatus />

          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>

      <ModeSelector open={modeSelectorOpen} onClose={() => setModeSelectorOpen(false)} />
    </AppBar>
  )
}
