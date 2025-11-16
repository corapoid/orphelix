'use client'

import Box from '@mui/material/Box'
import { NamespaceSelector } from './namespace-selector'
import { RealtimeStatus } from './realtime-status'
import { ContextSelectorInline } from './context-selector-inline'
import { SearchInput } from './search-input'
import { useModeStore } from '@/lib/core/store'

export function TopBar() {
  const mode = useModeStore((state) => state.mode)

  return (
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
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
        <ContextSelectorInline />
      </Box>

      {/* Center - Search */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <SearchInput />
      </Box>

      {/* Right side - Namespace and Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0, flex: 1, justifyContent: 'flex-end' }}>
        <NamespaceSelector />
        <RealtimeStatus />
      </Box>
    </Box>
  )
}
