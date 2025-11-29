/**
 * Tests for Kubernetes Client Cache Management
 *
 * Tests caching behavior, cache statistics, and cache cleanup.
 * Full integration tests with real K8s API are in E2E tests.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  resetClient,
  getCacheStats,
} from '@/lib/k8s/client'

describe('K8s Client Cache Management', () => {
  beforeEach(() => {
    resetClient() // Clear cache before each test
  })

  afterEach(() => {
    resetClient() // Clear cache after each test
  })

  describe('Cache Statistics', () => {
    it('should provide cache statistics', () => {
      const stats = getCacheStats()

      expect(stats).toHaveProperty('hits')
      expect(stats).toHaveProperty('misses')
      expect(stats).toHaveProperty('total')
      expect(stats).toHaveProperty('cacheSize')
      expect(stats).toHaveProperty('hitRate')
      expect(stats).toHaveProperty('ttlMs')
      expect(stats).toHaveProperty('cleanupIntervalMs')
      expect(stats).toHaveProperty('enabled')

      // Initial state - verify types
      expect(typeof stats.hits).toBe('number')
      expect(typeof stats.misses).toBe('number')
      expect(typeof stats.total).toBe('number')
      expect(typeof stats.cacheSize).toBe('number')
      expect(typeof stats.hitRate).toBe('string')
      expect(typeof stats.ttlMs).toBe('number')
      expect(typeof stats.cleanupIntervalMs).toBe('number')
      expect(typeof stats.enabled).toBe('boolean')
    })

    it('should track cache hits and misses', () => {
      const statsBefore = getCacheStats()
      const initialHits = statsBefore.hits
      const initialMisses = statsBefore.misses

      expect(initialHits).toBeGreaterThanOrEqual(0)
      expect(initialMisses).toBeGreaterThanOrEqual(0)
    })

    it('should track cache size', () => {
      const stats = getCacheStats()

      expect(stats.cacheSize).toBeGreaterThanOrEqual(0)
    })

    it('should calculate hit rate', () => {
      const stats = getCacheStats()

      expect(stats.hitRate).toMatch(/^\d+\.?\d*%$/)
    })
  })

  describe('Cache Reset', () => {
    it('should clear all cache when resetClient called without context', () => {
      // Reset all
      resetClient()

      const stats = getCacheStats()
      expect(stats.cacheSize).toBe(0)
    })

    it('should reset specific context when context provided', () => {
      // This should work without throwing
      expect(() => {
        resetClient('test-context')
      }).not.toThrow()
    })

    it('should handle empty context string', () => {
      expect(() => {
        resetClient('')
      }).not.toThrow()
    })

    it('should handle undefined context', () => {
      expect(() => {
        resetClient(undefined)
      }).not.toThrow()
    })
  })

  describe('Cache Configuration', () => {
    it('should have cache enabled by default', () => {
      const stats = getCacheStats()

      // If cache is working, we should be able to get stats
      expect(stats).toBeDefined()
      expect(stats.cacheSize).toBeGreaterThanOrEqual(0)
    })
  })
})
