import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import SecretIcon from '@mui/icons-material/Lock'
import type { Secret } from '@/types/kubernetes'
import { ResourceCard } from '@/app/components/common/resource-card'
import { useNavigateTo } from '@/lib/hooks/use-navigate-to'

interface SecretGridViewProps {
  secrets: Secret[]
}

export function SecretGridView({ secrets }: SecretGridViewProps) {
  const navigateTo = useNavigateTo()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2,
      }}
    >
      {secrets.map((secret) => {
        const keyCount = secret.keys.length
        const keys = secret.keys.slice(0, 3)
        const hasMore = keyCount > 3

        return (
          <ResourceCard
            key={secret.name}
            name={secret.name}
            resourceType={secret.namespace}
            resourceColor="#F43F5E"
            icon={SecretIcon}
            onClick={() => navigateTo(`/secrets/${encodeURIComponent(secret.name)}`)}
            statusBadge={
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Chip
                  label={secret.type}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(244, 63, 94, 0.15)'
                        : 'rgba(244, 63, 94, 0.1)',
                    color: '#F43F5E',
                    border: '1px solid',
                    borderColor: 'rgba(244, 63, 94, 0.3)',
                  }}
                />
                <Chip
                  label={`${keyCount} key${keyCount !== 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.75rem',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.05)',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>
            }
            metrics={
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {secret.age}
                </Typography>
              </Box>
            }
          />
        )
      })}
    </Box>
  )
}
