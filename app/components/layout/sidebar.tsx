'use client'

import { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DeploymentIcon from '@mui/icons-material/AccountTree'
import PodIcon from '@mui/icons-material/Widgets'
import NodeIcon from '@mui/icons-material/Storage'
import ConfigIcon from '@mui/icons-material/Description'
import SecretIcon from '@mui/icons-material/Lock'
import HpaIcon from '@mui/icons-material/TrendingUp'
import PvIcon from '@mui/icons-material/FolderOpen'
import EventIcon from '@mui/icons-material/EventNote'
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import CloudIcon from '@mui/icons-material/Cloud'
import HttpIcon from '@mui/icons-material/Http'
import WorkIcon from '@mui/icons-material/Work'
import ScheduleIcon from '@mui/icons-material/Schedule'
import FolderIcon from '@mui/icons-material/Folder'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Divider from '@mui/material/Divider'
import { ContextSelector } from './context-selector'
import { Logo } from './logo'

const DRAWER_WIDTH = 240
const DRAWER_WIDTH_COLLAPSED = 64
const DRAWER_PADDING = 16 // Padding on left and right

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

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: (NavItem | NavGroup)[] = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/', color: '#6366F1' },
  {
    label: 'Workloads',
    items: [
      { label: 'Deployments', icon: <DeploymentIcon />, path: '/deployments', color: '#6366F1' },
      { label: 'Pods', icon: <PodIcon />, path: '/pods', color: '#8B5CF6' },
      { label: 'Jobs', icon: <WorkIcon />, path: '/jobs', color: '#EC4899' },
      { label: 'CronJobs', icon: <ScheduleIcon />, path: '/cronjobs', color: '#A855F7' },
    ],
  },
  {
    label: 'Network',
    items: [
      { label: 'Services', icon: <CloudIcon />, path: '/services', color: '#3B82F6' },
      { label: 'Ingress', icon: <HttpIcon />, path: '/ingress', color: '#0EA5E9' },
    ],
  },
  {
    label: 'Config & Storage',
    items: [
      { label: 'ConfigMaps', icon: <ConfigIcon />, path: '/configmaps', color: '#10B981' },
      { label: 'Secrets', icon: <SecretIcon />, path: '/secrets', color: '#F43F5E' },
      { label: 'Persistent Volumes', icon: <PvIcon />, path: '/pv', color: '#F59E0B' },
    ],
  },
  {
    label: 'Cluster',
    items: [
      { label: 'Namespaces', icon: <FolderIcon />, path: '/namespaces', color: '#8B5CF6' },
      { label: 'Nodes', icon: <NodeIcon />, path: '/nodes', color: '#06B6D4' },
      { label: 'HPA', icon: <HpaIcon />, path: '/hpa', color: '#64748B' },
      { label: 'Events', icon: <EventIcon />, path: '/events', color: '#06B6D4' },
    ],
  },
]

