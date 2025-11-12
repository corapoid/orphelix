import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { formatAge, formatBytes } from '@/lib/utils'

describe('formatAge', () => {
  let mockNow: Date

  beforeEach(() => {
    // Set a fixed "now" time for consistent testing
    mockNow = new Date('2024-01-15T12:00:00Z')
    vi.useFakeTimers()
    vi.setSystemTime(mockNow)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should format seconds correctly', () => {
    // Arrange
    const date = new Date('2024-01-15T11:59:45Z') // 15 seconds ago

    // Act
    const result = formatAge(date)

    // Assert
    expect(result).toBe('15s')
  })

  it('should format minutes correctly', () => {
    // Arrange
    const date = new Date('2024-01-15T11:35:00Z') // 25 minutes ago

    // Act
    const result = formatAge(date)

    // Assert
    expect(result).toBe('25m')
  })

  it('should format hours correctly', () => {
    // Arrange
    const date = new Date('2024-01-15T08:00:00Z') // 4 hours ago

    // Act
    const result = formatAge(date)

    // Assert
    expect(result).toBe('4h')
  })

  it('should format days correctly', () => {
    // Arrange
    const date = new Date('2024-01-10T12:00:00Z') // 5 days ago

    // Act
    const result = formatAge(date)

    // Assert
    expect(result).toBe('5d')
  })

  it('should accept string date and format correctly', () => {
    // Arrange
    const dateString = '2024-01-14T12:00:00Z' // 1 day ago

    // Act
    const result = formatAge(dateString)

    // Assert
    expect(result).toBe('1d')
  })

  it('should handle Date object correctly', () => {
    // Arrange
    const date = new Date('2024-01-15T10:00:00Z') // 2 hours ago

    // Act
    const result = formatAge(date)

    // Assert
    expect(result).toBe('2h')
  })

  it('should return seconds for very recent dates', () => {
    // Arrange
    const date = new Date('2024-01-15T11:59:59Z') // 1 second ago

    // Act
    const result = formatAge(date)

    // Assert
    expect(result).toBe('1s')
  })

  it('should prefer larger time units', () => {
    // Arrange - 2 hours and 30 minutes ago should show as hours
    const date = new Date('2024-01-15T09:30:00Z')

    // Act
    const result = formatAge(date)

    // Assert
    expect(result).toBe('2h')
  })

  it('should handle multiple days correctly', () => {
    // Arrange
    const date = new Date('2024-01-01T12:00:00Z') // 14 days ago

    // Act
    const result = formatAge(date)

    // Assert
    expect(result).toBe('14d')
  })
})

describe('formatBytes', () => {
  it('should format zero bytes correctly', () => {
    // Arrange
    const bytes = 0

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('0 B')
  })

  it('should format bytes (B) correctly', () => {
    // Arrange
    const bytes = 512

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('512 B')
  })

  it('should format kilobytes (KB) correctly', () => {
    // Arrange
    const bytes = 1024 // 1 KB

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('1 KB')
  })

  it('should format megabytes (MB) correctly', () => {
    // Arrange
    const bytes = 1048576 // 1 MB (1024 * 1024)

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('1 MB')
  })

  it('should format gigabytes (GB) correctly', () => {
    // Arrange
    const bytes = 1073741824 // 1 GB (1024 * 1024 * 1024)

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('1 GB')
  })

  it('should format terabytes (TB) correctly', () => {
    // Arrange
    const bytes = 1099511627776 // 1 TB (1024^4)

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('1 TB')
  })

  it('should handle decimal values with proper rounding', () => {
    // Arrange
    const bytes = 1536 // 1.5 KB

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('1.5 KB')
  })

  it('should round to 2 decimal places', () => {
    // Arrange
    const bytes = 1234567 // ~1.18 MB

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('1.18 MB')
  })

  it('should handle large GB values', () => {
    // Arrange
    const bytes = 16106127360 // ~15 GB

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('15 GB')
  })

  it('should handle fractional TB values', () => {
    // Arrange
    const bytes = 5497558138880 // ~5 TB

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('5 TB')
  })

  it('should format small byte values correctly', () => {
    // Arrange
    const bytes = 100

    // Act
    const result = formatBytes(bytes)

    // Assert
    expect(result).toBe('100 B')
  })
})
