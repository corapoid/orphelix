'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import BookIcon from '@mui/icons-material/Book'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SearchIcon from '@mui/icons-material/Search'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsIcon from '@mui/icons-material/Settings'
import CodeIcon from '@mui/icons-material/Code'
import BugReportIcon from '@mui/icons-material/BugReport'
import ApiIcon from '@mui/icons-material/Api'

export default function DocsPage() {
  const userDocs = [
    { icon: <BookIcon />, title: 'Introduction', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/introduction.mdx', description: 'What is KubeVista and key features' },
    { icon: <RocketLaunchIcon />, title: 'Quickstart', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/quickstart.mdx', description: 'Get started in 5 minutes' },
    { icon: <InstallDesktopIcon />, title: 'Installation', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/installation.mdx', description: 'Detailed installation guide' },
    { icon: <DashboardIcon />, title: 'Dashboard', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/user/dashboard.mdx', description: 'Using the main dashboard' },
    { icon: <SearchIcon />, title: 'Search & Filters', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/user/search-filters.mdx', description: 'Finding resources quickly' },
    { icon: <GitHubIcon />, title: 'GitHub Integration', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/user/github/overview.mdx', description: 'GitOps workflow setup' },
    { icon: <SettingsIcon />, title: 'Configuration', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/user/configuration/cluster-connection.mdx', description: 'Cluster connection and settings' },
  ]

  const developerDocs = [
    { icon: <CodeIcon />, title: 'Developer Overview', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/developer/overview.mdx', description: 'Architecture and tech stack' },
    { icon: <BugReportIcon />, title: 'Testing', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/developer/testing.mdx', description: 'Unit and E2E testing guide' },
    { icon: <ApiIcon />, title: 'API Reference', href: 'https://github.com/dmakowski-rasp/kubevista/blob/main/docs/developer/api/introduction.mdx', description: 'REST API documentation' },
  ]

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Documentation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Complete guides for users and developers
        </Typography>
      </Box>

      {/* User Documentation */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          📘 User Guide
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Learn how to use KubeVista to monitor and manage your Kubernetes clusters
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {userDocs.map((doc, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component="a"
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {doc.icon}
                </ListItemIcon>
                <ListItemText
                  primary={doc.title}
                  secondary={doc.description}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Developer Documentation */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          🔧 Developer Guide
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Technical documentation for contributing and extending KubeVista
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {developerDocs.map((doc, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component="a"
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {doc.icon}
                </ListItemIcon>
                <ListItemText
                  primary={doc.title}
                  secondary={doc.description}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
