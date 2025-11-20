'use client'

import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Editor from '@monaco-editor/react'
import { useGitHubStore } from '@/lib/core/store'

interface FileEditorModalProps {
  open: boolean
  onClose: () => void
  filePath: string
  branch: string
}

export function FileEditorModal({ open, onClose, filePath, branch }: FileEditorModalProps) {
  const { selectedRepo } = useGitHubStore()

  const [yamlContent, setYamlContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [fileSha, setFileSha] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCreatingPR, setIsCreatingPR] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [prCreated, setPrCreated] = useState<{ number: number; url: string } | null>(null)
  const [isMergingPR, setIsMergingPR] = useState(false)

  // Load file content
  useEffect(() => {
    const loadFile = async () => {
      if (!selectedRepo || !filePath || !open) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/github/file-content?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}&path=${encodeURIComponent(filePath)}&ref=${branch}`
        )

        if (!response.ok) {
          throw new Error(`Failed to load file: ${response.statusText}`)
        }

        const data = await response.json()
        setYamlContent(data.content)
        setOriginalContent(data.content)
        setFileSha(data.sha)
      } catch (err: any) {
        setError(err.message || 'Failed to load file')
      } finally {
        setIsLoading(false)
      }
    }

    loadFile()
  }, [selectedRepo, filePath, branch, open])

  const handleCreatePR = async () => {
    if (!selectedRepo) return

    setIsCreatingPR(true)
    setError(null)

    try {
      const branchName = `update-${filePath.replace(/\//g, '-')}-${Date.now()}`

      const response = await fetch('/api/github/create-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: selectedRepo.owner,
          repo: selectedRepo.repo,
          branch: branchName,
          baseBranch: branch,
          filePath,
          content: yamlContent,
          sha: fileSha,
          commitMessage: `Update ${filePath}`,
          prTitle: `Update ${filePath}`,
          prBody: `Updated configuration file: ${filePath}`,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create PR')
      }

      const data = await response.json()
      setPrCreated({ number: data.number, url: data.url })
    } catch (err: any) {
      setError(err.message || 'Failed to create PR')
    } finally {
      setIsCreatingPR(false)
    }
  }

  const handleMergeAndClose = async () => {
    if (!prCreated || !selectedRepo) return

    setIsMergingPR(true)
    setError(null)

    try {
      const response = await fetch('/api/github/merge-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: selectedRepo.owner,
          repo: selectedRepo.repo,
          pullNumber: prCreated.number,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to merge PR')
      }

      // Close modal
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to merge PR')
    } finally {
      setIsMergingPR(false)
    }
  }

  const hasChanges = yamlContent !== originalContent
  const fileExtension = filePath.split('.').pop()?.toLowerCase()
  const editorLanguage = fileExtension === 'json' ? 'json' : fileExtension === 'md' ? 'markdown' : 'yaml'

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{filePath}</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            {prCreated && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Pull Request created successfully!{' '}
                <a href={prCreated.url} target="_blank" rel="noopener noreferrer">
                  View PR #{prCreated.number}
                </a>
              </Alert>
            )}

            <Box sx={{ height: 600, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Editor
                height="100%"
                language={editorLanguage}
                value={yamlContent}
                onChange={(value) => setYamlContent(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  readOnly: !!prCreated,
                }}
              />
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {prCreated ? (
          <>
            <Button onClick={onClose}>Close</Button>
            <Button
              onClick={handleMergeAndClose}
              variant="contained"
              disabled={isMergingPR}
              startIcon={isMergingPR ? <CircularProgress size={16} /> : null}
            >
              {isMergingPR ? 'Merging...' : 'Merge PR & Close'}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={handleCreatePR}
              variant="contained"
              disabled={!hasChanges || isCreatingPR}
              startIcon={isCreatingPR ? <CircularProgress size={16} /> : null}
            >
              {isCreatingPR ? 'Creating PR...' : 'Create Pull Request'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}
