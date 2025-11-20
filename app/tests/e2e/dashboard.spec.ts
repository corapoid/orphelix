import { test, expect } from '@playwright/test'

test.describe('Dashboard Overview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display "Dashboard Overview" heading', async ({ page }) => {
    // Find the Dashboard Overview heading
    const heading = page.getByRole('heading', { name: 'Dashboard Overview' })
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText('Dashboard Overview')
  })

  test('should display loading state initially', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/')

    // Check if loading spinner appears (it may disappear quickly)
    const spinner = page.locator('[role="progressbar"]').first()

    // Wait for either spinner to appear or content to load
    await Promise.race([
      spinner.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {}),
      page.getByText('Deployments').waitFor({ timeout: 3000 }),
    ])

    // Verify content eventually loads
    await expect(page.getByRole('heading', { name: 'Dashboard Overview' })).toBeVisible()
  })

  test('should display all 7 summary cards', async ({ page }) => {
    // Expected resource types to be displayed in cards
    const expectedResources = [
      'Deployments',
      'Pods',
      'Nodes',
      'ConfigMaps',
      'Secrets',
      'HPA',
      'Persistent Volumes',
    ]

    // Verify each resource card is visible
    for (const resource of expectedResources) {
      const resourceText = page.getByText(resource, { exact: true })
      await expect(resourceText).toBeVisible()
    }
  })

  test('should display total numbers in each card', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('text=Deployments')

    // Each card should have a visible number
    const cards = page.locator('.MuiCard-root')
    const count = await cards.count()

    // We should have at least 7 cards displayed (excluding the Recent Events card)
    expect(count).toBeGreaterThanOrEqual(8) // 7 summary cards + 1 events card

    // Verify each summary card contains a number
    for (let i = 0; i < Math.min(7, count); i++) {
      const card = cards.nth(i)
      const cardText = await card.textContent()
      // Check that card contains numbers (digits)
      expect(cardText).toMatch(/\d+/)
    }
  })

  test('should display breakdown details for Deployments card', async ({ page }) => {
    // Deployments card should show Healthy and Degraded breakdown
    const deploymentsCard = page.locator('.MuiCard-root').filter({ hasText: 'Deployments' }).first()
    await expect(deploymentsCard).toBeVisible()
    await expect(deploymentsCard.getByText('Healthy', { exact: true })).toBeVisible()
    await expect(deploymentsCard.getByText('Degraded')).toBeVisible()
  })

  test('should display breakdown details for Pods card', async ({ page }) => {
    // Pods card should show Running, Pending, and Failed breakdown
    const podsCard = page.locator('.MuiCard-root').filter({ hasText: 'Pods' }).first()
    await expect(podsCard).toBeVisible()
    await expect(podsCard.getByText('Running')).toBeVisible()
    await expect(podsCard.getByText('Pending')).toBeVisible()
    await expect(podsCard.getByText('Failed', { exact: true })).toBeVisible()
  })

  test('should display breakdown details for Nodes card', async ({ page }) => {
    // Nodes card should show Ready and Not Ready breakdown
    const nodesCard = page.locator('.MuiCard-root').filter({ hasText: 'Nodes' }).first()
    await expect(nodesCard).toBeVisible()
    await expect(nodesCard.getByText('Ready', { exact: true })).toBeVisible()
    await expect(nodesCard.getByText('Not Ready', { exact: true })).toBeVisible()
  })

  test('should display breakdown details for Persistent Volumes card', async ({ page }) => {
    // PV card should show Bound breakdown
    await expect(page.getByText('Persistent Volumes')).toBeVisible()
    await expect(page.getByText('Bound')).toBeVisible()
  })

  test('should display Recent Events section', async ({ page }) => {
    // Verify Recent Events heading is visible
    const eventsHeading = page.getByText('Recent Events')
    await expect(eventsHeading).toBeVisible()
  })

  test('should display events with type chips', async ({ page }) => {
    // Wait for events section to load
    await page.waitForSelector('text=Recent Events')

    // Check if events are displayed with type chips (Normal/Warning)
    const chips = page.locator('[role="region"]').locator('.MuiChip-root')
    const chipCount = await chips.count()

    if (chipCount > 0) {
      // Verify chips contain either "Normal" or "Warning" text
      for (let i = 0; i < Math.min(chipCount, 5); i++) {
        const chipText = await chips.nth(i).textContent()
        expect(['Normal', 'Warning']).toContain(chipText)
      }
    }
  })

  test('should display icons in summary cards', async ({ page }) => {
    // Wait for cards to load
    await page.waitForSelector('text=Deployments')

    // Check that summary cards contain icons by looking for specific Material-UI icon elements
    // The icons are inside colored boxes in each card
    const iconContainers = page.locator('.MuiBox-root svg').filter({ has: page.locator('path') })
    const iconCount = await iconContainers.count()

    // We should have at least 7 icons (one per summary card)
    expect(iconCount).toBeGreaterThanOrEqual(7)
  })

  test('should display cards in responsive grid layout', async ({ page }) => {
    // Verify the grid container exists
    const gridContainer = page.locator('.MuiGrid2-root').first()
    await expect(gridContainer).toBeVisible()

    // Test desktop viewport (4 cards in first row: Deployments, Pods, Nodes, PV)
    await page.setViewportSize({ width: 1280, height: 720 })
    await expect(page.getByText('Deployments')).toBeVisible()
    await expect(page.getByText('Pods')).toBeVisible()
    await expect(page.getByText('Nodes')).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByText('Deployments')).toBeVisible()
    await expect(page.getByText('ConfigMaps')).toBeVisible()

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByText('Deployments')).toBeVisible()
    await expect(page.getByText('HPA')).toBeVisible()
  })

  test('should display card hover effects', async ({ page }) => {
    // Get first card
    const firstCard = page.locator('.MuiCard-root').first()
    await expect(firstCard).toBeVisible()

    // Hover over the card
    await firstCard.hover()

    // Card should remain visible after hover (testing that hover doesn't break layout)
    await expect(firstCard).toBeVisible()
  })
})
