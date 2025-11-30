'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { GlassDialog } from '@/lib/ui'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface BranchSelectorProps {
  owner: string
  repo: string
  selectedBranch: string
  onBranchChange: (branch: string) => void
}

export function BranchSelector({ owner, repo, selectedBranch, onBranchChange }: BranchSelectorProps) {
  const queryClient = useQueryClient()
  const [showNewBranchDialog, setShowNewBranchDialog] = useState(false)
  const [newBranchName, setNewBranchName] = useState('')
  const [creating, setCreating] = useState(false)

  const { data: branches, isLoading } = useQuery({
    queryKey: ['github-branches', owner, repo],
    queryFn: async () => {
      const response = await fetch(`/api/github/branches?owner=${owner}&repo=${repo}`)
      if (!response.ok) throw new Error('Failed to fetch branches')
      return response.json() as Promise<Array<{ name: string; protected: boolean }>>
    },
    enabled: !!owner && !!repo,
  })

  const handleCreateBranch = async () => {
    if (!newBranchName.trim()) return

    setCreating(true)
    try {
      const response = await fetch('/api/github/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner,
          repo,
          baseBranch: selectedBranch,
          newBranch: newBranchName.trim(),
        }),
      })

      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['github-branches', owner, repo] })
        onBranchChange(newBranchName.trim())
        setShowNewBranchDialog(false)
        setNewBranchName('')
      }
    } catch (error) {
      console.error('Failed to create branch:', error)
    } finally {
      setCreating(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Branch</InputLabel>
        <Select
          value={selectedBranch}
          onChange={(e) => onBranchChange(e.target.value)}
          label="Branch"
          disabled={isLoading}
        >
          {isLoading ? (
            <MenuItem disabled>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              Loading...
            </MenuItem>
          ) : (
            branches?.map((branch) => (
              <MenuItem key={branch.name} value={branch.name}>
                {branch.name} {branch.protected && '🔒'}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <Button size="small" variant="outlined" onClick={() => setShowNewBranchDialog(true)}>
        New Branch
      </Button>

      <GlassDialog open={showNewBranchDialog} onClose={() => setShowNewBranchDialog(false)}>
        <DialogTitle>Create New Branch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Branch Name"
            fullWidth
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
            helperText={`Branch from: ${selectedBranch}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewBranchDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateBranch} disabled={!newBranchName.trim() || creating}>
            {creating ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </GlassDialog>
    </Box>
  )
}
