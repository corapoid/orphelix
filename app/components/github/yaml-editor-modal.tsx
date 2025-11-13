'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Editor from '@monaco-editor/react'
import { useGitHubStore } from '@/lib/store'

interface YamlEditorModalProps {
  open: boolean
  onClose: () => void
  resourceName: string
  namespace: string
  resourceType?: 'deployment' | 'configmap' | 'secret'
}

export function YamlEditorModal({
  open,
  onClose,
  resourceName,
  namespace,
  resourceType = 'deployment'
}: YamlEditorModalProps) {
  const { selectedRepo, setPendingPR } = useGitHubStore()

  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [yamlContent, setYamlContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [_fileSha, setFileSha] = useState('')
  const [kustomizeTab, setKustomizeTab] = useState<'base' | 'overlay'>('base')
  const [selectedOverlay, setSelectedOverlay] = useState('')
  const [isCreatingPR, setIsCreatingPR] = useState(false)
  const [prCreated, setPrCreated] = useState<{ number: number; url: string } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isMergingPR, setIsMergingPR] = useState(false)
  const [matchingFile, setMatchingFile] = useState(false)
  const [matchInfo, setMatchInfo] = useState<{ method: string } | null>(null)

  // Check authentication status (both OAuth and GitHub App)
  const { data: authStatus } = useQuery({
    queryKey: ['github-auth-status'],
    queryFn: async () => {
      const response = await fetch('/api/github/auth-status')
      if (!response.ok) return { authenticated: false }
      return response.json()
    },
    enabled: open,
  })

  // Fetch YAML files
  const { data: files, isLoading: filesLoading } = useQuery({
    queryKey: ['github-files', selectedRepo?.owner, selectedRepo?.repo],
    queryFn: async () => {
      if (!selectedRepo) return []
      const response = await fetch(
        `/api/github/files?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}&ref=${selectedRepo.branch}`
      )
      if (!response.ok) throw new Error('Failed to fetch files')
      return response.json()
    },
    enabled: !!selectedRepo && open,
  })

  // Update authentication state when authStatus changes
  useEffect(() => {
    if (authStatus) {
      setIsAuthenticated(authStatus.authenticated)
    }
  }, [authStatus])

  // Auto-match file when files are loaded
  useEffect(() => {
    const autoMatchFile = async () => {
      if (!files || files.length === 0 || selectedFile || !open || !selectedRepo) return

      setMatchingFile(true)
      setMatchInfo(null)

      try {
        // Step 1: Fetch cluster YAML from Kubernetes
        let clusterYaml: string | undefined
        try {
          const yamlResponse = await fetch(
            `/api/resources/${resourceType}s/${resourceName}/yaml?namespace=${namespace}`
          )
          if (yamlResponse.ok) {
            const yamlData = await yamlResponse.json()
            clusterYaml = yamlData.yaml
          }
        } catch (error) {
          console.warn('Could not fetch cluster YAML, falling back to pattern matching:', error)
        }

        // Step 2: Fetch file contents from GitHub for top 10 candidate files
        // (Limit to 10 to avoid rate limits and improve performance)
        const candidateFiles = files.slice(0, 10)
        const filesWithContent = await Promise.all(
          candidateFiles.map(async (file: any) => {
            try {
              const response = await fetch(
                `/api/github/file?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}&path=${file.path}&ref=${selectedRepo.branch}`
              )
              if (response.ok) {
                const data = await response.json()
                return { ...file, content: data.content }
              }
            } catch (error) {
              console.warn(`Could not fetch content for ${file.path}:`, error)
            }
            return file
          })
        )

        // Step 3: Send to match-file API with clusterYaml and file contents
        const response = await fetch('/api/github/match-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resource: {
              name: resourceName,
              namespace,
              type: resourceType,
              clusterYaml, // NEW: cluster YAML for comparison
            },
            yamlFiles: filesWithContent, // NEW: files with content
          }),
        })

        if (!response.ok) {
          console.error('Failed to match file')
          return
        }

        const data = await response.json()

        if (data.matchedFile) {
          setMatchInfo({
            method: data.method,
          })
          await loadFile(data.matchedFile.path)
        }
      } catch (error) {
        console.error('Error matching file:', error)
      } finally {
        setMatchingFile(false)
      }
    }

    autoMatchFile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, open])

  // Fetch Kustomize structure when file is selected
  const { data: kustomize } = useQuery({
    queryKey: ['kustomize', selectedRepo?.owner, selectedRepo?.repo, selectedFile],
    queryFn: async () => {
      if (!selectedRepo || !selectedFile) return null
      const response = await fetch(
        `/api/github/kustomize?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}&filePath=${selectedFile}&ref=${selectedRepo.branch}`
      )
      if (!response.ok) return null
      return response.json()
    },
    enabled: !!selectedRepo && !!selectedFile && open,
  })

  // Load file content
  const loadFile = async (path: string) => {
    if (!selectedRepo) return

    try {
      const response = await fetch(
        `/api/github/file?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}&path=${path}&ref=${selectedRepo.branch}`
      )
      if (!response.ok) throw new Error('Failed to load file')
      const data = await response.json()

      setYamlContent(data.content)
      setOriginalContent(data.content)
      setFileSha(data.sha)
      setSelectedFile(path)
    } catch (error) {
      console.error('Failed to load file:', error)
    }
  }

  // Handle PR creation
  const handleCreatePR = async () => {
    if (!selectedRepo || !selectedFile) return

    setIsCreatingPR(true)
    try {
      const response = await fetch('/api/github/create-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: selectedRepo.owner,
          repo: selectedRepo.repo,
          filePath: selectedFile,
          content: yamlContent,
          deploymentName: resourceName,
          namespace,
          baseBranch: selectedRepo.branch,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create PR')
      }

      const data = await response.json()
      setPrCreated(data.pr)
      setPendingPR(resourceName, namespace, data.pr.number)
    } catch (error) {
      console.error('Failed to create PR:', error)
      alert(error instanceof Error ? error.message : 'Failed to create PR')
    } finally {
      setIsCreatingPR(false)
    }
  }

  // Check if user is authenticated (OAuth or GitHub App)
  if (isAuthenticated === false) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Alert severity="info">Please connect your GitHub account in Settings first.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  // Still loading authentication status
  if (isAuthenticated === null) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    )
  }

  if (!selectedRepo) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Alert severity="info">Please select a GitHub repository in Settings first.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  // Handle PR merge
  const handleMergePR = async () => {
    if (!selectedRepo || !prCreated) return

    setIsMergingPR(true)
    try {
      const response = await fetch('/api/github/merge-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: selectedRepo.owner,
          repo: selectedRepo.repo,
          pullNumber: prCreated.number,
          mergeMethod: 'merge', // Can be 'merge', 'squash', or 'rebase'
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to merge PR')
      }

      alert(`PR #${prCreated.number} merged successfully!`)
      onClose()
      // Optionally refresh the page or deployment data
      window.location.reload()
    } catch (error) {
      console.error('Failed to merge PR:', error)
      alert(error instanceof Error ? error.message : 'Failed to merge PR')
    } finally {
      setIsMergingPR(false)
    }
  }

  if (prCreated) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Pull Request Created Successfully! 🎉</DialogTitle>
        <DialogContent>
          <Alert severity="success" sx={{ mb: 2 }}>
            PR #{prCreated.number} has been created and is ready for review.
          </Alert>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <strong>PR URL:</strong> {prCreated.url}
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              What would you like to do?
            </Typography>
            <Typography variant="caption" display="block">
              • <strong>View PR</strong>: Open the PR on GitHub to see details and review
            </Typography>
            <Typography variant="caption" display="block">
              • <strong>Merge Now</strong>: Merge the PR immediately (use with caution!)
            </Typography>
            <Typography variant="caption" display="block">
              • <strong>Close</strong>: Close this dialog and merge the PR later
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            size="large"
          >
            Close
          </Button>
          <Button
            onClick={() => window.open(prCreated.url, '_blank')}
            variant="outlined"
            size="large"
          >
            View PR on GitHub
          </Button>
          <Button
            onClick={handleMergePR}
            variant="contained"
            color="success"
            size="large"
            disabled={isMergingPR}
            startIcon={isMergingPR ? <CircularProgress size={20} /> : null}
          >
            {isMergingPR ? 'Merging...' : 'Merge Now'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const resourceTypeLabel = resourceType === 'configmap' ? 'ConfigMap' : resourceType === 'secret' ? 'Secret' : 'Deployment'

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Edit YAML - {resourceName} ({resourceTypeLabel})</DialogTitle>
      <DialogContent>
        {filesLoading || matchingFile ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              {matchingFile ? 'Finding best matching file...' : 'Loading files...'}
            </Typography>
          </Box>
        ) : (
          <>
            {/* Match Info Alert */}
            {matchInfo && (
              <Alert
                severity={matchInfo.method === 'content' || matchInfo.method === 'exact' || matchInfo.method === 'directory' ? 'success' : 'info'}
                sx={{ mb: 2 }}
              >
                <Typography variant="body2">
                  {matchInfo.method === 'content' && '✓ File matched by cluster YAML comparison (exact match!)'}
                  {matchInfo.method === 'exact' && '✓ File automatically matched by exact name'}
                  {matchInfo.method === 'directory' && '✓ File automatically matched by directory structure'}
                  {matchInfo.method === 'namespace' && '✓ File automatically matched by namespace pattern'}
                  {matchInfo.method === 'fuzzy' && '✓ File automatically matched by similarity'}
                </Typography>
              </Alert>
            )}

            {/* File Selector */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select YAML File</InputLabel>
              <Select
                value={selectedFile || ''}
                onChange={(e) => loadFile(e.target.value)}
                label="Select YAML File"
              >
                {files?.map((file: any) => (
                  <MenuItem key={file.path} value={file.path}>
                    {file.path}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Kustomization Tabs */}
            {kustomize?.hasKustomization && (
              <Box sx={{ mb: 2 }}>
                <Tabs value={kustomizeTab} onChange={(_, v) => setKustomizeTab(v)}>
                  <Tab label="Base" value="base" />
                  {kustomize.overlays.length > 0 && <Tab label="Overlays" value="overlay" />}
                </Tabs>

                {kustomizeTab === 'overlay' && kustomize.overlays.length > 0 && (
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel>Select Overlay</InputLabel>
                    <Select
                      value={selectedOverlay}
                      onChange={(e) => setSelectedOverlay(e.target.value)}
                      label="Select Overlay"
                    >
                      {kustomize.overlays.map((overlay: string) => (
                        <MenuItem key={overlay} value={overlay}>
                          {overlay}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
            )}

            {/* Monaco Editor */}
            {selectedFile && (
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <Editor
                  height="500px"
                  defaultLanguage="yaml"
                  value={yamlContent}
                  onChange={(value) => setYamlContent(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    scrollBeyondLastLine: false,
                  }}
                />
              </Box>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleCreatePR}
          variant="contained"
          disabled={!selectedFile || yamlContent === originalContent || isCreatingPR}
        >
          {isCreatingPR ? 'Creating PR...' : 'Create Pull Request'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
