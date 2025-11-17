'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { RefreshButton } from './refresh-button'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useRouter } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string | React.ReactNode
  subtitle?: string
  metadata?: (string | React.ReactNode)[]  // Array of metadata items to display vertically
  breadcrumbs?: BreadcrumbItem[]
  onRefresh?: () => unknown
  isRefreshing?: boolean
  actions?: React.ReactNode
  headerActions?: React.ReactNode  // Actions next to refresh button in breadcrumb line
  // Filters only (search is now in global header)
  filters?: React.ReactNode
}

/**
 * Unified page header component
 *
 * Provides consistent styling across all pages with:
 * - Title and optional subtitle
 * - Breadcrumbs navigation
 * - Filters (on the right, same line as refresh button)
 * - Refresh button
 * - Custom actions
 *
 * Note: Search is now in the global header, not here
 */
export function PageHeader({
  title,
  subtitle,
  metadata,
  breadcrumbs,
  onRefresh,
  isRefreshing = false,
  actions,
  headerActions,
  filters,
}: PageHeaderProps) {
  const router = useRouter()

  const handleBreadcrumbClick = (href: string) => {
    router.push(href as never)
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumbs with refresh button */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
          >
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1

              if (isLast || !crumb.href) {
                return (
                  <Typography
                    key={crumb.label}
                    color="text.primary"
                    sx={{ fontSize: '0.875rem', fontWeight: 500 }}
                  >
                    {crumb.label}
                  </Typography>
                )
              }

              return (
                <Link
                  key={crumb.label}
                  component="button"
                  onClick={() => handleBreadcrumbClick(crumb.href!)}
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {crumb.label}
                </Link>
              )
            })}
          </Breadcrumbs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {headerActions}
            {onRefresh && (
              <RefreshButton onRefresh={onRefresh} isLoading={isRefreshing} />
            )}
          </Box>
        </Box>
      )}

      {/* Header with title, filters, and actions on the right */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          {typeof title === 'string' ? (
            <Typography variant="h4" sx={{ fontWeight: 700, mb: subtitle || metadata ? 0.5 : 0 }}>
              {title}
            </Typography>
          ) : (
            <Box sx={{ mb: subtitle || metadata ? 0.5 : 0 }}>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
            </Box>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
          {metadata && metadata.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {metadata.map((item, index) => (
                typeof item === 'string' ? (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                ) : (
                  <Box key={index}>
                    {item}
                  </Box>
                )
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Filters on the right */}
          {filters}
          {actions}
        </Box>
      </Box>
    </Box>
  )
}
