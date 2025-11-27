'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import CircularProgress from '@mui/material/CircularProgress'
import FolderIcon from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CodeIcon from '@mui/icons-material/Code'
import DescriptionIcon from '@mui/icons-material/Description'
import ImageIcon from '@mui/icons-material/Image'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { GlassPanel } from '@/lib/ui'
import { useGitHubStore, useModeStore } from '@/lib/core/store'

interface TreeItem {
  name: string
  path: string
  type: 'file' | 'dir'
  size?: number
}

interface FileTreeProps {
  owner: string
  repo: string
  branch: string
  onFileSelect: (path: string) => void
  selectedFile?: string
  searchQuery?: string
}

export function FileTree({ owner, repo, branch, onFileSelect, selectedFile, searchQuery = '' }: FileTreeProps) {
  const { editBasket } = useGitHubStore()
  const mode = useModeStore((state) => state.mode)
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['/']))
  const [dirContents, setDirContents] = useState<Record<string, TreeItem[]>>({})
  const [loadingDirs, setLoadingDirs] = useState<Set<string>>(new Set())
  const [expandedStateLoaded, setExpandedStateLoaded] = useState(false)
  const [wasSearching, setWasSearching] = useState(false)
  const [preSearchExpanded, setPreSearchExpanded] = useState<Set<string>>(new Set())

  const storageKey = `file-tree-expanded-${owner}-${repo}-${branch}`

  // Load expanded dirs from localStorage on mount
  useEffect(() => {
    setExpandedStateLoaded(false)
    setDirContents({})
    setLoadingDirs(new Set<string>())
    setWasSearching(false)
    setPreSearchExpanded(new Set<string>())

    const fallback = new Set<string>(['/'])

    if (typeof window === 'undefined') {
      setExpandedDirs(fallback)
      setExpandedStateLoaded(true)
      return
    }

    const saved = window.localStorage.getItem(storageKey)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[]
        const dirs = new Set<string>(parsed)
        dirs.add('/') // Ensure root is always expanded
        setExpandedDirs(dirs)
      } catch (error) {
        console.error('Failed to restore expanded directories', error)
        setExpandedDirs(fallback)
      }
    } else {
      setExpandedDirs(fallback)
    }

    setExpandedStateLoaded(true)
  }, [storageKey])

  // Save expanded dirs to localStorage (only after initial load and when not searching)
  useEffect(() => {
    if (!expandedStateLoaded || searchQuery || typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem(storageKey, JSON.stringify(Array.from(expandedDirs)))
  }, [expandedDirs, searchQuery, storageKey, expandedStateLoaded])

  const loadDirectory = async (path: string) => {
    if (dirContents[path] && dirContents[path].length > 0) return // Already loaded

    setLoadingDirs(prev => new Set(prev).add(path))

    try {
      const modeParam = mode === 'demo' ? '&mode=demo' : ''
      const url = `/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${encodeURIComponent(path === '/' ? '' : path)}${modeParam}`

      const response = await fetch(url)

      if (response.ok) {
        const items: TreeItem[] = await response.json()
        setDirContents(prev => ({ ...prev, [path]: items }))
      } else {
        console.error(`[FileTree] Failed to load ${path}:`, response.status, await response.text())
      }
    } catch (error) {
      console.error(`Failed to load directory ${path}:`, error)
    } finally {
      setLoadingDirs(prev => {
        const next = new Set(prev)
        next.delete(path)
        return next
      })
    }
  }

  // Load root directory on mount and expanded directories
  useEffect(() => {
    if (!expandedStateLoaded) {
      return
    }

    loadDirectory('/')
    // Load all expanded directories
    expandedDirs.forEach(dir => {
      if (dir !== '/') {
        loadDirectory(dir)
      }
    })
  }, [owner, repo, branch, expandedDirs, expandedStateLoaded])

  // Auto-expand directories when searching, restore when search cleared
  useEffect(() => {
    if (searchQuery && dirContents['/']) {
      // Starting a search - save current state
      if (!wasSearching) {
        setWasSearching(true)
        setPreSearchExpanded(new Set(expandedDirs))
      }

      const expandAll = (items: TreeItem[]) => {
        items.forEach(item => {
          if (item.type === 'dir') {
            setExpandedDirs(prev => new Set(prev).add(item.path))
            loadDirectory(item.path)
            if (dirContents[item.path]) {
              expandAll(dirContents[item.path])
            }
          }
        })
      }
      expandAll(dirContents['/'])
    } else if (!searchQuery && wasSearching) {
      // Search cleared - restore previous state
      setWasSearching(false)
      setExpandedDirs(preSearchExpanded.size > 0 ? preSearchExpanded : new Set(['/']))
    }
  }, [searchQuery])

  const toggleDirectory = (path: string) => {
    const isExpanded = expandedDirs.has(path)

    if (isExpanded) {
      setExpandedDirs(prev => {
        const next = new Set(prev)
        next.delete(path)
        return next
      })
    } else {
      setExpandedDirs(prev => new Set(prev).add(path))
      loadDirectory(path)
    }
  }

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()

    if (ext === 'yml' || ext === 'yaml' || ext === 'json') {
      return <CodeIcon sx={{ fontSize: 16 }} />
    }
    if (ext === 'md' || ext === 'txt') {
      return <DescriptionIcon sx={{ fontSize: 16 }} />
    }
    if (ext === 'png' || ext === 'jpg' || ext === 'svg') {
      return <ImageIcon sx={{ fontSize: 16 }} />
    }
    return <InsertDriveFileIcon sx={{ fontSize: 16 }} />
  }

  // Check if item or any of its children match the search query
  const matchesSearch = (item: TreeItem, query: string): boolean => {
    if (!query) return true

    const fileName = item.name.toLowerCase()
    const normalizedFile = fileName.replace(/[-_.\s]/g, '')
    const normalizedQuery = query.replace(/[-_.\s]/g, '')

    // Check if current item matches
    if (fileName.includes(query) || normalizedFile.includes(normalizedQuery)) {
      return true
    }

    // If it's a directory, check if any children match
    if (item.type === 'dir' && dirContents[item.path]) {
      return dirContents[item.path].some(child => matchesSearch(child, query))
    }

    return false
  }

  const renderTree = (items: TreeItem[], _parentPath: string = '', level: number = 0) => {
    const query = searchQuery.toLowerCase()

    // Filter items - show if they match or have matching children
    const filteredItems = searchQuery
      ? items.filter(item => matchesSearch(item, query))
      : items

    return filteredItems.map((item) => {
      const fullPath = item.path
      const isExpanded = expandedDirs.has(fullPath)
      const isLoading = loadingDirs.has(fullPath)
      const isSelected = selectedFile === fullPath

      if (item.type === 'dir') {
        return (
          <Box key={fullPath}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => toggleDirectory(fullPath)}
                selected={isSelected}
                sx={{
                  pl: 1 + level * 1.5,
                  py: 0.25,
                  minHeight: 28,
                }}
              >
                <ListItemIcon sx={{ minWidth: 24, mr: 0.5 }}>
                  {isExpanded ? <FolderOpenIcon sx={{ fontSize: 16 }} /> : <FolderIcon sx={{ fontSize: 16 }} />}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: '0.8125rem',
                    fontWeight: isExpanded ? 600 : 400,
                  }}
                />
                {isLoading ? (
                  <CircularProgress size={14} />
                ) : isExpanded ? (
                  <ExpandLessIcon sx={{ fontSize: 16 }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: 16 }} />
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {dirContents[fullPath] && renderTree(dirContents[fullPath], fullPath, level + 1)}
              </List>
            </Collapse>
          </Box>
        )
      }

      const isModified = editBasket.has(fullPath)

      return (
        <ListItem key={fullPath} disablePadding>
          <ListItemButton
            onClick={() => onFileSelect(fullPath)}
            selected={isSelected}
            sx={{
              pl: 1 + level * 1.5,
              py: 0.25,
              minHeight: 28,
              ...(isModified && {
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 193, 7, 0.08)'
                    : 'rgba(255, 193, 7, 0.12)',
              }),
            }}
          >
            <ListItemIcon sx={{ minWidth: 24, mr: 0.5 }}>
              {getFileIcon(item.name)}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{
                fontSize: '0.8125rem',
                fontWeight: isModified ? 600 : 400,
                color: isModified ? 'warning.main' : 'inherit',
              }}
            />
            {isModified && (
              <FiberManualRecordIcon
                sx={{
                  fontSize: 8,
                  color: 'warning.main',
                  ml: 0.5,
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      )
    })
  }

  return (
    <GlassPanel
      animationType="none"
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        p: 0,
      }}
    >
      <List dense sx={{ px: 1, py: 1, pt: 2 }}>
        {renderTree(dirContents['/'] || [])}
      </List>
    </GlassPanel>
  )
}
