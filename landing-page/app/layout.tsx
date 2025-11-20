import type { Metadata } from 'next'
import AppThemeProvider from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Orphelix - Modern Kubernetes Dashboard',
  description: 'Beautiful GitOps workflow for Kubernetes with real-time monitoring, topology visualization, and demo mode.',
  keywords: ['kubernetes', 'dashboard', 'gitops', 'devops', 'monitoring', 'k8s'],
  authors: [{ name: 'Orphelix Team' }],
  openGraph: {
    title: 'Orphelix - Modern Kubernetes Dashboard',
    description: 'Beautiful GitOps workflow for Kubernetes with real-time monitoring',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="gradient-bg" />
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </body>
    </html>
  )
}
