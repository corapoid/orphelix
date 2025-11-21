'use client'

import { useState, lazy, Suspense } from 'react'

const ChangesModal = lazy(() => import('@/app/components/repo-browser/changes-modal').then(m => ({ default: m.ChangesModal })))
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { NamespaceSelector } from './namespace-selector'
import { RealtimeStatus } from './realtime-status'
import { ContextSelectorInline } from './context-selector-inline'
import { BranchSelectorInline } from './branch-selector-inline'
import { SearchBar } from '../common/search-bar'
import { UserMenu } from './user-menu'
import { useGitHubStore, useModeStore } from '@/lib/core/store'
import { mockGitHubRepo } from '@/lib/mocks/github-data'
import { usePathname } from 'next/navigation'
import { useSearch } from '@/lib/contexts/search-context'

export function TopBar() {
  const { selectedRepo, editBasket } = useGitHubStore()
  const mode = useModeStore((state) => state.mode)
  const pathname = usePathname()

  // Use mock repo in demo mode
  const displayRepo = pathname === '/demo/repo-browser' ? mockGitHubRepo : selectedRepo
  const { searchQuery, setSearchQuery, searchPlaceholder } = useSearch()
  const [changesModalOpen, setChangesModalOpen] = useState(false)
  const editedFilesCount = editBasket.size

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
        {(pathname === '/repo-browser' || pathname === '/demo/repo-browser') ? (
          <BranchSelectorInline />
        ) : mode === 'demo' ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Cluster:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              demo-cluster
            </Typography>
          </Box>
        ) : (
          <ContextSelectorInline />
        )}
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
                    borderRadius: (theme) => `${theme.shape.borderRadius}px`,
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
        <UserMenu />
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
