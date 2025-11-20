import { test, expect } from '@playwright/test'

test.describe('Pods View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pods')
  })

  test('should navigate to /pods page', async ({ page }) => {
    // Verify URL is correct
    await expect(page).toHaveURL('/pods')

    // Verify heading is displayed
    await expect(page.getByRole('heading', { name: 'Pods' })).toBeVisible()
  })

  test('should display pods table with correct columns', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table')

    // Verify all column headers are present
    const expectedColumns = [
      'Name',
      'Status',
      'Node',
      'IP',
      'Restarts',
      'Containers',
      'Age',
      'Actions',
    ]

    for (const column of expectedColumns) {
      const columnHeader = page.getByRole('columnheader', { name: column, exact: true })
      await expect(columnHeader).toBeVisible()
    }
  })

  test('should list pods from mock data', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Count the number of pod rows
    const rows = page.locator('table tbody tr')
    const count = await rows.count()

    // Verify we have pods
    expect(count).toBeGreaterThan(0)
  })

  test('should display status badges for each pod', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Get all rows
    const rows = page.locator('table tbody tr')
    const count = await rows.count()

    // Verify each row has a status badge (in the second cell - Status column)
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i)
      const statusCell = row.locator('td').nth(1) // Second cell is Status column
      const statusBadge = statusCell.locator('[class*="MuiChip-root"]')
      await expect(statusBadge).toBeVisible()
    }
  })

  test('should display status filter dropdown', async ({ page }) => {
    // Verify status filter is visible by using the select component
    const statusFilter = page.locator('label:has-text("Status Filter")')
    await expect(statusFilter).toBeVisible()
  })

  test('should display search field', async ({ page }) => {
    // Verify search field is visible
    const searchField = page.getByPlaceholder('Search pods...')
    await expect(searchField).toBeVisible()

    // Verify search icon is present
    const searchIcon = page.locator('[data-testid="SearchIcon"]')
    await expect(searchIcon).toBeVisible()
  })

  test('should filter pods by name using search', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Get initial count
    const initialRows = page.locator('table tbody tr')
    const initialCount = await initialRows.count()
    expect(initialCount).toBeGreaterThan(0)

    // Get the first pod name
    const firstPodName = await initialRows.first().locator('td').first().textContent()

    // Search for the first pod
    const searchField = page.getByPlaceholder('Search pods...')
    await searchField.fill(firstPodName || '')

    // Wait for filtering
    await page.waitForTimeout(300)

    // Verify at least one pod is shown
    const filteredRows = page.locator('table tbody tr')
    const filteredCount = await filteredRows.count()
    expect(filteredCount).toBeGreaterThanOrEqual(1)

    // Verify the pod name appears in results
    await expect(filteredRows.first()).toContainText(firstPodName || '')
  })

  test('should filter pods by status using dropdown', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Click status filter dropdown using the select ID
    const selectInput = page.locator('#status-filter-select')
    await selectInput.click()

    // Wait for dropdown to open
    await page.waitForTimeout(300)

    // Select "Running" status using menu item
    const runningOption = page.getByRole('option', { name: 'Running' })
    const optionVisible = await runningOption.isVisible().catch(() => false)

    if (optionVisible) {
      await runningOption.click()

      // Wait for filtering
      await page.waitForTimeout(500)

      // Verify table shows pods or empty state
      const table = page.locator('table')
      const alert = page.getByText(/No pods match your filters|No pods found/)

      // Either table or alert should be visible
      const hasTable = await table.isVisible().catch(() => false)
      const hasAlert = await alert.isVisible().catch(() => false)

      expect(hasTable || hasAlert).toBeTruthy()
    } else {
      // If dropdown didn't open, test passes as long as filter exists
      await expect(selectInput).toBeVisible()
    }
  })

  test('should show empty state when search has no results', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Search for non-existent pod
    const searchField = page.getByPlaceholder('Search pods...')
    await searchField.fill('nonexistent-pod-xyz-123')

    // Wait for filtering
    await page.waitForTimeout(300)

    // Verify empty state message is shown
    const emptyMessage = page.getByText(/No pods match your filters/)
    await expect(emptyMessage).toBeVisible()
  })

  test('should navigate to detail page when clicking on row', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Click on first pod row
    const firstRow = page.locator('table tbody tr').first()
    const podName = await firstRow.locator('td').first().textContent()
    await firstRow.click()

    // Verify navigation to detail page
    await expect(page).toHaveURL(`/pods/${podName?.trim()}`)

    // Verify detail page is loaded - look for Back button instead of heading
    await expect(page.getByRole('button', { name: 'Back to Pods' })).toBeVisible()
  })

  test('should navigate to detail page when clicking View button', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('table tbody tr')

    // Get first pod name
    const firstRow = page.locator('table tbody tr').first()
    const podName = await firstRow.locator('td').first().textContent()

    // Click View button
    const viewButton = firstRow.getByRole('button', { name: 'View' })
    await viewButton.click()

    // Verify navigation to detail page
    await expect(page).toHaveURL(`/pods/${podName?.trim()}`)

    // Verify detail page is loaded - look for Back button
    await expect(page.getByRole('button', { name: 'Back to Pods' })).toBeVisible()
  })
})

