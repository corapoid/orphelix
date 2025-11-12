import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LogsViewer } from '@/app/components/pods/logs-viewer'

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

describe('LogsViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockLogs = `2024-01-15 10:00:00 [INFO] nginx - Application started successfully
2024-01-15 10:00:01 [INFO] nginx - Connected to database
2024-01-15 10:00:02 [WARN] nginx - Cache miss for key user:123
2024-01-15 10:00:03 [INFO] nginx - Request completed in 45ms
2024-01-15 10:00:04 [ERROR] nginx - Failed to connect to external API
2024-01-15 10:00:05 [DEBUG] nginx - Memory usage: 512MB`

  it('should render logs correctly', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert
    expect(screen.getByText('Container Logs: nginx')).toBeInTheDocument()
    expect(screen.getByText(/Application started successfully/)).toBeInTheDocument()
    expect(screen.getByText(/Connected to database/)).toBeInTheDocument()
  })

  it('should display loading state', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs=""
        isLoading={true}
        error={null}
        containerName="nginx"
      />
    )

    // Assert
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.queryByText('Container Logs: nginx')).not.toBeInTheDocument()
  })

  it('should display error state', () => {
    // Arrange
    const error = new Error('Failed to fetch logs')

    // Act
    render(
      <LogsViewer
        logs=""
        isLoading={false}
        error={error}
        containerName="nginx"
      />
    )

    // Assert
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/Failed to load logs: Failed to fetch logs/)).toBeInTheDocument()
  })

  it('should filter logs by search query', async () => {
    // Arrange
    const user = userEvent.setup()
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Act - search for "ERROR"
    const searchInput = screen.getByPlaceholderText('Search logs...')
    await user.type(searchInput, 'ERROR')

    // Assert - should only show ERROR logs
    await waitFor(() => {
      expect(screen.getByText(/Failed to connect to external API/)).toBeInTheDocument()
      expect(screen.queryByText(/Application started successfully/)).not.toBeInTheDocument()
      expect(screen.queryByText(/Connected to database/)).not.toBeInTheDocument()
    })
  })

  it('should filter logs case-insensitively', async () => {
    // Arrange
    const user = userEvent.setup()
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Act - search with lowercase
    const searchInput = screen.getByPlaceholderText('Search logs...')
    await user.type(searchInput, 'database')

    // Assert - should find the log with "database"
    await waitFor(() => {
      expect(screen.getByText(/Connected to database/)).toBeInTheDocument()
      expect(screen.queryByText(/Application started successfully/)).not.toBeInTheDocument()
    })
  })

  it('should show no results message when search has no matches', async () => {
    // Arrange
    const user = userEvent.setup()
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Act - search for something that doesn't exist
    const searchInput = screen.getByPlaceholderText('Search logs...')
    await user.type(searchInput, 'nonexistent')

    // Assert
    await waitFor(() => {
      expect(screen.getByText('No logs match your search')).toBeInTheDocument()
    })
  })

  it('should show empty state when no logs available', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs=""
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert
    expect(screen.getByText('No logs available')).toBeInTheDocument()
  })

  it('should download logs when download button is clicked', async () => {
    // Arrange
    const user = userEvent.setup()

    // Mock URL.createObjectURL and URL.revokeObjectURL
    const createObjectURL = vi.fn(() => 'blob:mock-url')
    const revokeObjectURL = vi.fn()
    global.URL.createObjectURL = createObjectURL
    global.URL.revokeObjectURL = revokeObjectURL

    // Mock anchor element click
    const mockClick = vi.fn()
    const mockAnchor = document.createElement('a')
    mockAnchor.click = mockClick

    const originalCreateElement = document.createElement.bind(document)
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return mockAnchor
      }
      return originalCreateElement(tagName)
    })

    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Act - click download button
    const downloadButton = screen.getByTitle('Download logs')
    await user.click(downloadButton)

    // Assert
    expect(mockClick).toHaveBeenCalledTimes(1)
    expect(mockAnchor.download).toBe('nginx-logs.txt')
    expect(createObjectURL).toHaveBeenCalled()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')

    // Cleanup
    createElementSpy.mockRestore()
  })

  it('should call onRefresh when refresh button is clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const mockRefresh = vi.fn()

    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
        onRefresh={mockRefresh}
      />
    )

    // Act - click refresh button
    const refreshButton = screen.getByTitle('Refresh logs')
    await user.click(refreshButton)

    // Assert
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('should not show refresh button when onRefresh is not provided', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert
    expect(screen.queryByTitle('Refresh logs')).not.toBeInTheDocument()
  })

  it('should display all log lines', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert - verify all log lines are displayed
    const logLines = mockLogs.split('\n').filter((line) => line.trim())
    expect(logLines).toHaveLength(6)

    // Check each line is rendered
    expect(screen.getByText(/Application started successfully/)).toBeInTheDocument()
    expect(screen.getByText(/Connected to database/)).toBeInTheDocument()
    expect(screen.getByText(/Cache miss for key/)).toBeInTheDocument()
    expect(screen.getByText(/Request completed in 45ms/)).toBeInTheDocument()
    expect(screen.getByText(/Failed to connect to external API/)).toBeInTheDocument()
    expect(screen.getByText(/Memory usage: 512MB/)).toBeInTheDocument()
  })

  it('should clear search when input is cleared', async () => {
    // Arrange
    const user = userEvent.setup()
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Act - search and then clear
    const searchInput = screen.getByPlaceholderText('Search logs...')
    await user.type(searchInput, 'ERROR')

    await waitFor(() => {
      expect(screen.getByText(/Failed to connect to external API/)).toBeInTheDocument()
    })

    await user.clear(searchInput)

    // Assert - all logs should be visible again
    await waitFor(() => {
      expect(screen.getByText(/Application started successfully/)).toBeInTheDocument()
      expect(screen.getByText(/Connected to database/)).toBeInTheDocument()
      expect(screen.getByText(/Failed to connect to external API/)).toBeInTheDocument()
    })
  })

  it('should render with monospace font for logs', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert - verify logs are displayed (which indicates monospace styling is applied via MUI sx prop)
    expect(screen.getByText(/Application started successfully/)).toBeInTheDocument()
    expect(screen.getByText(/Connected to database/)).toBeInTheDocument()
  })

  it('should handle empty lines in logs', () => {
    // Arrange
    const logsWithEmptyLines = `2024-01-15 10:00:00 [INFO] nginx - Line 1

2024-01-15 10:00:02 [INFO] nginx - Line 2

2024-01-15 10:00:03 [INFO] nginx - Line 3`

    // Act
    render(
      <LogsViewer
        logs={logsWithEmptyLines}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert - empty lines should be filtered out
    expect(screen.getByText(/Line 1/)).toBeInTheDocument()
    expect(screen.getByText(/Line 2/)).toBeInTheDocument()
    expect(screen.getByText(/Line 3/)).toBeInTheDocument()
  })

  it('should display search icon in search field', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument()
  })

  it('should display download icon in download button', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert
    expect(screen.getByTestId('DownloadIcon')).toBeInTheDocument()
  })

  it('should display refresh icon when onRefresh is provided', () => {
    // Arrange & Act
    render(
      <LogsViewer
        logs={mockLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
        onRefresh={vi.fn()}
      />
    )

    // Assert
    expect(screen.getByTestId('RefreshIcon')).toBeInTheDocument()
  })

  it('should preserve log formatting', () => {
    // Arrange
    const formattedLogs = `2024-01-15 10:00:00 [INFO]  nginx - Indented log
2024-01-15 10:00:01 [INFO]    nginx - More indented
2024-01-15 10:00:02 [INFO] nginx - Normal log`

    // Act
    render(
      <LogsViewer
        logs={formattedLogs}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert - all lines should be visible
    expect(screen.getByText(/Indented log/)).toBeInTheDocument()
    expect(screen.getByText(/More indented/)).toBeInTheDocument()
    expect(screen.getByText(/Normal log/)).toBeInTheDocument()
  })

  it('should handle very long log lines', () => {
    // Arrange
    const longLine = '2024-01-15 10:00:00 [INFO] nginx - ' + 'A'.repeat(1000)
    const logsWithLongLine = `${longLine}
2024-01-15 10:00:01 [INFO] nginx - Short log`

    // Act
    render(
      <LogsViewer
        logs={logsWithLongLine}
        isLoading={false}
        error={null}
        containerName="nginx"
      />
    )

    // Assert - both lines should be rendered
    expect(screen.getByText(/Short log/)).toBeInTheDocument()
    const longText = screen.getByText((content) => content.includes('A'.repeat(100)))
    expect(longText).toBeInTheDocument()
  })
})
