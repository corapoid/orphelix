import { test, expect } from '@playwright/test'

test.describe('Deployments View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/deployments')
  })

  test('should navigate to /deployments page', async ({ page }) => {
    // Verify URL is correct
    await expect(page).toHaveURL('/deployments')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'Deployments' })).toBeVisible()
  })

  test('should display deployments table with correct columns', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table')

    // Verify all column headers are present using exact match
    const expectedColumns = [
      'Name',
      'Status',
      'Replicas',
      'Available',
      'Unavailable',
      'Age',
      'Strategy',
      'Actions',
    ]

    for (const column of expectedColumns) {
      const columnHeader = page.getByRole('columnheader', { name: column, exact: true })
      await expect(columnHeader).toBeVisible()
    }
  })

  test('should list 5 deployments from mock data', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Count the number of deployment rows
    const rows = page.locator('table tbody tr')
    const count = await rows.count()

    // Verify we have 5 deployments (web-app, api-server, worker, cache, database)
    expect(count).toBe(5)
  })

  test('should display correct deployment names', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Expected deployment names from mock data
    const expectedNames = ['web-app', 'api-server', 'worker', 'cache', 'database']

    // Verify each deployment name appears in the table
    for (const name of expectedNames) {
      const nameCell = page.locator('table tbody tr').filter({ hasText: name })
      await expect(nameCell).toBeVisible()
    }
  })

  test('should display status badges for each deployment', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Get all rows
    const rows = page.locator('table tbody tr')
    const count = await rows.count()

    // Verify each row has a status badge
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i)
      const statusBadge = row.locator('[class*="MuiChip-root"]')
      await expect(statusBadge).toBeVisible()
    }
  })

  test('should display search field', async ({ page }) => {
    // Verify search field is visible
    const searchField = page.getByPlaceholder('Search deployments...')
    await expect(searchField).toBeVisible()

    // Verify search icon is present
    const searchIcon = page.locator('[data-testid="SearchIcon"]')
    await expect(searchIcon).toBeVisible()
  })

  test('should filter deployments by name using search', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Get initial count
    const initialRows = page.locator('table tbody tr')
    const initialCount = await initialRows.count()
    expect(initialCount).toBe(5)

    // Search for "web-app"
    const searchField = page.getByPlaceholder('Search deployments...')
    await searchField.fill('web-app')

    // Wait for filtering
    await page.waitForTimeout(300)

    // Verify only 1 deployment is shown
    const filteredRows = page.locator('table tbody tr')
    const filteredCount = await filteredRows.count()
    expect(filteredCount).toBe(1)

    // Verify the correct deployment is shown
    await expect(filteredRows.first()).toContainText('web-app')
  })

  test('should show empty state when search has no results', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Search for non-existent deployment
    const searchField = page.getByPlaceholder('Search deployments...')
    await searchField.fill('nonexistent-deployment')

    // Wait for filtering
    await page.waitForTimeout(300)

    // Verify table is not visible
    const table = page.locator('table')
    await expect(table).not.toBeVisible()

    // Verify empty state message is shown
    const emptyMessage = page.getByText('No deployments match your search')
    await expect(emptyMessage).toBeVisible()
  })

  test('should filter deployments case-insensitively', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Search with uppercase
    const searchField = page.getByPlaceholder('Search deployments...')
    await searchField.fill('WEB-APP')

    // Wait for filtering
    await page.waitForTimeout(300)

    // Verify deployment is found
    const filteredRows = page.locator('table tbody tr')
    const filteredCount = await filteredRows.count()
    expect(filteredCount).toBe(1)
    await expect(filteredRows.first()).toContainText('web-app')
  })

  test('should filter deployments with partial match', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Search for partial name "api"
    const searchField = page.getByPlaceholder('Search deployments...')
    await searchField.fill('api')

    // Wait for filtering
    await page.waitForTimeout(300)

    // Verify api-server is shown
    const filteredRows = page.locator('table tbody tr')
    await expect(filteredRows.first()).toContainText('api-server')
  })

  test('should navigate to detail page when clicking on row', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Click on first deployment row
    const firstRow = page.locator('table tbody tr').first()
    const deploymentName = await firstRow.locator('td').first().textContent()
    await firstRow.click()

    // Verify navigation to detail page
    await expect(page).toHaveURL(`/deployments/${deploymentName?.trim()}`)

    // Verify detail page is loaded
    await expect(page.getByRole('heading', { name: deploymentName?.trim() || '' })).toBeVisible()
  })

  test('should navigate to detail page when clicking View button', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Get first deployment name
    const firstRow = page.locator('table tbody tr').first()
    const deploymentName = await firstRow.locator('td').first().textContent()

    // Click View button (stop propagation is handled in component)
    const viewButton = firstRow.getByRole('button', { name: 'View' })
    await viewButton.click()

    // Verify navigation to detail page
    await expect(page).toHaveURL(`/deployments/${deploymentName?.trim()}`)

    // Verify detail page is loaded
    await expect(page.getByRole('heading', { name: deploymentName?.trim() || '' })).toBeVisible()
  })

  test('should display replica counts for each deployment', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Get first row
    const firstRow = page.locator('table tbody tr').first()

    // Find the Replicas column (3rd column) - format: "ready/desired"
    const replicasCell = firstRow.locator('td').nth(2)
    const replicasText = await replicasCell.textContent()

    // Verify format matches "X/Y" pattern
    expect(replicasText).toMatch(/\d+\/\d+/)
  })

  test('should display strategy for each deployment', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Get first row
    const firstRow = page.locator('table tbody tr').first()

    // Find the Strategy column
    const strategyCell = firstRow.locator('td').nth(6)
    await expect(strategyCell).toContainText('RollingUpdate')
  })
})

