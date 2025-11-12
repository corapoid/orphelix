import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { SvgIconComponent } from '@mui/icons-material'
import Link from 'next/link'

interface SummaryCardProps {
  title: string
  total: number
  icon: SvgIconComponent
  href?: string
  details?: Array<{
    label: string
    value: number
    color?: 'success' | 'warning' | 'error' | 'info'
  }>
}

const colorMap = {
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
}

export function SummaryCard({ title, total, icon: Icon, href, details }: SummaryCardProps) {
  const cardContent = (
    <Card
      sx={{
        height: '100%',
        cursor: href ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': href
          ? {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            }
          : {},
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              mr: 2,
            }}
          >
            <Icon />
          </Box>
          <Box>
            <Typography variant="h4" component="div">
              {total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>

        {details && details.length > 0 && (
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            {details.map((detail) => (
              <Box
                key={detail.label}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 0.5,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {detail.label}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    color: detail.color ? colorMap[detail.color] : 'text.primary',
                  }}
                >
                  {detail.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )

  if (href) {
    return (
      <Link href={href as any} style={{ textDecoration: 'none', color: 'inherit' }}>
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
