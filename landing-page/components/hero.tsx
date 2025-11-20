'use client'

import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { GitHub, PlayArrow, MenuBook } from '@mui/icons-material'

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 8, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            animation: 'fadeIn 1s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {/* Logo/Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Orphelix
          </Typography>

          {/* Tagline */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 600,
              mb: 3,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Modern Kubernetes Dashboard
          </Typography>

          {/* Description */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 400,
              mb: 6,
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Beautiful GitOps workflow for Kubernetes with real-time monitoring,
            topology visualization, and demo mode. No cluster required to get started.
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              href="http://localhost:3000"
              target="_blank"
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  boxShadow: '0 12px 48px rgba(59, 130, 246, 0.6)',
                },
              }}
            >
              Try Demo
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHub />}
              href="https://github.com/dmakowski-rasp/kubevista"
              target="_blank"
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              View on GitHub
            </Button>

            <Button
              variant="text"
              size="large"
              startIcon={<MenuBook />}
              href="#"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              Documentation
            </Button>
          </Stack>

          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1,
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
              }}
            >
              Open Source • MPL-2.0 License
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
