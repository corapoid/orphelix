import { test, expect } from '@playwright/test'

test.describe('Application Launch', () => {
  test('should start successfully and display header', async ({ page }) => {
    // Navigate to the application
    await page.goto('/')

    // Verify the page loads
    await expect(page).toHaveURL('/')

    // Verify the header is visible with correct title
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByText('Kubernetes Dashboard')).toBeVisible()
  })

  test('should display header with correct title "Kubernetes Dashboard"', async ({ page }) => {
    await page.goto('/')

    // Find the header title (it's rendered as Typography with h6 variant, not a heading element)
    const headerTitle = page.getByText('Kubernetes Dashboard')
    await expect(headerTitle).toBeVisible()
  })

  test('should open sidebar via menu button', async ({ page }) => {
    await page.goto('/')

    // Verify sidebar is not visible initially (drawer is closed)
    const dashboardNavItem = page.getByRole('button', { name: 'Dashboard' })
    await expect(dashboardNavItem).not.toBeVisible()

    // Click the menu button to open sidebar
    const menuButton = page.getByRole('button', { name: /open drawer/i })
    await expect(menuButton).toBeVisible()
    await menuButton.click()

    // Verify sidebar navigation items are now visible
    await expect(dashboardNavItem).toBeVisible()
  })

  test('should display "DEMO MODE" badge in header', async ({ page }) => {
    await page.goto('/')

    // Find the DEMO MODE chip/badge
    const demoModeBadge = page.getByText('DEMO MODE')
    await expect(demoModeBadge).toBeVisible()
  })

  test('should toggle theme between light and dark', async ({ page }) => {
    await page.goto('/')

    // Get the theme toggle button (last icon button in header)
    const themeToggleButton = page.locator('header').getByRole('button').last()
    await expect(themeToggleButton).toBeVisible()

    // Get the initial icon (should be either Brightness4Icon or Brightness7Icon)
    const initialIcon = await themeToggleButton.locator('svg').getAttribute('data-testid')

    // Click to toggle theme
    await themeToggleButton.click()

    // Wait a bit for theme to apply
    await page.waitForTimeout(1000)

    // Get the new icon
    const newIcon = await themeToggleButton.locator('svg').getAttribute('data-testid')

    // Verify that the icon changed (theme toggled)
    expect(initialIcon).not.toBe(newIcon)

    // Toggle back
    await themeToggleButton.click()
    await page.waitForTimeout(1000)

    // Verify it changed back
    const finalIcon = await themeToggleButton.locator('svg').getAttribute('data-testid')
    expect(finalIcon).toBe(initialIcon)
  })
})
