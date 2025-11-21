'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import GitHubIcon from '@mui/icons-material/GitHub'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import SettingsIcon from '@mui/icons-material/Settings'
import { useGitHubStore, useModeStore } from '@/lib/core/store'
import { useRouter } from 'next/navigation'
import { GlassPanel } from '@orphelix/ui'
import { PageHeader } from '@/app/components/common/page-header'

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

export function RepoSelector() {
  const { setSelectedRepo } = useGitHubStore()
  const mode = useModeStore((state) => state.mode)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [error, setError] = useState<string | null>(null)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  useEffect(() => {
    loadRepositories()
  }, [])

  const loadRepositories = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/github-app/repositories')

      if (response.status === 401) {
        // Not authenticated - don't show error, just show install button
        setHasCheckedAuth(true)
        setRepositories([])
        setLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to load repositories')
      }

      const data = await response.json()
      setRepositories(data.repositories || [])
      setHasCheckedAuth(true)
    } catch (err) {
      console.error('Failed to load repositories:', err)
      setError(err instanceof Error ? err.message : 'Failed to load repositories')
      setHasCheckedAuth(true)
    } finally {
      setLoading(false)
    }
  }

  const handleInstallApp = () => {
    if (typeof window === 'undefined') return

    const redirectUri = `${window.location.origin}/api/github-app/callback`
    const returnTo = encodeURIComponent('/repo-browser')
    const state = `${Math.random().toString(36).substring(7)}_return=${returnTo}`
    const clientId = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID
    const appName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME

    if (clientId) {
      // If already have repos, go to app installation settings to add more
      if (repositories.length > 0 && appName) {
        window.location.href = `https://github.com/apps/${appName}/installations/new`
      } else {
        // Otherwise do OAuth flow
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
      }
    } else {
      router.push(mode === 'demo' ? '/demo/settings?tab=1' : '/settings?tab=1')
    }
  }

  const handleSelectRepo = (repo: Repository) => {
    setSelectedRepo({
      owner: repo.owner.login,
      repo: repo.name,
      branch: repo.default_branch,
    })
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 2,
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body2" color="text.secondary">
          Loading repositories...
        </Typography>
      </Box>
    )
  }

  // Show install prompt if not authenticated or no repos
  if (hasCheckedAuth && repositories.length === 0 && !error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          px: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <GitHubIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5 }} />

          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              No GitHub Repository Connected
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Install the GitHub App and authorize access to browse your application code.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<GitHubIcon />}
              onClick={handleInstallApp}
            >
              Install GitHub App
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<SettingsIcon />}
              onClick={() => router.push(mode === 'demo' ? '/demo/settings?tab=1' : '/settings?tab=1')}
            >
              Settings
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <PageHeader
        title="Select Repository"
        subtitle="Choose a repository to browse and manage your application code"
        onRefresh={loadRepositories}
        actions={
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={handleInstallApp}
          >
            Add Repository
          </Button>
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <Button size="small" onClick={loadRepositories} sx={{ ml: 2 }}>
            Retry
          </Button>
        </Alert>
      )}

      <Grid container spacing={3}>
        {repositories.map((repo) => (
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 6 }} key={repo.full_name}>
            <ButtonBase
              onClick={() => handleSelectRepo(repo)}
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
                textAlign: 'left',
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <GlassPanel
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  p: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2.5 }}>
                  <Avatar
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    sx={{ width: 56, height: 56 }}
                  >
                    <GitHubIcon />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        mb: 0.5,
                      }}
                    >
                      {repo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {repo.owner.login}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={repo.private ? <LockIcon /> : <PublicIcon />}
                    label={repo.private ? 'Private' : 'Public'}
                    size="small"
                  />
                  <Chip
                    label={repo.default_branch}
                    size="small"
                  />
                </Box>
              </GlassPanel>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
