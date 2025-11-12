'use client'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DeploymentIcon from '@mui/icons-material/AccountTree'
import PodIcon from '@mui/icons-material/Widgets'
import NodeIcon from '@mui/icons-material/Storage'
import ConfigIcon from '@mui/icons-material/Settings'
import SecretIcon from '@mui/icons-material/Lock'
import HpaIcon from '@mui/icons-material/TrendingUp'
import PvIcon from '@mui/icons-material/FolderOpen'
import EventIcon from '@mui/icons-material/EventNote'
import GitHubIcon from '@mui/icons-material/GitHub'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const DRAWER_WIDTH = 240

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Deployments', icon: <DeploymentIcon />, path: '/deployments' },
  { label: 'Pods', icon: <PodIcon />, path: '/pods' },
  { label: 'Nodes', icon: <NodeIcon />, path: '/nodes' },
  { label: 'ConfigMaps', icon: <ConfigIcon />, path: '/configmaps' },
  { label: 'Secrets', icon: <SecretIcon />, path: '/secrets' },
  { label: 'HPA', icon: <HpaIcon />, path: '/hpa' },
  { label: 'Persistent Volumes', icon: <PvIcon />, path: '/pv' },
  { label: 'Events', icon: <EventIcon />, path: '/events' },
  { label: 'Flux GitOps', icon: <GitHubIcon />, path: '/flux' },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter() as AppRouterInstance

  const handleNavigate = (path: string) => {
    router.push(path)
    onClose()
  }

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => handleNavigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
