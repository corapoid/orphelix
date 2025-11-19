'use client'

import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Providers } from './components/providers'
import { Sidebar } from './components/layout/sidebar'
import { TopBar } from './components/layout/top-bar'
import { WelcomeModal } from './components/welcome/welcome-modal'

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Momo+Trust+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme-mode') || 'light';
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
      <body style={{ margin: 0 }} suppressHydrationWarning>
        <Providers>
          <WelcomeModal />
          <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                pr: 2,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  borderTopRightRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <TopBar />
                <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', p: 3 }}>
                  {children}
                </Box>
              </Box>
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  )
}
