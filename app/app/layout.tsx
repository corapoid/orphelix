'use client'

import { ReactNode } from 'react'
import { Providers } from './components/providers'
import { LayoutContent } from './components/layout/layout-content'
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
                  var theme = localStorage.getItem('orphelix-theme-mode');
                  if (!theme) {
                    var legacy = localStorage.getItem('theme-mode');
                    if (legacy) {
                      localStorage.setItem('orphelix-theme-mode', legacy);
                      localStorage.removeItem('theme-mode');
                      theme = legacy;
                    } else {
                      theme = 'system';
                    }
                  }
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
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  )
}
