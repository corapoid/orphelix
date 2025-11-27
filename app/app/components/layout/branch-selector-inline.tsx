'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import ButtonBase from '@mui/material/ButtonBase'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import { useGitHubStore, useModeStore } from '@/lib/core/store'
import { useTheme } from '@orphelix/ui'
import SvgIcon from '@mui/material/SvgIcon'

// Git Branch SVG Icon (Font Awesome)
function GitBranchIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 640 640">
      <path d="M176 168C189.3 168 200 157.3 200 144C200 130.7 189.3 120 176 120C162.7 120 152 130.7 152 144C152 157.3 162.7 168 176 168zM256 144C256 176.8 236.3 205 208 217.3L208 288L384 288C410.5 288 432 266.5 432 240L432 217.3C403.7 205 384 176.8 384 144C384 99.8 419.8 64 464 64C508.2 64 544 99.8 544 144C544 176.8 524.3 205 496 217.3L496 240C496 301.9 445.9 352 384 352L208 352L208 422.7C236.3 435 256 463.2 256 496C256 540.2 220.2 576 176 576C131.8 576 96 540.2 96 496C96 463.2 115.7 435 144 422.7L144 217.4C115.7 205 96 176.8 96 144C96 99.8 131.8 64 176 64C220.2 64 256 99.8 256 144zM488 144C488 130.7 477.3 120 464 120C450.7 120 440 130.7 440 144C440 157.3 450.7 168 464 168C477.3 168 488 157.3 488 144zM176 520C189.3 520 200 509.3 200 496C200 482.7 189.3 472 176 472C162.7 472 152 482.7 152 496C152 509.3 162.7 520 176 520z" />
    </SvgIcon>
  )
}

interface Branch {
  name: string
  protected: boolean
}

