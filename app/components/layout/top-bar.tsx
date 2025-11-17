'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import CloudIcon from '@mui/icons-material/Cloud'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import GitHubIcon from '@mui/icons-material/GitHub'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import { NamespaceSelector } from './namespace-selector'
import { RealtimeStatus } from './realtime-status'
import { ContextSelectorInline } from './context-selector-inline'
import { SearchBar } from '../common/search-bar'
import { useModeStore } from '@/lib/core/store'
import { usePathname, useRouter } from 'next/navigation'
import { useThemeMode } from '../theme-provider'
import { useSearch } from '@/lib/contexts/search-context'

export function TopBar() {
  const mode = useModeStore((state) => state.mode)
  const pathname = usePathname()
  const router = useRouter()
  const { mode: themeMode, setThemeMode } = useThemeMode()
  const { searchQuery, setSearchQuery, searchPlaceholder } = useSearch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setThemeMode(newMode)
  }

  const handleNavigation = (path: string) => {
    handleClose()
    // Prefix path with /demo if in mock mode
    const finalPath = mode === 'mock' ? `/demo${path}` : path
    router.push(finalPath as any)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          minHeight: 56,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'transparent',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          gap: 3,
        }}
      >
      {/* Left side - Cluster selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
        <ContextSelectorInline />
      </Box>

      {/* Center - Search with context */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center', maxWidth: 600 }}>
        <Box sx={{ flex: 1 }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={searchPlaceholder}
            fullWidth
          />
        </Box>
      </Box>

      {/* Right side - Namespace, Status, and Settings */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        <NamespaceSelector />
        <RealtimeStatus />
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            color: pathname === '/settings' ? 'primary.main' : 'text.secondary',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'primary.main',
              bgcolor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(255, 255, 255, 0.08)',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
            },
          }}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              minWidth: 200,
              borderRadius: 2,
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            },
          }}
        >
          {/* Theme Mode Icons */}
          <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1, justifyContent: 'center' }}>
            <Tooltip title="Light Mode">
              <IconButton
                size="small"
                onClick={() => handleThemeChange('light')}
                sx={{
                  color: themeMode === 'light' ? 'primary.main' : 'text.secondary',
                  bgcolor: themeMode === 'light' ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <LightModeOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Dark Mode">
              <IconButton
                size="small"
                onClick={() => handleThemeChange('dark')}
                sx={{
                  color: themeMode === 'dark' ? 'primary.main' : 'text.secondary',
                  bgcolor: themeMode === 'dark' ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="System">
              <IconButton
                size="small"
                onClick={() => handleThemeChange('system')}
                sx={{
                  color: themeMode === 'system' ? 'primary.main' : 'text.secondary',
                  bgcolor: themeMode === 'system' ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <LaptopOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <MenuItem onClick={() => handleNavigation('/settings')}>
            <ListItemIcon>
              <CloudIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cluster Settings</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings?tab=2')}>
            <ListItemIcon>
              <AutoAwesomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>AI Features</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings?tab=3')}>
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>GitHub Integration</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings?tab=4')}>
            <ListItemIcon>
              <PaletteOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Design</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
    </>
  )
}
