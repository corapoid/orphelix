'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import LabelIcon from '@mui/icons-material/Label'
import { useState } from 'react'
import { PageHeader } from '@/app/components/common/page-header'
import { GlassPanel } from '@/app/components/common/glass-panel'
import { useLabels } from '@/lib/hooks/use-labels'
import { DetailSkeleton } from '@/app/components/common/detail-skeleton'
import { ErrorState } from '@/app/components/common/error-state'
import { usePageSearch } from '@/lib/contexts/search-context'

export default function LabelsPage() {
  const [selector, setSelector] = useState('')
  const searchQuery = usePageSearch('Search labels...')
  const { data, isLoading, error, refetch } = useLabels(selector)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (error) {
    return (
      <Box>
        <PageHeader title="Labels" />
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
        title="Labels"
        subtitle={`${data?.totalResources || 0} resources • ${data?.labels.length || 0} unique labels`}
        onRefresh={refetch}
      />

      {/* Label Selector */}
      <GlassPanel sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Filter resources using Kubernetes label selector syntax
        </Typography>
        <form onSubmit={handleSelectorSubmit}>
          <TextField
            name="selector"
            fullWidth
            placeholder="app=nginx,environment=production"
            defaultValue={selector}
            size="small"
          />
        </form>
        {selector && (
          <Box sx={{ mt: 2 }}>
            <Chip
              label={selector}
              onDelete={() => setSelector('')}
              color="primary"
              size="small"
            />
          </Box>
        )}
      </GlassPanel>

      {/* Label Distribution */}
      {filteredLabels.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredLabels.map((labelGroup) => (
            <GlassPanel key={labelGroup.key}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LabelIcon fontSize="small" color="primary" />
                  <Typography variant="body1" fontWeight={600}>
                    {labelGroup.key}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={`${labelGroup.totalCount} resources`}
                    size="small"
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
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                  Resource Types
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {labelGroup.resourceTypes.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      size="small"
                    />
                  ))}
                </Box>
              </Box>

              {/* Values */}
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                  Values
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                  {labelGroup.values.map(({ value, count }) => (
                    <Chip
                      key={value}
                      label={`${value} (${count})`}
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => setSelector(`${labelGroup.key}=${value}`)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>
            </GlassPanel>
          ))}
        </Box>
      ) : (
        <GlassPanel>
          <Box sx={{ textAlign: 'center', py: 8 }}>
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