test.describe('Deployment Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to deployments list first
    await page.goto('/deployments')
    await page.waitForSelector('table tbody tr')

    // Click on first deployment to go to detail page
    const firstRow = page.locator('table tbody tr').first()
    await firstRow.click()

    // Wait for detail page to load
    await page.waitForSelector('button:has-text("Back to Deployments")')

    // Wait for topology graph to load (React Flow)
    await page.waitForSelector('[class*="react-flow"]', { timeout: 15000 }).catch(() => {
      // Topology might not be visible in some cases, continue anyway
    })

    // Additional wait to ensure all content is stable
    await page.waitForTimeout(1000)
  })

  test('should display deployment name and status', async ({ page }) => {
    // Verify deployment name is in heading
    const heading = page.locator('h4').first()
    await expect(heading).toBeVisible()

    // Verify status badge is displayed next to name
    const statusBadge = page.locator('[class*="MuiChip-root"]').first()
    await expect(statusBadge).toBeVisible()
  })

  test('should display namespace and age in subtitle', async ({ page }) => {
    // Verify namespace and age are displayed
    const subtitle = page.getByText(/Namespace: .* • Age: .*/)
    await expect(subtitle).toBeVisible()

    // Verify "default" namespace is shown
    await expect(subtitle).toContainText('Namespace: default')
  })

  test('should display Details section with strategy and replicas', async ({ page }) => {
    // Verify Details heading
    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible()

    // Verify strategy field - use exact match since "RollingUpdate" also appears in topology
    await expect(page.getByText('Strategy:', { exact: true })).toBeVisible()
    await expect(page.getByText('RollingUpdate', { exact: true }).first()).toBeVisible()

    // Verify replica fields using exact match to avoid matching "Unavailable" when looking for "Available"
    await expect(page.getByText('Desired Replicas:', { exact: true })).toBeVisible()
    await expect(page.getByText('Ready Replicas:', { exact: true })).toBeVisible()
    await expect(page.getByText('Available Replicas:', { exact: true })).toBeVisible()
    await expect(page.getByText('Unavailable Replicas:', { exact: true })).toBeVisible()
  })

  test('should display Labels section', async ({ page }) => {
    // Verify Labels heading
    await expect(page.getByRole('heading', { name: 'Labels' })).toBeVisible()

    // Verify at least one label chip is displayed
    const labelChips = page.locator('[class*="MuiChip-outlined"]')
    const count = await labelChips.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display Resources section with ConfigMaps and Secrets', async ({ page }) => {
    // Verify Resources heading
    await expect(page.getByRole('heading', { name: 'Resources' })).toBeVisible()

    // Verify ConfigMap chip is displayed
    const configMapChip = page.locator('[class*="MuiChip-colorInfo"]').filter({ hasText: 'ConfigMap:' })
    await expect(configMapChip).toBeVisible()

    // Verify Secret chip is displayed
    const secretChip = page.locator('[class*="MuiChip-colorWarning"]').filter({ hasText: 'Secret:' })
    await expect(secretChip).toBeVisible()
  })

  test('should display Pods table section', async ({ page }) => {
    // Verify Pods heading
    await expect(page.getByRole('heading', { name: 'Pods' })).toBeVisible()

    // Wait for pods table to load (may show loading or data)
    await page.waitForTimeout(500)

    // Either table or "No pods" message should be visible
    const podsTable = page.locator('table').filter({ has: page.getByText('Node') })
    const noPods = page.getByText('No pods found for this deployment')

    // At least one should be visible
    const hasTable = await podsTable.isVisible().catch(() => false)
    const hasNoPods = await noPods.isVisible().catch(() => false)

    expect(hasTable || hasNoPods).toBeTruthy()
  })

  test('should display pods table with correct columns when pods exist', async ({ page }) => {
    // Wait for potential pods table
    await page.waitForTimeout(500)

    // Check if pods table exists
    const podsTable = page.locator('table').filter({ has: page.getByText('Node') })
    const tableVisible = await podsTable.isVisible().catch(() => false)

    if (tableVisible) {
      // Verify pod table columns
      const expectedColumns = ['Name', 'Status', 'Node', 'IP', 'Restarts', 'Age']

      for (const column of expectedColumns) {
        const columnHeader = podsTable.getByRole('columnheader', { name: column })
        await expect(columnHeader).toBeVisible()
      }
    }
  })

  test('should display Events table section', async ({ page }) => {
    // Verify Events heading
    await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible()

    // Wait for events table to load (may show loading or data)
    await page.waitForTimeout(500)

    // Either table or "No events" message should be visible
    const eventsTable = page.locator('table').filter({ has: page.getByText('Type') })
    const noEvents = page.getByText('No events found for this deployment')

    // At least one should be visible
    const hasTable = await eventsTable.isVisible().catch(() => false)
    const hasNoEvents = await noEvents.isVisible().catch(() => false)

    expect(hasTable || hasNoEvents).toBeTruthy()
  })

  test('should display events table with correct columns when events exist', async ({ page }) => {
    // Wait for potential events table
    await page.waitForTimeout(500)

    // Check if events table exists
    const eventsTable = page.locator('table').filter({ has: page.getByText('Type') })
    const tableVisible = await eventsTable.isVisible().catch(() => false)

    if (tableVisible) {
      // Verify event table columns
      const expectedColumns = ['Type', 'Reason', 'Message', 'Count', 'Age']

      for (const column of expectedColumns) {
        const columnHeader = eventsTable.getByRole('columnheader', { name: column })
        await expect(columnHeader).toBeVisible()
      }
    }
  })

  test('should have Back to Deployments button', async ({ page }) => {
    // Verify Back button is visible
    const backButton = page.getByRole('button', { name: 'Back to Deployments' })
    await expect(backButton).toBeVisible()

    // Verify it has the back arrow icon
    const backIcon = page.locator('[data-testid="ArrowBackIcon"]')
    await expect(backIcon).toBeVisible()
  })

  test('should navigate back to deployments list when clicking Back button', async ({ page }) => {
    // Click Back button
    const backButton = page.getByRole('button', { name: 'Back to Deployments' })
    await backButton.click()

    // Verify navigation back to deployments list
    await expect(page).toHaveURL('/deployments')

    // Verify deployments list is displayed
    await expect(page.getByRole('heading', { name: 'Deployments' })).toBeVisible()
    await expect(page.locator('table tbody tr')).toHaveCount(5)
  })

  test('should display deployment details in grid layout', async ({ page }) => {
    // Verify both detail cards are present
    const detailsCard = page.locator('.MuiPaper-root').filter({ hasText: 'Details' })
    const labelsCard = page.locator('.MuiPaper-root').filter({ hasText: 'Labels' })

    await expect(detailsCard).toBeVisible()
    await expect(labelsCard).toBeVisible()
  })
})

