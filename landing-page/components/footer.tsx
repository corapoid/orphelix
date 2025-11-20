'use client'

import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material'
import { GitHub, MenuBook, Article } from '@mui/icons-material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        borderTop: (theme) => theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(255, 255, 255, 0.3)',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Brand */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Orphelix
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              Modern Kubernetes Dashboard with beautiful GitOps workflow.
            </Typography>
          </Box>

          {/* Product */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Product
            </Typography>
            <Stack spacing={1}>
              <Link
                href="#features"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                Features
              </Link>
              <Link
                href="http://localhost:3000"
                target="_blank"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                Try Demo
              </Link>
              <Link
                href="#"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                Documentation
              </Link>
            </Stack>
          </Box>

          {/* Resources */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista"
                target="_blank"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <GitHub fontSize="small" />
                GitHub
              </Link>
              <Link
                href="#"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <MenuBook fontSize="small" />
                API Docs
              </Link>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista/blob/main/CHANGELOG.md"
                target="_blank"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <Article fontSize="small" />
                Changelog
              </Link>
            </Stack>
          </Box>

          {/* Legal */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista/blob/main/LICENSE"
                target="_blank"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                MPL-2.0 License
              </Link>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista/blob/main/README.md"
                target="_blank"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                README
              </Link>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista/blob/main/TECHNICAL.md"
                target="_blank"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                Technical Docs
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: (theme) => theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.08)',
            mb: 3
          }}
        />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.disabled',
            }}
          >
            © {new Date().getFullYear()} Orphelix. Open source under MPL-2.0.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.disabled',
            }}
          >
            Built with ❤️ for the Kubernetes community
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
