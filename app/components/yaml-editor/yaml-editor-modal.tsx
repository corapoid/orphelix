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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Editor from '@monaco-editor/react'
import { useGitHubStore } from '@/lib/core/store'

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
  const [isCreatingPR, setIsCreatingPR] = useState(false)
  const [prCreated, setPrCreated] = useState<{ number: number; url: string } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isMergingPR, setIsMergingPR] = useState(false)
  const [matchingFile, setMatchingFile] = useState(false)
  const [matchInfo, setMatchInfo] = useState<{ method: string; confidence?: number; reasoning?: string } | null>(null)
  const [matchedFiles, setMatchedFiles] = useState<Array<{ file: string; confidence: number; environment: string; reasoning: string }>>([])
  const [showFileSelector, setShowFileSelector] = useState(false)

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
        // Check if AI is available (OpenAI key configured)
        const openaiKey = localStorage.getItem('kubevista_openai_key')

        let response: Response

        if (openaiKey) {
          // Smart filtering before AI matching for better performance
          const baseResourceName = resourceName.replace(/-(main|dev|prod|staging|test)$/, '')
          const resourceWords = baseResourceName.toLowerCase().split(/[-_]/)

          // Filter to only relevant files (max 50 most likely matches)
          let relevantFiles = files.filter((f: any) => {
            const path = f.path.toLowerCase()
            const name = baseResourceName.toLowerCase()

            // Match if path contains resource name or any word from resource name
            return (
              path.includes(name) ||
              path.includes(resourceName.toLowerCase()) ||
              resourceWords.some(word => word.length > 2 && path.includes(word)) ||
              path.includes('helm-release') ||
              path.includes('application') ||
              path.includes('deployment') ||
              path.includes('kustomization') ||
              path.includes(resourceType)
            )
          })

          // If still too many, take first 50
          if (relevantFiles.length > 50) {
            relevantFiles = relevantFiles.slice(0, 50)
          }

          // If no relevant files found, use all files (but limit to 100 for safety)
          const filesToMatch = relevantFiles.length > 0 ? relevantFiles : files.slice(0, 100)

          // AI-powered matching with filtered files
          response = await fetch('/api/ai/match-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              resourceName,
              namespace,
              resourceType,
              files: filesToMatch.map((f: any) => ({ path: f.path, name: f.name })),
              apiKey: openaiKey,
            }),
          })
        } else {
          // Fallback: simple pattern matching (no content fetching for speed)
          const baseResourceName = resourceName.replace(/-(main|dev|prod|staging|test)$/, '')

          // Quick pattern matching without fetching file contents
          const matchedFile = files.find((f: any) => {
            const path = f.path.toLowerCase()
            const name = baseResourceName.toLowerCase()
            const fullName = resourceName.toLowerCase()

            // Exact match patterns
            return (
              path.includes(`${name}/helm-release.yaml`) ||
              path.includes(`${name}/application.yaml`) ||
              path.includes(`${fullName}/helm-release.yaml`) ||
              path.includes(`${fullName}/application.yaml`) ||
              (path.includes(name) && (path.includes('helm-release') || path.includes('application')))
            )
          })

          if (matchedFile) {
            // Simulate response format
            await loadFile(matchedFile.path)
            setMatchInfo({
              method: 'pattern',
              confidence: 75,
              reasoning: 'Matched by file path pattern',
            })
            setMatchingFile(false)
            return
          }

          // No match found - skip pattern matching API call
          console.warn('[YamlEditor] No match found with simple pattern matching')
          setMatchingFile(false)
          return
        }

        if (!response.ok) {
          const errorText = await response.text()
          console.error('[YamlEditor] Failed to match file:', response.status, errorText)
          return
        }

        const data = await response.json()

        // Handle different response formats (AI vs pattern matching)
        if (openaiKey && data.matches) {
          // New AI format with multiple matches
          setMatchedFiles(data.matches)

          if (data.matches.length > 1) {
            // Multiple matches - show selector
            setShowFileSelector(true)
            setMatchInfo({
              method: 'ai',
              confidence: data.matches[0]?.confidence,
              reasoning: `Found ${data.matches.length} possible matches`,
            })
          } else if (data.matches.length === 1) {
            // Single match - load directly
            setMatchInfo({
              method: 'ai',
              confidence: data.matches[0].confidence,
              reasoning: data.matches[0].reasoning,
            })
            await loadFile(data.matches[0].file)
          } else {
            console.warn('[YamlEditor] No matches found')
          }
        } else {
          // Old format or pattern matching
          const matchedFilePath = openaiKey
            ? data.matchedFile  // Old AI format
            : data.matchedFile?.path  // Pattern matcher returns object

          if (matchedFilePath) {
            setMatchInfo({
              method: openaiKey ? 'ai' : (data.method || 'pattern'),
              confidence: data.confidence,
              reasoning: data.reasoning,
            })
            await loadFile(matchedFilePath)
          } else {
            console.warn('[YamlEditor] No match found')
          }
        }
      } catch (error) {
        console.error('Error matching file:', error)
      } finally {
        setMatchingFile(false)
      }
    }

    autoMatchFile()
  }, [files, open])

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
                severity={matchInfo.method === 'content' || matchInfo.method === 'exact' || matchInfo.method === 'directory' || matchInfo.method === 'ai' ? 'success' : 'info'}
                sx={{ mb: 2 }}
              >
                <Typography variant="body2">
                  {matchInfo.method === 'ai' && `✓ File matched by AI (confidence: ${matchInfo.confidence}%)`}
                  {matchInfo.method === 'content' && '✓ File matched by cluster YAML comparison (exact match!)'}
                  {matchInfo.method === 'exact' && '✓ File automatically matched by exact name'}
                  {matchInfo.method === 'directory' && '✓ File automatically matched by directory structure'}
                  {matchInfo.method === 'namespace' && '✓ File automatically matched by namespace pattern'}
                  {matchInfo.method === 'fuzzy' && '✓ File automatically matched by similarity'}
                  {matchInfo.method === 'pattern' && '✓ File automatically matched by pattern matching'}
                </Typography>
                {matchInfo.reasoning && (
                  <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.8 }}>
                    {matchInfo.reasoning}
                  </Typography>
                )}
              </Alert>
            )}

            {/* AI Multiple Matches Selector */}
            {showFileSelector && matchedFiles.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  AI found multiple possible matches. Select the environment you want to edit:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {matchedFiles.map((match) => (
                    <Button
                      key={match.file}
                      variant={selectedFile === match.file ? 'contained' : 'outlined'}
                      onClick={async () => {
                        setShowFileSelector(false)
                        setMatchInfo({
                          method: 'ai',
                          confidence: match.confidence,
                          reasoning: match.reasoning,
                        })
                        await loadFile(match.file)
                      }}
                      sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        py: 1.5,
                        px: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {match.environment.toUpperCase()} - {match.file.split('/').pop()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {match.file}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                          Confidence: {match.confidence}% • {match.reasoning}
                        </Typography>
                      </Box>
                    </Button>
                  ))}
                </Box>
              </Box>
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
