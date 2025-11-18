'use client'

import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { useGitHubStore, useModeStore } from '@/lib/core/store'
import { FileTree } from '@/app/components/repo-browser/file-tree'
import { FileViewer } from '@/app/components/repo-browser/file-viewer'
import { usePageSearch } from '@/lib/contexts/search-context'
import { mockGitHubRepo } from '@/lib/mocks/github-data'

export default function RepoBrowserPage() {
  const { selectedRepo, selectedBranch, setSelectedBranch, setPendingPR, setSelectedRepo } = useGitHubStore()
  const mode = useModeStore((state) => state.mode)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const [sidebarWidth, setSidebarWidth] = useState(300)
  const [isResizing, setIsResizing] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startWidth, setStartWidth] = useState(300)
  const [isCreatingPR, setIsCreatingPR] = useState(false)
  const [prError, setPrError] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const searchQuery = usePageSearch('Search files...')
  const sidebarWidthLoaded = useRef(false)

  // Load sidebar width from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('repo-browser-sidebar-width')
    console.log('[Sidebar] Load - loaded flag:', sidebarWidthLoaded.current, 'saved value:', saved)
    if (saved) {
      const width = parseInt(saved, 10)
      if (width >= 200 && width <= 600) {
        console.log('[Sidebar] Load - setting width to:', width)
        setSidebarWidth(width)
      }
    }
    sidebarWidthLoaded.current = true
    console.log('[Sidebar] Load - set loaded flag to true')
  }, [])

  // Save sidebar width to localStorage (only after initial load)
  useEffect(() => {
    console.log('[Sidebar] Save - loaded flag:', sidebarWidthLoaded.current, 'width:', sidebarWidth)
    if (sidebarWidthLoaded.current) {
      console.log('[Sidebar] Save - saving to localStorage:', sidebarWidth)
      localStorage.setItem('repo-browser-sidebar-width', sidebarWidth.toString())
    }
  }, [sidebarWidth])

  // Load last selected file from localStorage on mount
  useEffect(() => {
    if (selectedRepo) {
      const storageKey = `repo-browser-file-${selectedRepo.owner}-${selectedRepo.repo}-${selectedBranch}`
      const savedFile = localStorage.getItem(storageKey)
      if (savedFile) {
        setSelectedFile(savedFile)
      }
    }
  }, [selectedRepo, selectedBranch])

  // Save selected file to localStorage
  useEffect(() => {
    if (selectedRepo && selectedFile) {
      const storageKey = `repo-browser-file-${selectedRepo.owner}-${selectedRepo.repo}-${selectedBranch}`
      localStorage.setItem(storageKey, selectedFile)
    }
  }, [selectedRepo, selectedBranch, selectedFile])

  // Set mock repo in demo mode
  useEffect(() => {
    if (mode === 'mock' && !selectedRepo) {
      setSelectedRepo(mockGitHubRepo)
      setSelectedFile(null) // Clear selected file when switching to mock repo
    }
  }, [mode, selectedRepo, setSelectedRepo])

  // Clear selected file when repo changes
  useEffect(() => {
    setSelectedFile(null)
  }, [selectedRepo?.owner, selectedRepo?.repo])

  useEffect(() => {
    if (selectedRepo?.branch && !selectedBranch) {
      setSelectedBranch(selectedRepo.branch)
    }
  }, [selectedRepo, selectedBranch, setSelectedBranch])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      e.preventDefault()

      const delta = e.clientX - startX
      const newWidth = startWidth + delta

      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    if (isResizing) {
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing, startX, startWidth])

  if (!selectedRepo) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          Please select a GitHub repository in Settings first.
        </Alert>
      </Box>
    )
  }

  const handleFileSelect = (path: string) => {
    setSelectedFile(path)
  }

  const handleCreatePR = async (content: string, _originalContent: string, sha: string) => {
    if (!selectedRepo || !selectedFile) return

    setIsCreatingPR(true)
    setPrError(null)

    try {
      const branchName = `update-${selectedFile.replace(/\//g, '-')}-${Date.now()}`

      const response = await fetch('/api/github/create-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: selectedRepo.owner,
          repo: selectedRepo.repo,
          branch: branchName,
          baseBranch: selectedBranch,
          filePath: selectedFile,
          content,
          sha,
          commitMessage: `Update ${selectedFile}`,
          prTitle: `Update ${selectedFile}`,
          prBody: `Updated configuration file: ${selectedFile}`,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create PR')
      }

      const data = await response.json()

      setPendingPR({
        number: data.number,
        url: data.url,
        owner: selectedRepo.owner,
        repo: selectedRepo.repo,
        branchName,
      })

      alert(`Pull Request created successfully! #${data.number}\n${data.url}`)
    } catch (err) {
      const error = err as Error
      setPrError(error.message || 'Failed to create PR')
    } finally {
      setIsCreatingPR(false)
    }
  }

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', overflow: 'hidden', gap: 3 }}>
      {/* File Tree Sidebar */}
      <Box
        ref={sidebarRef}
        sx={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          maxWidth: sidebarWidth,
          position: 'relative',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
          <FileTree
            owner={selectedRepo.owner}
            repo={selectedRepo.repo}
            branch={selectedBranch}
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile || undefined}
            searchQuery={searchQuery}
          />

          {/* Resize Handle */}
          <Box
            onMouseDown={(e) => {
              e.preventDefault()
              setStartX(e.clientX)
              setStartWidth(sidebarWidth)
              setIsResizing(true)
            }}
            sx={{
              position: 'absolute',
              right: -4,
              top: 0,
              bottom: 0,
              width: 8,
              cursor: 'col-resize',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'primary.main',
              },
              transition: 'background-color 0.2s',
              zIndex: 10,
            }}
          />
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {isCreatingPR && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              Creating Pull Request...
            </Alert>
          )}
          {prError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setPrError(null)}>
              {prError}
            </Alert>
          )}

          {selectedFile && selectedFile.match(/\.(yaml|yml|json|md)$/) ? (
            <FileViewer
              owner={selectedRepo.owner}
              repo={selectedRepo.repo}
              branch={selectedBranch}
              filePath={selectedFile}
              onCreatePR={handleCreatePR}
            />
          ) : selectedFile ? (
            <Alert severity="info">
              Preview not available for this file type: {selectedFile}
            </Alert>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Select a file from the tree to view
              </Typography>
            </Box>
          )}
        </Box>
    </Box>
  )
}
