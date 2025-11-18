'use client'

import { useState, lazy, Suspense } from 'react'

const ChangesModal = lazy(() => import('@/app/components/repo-browser/changes-modal').then(m => ({ default: m.ChangesModal })))
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
import EditNoteIcon from '@mui/icons-material/EditNote'
import { NamespaceSelector } from './namespace-selector'
import { RealtimeStatus } from './realtime-status'
import { ContextSelectorInline } from './context-selector-inline'
import { BranchSelectorInline } from './branch-selector-inline'
import { SearchBar } from '../common/search-bar'
import { useModeStore, useGitHubStore } from '@/lib/core/store'
import { mockGitHubRepo } from '@/lib/mocks/github-data'
import { usePathname, useRouter } from 'next/navigation'
import { useThemeMode } from '../theme-provider'
import { useSearch } from '@/lib/contexts/search-context'

export function TopBar() {
  const mode = useModeStore((state) => state.mode)
  const { selectedRepo, editBasket } = useGitHubStore()
  const pathname = usePathname()
  const router = useRouter()

  // Use mock repo in demo mode
  const displayRepo = pathname === '/demo/repo-browser' ? mockGitHubRepo : selectedRepo
  const { mode: themeMode, setThemeMode } = useThemeMode()
  const { searchQuery, setSearchQuery, searchPlaceholder } = useSearch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [changesModalOpen, setChangesModalOpen] = useState(false)
  const open = Boolean(anchorEl)
  const editedFilesCount = editBasket.size

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
      {/* Left side - Cluster/Branch selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
        {(pathname === '/repo-browser' || pathname === '/demo/repo-browser') ? <BranchSelectorInline /> : <ContextSelectorInline />}
      </Box>

      {/* Center - Search with context (hidden on dashboard) */}
      {pathname !== '/' && pathname !== '/demo' && (
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
      )}

      {/* Right side - Namespace/Repo, Status, and Settings */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        {(pathname === '/repo-browser' || pathname === '/demo/repo-browser') && displayRepo ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {editedFilesCount > 0 && (
              <Tooltip title={`${editedFilesCount} file${editedFilesCount > 1 ? 's' : ''} modified - Click to review`}>
                <Box
                  onClick={() => setChangesModalOpen(true)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: 'warning.main',
                    color: 'warning.contrastText',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'warning.dark',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <EditNoteIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2" fontWeight={600}>
                    {editedFilesCount}
                  </Typography>
                </Box>
              </Tooltip>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Repository:
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {displayRepo.owner}/{displayRepo.repo}
              </Typography>
            </Box>
          </Box>
        ) : (
          <NamespaceSelector />
        )}
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
          <MenuItem onClick={() => handleNavigation('/settings?tab=0')}>
            <ListItemIcon>
              <CloudIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cluster Settings</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings?tab=1')}>
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>GitHub Integration</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings?tab=2')}>
            <ListItemIcon>
              <AutoAwesomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>AI Features</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/settings?tab=3')}>
            <ListItemIcon>
              <PaletteOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Design</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>

    {/* Changes Modal */}
    {changesModalOpen && (
      <Suspense fallback={null}>
        <ChangesModal open={changesModalOpen} onClose={() => setChangesModalOpen(false)} />
      </Suspense>
    )}
    </>
  )
}
