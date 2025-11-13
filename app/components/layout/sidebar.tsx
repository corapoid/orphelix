'use client'

import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
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
import Divider from '@mui/material/Divider'

const DRAWER_WIDTH = 240
const DRAWER_WIDTH_COLLAPSED = 64

interface SidebarProps {
  open: boolean
  onClose: () => void
}

interface NavItem {
  label: string
  icon: React.ReactElement
  path: string
  color: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/', color: '#6366F1' },
  { label: 'Deployments', icon: <DeploymentIcon />, path: '/deployments', color: '#6366F1' },
  { label: 'Pods', icon: <PodIcon />, path: '/pods', color: '#8B5CF6' },
  { label: 'Nodes', icon: <NodeIcon />, path: '/nodes', color: '#06B6D4' },
  { label: 'ConfigMaps', icon: <ConfigIcon />, path: '/configmaps', color: '#10B981' },
  { label: 'Secrets', icon: <SecretIcon />, path: '/secrets', color: '#F43F5E' },
  { label: 'HPA', icon: <HpaIcon />, path: '/hpa', color: '#64748B' },
  { label: 'Persistent Volumes', icon: <PvIcon />, path: '/pv', color: '#F59E0B' },
  { label: 'Events', icon: <EventIcon />, path: '/events', color: '#06B6D4' },
  { label: 'Flux GitOps', icon: <GitHubIcon />, path: '/flux', color: '#8B5CF6' },
]

export function Sidebar({ open: _open, onClose: _onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter() as AppRouterInstance
  const [collapsed, setCollapsed] = useState(false)

  const handleNavigate = (path: string) => {
    router.push(path)
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
          zIndex: (theme) => theme.zIndex.appBar - 1,
        },
      }}
    >
      <Toolbar />

      <List sx={{ px: 1, py: 1, flex: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path

          if (collapsed) {
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <Tooltip title={item.label} placement="right">
                  <ListItemButton
                    selected={isActive}
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      minHeight: 48,
                      justifyContent: 'center',
                      px: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      },
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        color: isActive ? 'white' : 'text.secondary',
                        transition: 'color 0.2s ease-in-out',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            )
          }

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'white' : 'text.secondary',
                    transition: 'color 0.2s ease-in-out',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* Collapse Toggle at bottom */}
      <Divider />
      <Box sx={{ p: 1 }}>
        {collapsed ? (
          <Tooltip title="Expand sidebar" placement="right">
            <ListItemButton
              onClick={toggleCollapse}
              sx={{
                borderRadius: 2,
                minHeight: 48,
                justifyContent: 'center',
                px: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: 'text.secondary',
                }}
              >
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        ) : (
          <ListItemButton
            onClick={toggleCollapse}
            sx={{
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: 'text.secondary',
              }}
            >
              <ChevronLeftIcon />
            </ListItemIcon>
            <ListItemText
              primary="Collapse"
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        )}
      </Box>
    </Drawer>
  )
}
