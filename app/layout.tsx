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
                  p: 3,
                  width: { sm: '100%' },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Toolbar />
                <Box sx={{ flexGrow: 1 }}>
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
