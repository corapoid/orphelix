import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import ConfigIcon from '@mui/icons-material/Description'
import type { ConfigMap } from '@/types/kubernetes'
import { ResourceCard } from '@/app/components/common/resource-card'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'

interface ConfigMapGridViewProps {
  configMaps: ConfigMap[]
}

export function ConfigMapGridView({ configMaps }: ConfigMapGridViewProps) {
  const navigateTo = useNavigateTo()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2,
      }}
    >
      {configMaps.map((cm) => {
        const keyCount = Object.keys(cm.data).length
        const keys = Object.keys(cm.data).slice(0, 3)
        const hasMore = keyCount > 3

        return (
          <ResourceCard
            key={cm.name}
            name={cm.name}
            resourceType={cm.namespace}
            resourceColor="#10B981"
            icon={ConfigIcon}
            onClick={() => navigateTo(`/configmaps/${encodeURIComponent(cm.name)}`)}
            statusBadge={
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Chip
                  label={`${keyCount} key${keyCount !== 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.75rem',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : 'rgba(16, 185, 129, 0.1)',
                    color: '#10B981',
                    border: '1px solid',
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                  }}
                />
              </Box>
            }
            metrics={
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {cm.age}
                </Typography>
              </Box>
            }
          />
        )
      })}
    </Box>
  )
}
