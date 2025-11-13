'use client'

import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CheckIcon from '@mui/icons-material/Check'
import { useThemeMode } from '../theme-provider'
import { useModeStore } from '@/lib/store'
import { RealtimeStatus } from './realtime-status'
import { ModeSelector } from './mode-selector'
import { NamespaceSelector } from './namespace-selector'
import { Logo } from './logo'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick: _onMenuClick }: HeaderProps) {
  const { mode: themeMode, setThemeMode, actualTheme } = useThemeMode()
  const { mode: appMode, realtimeEnabled, setRealtimeEnabled } = useModeStore()
  const [modeSelectorOpen, setModeSelectorOpen] = useState(false)
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null)

  const handleRealtimeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealtimeEnabled(event.target.checked)
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 'none',
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Logo collapsed={false} />

        <Box sx={{ flexGrow: 1 }} />

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

          <Tooltip title="Theme settings">
            <IconButton
              sx={{
                ml: 1,
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
              onClick={(e) => setThemeMenuAnchor(e.currentTarget)}
            >
              {themeMode === 'system' ? (
                <LaptopOutlinedIcon />
              ) : actualTheme === 'dark' ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={themeMenuAnchor}
            open={Boolean(themeMenuAnchor)}
            onClose={() => setThemeMenuAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => { setThemeMode('light'); setThemeMenuAnchor(null); }}>
              <ListItemIcon>
                {themeMode === 'light' && <CheckIcon fontSize="small" />}
              </ListItemIcon>
              <LightModeOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
              <ListItemText>Light</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { setThemeMode('dark'); setThemeMenuAnchor(null); }}>
              <ListItemIcon>
                {themeMode === 'dark' && <CheckIcon fontSize="small" />}
              </ListItemIcon>
              <DarkModeOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
              <ListItemText>Dark</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { setThemeMode('system'); setThemeMenuAnchor(null); }}>
              <ListItemIcon>
                {themeMode === 'system' && <CheckIcon fontSize="small" />}
              </ListItemIcon>
              <LaptopOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
              <ListItemText>System</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <ModeSelector open={modeSelectorOpen} onClose={() => setModeSelectorOpen(false)} />
    </AppBar>
  )
}
