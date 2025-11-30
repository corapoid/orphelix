'use client'

import { useState, useEffect } from 'react'
import { GlassDialog } from '@/lib/ui'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import GitHubIcon from '@mui/icons-material/GitHub'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import { useGitHubStore } from '@/lib/core/store'
import { useTheme } from '@/lib/ui'

interface SelectRepoModalProps {
  open: boolean
  onClose: () => void
}

interface Repository {
  full_name: string
  name: string
  owner: {
    login: string
    avatar_url?: string
  }
  default_branch: string
  private: boolean
}

export function SelectRepoModal({ open, onClose }: SelectRepoModalProps) {
  const { visualPreset } = useTheme()
  const isGlass = visualPreset !== 'classic'
  const { setSelectedRepo } = useGitHubStore()
  const [loading, setLoading] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      loadRepositories()
    }
  }, [open])

  const loadRepositories = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/github-app/repositories')

      if (!response.ok) {
        throw new Error('Failed to load repositories')
      }

      const data = await response.json()
      setRepositories(data.repositories || [])
    } catch (err) {
      console.error('Failed to load repositories:', err)
      setError(err instanceof Error ? err.message : 'Failed to load repositories')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectRepo = (repo: Repository) => {
    setSelectedRepo({
      owner: repo.owner.login,
      repo: repo.name,
      branch: repo.default_branch,
    })
    onClose()
  }

  return (
    <GlassDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          ...(isGlass && {
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
          }),
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <GitHubIcon sx={{ fontSize: 28 }} />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Select Repository
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Choose a repository to browse and manage
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ px: 0 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box sx={{ px: 3 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Box>
        )}

        {!loading && !error && repositories.length === 0 && (
          <Box sx={{ px: 3 }}>
            <Alert severity="info">
              <Typography variant="body2" gutterBottom>
                No repositories found
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Make sure you have installed the GitHub App and granted access to repositories.
              </Typography>
            </Alert>
          </Box>
        )}

        {!loading && repositories.length > 0 && (
          <List sx={{ pt: 0 }}>
            {repositories.map((repo, index) => (
              <Box key={repo.full_name}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleSelectRepo(repo)}
                    sx={{
                      py: 2,
                      px: 3,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        sx={{ width: 40, height: 40 }}
                      >
                        <GitHubIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" fontWeight={500}>
                            {repo.name}
                          </Typography>
                          <Chip
                            icon={repo.private ? <LockIcon /> : <PublicIcon />}
                            label={repo.private ? 'Private' : 'Public'}
                            size="small"
                            sx={{ height: 20 }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {repo.owner.login}/{repo.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Default branch: {repo.default_branch}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                {index < repositories.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}

        <Box sx={{ mt: 2, px: 3, pb: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </GlassDialog>
  )
}
