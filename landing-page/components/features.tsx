'use client'

import { Box, Container, Typography, Grid, Stack } from '@mui/material'
import {
  Speed,
  AccountTree,
  Visibility,
  CloudSync,
  Terminal,
  Security,
} from '@mui/icons-material'

const features = [
  {
    icon: <Speed sx={{ fontSize: 48 }} />,
    title: 'Real-time Monitoring',
    description: 'Server-Sent Events with automatic reconnection and heartbeat monitoring. Watch your cluster changes live.',
  },
  {
    icon: <AccountTree sx={{ fontSize: 48 }} />,
    title: 'Topology Visualization',
    description: 'Interactive dependency graphs with pan, zoom, and fit-to-view controls. See how resources connect.',
  },
  {
    icon: <Visibility sx={{ fontSize: 48 }} />,
    title: 'Demo Mode',
    description: 'Realistic test data for presentations without cluster requirements. Perfect for demos and learning.',
  },
  {
    icon: <CloudSync sx={{ fontSize: 48 }} />,
    title: 'GitOps Workflow',
    description: 'GitHub integration with YAML editor, smart file matching, and pull request creation directly from UI.',
  },
  {
    icon: <Terminal sx={{ fontSize: 48 }} />,
    title: 'Pod Management',
    description: 'Container logs viewer with search and download. Restart pods with confirmation dialogs.',
  },
  {
    icon: <Security sx={{ fontSize: 48 }} />,
    title: 'Server-Side Security',
    description: 'NextAuth v5 with route protection that cannot be bypassed from client. Cookie-based authentication.',
  },
]

export default function Features() {
  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
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
              color: 'white',
            }}
          >
            Powerful Features
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
            Everything you need to monitor and manage your Kubernetes clusters
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                className="glass-card"
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  '@keyframes fadeInUp': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(30px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <Stack spacing={2}>
                  {/* Icon */}
                  <Box
                    sx={{
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
                    {feature.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 600,
                      color: 'white',
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
