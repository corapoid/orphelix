'use client'

import { Box, Container, Typography, Stack } from '@mui/material'
import { GitHub, PlayArrow } from '@mui/icons-material'
import { LiquidGlassButton } from '@/components/common/liquid-glass-button'

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
              color: 'text.primary',
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
              color: 'text.secondary',
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
            <LiquidGlassButton
              size="large"
              startIcon={<PlayArrow />}
              href="http://localhost:3000"
              target="_blank"
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  boxShadow: '0 12px 48px rgba(59, 130, 246, 0.6)',
                },
              }}
            >
              Try Demo
            </LiquidGlassButton>

            <LiquidGlassButton
              size="large"
              startIcon={<GitHub />}
              href="https://github.com/dmakowski-rasp/kubevista"
              target="_blank"
            >
              View on GitHub
            </LiquidGlassButton>
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
              background: (theme) => theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.03)',
              backdropFilter: 'blur(10px)',
              border: (theme) => theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
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