export function BranchSelectorInline() {
  const { selectedRepo, selectedBranch, setSelectedBranch } = useGitHubStore()
  const { mode } = useModeStore()
  const { visualPreset } = useTheme()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchor)
  const isGlass = visualPreset !== 'classic'

  const truncateText = (text: string, maxLength: number = 25) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
  }

  useEffect(() => {
    if (selectedRepo) {
      fetchBranches()
    }
  }, [selectedRepo])

  // Update branches list when selectedBranch changes in demo mode
  useEffect(() => {
    if (mode === 'demo' && selectedBranch && branches.length > 0) {
      setBranches(prev => {
        // Check if branch already exists
        if (prev.find(b => b.name === selectedBranch)) {
          return prev
        }
        // Add new branch (only if branches list is already initialized)
        return [...prev, { name: selectedBranch, protected: false }]
      })
    }
  }, [selectedBranch, mode])

  const fetchBranches = async () => {
    if (!selectedRepo) return

    // In demo mode, use mock branches
    if (mode === 'demo') {
      setBranches([
        { name: 'main', protected: true },
        { name: 'develop', protected: false },
        { name: 'feature/demo', protected: false },
      ])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/github/branches?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}`
      )
      const data = await response.json()

      if (response.ok && Array.isArray(data)) {
        setBranches(data)
      }
    } catch (err) {
      console.error('Failed to fetch branches:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (branchName: string) => {
    setSelectedBranch(branchName)
    setMenuAnchor(null)
  }

  if (!selectedRepo) {
    return null
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <GitBranchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          Branch:
        </Typography>
        <Box sx={{ py: 0.5, px: 1 }}>
          <CircularProgress size={20} />
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, width: '100%' }}>
        <GitBranchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        <Typography color="text.secondary" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
          Branch:
        </Typography>
        <ButtonBase
          disableRipple
          onClick={(event) => setMenuAnchor(event.currentTarget)}
          sx={{
            pl: 1,
            pr: 0,
            py: 0.4,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          {selectedBranch ? (
            (() => {
              const truncated = truncateText(selectedBranch, 34)
              if (truncated !== selectedBranch) {
                return (
                  <Typography fontWeight={600} sx={{ fontSize: '0.75rem', color: 'text.primary' }} title={selectedBranch}>
                    {truncated}
                  </Typography>
                )
              }
              return (
                <Typography fontWeight={600} sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                  {selectedBranch}
                </Typography>
              )
            })()
          ) : (
            <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>Select...</Typography>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <KeyboardArrowDownIcon sx={{ fontSize: 18, ml: 0.25 }} />
        </ButtonBase>
      </Box>
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          mt: 1,
          '& .MuiPaper-root': {
            minWidth: 200,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            ...(isGlass && {
              backdropFilter: 'blur(36px)',
              WebkitBackdropFilter: 'blur(36px)',
            }),
          },
        }}
      >
        {branches.map((branch) => (
          <MenuItem
            key={branch.name}
            onClick={() => handleChange(branch.name)}
            selected={selectedBranch === branch.name}
            sx={{ py: 0.75, gap: 1 }}
          >
            {selectedBranch === branch.name ? <CheckIcon sx={{ fontSize: 18 }} /> : <Box sx={{ width: 18 }} />}
            <Typography fontWeight={600} sx={{ fontSize: '0.8rem' }}>
              {branch.name}
              {branch.protected && ' 🔒'}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

// Separate component for "Create Branch" button
interface CreateBranchButtonProps {
  onIsCreatingChange?: (isCreating: boolean) => void
}

export function CreateBranchButton({ onIsCreatingChange }: CreateBranchButtonProps = {}) {
  const { selectedRepo, selectedBranch, setSelectedBranch } = useGitHubStore()
  const { mode } = useModeStore()
  const [isCreating, setIsCreating] = useState(false)
  const [newBranchName, setNewBranchName] = useState('')
  const [creating, setCreating] = useState(false)

  // Notify parent when isCreating changes
  useEffect(() => {
    onIsCreatingChange?.(isCreating)
  }, [isCreating, onIsCreatingChange])

  const handleCreateBranch = async () => {
    if (!newBranchName.trim() || !selectedRepo) return

    // In demo mode, just switch to the new branch name without API call
    if (mode === 'demo') {
      setSelectedBranch(newBranchName.trim())
      setIsCreating(false)
      setNewBranchName('')
      return
    }

    setCreating(true)
    try {
      const response = await fetch('/api/github/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: selectedRepo.owner,
          repo: selectedRepo.repo,
          baseBranch: selectedBranch,
          newBranch: newBranchName.trim(),
        }),
      })

      if (response.ok) {
        // Switch to new branch
        setSelectedBranch(newBranchName.trim())
        // Close inline input
        setIsCreating(false)
        setNewBranchName('')
      }
    } catch (error) {
      console.error('Failed to create branch:', error)
    } finally {
      setCreating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newBranchName.trim()) {
      handleCreateBranch()
    } else if (e.key === 'Escape') {
      setIsCreating(false)
      setNewBranchName('')
    }
  }

  if (!selectedRepo) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: isCreating ? 200 : 20,
          transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          overflow: 'hidden',
        }}
      >
        {isCreating ? (
          <TextField
            fullWidth
            autoFocus
            size="small"
            placeholder="New branch name..."
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!newBranchName.trim()) {
                setIsCreating(false)
              }
            }}
            disabled={creating}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '0.75rem',
                py: 0,
                backgroundColor: 'transparent',
                '& input': {
                  py: 0.5,
                  px: 1,
                },
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        ) : (
          <Tooltip title="Create new branch">
            <Box
              onClick={() => setIsCreating(true)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'text.secondary',
                transition: 'color 0.2s ease-in-out',
                width: 20,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <AddIcon sx={{ fontSize: 20 }} />
            </Box>
          </Tooltip>
        )}
      </Box>
      {creating && <CircularProgress size={16} />}
    </Box>
  )
}
