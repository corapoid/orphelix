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
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  onRefresh?: () => unknown
  isRefreshing?: boolean
  actions?: React.ReactNode
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
  breadcrumbs,
  onRefresh,
  isRefreshing = false,
  actions,
  filters,
}: PageHeaderProps) {
  const router = useRouter()

  const handleBreadcrumbClick = (href: string) => {
    router.push(href as never)
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 2 }}
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
      )}

      {/* Header with title, filters, and actions on the right */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: subtitle ? 0.5 : 0 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Filters on the right, same line as refresh */}
          {filters}

          {onRefresh && (
            <RefreshButton onRefresh={onRefresh} isLoading={isRefreshing} />
          )}
          {actions}
        </Box>
      </Box>
    </Box>
  )
}
