'use client'

import { Box, Container, Typography } from '@mui/material'
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
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Real-time Monitoring',
    description: 'Server-Sent Events with automatic reconnection and heartbeat monitoring. Watch your cluster changes live.',
  },
  {
    icon: <AccountTree sx={{ fontSize: 40 }} />,
    title: 'Topology Visualization',
    description: 'Interactive dependency graphs with pan, zoom, and fit-to-view controls. See how resources connect.',
  },
  {
    icon: <Visibility sx={{ fontSize: 40 }} />,
    title: 'Demo Mode',
    description: 'Realistic test data for presentations without cluster requirements. Perfect for demos and learning.',
  },
  {
    icon: <CloudSync sx={{ fontSize: 40 }} />,
    title: 'GitOps Workflow',
    description: 'GitHub integration with YAML editor, smart file matching, and pull request creation directly from UI.',
  },
  {
    icon: <Terminal sx={{ fontSize: 40 }} />,
    title: 'Pod Management',
    description: 'Container logs viewer with search and download. Restart pods with confirmation dialogs.',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
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
              color: 'text.primary',
            }}
          >
            Powerful Features
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Everything you need to monitor and manage your Kubernetes clusters
          </Typography>
        </Box>

        {/* Features Grid - 2 columns with CSS Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              className="glass-card"
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'row',
                gap: 2.5,
                alignItems: 'flex-start',
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
              {/* Icon */}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  minWidth: 56,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b82f6',
                }}
              >
                {feature.icon}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1 }}>
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'text.primary',
                    lineHeight: 1.3,
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    fontSize: '0.9rem',
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
