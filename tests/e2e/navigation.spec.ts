import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    // Open the sidebar
    const menuButton = page.getByRole('button', { name: /open drawer/i })
    await menuButton.click()

    // Wait for sidebar navigation items to be visible
    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible()
  })

  test('should show all navigation items in sidebar', async ({ page }) => {
    // Expected navigation items
    const expectedNavItems = [
      'Dashboard',
      'Deployments',
      'Pods',
      'Nodes',
      'ConfigMaps',
      'Secrets',
      'HPA',
      'Persistent Volumes',
      'Events',
    ]

    // Verify each navigation item is visible
    for (const item of expectedNavItems) {
      const navItem = page.getByRole('button', { name: item })
      await expect(navItem).toBeVisible()
    }
  })

  test('should navigate to /deployments and show correct heading', async ({ page }) => {
    // Click Deployments
    const deploymentsNav = page.getByRole('button', { name: 'Deployments' })
    await deploymentsNav.click()

    // Verify URL changed to /deployments
    await expect(page).toHaveURL('/deployments')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'Deployments' })).toBeVisible()

    // Verify deployments table is visible (page is fully implemented)
    await expect(page.locator('table')).toBeVisible()
  })

  test('should navigate to /pods and show correct heading', async ({ page }) => {
    // Click Pods
    const podsNav = page.getByRole('button', { name: 'Pods' })
    await podsNav.click()

    // Verify URL changed to /pods
    await expect(page).toHaveURL('/pods')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'Pods' })).toBeVisible()

    // Verify pods table or content is visible (page is implemented)
    await page.waitForSelector('table, [role="progressbar"]', { timeout: 5000 })
  })

  test('should navigate to /nodes and show correct heading', async ({ page }) => {
    // Click Nodes
    const nodesNav = page.getByRole('button', { name: 'Nodes' })
    await nodesNav.click()

    // Verify URL changed to /nodes
    await expect(page).toHaveURL('/nodes')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'Nodes' })).toBeVisible()

    // Verify table is visible (page is implemented)
    await page.waitForSelector('table, [role="progressbar"]', { timeout: 5000 })
  })

  test('should navigate to /configmaps and show correct heading', async ({ page }) => {
    // Click ConfigMaps
    const configMapsNav = page.getByRole('button', { name: 'ConfigMaps' })
    await configMapsNav.click()

    // Verify URL changed to /configmaps
    await expect(page).toHaveURL('/configmaps')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'ConfigMaps' })).toBeVisible()

    // Verify search field is visible (page is implemented)
    await page.waitForSelector('input[placeholder*="Search"]', { timeout: 5000 })
  })

  test('should navigate to /secrets and show correct heading', async ({ page }) => {
    // Click Secrets
    const secretsNav = page.getByRole('button', { name: 'Secrets' })
    await secretsNav.click()

    // Verify URL changed to /secrets
    await expect(page).toHaveURL('/secrets')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'Secrets' })).toBeVisible()

    // Verify search field is visible (page is implemented)
    await page.waitForSelector('input[placeholder*="Search"]', { timeout: 5000 })
  })

  test('should navigate to /hpa and show correct heading', async ({ page }) => {
    // Click HPA
    const hpaNav = page.getByRole('button', { name: 'HPA' })
    await hpaNav.click()

    // Verify URL changed to /hpa
    await expect(page).toHaveURL('/hpa')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'HPA' })).toBeVisible()

    // Verify table is visible (page is implemented)
    await page.waitForSelector('table, [role="progressbar"]', { timeout: 5000 })
  })

  test('should navigate to /pv and show correct heading', async ({ page }) => {
    // Click Persistent Volumes
    const pvNav = page.getByRole('button', { name: 'Persistent Volumes' })
    await pvNav.click()

    // Verify URL changed to /pv
    await expect(page).toHaveURL('/pv')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'Persistent Volumes' })).toBeVisible()

    // Verify tabs are visible (page is implemented)
    await page.waitForSelector('[role="tablist"]', { timeout: 5000 })
  })

  test('should navigate to /events and show correct heading', async ({ page }) => {
    // Click Events
    const eventsNav = page.getByRole('button', { name: 'Events' })
    await eventsNav.click()

    // Verify URL changed to /events
    await expect(page).toHaveURL('/events')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible()

    // Verify events table is visible (page is implemented)
    await page.waitForSelector('table, [role="progressbar"]', { timeout: 5000 })
  })

  test('should navigate back to Dashboard from any page', async ({ page }) => {
    // Navigate to Pods first
    const podsNav = page.getByRole('button', { name: 'Pods' })
    await podsNav.click()
    await expect(page).toHaveURL('/pods')

    // Wait for sidebar to close
    await page.waitForTimeout(500)

    // Re-open sidebar
    const menuButton = page.getByRole('button', { name: /open drawer/i })
    await menuButton.click()

    // Wait for sidebar animation
    await page.waitForTimeout(500)

    // Navigate back to Dashboard
    const dashboardNav = page.getByRole('button', { name: 'Dashboard' })
    await dashboardNav.click()

    // Verify URL is back to root
    await expect(page).toHaveURL('/')

    // Verify Dashboard heading is displayed
    await expect(page.getByRole('heading', { name: 'Dashboard Overview' })).toBeVisible()
  })

  test('should highlight active navigation item', async ({ page }) => {
    // Dashboard should be active initially
    const dashboardNav = page.getByRole('button', { name: 'Dashboard' })
    await expect(dashboardNav).toHaveClass(/Mui-selected/)

    // Navigate to Nodes
    const nodesNav = page.getByRole('button', { name: 'Nodes' })
    await nodesNav.click()

    // Wait for navigation
    await expect(page).toHaveURL('/nodes')

    // Wait for page to settle
    await page.waitForTimeout(500)

    // Re-open sidebar
    const menuButton = page.getByRole('button', { name: /open drawer/i })
    await menuButton.click()

    // Wait for sidebar animation
    await page.waitForTimeout(500)

    // Verify Nodes is now active
    const nodesNavAfter = page.getByRole('button', { name: 'Nodes' })
    await expect(nodesNavAfter).toHaveClass(/Mui-selected/)

    // Verify Dashboard is no longer active
    const dashboardNavAfter = page.getByRole('button', { name: 'Dashboard' })
    await expect(dashboardNavAfter).not.toHaveClass(/Mui-selected/)
  })

  test('should close sidebar after navigation', async ({ page }) => {
    const dashboardNavItem = page.getByRole('button', { name: 'Dashboard' })

    // Sidebar should be open from beforeEach
    await expect(dashboardNavItem).toBeVisible()

    // Click on a navigation item (ConfigMaps)
    const configMapsNav = page.getByRole('button', { name: 'ConfigMaps' })
    await configMapsNav.click()

    // Wait for navigation
    await expect(page).toHaveURL('/configmaps')

    // Wait for drawer animation to complete
    await page.waitForTimeout(500)

    // Sidebar should close automatically (temporary drawer behavior)
    await expect(dashboardNavItem).not.toBeVisible()
  })

  test('should navigate between multiple pages sequentially', async ({ page }) => {
    // Test navigating from Deployments -> Pods -> Events

    // Navigate to Deployments
    const deploymentsNav = page.getByRole('button', { name: 'Deployments' })
    await deploymentsNav.click()
    await expect(page).toHaveURL('/deployments')
    await expect(page.getByRole('heading', { name: 'Deployments' })).toBeVisible()

    // Re-open sidebar
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: /open drawer/i }).click()
    await page.waitForTimeout(300)

    // Navigate to Pods
    const podsNav = page.getByRole('button', { name: 'Pods' })
    await podsNav.click()
    await expect(page).toHaveURL('/pods')
    await expect(page.getByRole('heading', { name: 'Pods' })).toBeVisible()

    // Re-open sidebar
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: /open drawer/i }).click()
    await page.waitForTimeout(300)

    // Navigate to Events
    const eventsNav = page.getByRole('button', { name: 'Events' })
    await eventsNav.click()
    await expect(page).toHaveURL('/events')
    await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible()
  })
})
