'use client'

import { Box, Container, Typography } from '@mui/material'
import { Image as ImageIcon } from '@mui/icons-material'

export default function Screenshot() {
  return (
    <Box
      component="section"
      id="demo"
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              color: 'white',
            }}
          >
            See It In Action
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Experience the beautiful interface and powerful features
          </Typography>
        </Box>

        {/* Screenshot Placeholder */}
        <Box
          className="glass-card"
          sx={{
            p: { xs: 2, md: 4 },
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
              border: '2px dashed rgba(255, 255, 255, 0.2)',
              overflow: 'hidden',
            }}
          >
            <ImageIcon sx={{ fontSize: 80, color: 'rgba(255, 255, 255, 0.3)' }} />
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: 'center',
                px: 2,
              }}
            >
              Dashboard Screenshot Placeholder
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.4)',
                textAlign: 'center',
                px: 2,
              }}
            >
              Add your screenshot to /public/screenshots/dashboard.png
            </Typography>
          </Box>
        </Box>

        {/* Feature Highlights Below Screenshot */}
        <Box
          sx={{
            mt: 6,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {[
            'Real-time resource monitoring',
            'Interactive topology graphs',
            'Beautiful liquid glass UI',
          ].map((text, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