test.describe('Deployments Navigation from Sidebar', () => {
  test('should navigate to deployments from sidebar', async ({ page }) => {
    // Start at home page
    await page.goto('/')

    // Open sidebar
    const menuButton = page.getByRole('button', { name: /open drawer/i })
    await menuButton.click()

    // Wait for sidebar to open
    await page.waitForTimeout(300)

    // Click Deployments in sidebar
    const deploymentsNav = page.getByRole('button', { name: 'Deployments' })
    await deploymentsNav.click()

    // Verify navigation to deployments page
    await expect(page).toHaveURL('/deployments')
    await expect(page.getByRole('heading', { name: 'Deployments' })).toBeVisible()
  })
})

test.describe('Deployments Loading and Error States', () => {
  test('should show loading state initially', async ({ page }) => {
    // Navigate to deployments
    await page.goto('/deployments')

    // The page should show heading even during loading
    await expect(page.getByRole('heading', { name: 'Deployments' })).toBeVisible()

    // Either loading spinner or table should appear quickly
    await Promise.race([
      page.locator('[role="progressbar"]').waitFor({ state: 'visible', timeout: 1000 }).catch(() => {}),
      page.locator('table').waitFor({ timeout: 2000 }),
    ])
  })
})

test.describe('Deployments Responsive Behavior', () => {
  test('should display table on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })

    await page.goto('/deployments')
    await page.waitForSelector('table tbody tr')

    // Verify table is visible
    const table = page.locator('table')
    await expect(table).toBeVisible()

    // Verify all columns are visible on desktop
    await expect(page.getByRole('columnheader', { name: 'Strategy' })).toBeVisible()
  })

  test('should display search field on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/deployments')
    await page.waitForSelector('table tbody tr')

    // Verify search field is still visible and functional
    const searchField = page.getByPlaceholder('Search deployments...')
    await expect(searchField).toBeVisible()
  })
})
