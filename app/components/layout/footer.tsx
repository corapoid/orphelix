'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 3,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            KubeVista v1.1.0 - Modern Kubernetes Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Built with Next.js & Material-UI
          </Typography>
          <Link
            href="https://github.com/dmakowski-rasp/kubevista"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
          >
            <Typography variant="body2">GitHub</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
