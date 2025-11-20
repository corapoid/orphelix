'use client'

import { Box, Container, Typography, Stack } from '@mui/material'
import {
  CheckCircle,
  LockOpen,
  Lightbulb,
  TrendingUp,
} from '@mui/icons-material'

const reasons = [
  {
    icon: <CheckCircle sx={{ fontSize: 48 }} />,
    title: 'Easy to Use',
    description: 'Start in demo mode instantly. No cluster setup required. Switch to real mode when ready.',
  },
  {
    icon: <LockOpen sx={{ fontSize: 48 }} />,
    title: 'Open Source',
    description: 'MPL-2.0 licensed. Inspect the code, contribute, or fork for your needs. Community-driven development.',
  },
  {
    icon: <Lightbulb sx={{ fontSize: 48 }} />,
    title: 'Modern UI',
    description: 'Beautiful liquid glass design with dark theme. Responsive mobile interface. Smooth animations.',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 48 }} />,
    title: 'Production Ready',
    description: 'Server-side security, TypeScript strict mode, 233 passing tests. Built with Next.js 15 and React 19.',
  },
]

export default function WhyOrphelix() {
  return (
    <Box
      component="section"
      id="why"
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.02)'
          : 'rgba(0, 0, 0, 0.01)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Why Choose Orphelix?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Built by developers, for developers. Focus on what matters most.
          </Typography>
        </Box>

        {/* Reasons Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4 }}>
          {reasons.map((reason, index) => (
            <Box key={index}>
              <Box
                className="glass-card"
                sx={{
                  p: 3,
                  height: '100%',
                  animation: `slideIn 0.6s ease-out ${index * 0.15}s both`,
                  '@keyframes slideIn': {
                    from: {
                      opacity: 0,
                      transform: index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                }}
              >
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  {/* Icon */}
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3b82f6',
                    }}
                  >
                    {reason.icon}
                  </Box>

                  {/* Content */}
                  <Stack spacing={1}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      {reason.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {reason.description}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Stats */}
        <Box
          sx={{
            mt: 8,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {[
            { value: '233', label: 'Tests Passing' },
            { value: '100%', label: 'TypeScript' },
            { value: 'MPL-2.0', label: 'Open Source' },
          ].map((stat, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                p: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
