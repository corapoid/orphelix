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
  iconColor?: string
  iconBgColor?: string
  details?: Array<{
    label: string
    value: number
    color?: 'success' | 'warning' | 'error' | 'info'
  }>
}

const colorMap = {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#F43F5E',
  info: '#06B6D4',
}

export function SummaryCard({
  title,
  total,
  icon: Icon,
  href,
  iconColor = '#FFFFFF',
  iconBgColor,
  details
}: SummaryCardProps) {
  const cardContent = (
    <Card
      sx={{
        height: '100%',
        cursor: href ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': href
          ? {
              transform: 'translateY(-2px)',
            }
          : {},
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.75rem' }}
            >
              {title}
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 700, lineHeight: 1 }}>
              {total}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: iconBgColor || 'primary.main',
              color: iconColor,
              flexShrink: 0,
              boxShadow: iconBgColor ? `0 4px 14px ${iconBgColor}40` : '0 4px 14px rgba(139, 92, 246, 0.25)',
            }}
          >
            <Icon sx={{ fontSize: 28 }} />
          </Box>
        </Box>

        {details && details.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {details.map((detail) => (
              <Box
                key={detail.label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  {detail.label}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
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
