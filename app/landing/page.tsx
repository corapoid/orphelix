'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SpeedIcon from '@mui/icons-material/Speed'
import SecurityIcon from '@mui/icons-material/Security'
import CloudIcon from '@mui/icons-material/Cloud'
import TimelineIcon from '@mui/icons-material/Timeline'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import GitHubIcon from '@mui/icons-material/GitHub'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      title: 'Modern Dashboard',
      description: 'Intuitive and beautiful interface for monitoring your Kubernetes clusters',
      color: '#9B8579',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Real-time Updates',
      description: 'Live monitoring with Server-Sent Events for instant cluster state changes',
      color: '#C9A18A',
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: 'Topology Visualization',
      description: 'Interactive graphs showing relationships between your resources',
      color: '#6B7280',
    },
    {
      icon: <AutoGraphIcon sx={{ fontSize: 40 }} />,
      title: 'FluxCD Integration',
      description: 'Native support for Flux GitOps resources and workflows',
      color: '#8B9B8E',
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40 }} />,
      title: 'Multi-namespace',
      description: 'Seamlessly switch between namespaces and manage multiple environments',
      color: '#D4C4B0',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Access',
      description: 'RBAC-aware with proper Kubernetes authentication and authorization',
      color: '#B89B88',
    },
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(155, 133, 121, 0.1) 0%, rgba(24, 24, 27, 0) 100%)'
              : 'linear-gradient(180deg, rgba(227, 221, 215, 0.3) 0%, rgba(253, 252, 251, 0) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '5rem' },
                fontWeight: 600,
                mb: 2,
                color: '#7A6559',
                fontFamily: '"Playfair Display", Georgia, serif',
                letterSpacing: '-0.01em',
              }}
            >
              KubeVista
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400,
                mb: 3,
                color: '#A8968A',
                fontFamily: '"Source Sans 3", sans-serif',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Kubernetes Dashboard
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                mb: 5,
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              A beautiful, powerful, and intuitive web interface for managing your Kubernetes clusters.
              Built with Next.js and Material-UI for the best developer and user experience.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => router.push('/')}
                sx={{
                  px: 5,
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 500,
                  bgcolor: '#9B8579',
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  '&:hover': {
                    bgcolor: '#7A6559',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(155, 133, 121, 0.3)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHubIcon />}
                href="https://github.com/yourusername/kubevista"
                target="_blank"
                sx={{
                  px: 5,
                  py: 1.8,
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderColor: '#9B8579',
                  color: '#9B8579',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  borderWidth: 1.5,
                  '&:hover': {
                    borderWidth: 1.5,
                    borderColor: '#7A6559',
                    bgcolor: 'rgba(155, 133, 121, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                View on GitHub
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Powerful Features
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: 600, mx: 'auto' }}>
            Everything you need to monitor and manage your Kubernetes infrastructure
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 28px ${feature.color}30`,
                    borderColor: feature.color,
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(24, 24, 27, 0) 0%, rgba(155, 133, 121, 0.1) 100%)'
              : 'linear-gradient(180deg, rgba(253, 252, 251, 0) 0%, rgba(227, 221, 215, 0.3) 100%)',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              border: '1.5px solid',
              borderColor: '#C9BFB5',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(155, 133, 121, 0.05)' : 'rgba(240, 237, 233, 0.6)'),
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 2, fontFamily: '"Playfair Display", Georgia, serif' }}>
              Ready to get started?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', mb: 4 }}>
              Experience elegant Kubernetes management
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push('/')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1rem',
                fontWeight: 500,
                bgcolor: '#9B8579',
                color: '#FFFFFF',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                '&:hover': {
                  bgcolor: '#7A6559',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(155, 133, 121, 0.3)',
                },
              }}
            >
              Launch Dashboard
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            © 2025 KubeVista. Built with ❤️ using Next.js and Material-UI
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