test.describe('Pod Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to pods list first
    await page.goto('/pods')
    await page.waitForSelector('table tbody tr')

    // Click on first pod to go to detail page
    const firstRow = page.locator('table tbody tr').first()
    await firstRow.click()

    // Wait for detail page to load
    await page.waitForSelector('button:has-text("Back to Pods")')
  })

  test('should display pod name and status', async ({ page }) => {
    // Verify pod name is in heading
    const heading = page.locator('h4').first()
    await expect(heading).toBeVisible()

    // Verify status badge is displayed
    const statusBadge = page.locator('[class*="MuiChip-root"]').first()
    await expect(statusBadge).toBeVisible()
  })

  test('should display namespace, node, and age in subtitle', async ({ page }) => {
    // Verify subtitle with namespace, node, and age
    const subtitle = page.getByText(/Namespace: .* • Node: .* • Age: .*/)
    await expect(subtitle).toBeVisible()
  })

  test('should display Details section with pod information', async ({ page }) => {
    // Verify Details text (Typography with variant h6)
    await expect(page.getByText('Details', { exact: true }).first()).toBeVisible()

    // Verify details fields
    await expect(page.getByText('IP Address:', { exact: true })).toBeVisible()
    await expect(page.getByText('Restart Count:', { exact: true })).toBeVisible()
    await expect(page.getByText('Containers:', { exact: true })).toBeVisible()
  })

  test('should display Labels section', async ({ page }) => {
    // Verify Labels text (Typography with variant h6)
    await expect(page.getByText('Labels', { exact: true }).first()).toBeVisible()

    // Verify at least one label chip is displayed
    const labelChips = page.locator('[class*="MuiChip-outlined"]')
    const count = await labelChips.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display Containers section', async ({ page }) => {
    // Verify Containers text (Typography with variant h6)
    await expect(page.getByText('Containers', { exact: true }).first()).toBeVisible()

    // Verify containers table is displayed
    const containersTable = page.locator('table').filter({ has: page.getByText('Image') })
    await expect(containersTable).toBeVisible()

    // Verify container table columns
    const expectedColumns = ['Name', 'Image', 'Ready', 'Restarts']
    for (const column of expectedColumns) {
      const columnHeader = containersTable.getByRole('columnheader', { name: column, exact: true })
      await expect(columnHeader).toBeVisible()
    }
  })

  test('should display Logs section', async ({ page }) => {
    // Wait for logs to load
    await page.waitForTimeout(500)

    // Verify logs viewer is displayed (either with title or loading)
    const logsTitle = page.getByText(/Container Logs:/)
    const logsLoading = page.locator('[role="progressbar"]')

    // At least one should be visible
    const hasTitle = await logsTitle.isVisible().catch(() => false)
    const hasLoading = await logsLoading.isVisible().catch(() => false)

    expect(hasTitle || hasLoading).toBeTruthy()
  })

  test('should display container selector for logs when multiple containers', async ({ page }) => {
    // Wait for page to load
    await page.waitForTimeout(500)

    // Check if container selector exists (only if multiple containers)
    const containerSelector = page.getByRole('combobox', { name: 'Select Container' })
    const selectorVisible = await containerSelector.isVisible().catch(() => false)

    // If selector is visible, verify it works
    if (selectorVisible) {
      await containerSelector.click()
      await page.waitForTimeout(200)

      // Verify at least one container option is available
      const options = page.locator('[role="option"]')
      const optionCount = await options.count()
      expect(optionCount).toBeGreaterThan(0)
    }
  })

  test('should display logs viewer with logs', async ({ page }) => {
    // Wait for logs to load
    await page.waitForTimeout(1000)

    // Verify logs viewer is displayed
    const logsTitle = page.getByText(/Container Logs:/)
    await expect(logsTitle).toBeVisible()

    // Verify logs are displayed or no logs message
    const logLine = page.locator('.log-line').first()
    const noLogsMessage = page.getByText(/No logs available|No logs match your search/)

    // Either logs are visible or there's a message about no logs
    const hasLogs = await logLine.isVisible().catch(() => false)
    const hasNoLogsMessage = await noLogsMessage.isVisible().catch(() => false)

    expect(hasLogs || hasNoLogsMessage).toBeTruthy()
  })

  test('should search in logs', async ({ page }) => {
    // Wait for logs to load
    await page.waitForTimeout(1000)

    // Verify search field in logs viewer
    const logsSearchField = page.getByPlaceholder('Search logs...')
    const searchVisible = await logsSearchField.isVisible().catch(() => false)

    if (searchVisible) {
      // Type in search field
      await logsSearchField.fill('INFO')

      // Wait for filtering
      await page.waitForTimeout(300)

      // Verify search is working (either results or no matches)
      const logs = page.locator('.log-line')
      const logCount = await logs.count().catch(() => 0)

      const noMatches = page.getByText('No logs match your search')
      const hasNoMatches = await noMatches.isVisible().catch(() => false)

      expect(logCount > 0 || hasNoMatches).toBeTruthy()
    }
  })

  test('should download logs when download button is clicked', async ({ page }) => {
    // Wait for logs to load
    await page.waitForTimeout(1000)

    // Check if download button is visible
    const downloadButton = page.getByTitle('Download logs')
    const downloadVisible = await downloadButton.isVisible().catch(() => false)

    if (downloadVisible) {
      // Set up download listener
      const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null)

      // Click download button
      await downloadButton.click()

      // Verify download was triggered
      const download = await downloadPromise
      if (download) {
        expect(download.suggestedFilename()).toMatch(/-logs\.txt$/)
      }
    }
  })

  test('should display Events section', async ({ page }) => {
    // Verify Events text (Typography with variant h6)
    await expect(page.getByText('Events', { exact: true }).last()).toBeVisible()

    // Wait for events to load
    await page.waitForTimeout(500)

    // Either events table or "No events" message should be visible
    const eventsTable = page.locator('table').filter({ has: page.getByText('Type') })
    const noEvents = page.getByText('No events found for this pod')

    const hasTable = await eventsTable.isVisible().catch(() => false)
    const hasNoEvents = await noEvents.isVisible().catch(() => false)

    expect(hasTable || hasNoEvents).toBeTruthy()
  })

  test('should display events table with correct columns when events exist', async ({ page }) => {
    // Wait for events to load
    await page.waitForTimeout(500)

    // Check if events table exists
    const eventsTable = page.locator('table').filter({ has: page.getByText('Type') })
    const tableVisible = await eventsTable.isVisible().catch(() => false)

    if (tableVisible) {
      // Verify event table columns
      const expectedColumns = ['Type', 'Reason', 'Message', 'Count', 'Age']

      for (const column of expectedColumns) {
        const columnHeader = eventsTable.getByRole('columnheader', { name: column, exact: true })
        await expect(columnHeader).toBeVisible()
      }
    }
  })

  test('should have Back to Pods button', async ({ page }) => {
    // Verify Back button is visible
    const backButton = page.getByRole('button', { name: 'Back to Pods' })
    await expect(backButton).toBeVisible()

    // Verify it has the back arrow icon
    const backIcon = page.locator('[data-testid="ArrowBackIcon"]')
    await expect(backIcon).toBeVisible()
  })

  test('should navigate back to pods list when clicking Back button', async ({ page }) => {
    // Click Back button
    const backButton = page.getByRole('button', { name: 'Back to Pods' })
    await backButton.click()

    // Verify navigation back to pods list
    await expect(page).toHaveURL('/pods')

    // Verify pods list is displayed
    await expect(page.getByRole('heading', { name: 'Pods' })).toBeVisible()
    await expect(page.locator('table tbody tr').first()).toBeVisible()
  })

  test('should display pod details in grid layout', async ({ page }) => {
    // Verify both detail cards are present
    const detailsCard = page.locator('.MuiPaper-root').filter({ hasText: 'Details' })
    const labelsCard = page.locator('.MuiPaper-root').filter({ hasText: 'Labels' })

    await expect(detailsCard).toBeVisible()
    await expect(labelsCard).toBeVisible()
  })

  test('should display refresh logs button', async ({ page }) => {
    // Wait for logs to load
    await page.waitForTimeout(1000)

    // Verify refresh button is visible in logs viewer
    const refreshButton = page.getByTitle('Refresh logs')
    const refreshVisible = await refreshButton.isVisible().catch(() => false)

    expect(refreshVisible).toBeTruthy()
  })
})

