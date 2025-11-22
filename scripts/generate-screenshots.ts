import { chromium, Browser, Page } from '@playwright/test'
import { promises as fs } from 'fs'
import path from 'path'

const SCREENSHOTS_DIR = path.join(process.cwd(), 'docs', 'screenshots')
const BASE_URL = 'http://localhost:3000'
const VIEWPORT = { width: 1920, height: 1080 }

interface Screenshot {
  name: string
  path: string
  description: string
  skipDemoMode?: boolean
  setupActions?: (page: Page) => Promise<void>
}

const screenshots: Screenshot[] = [
  {
    name: 'welcome-modal',
    path: '/',
    description: 'Welcome modal with mode selection',
    skipDemoMode: true, // Don't set demo mode for welcome modal
  },
  {
    name: 'dashboard',
    path: '/demo',
    description: 'Main dashboard with cluster overview',
  },
  {
    name: 'deployment-detail',
    path: '/demo/deployments/nginx-deployment',
    description: 'Deployment detail page with YAML editor',
    setupActions: async (page) => {
      // Wait for data to load
      await page.waitForTimeout(3000)
    },
  },
  {
    name: 'pods-list',
    path: '/demo/pods',
    description: 'Pods list view with status badges',
  },
  {
    name: 'pod-detail',
    path: '/demo/pods/nginx-deployment-7d64c8f5b7-abc12',
    description: 'Pod detail page with logs',
  },
  {
    name: 'services',
    path: '/demo/services',
    description: 'Services list view',
  },
  {
    name: 'topology',
    path: '/demo/topology',
    description: 'Interactive topology graph',
    setupActions: async (page) => {
      // Wait for topology graph to load and render
      await page.waitForTimeout(3000)
    },
  },
  {
    name: 'repo-browser',
    path: '/demo/repo-browser',
    description: 'Repository browser with file viewer',
    setupActions: async (page) => {
      // Wait for tree to load
      await page.waitForTimeout(2000)

      // Expand k8s folder
      const k8sFolder = page.getByText('k8s', { exact: true }).first()
      await k8sFolder.click().catch(() => {})
      await page.waitForTimeout(500)

      // Expand deployments folder
      const deploymentsFolder = page.getByText('deployments', { exact: true }).first()
      await deploymentsFolder.click().catch(() => {})
      await page.waitForTimeout(500)

      // Click on frontend.yaml file
      const frontendFile = page.getByText('frontend.yaml', { exact: true }).first()
      await frontendFile.click().catch(() => {})
      await page.waitForTimeout(2000)
    },
  },
  {
    name: 'settings',
    path: '/settings',
    description: 'Settings page with theme selection',
  },
]

async function waitForPageLoad(page: Page) {
  // Wait for network to be idle
  await page.waitForLoadState('networkidle')
  // Wait a bit more for animations to complete and content to load
  await page.waitForTimeout(2000)
}

async function generateScreenshots() {
  console.log('🚀 Starting screenshot generation...\n')

  // Create screenshots directory if it doesn't exist
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true })

  const browser: Browser = await chromium.launch({
    headless: true,
  })

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // Retina display
  })

  try {
    for (const screenshot of screenshots) {
      console.log(`📸 Capturing: ${screenshot.name}`)
      console.log(`   Path: ${screenshot.path}`)

      // Create a new page for each screenshot to ensure clean state
      const page = await context.newPage()

      // Set demo mode cookie before navigation
      if (!screenshot.skipDemoMode) {
        await context.addCookies([{
          name: 'app-mode',
          value: 'demo',
          domain: 'localhost',
          path: '/',
        }])

        // Set demo mode in localStorage - this will be injected before page load
        await page.addInitScript(() => {
          localStorage.setItem('orphelix-mode', JSON.stringify({
            state: {
              mode: 'demo',
              hasCompletedWelcome: true,
              selectedContext: null,
              selectedNamespace: 'default',
              clusterConnected: false,
              connectionError: null,
              realtimeEnabled: false,
              autoRefreshEnabled: false,
              autoRefreshInterval: 30,
            },
            version: 0,
          }))
        })
      }

      // Navigate to the page
      await page.goto(`${BASE_URL}${screenshot.path}`, {
        waitUntil: 'networkidle',
      })

      // Wait for page to fully load
      await waitForPageLoad(page)

      // Hide Next.js dev indicators (Turbopack icon, etc.)
      await page.addStyleTag({
        content: `
          #__next-build-watcher,
          nextjs-portal,
          [data-nextjs-dialog-overlay],
          [id^="__next"] > div[style*="position: fixed"][style*="bottom"],
          [id^="__next"] > div[style*="position: fixed"][style*="z-index: 9000"] {
            display: none !important;
          }
        `
      })

      // If welcome modal is still visible (shouldn't be but let's handle it), click Demo
      if (!screenshot.skipDemoMode) {
        try {
          const demoButton = page.getByRole('button', { name: /^demo$/i })
          const isVisible = await demoButton.isVisible({ timeout: 1000 }).catch(() => false)
          if (isVisible) {
            console.log('   ⚠️  Welcome modal detected, clicking Demo button...')
            await demoButton.click()
            await waitForPageLoad(page)
          }
        } catch (e) {
          // Ignore - modal not present
        }
      }

      // Execute any custom setup actions
      if (screenshot.setupActions) {
        await screenshot.setupActions(page)
        await waitForPageLoad(page)
      }

      // Take screenshot
      const screenshotPath = path.join(SCREENSHOTS_DIR, `${screenshot.name}.png`)
      await page.screenshot({
        path: screenshotPath,
        fullPage: false, // Only visible viewport
      })

      console.log(`   ✅ Saved to: ${screenshotPath}\n`)

      // Close the page
      await page.close()
    }

    console.log('✨ All screenshots generated successfully!')
    console.log(`📁 Screenshots saved in: ${SCREENSHOTS_DIR}\n`)

    // Generate markdown reference
    const markdownPath = path.join(SCREENSHOTS_DIR, 'README.md')
    let markdown = '# Screenshots\n\n'
    markdown += 'Auto-generated screenshots of KubeVista in demo mode.\n\n'

    for (const screenshot of screenshots) {
      markdown += `## ${screenshot.description}\n\n`
      markdown += `![${screenshot.description}](./${screenshot.name}.png)\n\n`
    }

    await fs.writeFile(markdownPath, markdown)
    console.log(`📝 Generated markdown reference: ${markdownPath}`)
  } catch (error) {
    console.error('❌ Error generating screenshots:', error)
    throw error
  } finally {
    await browser.close()
  }
}

// Run the script
generateScreenshots().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
