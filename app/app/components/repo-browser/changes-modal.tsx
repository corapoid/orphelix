'use client'

import { useState } from 'react'
import { GlassDialog } from '@/lib/ui'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import { useGitHubStore, type FileEdit } from '@/lib/core/store'
import { diffLines, Change } from 'diff'
import { useTheme } from '@/lib/ui'

interface ChangesModalProps {
  open: boolean
  onClose: () => void
}

export function ChangesModal({ open, onClose }: ChangesModalProps) {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const { editBasket, removeFromBasket, clearBasket, selectedRepo, selectedBranch } = useGitHubStore()
  const [isCreatingPR, setIsCreatingPR] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const edits = Array.from(editBasket.values())

  const handleCreateMultiFilePR = async () => {
    if (!selectedRepo || edits.length === 0) return

    setIsCreatingPR(true)
    setError(null)

    try {
      const branchName = `multi-file-update-${Date.now()}`

      const response = await fetch('/api/github/create-multi-file-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: selectedRepo.owner,
          repo: selectedRepo.repo,
          branch: branchName,
          baseBranch: selectedBranch,
          files: edits.map(edit => ({
            path: edit.filePath,
            content: edit.content,
            sha: edit.sha,
          })),
          commitMessage: `Update ${edits.length} file${edits.length > 1 ? 's' : ''}`,
          prTitle: `Update ${edits.length} configuration file${edits.length > 1 ? 's' : ''}`,
          prBody: `Updated the following files:\n${edits.map(e => `- ${e.filePath}`).join('\n')}`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create PR')
      }

      const data = await response.json()
      clearBasket()
      onClose()

      // Show success message
      alert(`Pull Request #${data.number} created successfully!\n${data.url}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create PR')
    } finally {
      setIsCreatingPR(false)
    }
  }

  const renderDiff = (edit: FileEdit) => {
    const diff = diffLines(edit.originalContent, edit.content)

    // Group changes into pairs (removed + added)
    const changes: Array<{ removed: string[]; added: string[] }> = []
    let currentChange: { removed: string[]; added: string[] } | null = null

    diff.forEach((part: Change) => {
      if (part.removed) {
        if (!currentChange) {
          currentChange = { removed: [], added: [] }
        }
        currentChange.removed.push(...part.value.split('\n').filter(line => line))
      } else if (part.added) {
        if (!currentChange) {
          currentChange = { removed: [], added: [] }
        }
        currentChange.added.push(...part.value.split('\n').filter(line => line))
      } else {
        // Unchanged lines - skip them unless we're in the middle of a change
        if (currentChange) {
          changes.push(currentChange)
          currentChange = null
        }
      }
    })

    // Don't forget the last change
    if (currentChange) {
      changes.push(currentChange)
    }

    return (
      <Box
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          overflow: 'auto',
          maxHeight: 400,
        }}
      >
        {changes.map((change, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
              p: 1,
              borderBottom: index < changes.length - 1 ? 1 : 0,
              borderColor: 'divider',
            }}
          >
            {/* Old (removed) */}
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#3a1a1a' : '#ffeef0',
                p: 1,
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                borderLeft: 3,
                borderColor: 'error.main',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'error.main', mb: 0.5, display: 'block' }}>
                Before:
              </Typography>
              {change.removed.length > 0 ? (
                change.removed.map((line, i) => (
                  <Box key={i} sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {line}
                  </Box>
                ))
              ) : (
                <Typography variant="caption" sx={{ fontStyle: 'italic', opacity: 0.6 }}>
                  (empty)
                </Typography>
              )}
            </Box>

            {/* New (added) */}
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1a3a29' : '#e6ffed',
                p: 1,
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                borderLeft: 3,
                borderColor: 'success.main',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.main', mb: 0.5, display: 'block' }}>
                After:
              </Typography>
              {change.added.length > 0 ? (
                change.added.map((line, i) => (
                  <Box key={i} sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {line}
                  </Box>
                ))
              ) : (
                <Typography variant="caption" sx={{ fontStyle: 'italic', opacity: 0.6 }}>
                  (empty)
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <GlassDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            ...(isGlass && {
              backdropFilter: 'blur(8px)',
            }),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          border: '1px solid',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 46, 0.85)'
              : 'rgba(255, 255, 255, 0.85)',
          ...(isGlass && {
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }),
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(209, 213, 219, 0.4)',
          ...(isGlass && {
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
                : '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
          }),
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        Saved Changes ({edits.length} file{edits.length !== 1 ? 's' : ''})
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {edits.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              No saved changes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Edit files and save them (⌘S) to prepare a multi-file PR
            </Typography>
          </Box>
        ) : (
          <Box>
            {edits.map((edit) => (
              <Accordion
                key={edit.filePath}
                defaultExpanded={edits.length === 1}
                sx={{
                  mb: 1,
                  borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                  border: '1px solid',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(50, 50, 70, 0.4)'
                      : 'rgba(255, 255, 255, 0.4)',
                  ...(isGlass && {
                    backdropFilter: 'blur(10px)',
                  }),
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(209, 213, 219, 0.3)',
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                    <Typography sx={{ fontWeight: 500 }}>
                      {edit.filePath}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromBasket(edit.filePath)
                    }}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  {renderDiff(edit)}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            textTransform: 'none',
          }}
        >
          Close
        </Button>
        {edits.length > 0 && (
          <>
            <Button
              variant="outlined"
              color="error"
              onClick={clearBasket}
              disabled={isCreatingPR}
              sx={{
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                textTransform: 'none',
              }}
            >
              Discard All
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateMultiFilePR}
              disabled={isCreatingPR}
              startIcon={isCreatingPR ? <CircularProgress size={16} /> : <SendIcon />}
              sx={{
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                textTransform: 'none',
                px: 3,
              }}
            >
              {isCreatingPR ? 'Creating PR...' : 'Create Pull Request'}
            </Button>
          </>
        )}
      </DialogActions>
    </GlassDialog>
  )
}