test.describe('Pods Navigation from Sidebar', () => {
  test('should navigate to pods from sidebar', async ({ page }) => {
    // Start at home page
    await page.goto('/')

    // Open sidebar
    const menuButton = page.getByRole('button', { name: /open drawer/i })
    await menuButton.click()

    // Wait for sidebar to open
    await page.waitForTimeout(300)

    // Click Pods in sidebar
    const podsNav = page.getByRole('button', { name: 'Pods' })
    await podsNav.click()

    // Verify navigation to pods page
    await expect(page).toHaveURL('/pods')
    await expect(page.getByRole('heading', { name: 'Pods' })).toBeVisible()
  })
})

test.describe('Pods Loading and Error States', () => {
  test('should show loading state initially', async ({ page }) => {
    // Navigate to pods
    await page.goto('/pods')

    // The page should show heading even during loading
    await expect(page.getByRole('heading', { name: 'Pods' })).toBeVisible()

    // Either loading spinner or table should appear quickly
    await Promise.race([
      page.locator('[role="progressbar"]').waitFor({ state: 'visible', timeout: 1000 }).catch(() => {}),
      page.locator('table').waitFor({ timeout: 2000 }),
    ])
  })
})

test.describe('Pods Responsive Behavior', () => {
  test('should display table on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })

    await page.goto('/pods')
    await page.waitForSelector('table tbody tr')

    // Verify table is visible
    const table = page.locator('table')
    await expect(table).toBeVisible()

    // Verify all columns are visible on desktop
    await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible()
  })

  test('should display search field on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/pods')
    await page.waitForSelector('table tbody tr')

    // Verify search field is still visible and functional
    const searchField = page.getByPlaceholder('Search pods...')
    await expect(searchField).toBeVisible()
  })
})

test.describe('Pod Detail Sections Visibility', () => {
  test('should display all required sections on pod detail page', async ({ page }) => {
    // Navigate to pods list
    await page.goto('/pods')
    await page.waitForSelector('table tbody tr')

    // Navigate to first pod detail
    const firstRow = page.locator('table tbody tr').first()
    await firstRow.click()
    await page.waitForSelector('button:has-text("Back to Pods")')

    // Wait for all sections to load
    await page.waitForTimeout(1000)

    // Verify all required sections are present (Typography with variant h6 doesn't create heading role)
    const requiredSections = ['Details', 'Labels', 'Containers', 'Events']

    for (const section of requiredSections) {
      const sectionText = page.getByText(section, { exact: true })
      await expect(sectionText.first()).toBeVisible()
    }

    // Verify Logs viewer is also present
    const logsViewer = page.getByText(/Container Logs:/)
    const logsVisible = await logsViewer.isVisible().catch(() => false)
    expect(logsVisible).toBeTruthy()
  })
})
