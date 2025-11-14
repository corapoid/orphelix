'use client'

import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Providers } from './components/providers'
import { Header } from './components/layout/header'
import { Sidebar } from './components/layout/sidebar'
import { Footer } from './components/layout/footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme-mode') || 'dark';
                  var actualTheme = theme;
                  if (theme === 'system') {
                    actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', actualTheme);
                  document.documentElement.style.colorScheme = actualTheme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body style={{ margin: 0 }}>
        <Providers>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header onMenuClick={toggleSidebar} />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Sidebar open={sidebarOpen} onClose={closeSidebar} />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  width: { sm: '100%' },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Toolbar />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                  {children}
                </Box>
                <Footer />
              </Box>
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  )
}
