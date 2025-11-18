'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import { useGitHubStore } from '@/lib/core/store'
import { FileTree } from '@/app/components/repo-browser/file-tree'
import { BranchSelector } from '@/app/components/repo-browser/branch-selector'
import { YamlEditorModal } from '@/app/components/yaml-editor/yaml-editor-modal'

export default function RepoBrowserPage() {
  const { selectedRepo } = useGitHubStore()
  const [selectedBranch, setSelectedBranch] = useState('main')
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    if (selectedRepo?.branch) {
      setSelectedBranch(selectedRepo.branch)
    }
  }, [selectedRepo])

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
    // For now, only open YAML/YML files in editor
    if (path.endsWith('.yaml') || path.endsWith('.yml')) {
      setShowEditor(true)
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 0,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {selectedRepo.owner}/{selectedRepo.repo}
        </Typography>
        <BranchSelector
          owner={selectedRepo.owner}
          repo={selectedRepo.repo}
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
        />
      </Paper>

      {/* Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* File Tree Sidebar */}
        <Paper
          elevation={0}
          sx={{
            width: 300,
            borderRight: 1,
            borderColor: 'divider',
            overflow: 'auto',
          }}
        >
          <FileTree
            owner={selectedRepo.owner}
            repo={selectedRepo.repo}
            branch={selectedBranch}
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile || undefined}
          />
        </Paper>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {selectedFile ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedFile}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedFile.endsWith('.yaml') || selectedFile.endsWith('.yml')
                  ? 'Click to open in editor'
                  : 'Preview not available for this file type'}
              </Typography>
            </Box>
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

      {/* YAML Editor Modal */}
      {showEditor && selectedFile && (
        <YamlEditorModal
          open={showEditor}
          onClose={() => setShowEditor(false)}
          resourceName={selectedFile.split('/').pop() || ''}
          namespace="default"
          resourceType="deployment"
        />
      )}
    </Box>
  )
}
