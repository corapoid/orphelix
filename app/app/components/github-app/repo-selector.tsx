'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { useGitHubStore } from '@/lib/core/store'

export function GitHubAppRepoSelector() {
  const { selectedRepo, setSelectedRepo } = useGitHubStore()
  const [selectedInstallation, setSelectedInstallation] = useState<number | null>(null)

  const { data: installations, isLoading } = useQuery({
    queryKey: ['github-app-installations'],
    queryFn: async () => {
      const response = await fetch('/api/github-app/installations')
      if (!response.ok) throw new Error('Failed to fetch installations')
      return response.json()
    },
  })

  interface Installation {
    id: number
    account: { login: string }
    repositories: Array<{ id: number; name: string; full_name: string; owner: string; default_branch: string; private: boolean }>
  }

  interface RepoWithInstallation {
    id: number
    name: string
    full_name: string
    owner: string
    default_branch: string
    private: boolean
    installationId: number
    accountLogin: string
  }

  // Flatten all repositories from all installations
  const allRepositories = installations?.flatMap((inst: Installation) =>
    inst.repositories.map((repo) => ({
      ...repo,
      installationId: inst.id,
      accountLogin: inst.account.login,
    }))
  ) || []

  const handleChange = (fullName: string) => {
    const repo = allRepositories.find((r: RepoWithInstallation) => r.full_name === fullName)
    if (repo) {
      setSelectedRepo({
        owner: repo.owner,
        repo: repo.name,
        branch: repo.default_branch,
      })
      setSelectedInstallation(repo.installationId)
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={20} />
        <Typography variant="body2">Loading repositories...</Typography>
      </Box>
    )
  }

  if (!installations || installations.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No installations found. Please install the GitHub App first.
      </Typography>
    )
  }

  if (allRepositories.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No repositories accessible. Grant access to repositories in GitHub App settings.
      </Typography>
    )
  }

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Select Repository</InputLabel>
        <Select
          value={selectedRepo ? `${selectedRepo.owner}/${selectedRepo.repo}` : ''}
          onChange={(e) => handleChange(e.target.value)}
          label="Select Repository"
        >
          {installations.map((installation: Installation) => [
            // Group header
            <MenuItem disabled key={`header-${installation.id}`}>
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                {installation.account.login}
              </Typography>
            </MenuItem>,
            // Repositories under this installation
            ...installation.repositories.map((repo) => (
              <MenuItem key={repo.full_name} value={repo.full_name}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 2 }}>
                  {repo.name}
                  {repo.private && (
                    <Chip label="Private" size="small" color="warning" sx={{ height: 16 }} />
                  )}
                </Box>
              </MenuItem>
            )),
          ])}
        </Select>
      </FormControl>

      {selectedInstallation && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Repository from installation #{selectedInstallation}
        </Typography>
      )}
    </Box>
  )
}
