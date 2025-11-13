'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useGitHubStore } from '@/lib/core/store'

export function RepoSelector() {
  const { data: session } = useSession()
  const { selectedRepo, setSelectedRepo } = useGitHubStore()

  const { data: repos, isLoading } = useQuery({
    queryKey: ['github-repos'],
    queryFn: async () => {
      const response = await fetch('/api/github/repos')
      if (!response.ok) throw new Error('Failed to fetch repositories')
      return response.json()
    },
    enabled: !!session?.accessToken,
  })

  const handleChange = (fullName: string) => {
    const repo = repos?.find((r: any) => r.fullName === fullName)
    if (repo) {
      setSelectedRepo({
        owner: repo.owner,
        repo: repo.repo,
        branch: repo.defaultBranch,
      })
    }
  }

  if (!session) {
    return null
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={20} />
        <span>Loading repositories...</span>
      </Box>
    )
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Select Repository</InputLabel>
      <Select
        value={selectedRepo ? `${selectedRepo.owner}/${selectedRepo.repo}` : ''}
        onChange={(e) => handleChange(e.target.value)}
        label="Select Repository"
      >
        {repos?.map((repo: any) => (
          <MenuItem key={repo.fullName} value={repo.fullName}>
            {repo.fullName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
