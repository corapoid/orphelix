'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { GlassButton } from '@orphelix/ui'
import { useRouter } from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home'

export default function NotFound() {
  const router = useRouter()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Page Not Found
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <GlassButton
        onClick={() => router.push('/')}
        startIcon={<HomeIcon />}
        size="large"
        sx={{
          px: 4,
          py: 1.5,
        }}
      >
        Go to Dashboard
      </GlassButton>
    </Box>
  )
}
