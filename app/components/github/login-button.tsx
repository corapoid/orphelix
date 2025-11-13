'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import GitHubIcon from '@mui/icons-material/GitHub'
import Typography from '@mui/material/Typography'

export function GitHubLoginButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    )
  }

  if (session?.user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box>
          <Typography variant="body2" fontWeight="medium">
            Connected as {session.user.name || session.user.email}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            GitHub account connected
          </Typography>
        </Box>
        <Button variant="outlined" onClick={() => signOut()} size="small">
          Disconnect
        </Button>
      </Box>
    )
  }

  return (
    <Button
      variant="contained"
      startIcon={<GitHubIcon />}
      onClick={() => signIn('github')}
      size="large"
    >
      Connect GitHub
    </Button>
  )
}
