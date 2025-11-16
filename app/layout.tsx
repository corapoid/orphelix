'use client'

import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Providers } from './components/providers'
import { Sidebar } from './components/layout/sidebar'
import { TopBar } from './components/layout/top-bar'

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
          <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                pt: 2,
                pr: 2,
                pb: 2,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <TopBar />
                <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
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
