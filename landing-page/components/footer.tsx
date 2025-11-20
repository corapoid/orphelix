'use client'

import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material'
import { GitHub, MenuBook, Article } from '@mui/icons-material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.2)',
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
                color: 'rgba(255, 255, 255, 0.6)',
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
                color: 'white',
              }}
            >
              Product
            </Typography>
            <Stack spacing={1}>
              <Link
                href="#features"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  '&:hover': { color: 'white' },
                }}
              >
                Features
              </Link>
              <Link
                href="http://localhost:3000"
                target="_blank"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  '&:hover': { color: 'white' },
                }}
              >
                Try Demo
              </Link>
              <Link
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  '&:hover': { color: 'white' },
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
                color: 'white',
              }}
            >
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista"
                target="_blank"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'white' },
                }}
              >
                <GitHub fontSize="small" />
                GitHub
              </Link>
              <Link
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'white' },
                }}
              >
                <MenuBook fontSize="small" />
                API Docs
              </Link>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista/blob/main/CHANGELOG.md"
                target="_blank"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'white' },
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
                color: 'white',
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista/blob/main/LICENSE"
                target="_blank"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  '&:hover': { color: 'white' },
                }}
              >
                MPL-2.0 License
              </Link>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista/blob/main/README.md"
                target="_blank"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  '&:hover': { color: 'white' },
                }}
              >
                README
              </Link>
              <Link
                href="https://github.com/dmakowski-rasp/kubevista/blob/main/TECHNICAL.md"
                target="_blank"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  '&:hover': { color: 'white' },
                }}
              >
                Technical Docs
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />

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
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            © {new Date().getFullYear()} Orphelix. Open source under MPL-2.0.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Built with ❤️ for the Kubernetes community
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