function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return 'items' in item
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter() as AppRouterInstance
  const [collapsed, setCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setExpandedGroups({
      Workloads: true,
      Network: true,
      'Config & Storage': true,
      Cluster: true,
    })
  }, [])

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }))
  }

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    const isActive = pathname === item.path

    if (collapsed) {
      return (
        <ListItem key={item.path} disablePadding sx={{ mb: 0.4 }}>
          <Tooltip title={item.label} placement="right">
            <ListItemButton
              selected={isActive}
              onClick={() => handleNavigate(item.path)}
              sx={{
                borderRadius: 1.5,
                minHeight: 40,
                justifyContent: 'center',
                px: 1.5,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&.Mui-selected': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: (theme) =>
                    theme.palette.mode === 'light'
                      ? '0.5px solid rgba(0, 0, 0, 0.08)'
                      : '0.5px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'light'
                      ? '0 2px 8px rgba(0, 0, 0, 0.08)'
                      : '0 2px 8px rgba(0, 0, 0, 0.3)',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.85)'
                        : 'rgba(255, 255, 255, 0.16)',
                  },
                },
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  transition: 'color 0.2s ease-in-out',
                  fontSize: '1.25rem',
                  '& svg': {
                    fontSize: '1.25rem',
                  },
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
      <ListItem key={item.path} disablePadding sx={{ mb: 0.4 }}>
        <ListItemButton
          selected={isActive}
          onClick={() => handleNavigate(item.path)}
          sx={{
            borderRadius: 1.5,
            pl: isSubItem ? 3.5 : 1.5,
            py: 0.75,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&.Mui-selected': {
              bgcolor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: (theme) =>
                theme.palette.mode === 'light'
                  ? '0.5px solid rgba(0, 0, 0, 0.08)'
                  : '0.5px solid rgba(255, 255, 255, 0.15)',
              boxShadow: (theme) =>
                theme.palette.mode === 'light'
                  ? '0 2px 8px rgba(0, 0, 0, 0.08)'
                  : '0 2px 8px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                bgcolor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.85)'
                    : 'rgba(255, 255, 255, 0.16)',
              },
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 34,
              color: isActive ? 'primary.main' : 'text.secondary',
              transition: 'color 0.2s ease-in-out',
              fontSize: '1.25rem',
              '& svg': {
                fontSize: '1.25rem',
              },
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: '0.75rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'primary.main' : 'inherit',
            }}
          />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <Drawer
      variant="permanent"
      hideBackdrop
      ModalProps={{ keepMounted: true }}
      sx={{
        width: collapsed ? DRAWER_WIDTH_COLLAPSED + DRAWER_PADDING * 2 : DRAWER_WIDTH + DRAWER_PADDING * 2,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? DRAWER_WIDTH_COLLAPSED + DRAWER_PADDING * 2 : DRAWER_WIDTH + DRAWER_PADDING * 2,
          boxSizing: 'border-box',
          border: 'none',
          bgcolor: 'transparent',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
          zIndex: (theme) => theme.zIndex.appBar - 1,
          pl: 2, // 16px left margin
          pr: 2, // 16px right margin
          pt: 0,
        },
        '& .MuiBackdrop-root': {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          height: 'calc(100vh - 32px)',
          mt: 2,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 16px 0 rgba(0, 0, 0, 0.3)'
              : '0 4px 16px 0 rgba(31, 38, 135, 0.08)',
          border: (theme) =>
            theme.palette.mode === 'light'
              ? '1px solid rgba(209, 213, 219, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
        }}
      >
        <ContextSelector collapsed={collapsed} />
        <List sx={{ px: 1, py: 1, flex: 1, overflowY: 'auto' }}>
          {navGroups.map((item) => {
          if (isNavGroup(item)) {
            // Render group header
            const isExpanded = expandedGroups[item.label]

            if (collapsed) {
              // In collapsed mode, show all items from groups without headers
              return item.items.map((subItem) => renderNavItem(subItem, false))
            }

            return (
              <Box key={item.label}>
                <ListItemButton
                  onClick={() => toggleGroup(item.label)}
                  sx={{
                    borderRadius: 1.5,
                    mb: 0.4,
                    py: 0.6,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      letterSpacing: 0.4,
                    }}
                  />
                  {isExpanded ? (
                    <ExpandLessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  )}
                </ListItemButton>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.items.map((subItem) => renderNavItem(subItem, true))}
                  </List>
                </Collapse>
              </Box>
            )
          }

          // Render single item (like Dashboard)
          return renderNavItem(item, false)
          })}
        </List>

        {/* Bottom Actions: Settings & Collapse */}
        <Divider />
        <Box sx={{ px: 1, py: 1 }}>
        {collapsed ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Tooltip title="Settings" placement="right">
              <ListItemButton
                selected={pathname === '/settings'}
                onClick={() => handleNavigate('/settings')}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&.Mui-selected': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: (theme) =>
                      theme.palette.mode === 'light'
                        ? '0.5px solid rgba(0, 0, 0, 0.08)'
                        : '0.5px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'light'
                        ? '0 2px 8px rgba(0, 0, 0, 0.08)'
                        : '0 2px 8px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'rgba(255, 255, 255, 0.85)'
                          : 'rgba(255, 255, 255, 0.16)',
                    },
                  },
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: pathname === '/settings' ? 'primary.main' : 'text.secondary',
                    transition: 'color 0.2s ease-in-out',
                  }}
                >
                  <SettingsIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
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
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ListItemButton
              selected={pathname === '/settings'}
              onClick={() => handleNavigate('/settings')}
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&.Mui-selected': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: (theme) =>
                    theme.palette.mode === 'light'
                      ? '0.5px solid rgba(0, 0, 0, 0.08)'
                      : '0.5px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'light'
                      ? '0 2px 8px rgba(0, 0, 0, 0.08)'
                      : '0 2px 8px rgba(0, 0, 0, 0.3)',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.85)'
                        : 'rgba(255, 255, 255, 0.16)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: pathname === '/settings' ? 'primary.main' : 'text.secondary',
                  transition: 'color 0.2s ease-in-out',
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: pathname === '/settings' ? 600 : 500,
                  color: pathname === '/settings' ? 'primary.main' : 'inherit',
                }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={toggleCollapse}
              sx={{
                borderRadius: 2,
                minWidth: 48,
                minHeight: 48,
                justifyContent: 'center',
                px: 1,
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
                <ChevronLeftIcon />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        )}
        </Box>
      </Box>
    </Drawer>
  )
}
