'use client'

import { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DeploymentIcon from '@mui/icons-material/AccountTree'
import PodIcon from '@mui/icons-material/Widgets'
import NodeIcon from '@mui/icons-material/Storage'
import ConfigIcon from '@mui/icons-material/Description'
import SecretIcon from '@mui/icons-material/Lock'
import HpaIcon from '@mui/icons-material/TrendingUp'
import PvIcon from '@mui/icons-material/FolderOpen'
import EventIcon from '@mui/icons-material/EventNote'
import CloudIcon from '@mui/icons-material/Cloud'
import HttpIcon from '@mui/icons-material/Http'
import WorkIcon from '@mui/icons-material/Work'
import ScheduleIcon from '@mui/icons-material/Schedule'
import FolderIcon from '@mui/icons-material/Folder'
import GitHubIcon from '@mui/icons-material/GitHub'
import StorageIcon from '@mui/icons-material/Storage'
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream'
import LabelIcon from '@mui/icons-material/Label'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import Divider from '@mui/material/Divider'
import { useModeStore, useSidebarPins } from '@/lib/core/store'

const DRAWER_WIDTH = 240
const DRAWER_WIDTH_COLLAPSED = 64
const DRAWER_PADDING = 16 // Padding on left and right

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed'
const SIDEBAR_GROUPS_KEY = 'sidebar-expanded-groups'
const DEFAULT_NAV_GROUP_STATE: Record<string, boolean> = {
  Workloads: true,
  Network: true,
  'Config & Storage': true,
  Cluster: true,
  More: false,
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
  { label: 'Repository Browser', icon: <GitHubIcon />, path: '/repo-browser', color: '#6366F1' },
  {
    label: 'Workloads',
    items: [
      { label: 'Deployments', icon: <DeploymentIcon />, path: '/deployments', color: '#6366F1' },
      { label: 'StatefulSets', icon: <StorageIcon />, path: '/statefulsets', color: '#7C3AED' },
      { label: 'DaemonSets', icon: <SettingsSystemDaydreamIcon />, path: '/daemonsets', color: '#9333EA' },
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
      { label: 'Labels', icon: <LabelIcon />, path: '/labels', color: '#10B981' },
    ],
  },
]

function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return 'items' in item
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter() as AppRouterInstance
  const mode = useModeStore((state) => state.mode)
  const { isPinned, togglePin } = useSidebarPins()
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false
    }
    const stored = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
    return stored === 'true'
  })
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const baseState = { ...DEFAULT_NAV_GROUP_STATE }
    if (typeof window === 'undefined') {
      return baseState
    }
    const stored = window.localStorage.getItem(SIDEBAR_GROUPS_KEY)
    if (!stored) {
      return baseState
    }
    try {
      const parsed = JSON.parse(stored) as Record<string, boolean>
      return { ...baseState, ...parsed }
    } catch (error) {
      console.error('Failed to parse sidebar group state', error)
      return baseState
    }
  })
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? 'true' : 'false')
  }, [collapsed])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem(SIDEBAR_GROUPS_KEY, JSON.stringify(expandedGroups))
  }, [expandedGroups])

  const handleNavigate = (path: string) => {
    // Prefix path with /demo if in mock mode
    const finalPath = mode === 'mock' ? `/demo${path}` : path
    router.push(finalPath)
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
    // Remove /demo prefix from pathname for comparison
    const cleanPathname = pathname.startsWith('/demo') ? pathname.replace('/demo', '') : pathname
    const isActive = cleanPathname === item.path

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
                border: '0.5px solid transparent',
                '&.Mui-selected': {
                  background: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  borderColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.08)'
                      : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'light'
                      ? '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                      : '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  '&:hover': {
                    background: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.1) 100%)',
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

    const pinned = isPinned(item.path)

    return (
      <ListItem
        key={item.path}
        disablePadding
        sx={{ mb: 0.4, position: 'relative' }}
      >
        <ListItemButton
          selected={isActive}
          onClick={() => handleNavigate(item.path)}
          sx={{
            borderRadius: 1.5,
            pl: isSubItem ? 3.5 : 1.5,
            pr: 1,
            py: 0.75,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            border: editMode ? '1px dashed' : '0.5px solid transparent',
            borderColor: editMode ? 'primary.main' : 'transparent',
            opacity: editMode ? 0.85 : 1,
            '&.Mui-selected': {
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderColor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.08)'
                  : 'rgba(255, 255, 255, 0.2)',
              boxShadow: (theme) =>
                theme.palette.mode === 'light'
                  ? '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                  : '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              '&:hover': {
                background: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.1) 100%)',
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
          {editMode && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                togglePin(item.path)
              }}
              sx={{
                ml: 0.5,
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              {pinned ? (
                <PushPinIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
              ) : (
                <PushPinOutlinedIcon sx={{ fontSize: '1rem', opacity: 0.5 }} />
              )}
            </IconButton>
          )}
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
        <List sx={{ px: 1, py: 1, flex: 1, overflowY: 'auto', pt: 2 }}>
          {navGroups.map((item) => {
          if (isNavGroup(item)) {
            // Render group header
            const isExpanded = expandedGroups[item.label]
            const pinnedItems = item.items.filter((subItem) => isPinned(subItem.path))

            if (collapsed) {
              // In collapsed mode, show all pinned items from groups without headers
              return pinnedItems.map((subItem) => renderNavItem(subItem, false))
            }

            // Hide group if all items are unpinned
            if (pinnedItems.length === 0) {
              return null
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
                    {pinnedItems.map((subItem) => renderNavItem(subItem, true))}
                  </List>
                </Collapse>
              </Box>
            )
          }

          // Render single item (like Dashboard) only if pinned
          if (!isPinned(item.path)) {
            return null
          }
          return renderNavItem(item, false)
          })}

          {/* Unpinned Items Section */}
          {!collapsed && (() => {
            const allUnpinnedItems: NavItem[] = []
            navGroups.forEach((item) => {
              if (isNavGroup(item)) {
                item.items.forEach((subItem) => {
                  if (!isPinned(subItem.path)) {
                    allUnpinnedItems.push(subItem)
                  }
                })
              } else if (!isPinned(item.path)) {
                allUnpinnedItems.push(item)
              }
            })

            if (allUnpinnedItems.length === 0) {
              return null
            }

            const isMoreExpanded = expandedGroups['More']

            return (
              <Box sx={{ mt: 1 }}>
                <ListItemButton
                  onClick={() => toggleGroup('More')}
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
                    primary="More..."
                    primaryTypographyProps={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      letterSpacing: 0.4,
                    }}
                  />
                  {isMoreExpanded ? (
                    <ExpandLessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  )}
                </ListItemButton>
                <Collapse in={isMoreExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {allUnpinnedItems.map((subItem) => renderNavItem(subItem, true))}
                  </List>
                </Collapse>
              </Box>
            )
          })()}
        </List>

        {/* Bottom Actions: Version & GitHub */}
        <Divider />
        <Box sx={{ px: 1, py: 0.75 }}>
        {collapsed ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Tooltip title={editMode ? 'Done editing' : 'Edit menu'} placement="right">
              <IconButton
                onClick={() => setEditMode(!editMode)}
                size="small"
                sx={{
                  color: editMode ? 'primary.main' : 'text.secondary',
                  bgcolor: editMode ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: editMode ? 'action.selected' : 'action.hover',
                  },
                }}
              >
                {editMode ? <DoneIcon sx={{ fontSize: 18 }} /> : <EditIcon sx={{ fontSize: 18 }} />}
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub" placement="right">
              <IconButton
                component="a"
                href="https://github.com/dmachard/kubevista"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Expand sidebar" placement="right">
              <IconButton
                onClick={toggleCollapse}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ChevronRightIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.65rem',
                fontWeight: 500,
                pl: 1,
              }}
            >
              v1.0.0
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Tooltip title={editMode ? 'Done editing' : 'Edit menu'}>
                <IconButton
                  onClick={() => setEditMode(!editMode)}
                  size="small"
                  sx={{
                    color: editMode ? 'primary.main' : 'text.secondary',
                    bgcolor: editMode ? 'action.selected' : 'transparent',
                    '&:hover': {
                      bgcolor: editMode ? 'action.selected' : 'action.hover',
                    },
                  }}
                >
                  {editMode ? <DoneIcon sx={{ fontSize: 18 }} /> : <EditIcon sx={{ fontSize: 18 }} />}
                </IconButton>
              </Tooltip>
              <IconButton
                component="a"
                href="https://github.com/dmachard/kubevista"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                onClick={toggleCollapse}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ChevronLeftIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        )}
        </Box>
      </Box>
    </Drawer>
  )
}
