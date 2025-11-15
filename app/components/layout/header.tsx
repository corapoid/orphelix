'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { RealtimeStatus } from './realtime-status'
import { Logo } from './logo'
import { SearchBar } from '../common/search-bar'
import { NamespaceSelector } from './namespace-selector'
import { useSearch } from '@/lib/contexts/search-context'
import { useModeStore } from '@/lib/core/store'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick: _onMenuClick }: HeaderProps) {
  const { searchQuery, setSearchQuery, searchPlaceholder } = useSearch()
  const mode = useModeStore((state) => state.mode)

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
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        {/* Logo on the left */}
        <Box sx={{ flexShrink: 0 }}>
          <Logo collapsed={false} />
        </Box>

        {/* Search bar in the center */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', maxWidth: 400 }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={searchPlaceholder}
            fullWidth
          />
        </Box>

        {/* Namespace selector and Real-time status on the right */}
        <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
          {mode === 'real' && (
            <NamespaceSelector />
          )}
          <RealtimeStatus />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
