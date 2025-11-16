'use client'

import { useState, useEffect, Suspense } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import GitHubIcon from '@mui/icons-material/GitHub'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { useSearchParams, useRouter } from 'next/navigation'

function GitHubAppInstallButtonContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [installations, setInstallations] = useState<any[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  useEffect(() => {
    // Handle callback messages
    const status = searchParams.get('github_app')
    const error = searchParams.get('error')

    if (status === 'installed') {
      // Refresh installations
      checkAuthStatus()
      // Clear query params
      router.replace('/settings')
    }

    if (status === 'connected') {
      checkAuthStatus()
      router.replace('/settings')
    }

    if (error) {
      console.error('GitHub App error:', error)
    }
  }, [searchParams])

  const checkAuthStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/github-app/installations')
      if (response.ok) {
        const data = await response.json()
        setInstallations(data)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        setInstallations([])
      }
    } catch (error) {
      console.error('Failed to check auth status:', error)
      setIsAuthenticated(false)
      setInstallations([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstall = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID
    const redirectUri = `${window.location.origin}/api/github-app/callback`
    const state = Math.random().toString(36).substring(7)

    // Redirect to GitHub App installation
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/github-app/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setInstallations([])
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleAddRepositories = () => {
    // Open GitHub App settings to add more repositories
    const appSlug = process.env.NEXT_PUBLIC_GITHUB_APP_SLUG
    window.open(`https://github.com/apps/${appSlug}/installations/new`, '_blank')
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    )
  }

  if (isAuthenticated && installations.length > 0) {
    const totalRepos = installations.reduce(
      (acc, inst) => acc + inst.repositories.length,
      0
    )

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              Connected to GitHub App
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {totalRepos} {totalRepos === 1 ? 'repository' : 'repositories'} accessible across{' '}
              {installations.length} {installations.length === 1 ? 'installation' : 'installations'}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={handleLogout} size="small">
            Disconnect
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          You have granular control over which repositories KubeVista can access.
          <Button
            size="small"
            onClick={handleAddRepositories}
            sx={{ ml: 1 }}
          >
            Add More Repositories
          </Button>
        </Alert>

        {installations.map((installation) => (
          <Box key={installation.id} sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              {installation.account.login} ({installation.repositories.length} repos)
            </Typography>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<GitHubIcon />}
        onClick={handleInstall}
        size="large"
        sx={{
          maxWidth: 300,
          py: 2,
          px: 3,
          borderRadius: 3,
          color: (theme) => theme.palette.text.primary,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 46, 0.6)'
              : 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(209, 213, 219, 0.4)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 16px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)'
              : '0 4px 16px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
          '&:hover': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30, 30, 46, 0.7)'
                : 'rgba(255, 255, 255, 0.35)',
          },
        }}
      >
        Install GitHub App
      </Button>
    </Box>
  )
}

export function GitHubAppInstallButton() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    }>
      <GitHubAppInstallButtonContent />
    </Suspense>
  )
}
