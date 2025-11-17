'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import LabelIcon from '@mui/icons-material/Label'
import { useState } from 'react'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useLabels } from '@/lib/hooks/use-labels'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'

export default function LabelsPage() {
  const [selector, setSelector] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading, error, refetch } = useLabels(selector)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error) {
    return (
      <Box>
        <PageHeader
          title="Labels & Annotations"
          breadcrumbs={[{ label: 'Labels' }]}
        />
        <ErrorState
          error={error}
          onRetry={refetch}
          title="Failed to Load Labels"
        />
      </Box>
    )
  }

  // Filter labels based on search query
  const filteredLabels = data?.labels.filter((label) =>
    label.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    label.values.some((v) => v.value.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || []

  const handleSelectorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const input = form.elements.namedItem('selector') as HTMLInputElement
    setSelector(input.value)
  }

  return (
    <Box>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LabelIcon />
            Labels Browser
          </Box>
        }
        metadata={[
          `${data?.totalResources || 0} resources`,
          `${data?.labels.length || 0} unique labels`,
        ]}
        breadcrumbs={[{ label: 'Labels' }]}
        onRefresh={refetch}
      />

      {/* Label Selector Search */}
      <GlassPanel sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Label Selector
        </Typography>
        <form onSubmit={handleSelectorSubmit}>
          <TextField
            name="selector"
            fullWidth
            placeholder="app=nginx,environment=production"
            defaultValue={selector}
            helperText="Use Kubernetes label selector syntax: key=value, key!=value, key, !key"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
        {selector && (
          <Box sx={{ mt: 2 }}>
            <Chip
              label={`Selector: ${selector}`}
              onDelete={() => setSelector('')}
              color="primary"
              variant="outlined"
            />
          </Box>
        )}
      </GlassPanel>

      {/* Search Box */}
      <GlassPanel sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search labels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </GlassPanel>

      {/* Label Statistics */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Label Distribution ({filteredLabels.length} labels)
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredLabels.map((labelGroup) => (
            <Paper
              key={labelGroup.key}
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 30, 46, 0.6)'
                    : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(209, 213, 219, 0.4)',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LabelIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {labelGroup.key}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    label={`${labelGroup.totalCount} resources`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={`${labelGroup.values.length} values`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>

              {/* Resource Types */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Resource Types:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {labelGroup.resourceTypes.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      size="small"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Values */}
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Values:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {labelGroup.values.map(({ value, count }) => (
                  <Chip
                    key={value}
                    label={`${value} (${count})`}
                    size="medium"
                    variant="filled"
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(99, 102, 241, 0.2)'
                          : 'rgba(99, 102, 241, 0.1)',
                      '&:hover': {
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(99, 102, 241, 0.3)'
                            : 'rgba(99, 102, 241, 0.2)',
                      },
                    }}
                    onClick={() => setSelector(`${labelGroup.key}=${value}`)}
                  />
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {filteredLabels.length === 0 && (
        <GlassPanel>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <LabelIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No labels found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery
                ? 'Try a different search query'
                : 'No labels are available in this namespace'}
            </Typography>
          </Box>
        </GlassPanel>
      )}
    </Box>
  )
}
