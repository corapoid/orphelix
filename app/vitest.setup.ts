import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

// Mock global fetch
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => ({}),
    } as Response)
  )
})

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
