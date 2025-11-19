'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface LogoProps {
  collapsed?: boolean
}

export function Logo({ collapsed = false }: LogoProps) {
  // Theme is available via useTheme() if needed for future enhancements

  if (collapsed) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.05em',
          }}
        >
          O
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1.5,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.125rem',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.05em',
          }}
        >
          O
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: '1.125rem',
            fontWeight: 700,
            fontFamily: '"Momo Trust Display", system-ui, sans-serif',
            letterSpacing: '0.06em',
            lineHeight: 1,
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ORPHELIX
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.625rem',
            color: 'text.secondary',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Kubernetes
        </Typography>
      </Box>
    </Box>
  )
}
