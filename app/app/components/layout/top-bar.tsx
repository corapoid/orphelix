'use client'

import { useState, lazy, Suspense, type ReactNode } from 'react'

const ChangesModal = lazy(() => import('@/app/components/repo-browser/changes-modal').then(m => ({ default: m.ChangesModal })))
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import EditNoteIcon from '@mui/icons-material/EditNote'
import type { SxProps, Theme } from '@mui/material/styles'
import { NamespaceSelector } from './namespace-selector'
import { RealtimeStatus } from './realtime-status'
import { ContextSelectorInline } from './context-selector-inline'
import { BranchSelectorInline, CreateBranchButton } from './branch-selector-inline'
import { SearchBar } from '../common/search-bar'
import { UserMenu } from './user-menu'
import { useGitHubStore } from '@/lib/core/store'
import { mockGitHubRepo } from '@/lib/mocks/github-data'
import { usePathname } from 'next/navigation'
import { useSearch } from '@/lib/contexts/search-context'
import { useGlassSurface } from '@/lib/ui/use-glass-surface'

export function TopBar() {
  const { selectedRepo, editBasket } = useGitHubStore()
  const pathname = usePathname()

  // Use mock repo in demo mode
  const displayRepo = pathname === '/demo/repo-browser' ? mockGitHubRepo : selectedRepo
  const { searchQuery, setSearchQuery, searchPlaceholder } = useSearch()
  const [changesModalOpen, setChangesModalOpen] = useState(false)
  const [isBranchCreating, setIsBranchCreating] = useState(false)
  const editedFilesCount = editBasket.size
  const isRepoPage = pathname === '/repo-browser' || pathname === '/demo/repo-browser'
  const hideSearch = pathname === '/' || pathname === '/demo' || pathname === '/settings' || pathname === '/demo/settings'
  const islandSurface = useGlassSurface()

  type IslandOptions = {
    flex?: string | number
    minWidth?: string | number
    sx?: SxProps<Theme>
  }

  const CONTROL_HEIGHT = 39

  const renderIsland = (content: ReactNode, options: IslandOptions = {}) => (
    <Box
      sx={(theme) => ({
        ...(typeof islandSurface === 'function' ? islandSurface(theme) : islandSurface),
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 0.6,
        borderWidth: '0.5px',
        borderRadius: `${theme.shape.borderRadius}px`,
        flex: options.flex ?? '0 0 auto',
        minWidth: options.minWidth,
        minHeight: CONTROL_HEIGHT,
        height: CONTROL_HEIGHT,
        ...(typeof options.sx === 'function' ? options.sx(theme) : options.sx),
      })}
    >
      {content}
    </Box>
  )

  const leftControl = isRepoPage && displayRepo
    ? (
        <>
          {renderIsland(<BranchSelectorInline />)}
          {renderIsland(
            <CreateBranchButton onIsCreatingChange={setIsBranchCreating} />,
            {
              minWidth: 'auto',
              sx: {
                px: 1.75,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isBranchCreating ? 'primary.main' : 'transparent',
                ...(isBranchCreating && {
                  px: 1,
                }),
              }
            }
          )}
        </>
      )
    : renderIsland(<ContextSelectorInline />)

  const gridTemplateColumns = hideSearch
    ? {
        xs: '1fr',
        md: 'auto auto',
        lg: 'auto auto',
      }
    : {
        xs: '1fr',
        md: 'auto minmax(240px, 1fr) auto',
        lg: 'auto minmax(320px, 45%) auto',
      }

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridTemplateColumns,
          alignItems: 'center',
          columnGap: 1.5,
          rowGap: 1,
          px: 2,
          py: 1,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 1,
            gridColumn: { xs: '1 / -1', md: 'auto' },
            minHeight: CONTROL_HEIGHT,
            height: CONTROL_HEIGHT,
          }}
        >
          {leftControl}
        </Box>

        {!hideSearch && (
          <Box
            sx={{
              gridColumn: 'auto',
              minHeight: CONTROL_HEIGHT,
              height: CONTROL_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: { xs: '100%', md: '50vw' },
              justifySelf: { xs: 'stretch', md: 'center' },
              opacity: isBranchCreating ? 0 : 1,
              transition: 'opacity 0.2s ease-in-out',
              pointerEvents: isBranchCreating ? 'none' : 'auto',
            }}
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchPlaceholder}
              fullWidth
            />
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            gridColumn: { xs: '1 / -1', md: 'auto' },
            minHeight: CONTROL_HEIGHT,
            height: CONTROL_HEIGHT,
            justifySelf: { xs: 'stretch', md: hideSearch ? 'end' : 'auto' },
            width: '100%',
          }}
        >
          {isRepoPage && displayRepo ? (
            <>
              {editedFilesCount > 0 && renderIsland(
                <Tooltip title={`${editedFilesCount} file${editedFilesCount > 1 ? 's' : ''} modified - Click to review`}>
                  <Box
                    onClick={() => setChangesModalOpen(true)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      cursor: 'pointer',
                      color: 'warning.main',
                      transition: 'color 0.2s ease-in-out',
                      '&:hover': {
                        color: 'warning.dark',
                      },
                    }}
                  >
                    <EditNoteIcon sx={{ fontSize: 18 }} />
                    <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                      {editedFilesCount}
                    </Typography>
                  </Box>
                </Tooltip>,
                {
                  minWidth: 'auto',
                  sx: { px: 1.5 }
                }
              )}
              {renderIsland(
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                    Repo:
                  </Typography>
                  <Typography fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                    {displayRepo.owner}/{displayRepo.repo}
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            renderIsland(
              <>
                <NamespaceSelector />
                <RealtimeStatus />
              </>,
              {
                minWidth: 0,
                sx: { justifyContent: 'space-between', gap: 1.5, flexWrap: 'wrap' },
              }
            )
          )}
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
