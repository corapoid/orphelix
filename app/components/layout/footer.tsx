'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1.5,
        px: 3,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'transparent',
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="caption" color="text.secondary">
          KubeVista v1.1.0 - Modern Kubernetes Dashboard
        </Typography>
        <Tooltip title="GitHub Repository" arrow>
          <IconButton
            component={Link}
            href="https://github.com/dmakowski-rasp/kubevista"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            size="small"
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
