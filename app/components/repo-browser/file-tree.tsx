'use client'

import { useState } from 'react'
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
}

export function FileTree({ owner, repo, branch, onFileSelect, selectedFile }: FileTreeProps) {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['/']))
  const [dirContents, setDirContents] = useState<Record<string, TreeItem[]>>({ '/': [] })
  const [loadingDirs, setLoadingDirs] = useState<Set<string>>(new Set())

  // Load root directory on mount
  useState(() => {
    loadDirectory('/')
  })

  const loadDirectory = async (path: string) => {
    if (dirContents[path]) return // Already loaded

    setLoadingDirs(prev => new Set(prev).add(path))

    try {
      const response = await fetch(
        `/api/github/tree?owner=${owner}&repo=${repo}&ref=${branch}&path=${encodeURIComponent(path === '/' ? '' : path)}`
      )

      if (response.ok) {
        const items: TreeItem[] = await response.json()
        setDirContents(prev => ({ ...prev, [path]: items }))
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
      return <CodeIcon fontSize="small" />
    }
    if (ext === 'md' || ext === 'txt') {
      return <DescriptionIcon fontSize="small" />
    }
    if (ext === 'png' || ext === 'jpg' || ext === 'svg') {
      return <ImageIcon fontSize="small" />
    }
    return <InsertDriveFileIcon fontSize="small" />
  }

  const renderTree = (items: TreeItem[], _parentPath: string = '', level: number = 0) => {
    return items.map((item) => {
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
                sx={{ pl: 2 + level * 2 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {isExpanded ? <FolderOpenIcon fontSize="small" /> : <FolderIcon fontSize="small" />}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isExpanded ? 600 : 400,
                  }}
                />
                {isLoading ? (
                  <CircularProgress size={16} />
                ) : isExpanded ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
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

      return (
        <ListItem key={fullPath} disablePadding>
          <ListItemButton
            onClick={() => onFileSelect(fullPath)}
            selected={isSelected}
            sx={{ pl: 2 + level * 2 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {getFileIcon(item.name)}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{ fontSize: '0.875rem' }}
            />
          </ListItemButton>
        </ListItem>
      )
    })
  }

  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <List dense>
        {renderTree(dirContents['/'] || [])}
      </List>
    </Box>
  )
}
