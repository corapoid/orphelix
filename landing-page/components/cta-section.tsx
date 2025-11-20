'use client'

import { Box, Container, Typography, Stack } from '@mui/material'
import { GitHub, PlayArrow, MenuBook, Star } from '@mui/icons-material'
import { LiquidGlassButton } from '@/components/common/liquid-glass-button'

export default function CTASection() {
  return (
    <Box
      component="section"
      id="cta"
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <Box
          className="glass-card"
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Get Started?
          </Typography>

          {/* Description */}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'text.secondary',
              mb: 5,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Try the demo now or install Orphelix in your environment.
            No credit card required, no sign-up necessary.
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
              Launch Demo
            </LiquidGlassButton>

            <LiquidGlassButton
              size="large"
              startIcon={<GitHub />}
              href="https://github.com/dmakowski-rasp/kubevista"
              target="_blank"
            >
              View Source
            </LiquidGlassButton>

            <LiquidGlassButton
              size="large"
              startIcon={<MenuBook />}
              href="#"
            >
              Read Docs
            </LiquidGlassButton>
          </Stack>

          {/* Star on GitHub CTA */}
          <Box
            sx={{
              pt: 4,
              borderTop: (theme) => theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Star sx={{ color: '#fbbf24' }} />
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                }}
              >
                If you like Orphelix, give it a star on GitHub!
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
