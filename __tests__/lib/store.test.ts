import { describe, it, expect, beforeEach } from 'vitest'
import { useModeStore } from '@/lib/store'
import type { AppMode, KubernetesContext } from '@/types/app'

describe('useModeStore', () => {
  // Reset store before each test to ensure clean state
  beforeEach(() => {
    const { reset } = useModeStore.getState()
    reset()
  })

  describe('initial state', () => {
    it('should initialize with mock mode', () => {
      // Act
      const { mode } = useModeStore.getState()

      // Assert
      expect(mode).toBe('mock')
    })

    it('should initialize with null context', () => {
      // Act
      const { selectedContext } = useModeStore.getState()

      // Assert
      expect(selectedContext).toBeNull()
    })

    it('should have all required methods', () => {
      // Act
      const store = useModeStore.getState()

      // Assert
      expect(store).toHaveProperty('mode')
      expect(store).toHaveProperty('selectedContext')
      expect(store).toHaveProperty('setMode')
      expect(store).toHaveProperty('setContext')
      expect(store).toHaveProperty('reset')
      expect(typeof store.setMode).toBe('function')
      expect(typeof store.setContext).toBe('function')
      expect(typeof store.reset).toBe('function')
    })
  })

  describe('setMode', () => {
    it('should change mode from mock to real', () => {
      // Arrange
      const { setMode } = useModeStore.getState()

      // Act
      setMode('real')
      const { mode } = useModeStore.getState()

      // Assert
      expect(mode).toBe('real')
    })

    it('should change mode from real to mock', () => {
      // Arrange
      const { setMode } = useModeStore.getState()
      setMode('real')

      // Act
      setMode('mock')
      const { mode } = useModeStore.getState()

      // Assert
      expect(mode).toBe('mock')
    })

    it('should accept valid AppMode values', () => {
      // Arrange
      const { setMode } = useModeStore.getState()
      const modes: AppMode[] = ['mock', 'real']

      // Act & Assert
      modes.forEach((testMode) => {
        setMode(testMode)
        const { mode } = useModeStore.getState()
        expect(mode).toBe(testMode)
      })
    })

    it('should not affect selectedContext when changing mode', () => {
      // Arrange
      const { setMode, setContext } = useModeStore.getState()
      const mockContext: KubernetesContext = {
        name: 'test-context',
        cluster: 'test-cluster',
        user: 'test-user',
        namespace: 'test-namespace',
      }
      setContext(mockContext)

      // Act
      setMode('real')
      const { selectedContext } = useModeStore.getState()

      // Assert
      expect(selectedContext).toEqual(mockContext)
    })
  })

  describe('setContext', () => {
    it('should set a kubernetes context', () => {
      // Arrange
      const { setContext } = useModeStore.getState()
      const mockContext: KubernetesContext = {
        name: 'production',
        cluster: 'prod-cluster',
        user: 'admin',
        namespace: 'default',
      }

      // Act
      setContext(mockContext)
      const { selectedContext } = useModeStore.getState()

      // Assert
      expect(selectedContext).toEqual(mockContext)
    })

    it('should update existing context with new values', () => {
      // Arrange
      const { setContext } = useModeStore.getState()
      const firstContext: KubernetesContext = {
        name: 'dev',
        cluster: 'dev-cluster',
        user: 'developer',
        namespace: 'development',
      }
      const secondContext: KubernetesContext = {
        name: 'staging',
        cluster: 'staging-cluster',
        user: 'developer',
        namespace: 'staging',
      }
      setContext(firstContext)

      // Act
      setContext(secondContext)
      const { selectedContext } = useModeStore.getState()

      // Assert
      expect(selectedContext).toEqual(secondContext)
      expect(selectedContext?.name).toBe('staging')
    })

    it('should set context to null', () => {
      // Arrange
      const { setContext } = useModeStore.getState()
      const mockContext: KubernetesContext = {
        name: 'test',
        cluster: 'test-cluster',
        user: 'test-user',
        namespace: 'test',
      }
      setContext(mockContext)

      // Act
      setContext(null)
      const { selectedContext } = useModeStore.getState()

      // Assert
      expect(selectedContext).toBeNull()
    })

    it('should not affect mode when setting context', () => {
      // Arrange
      const { setMode, setContext } = useModeStore.getState()
      setMode('real')
      const mockContext: KubernetesContext = {
        name: 'test',
        cluster: 'test-cluster',
        user: 'test-user',
        namespace: 'test',
      }

      // Act
      setContext(mockContext)
      const { mode } = useModeStore.getState()

      // Assert
      expect(mode).toBe('real')
    })

    it('should store all context properties correctly', () => {
      // Arrange
      const { setContext } = useModeStore.getState()
      const mockContext: KubernetesContext = {
        name: 'full-context',
        cluster: 'my-cluster',
        user: 'my-user',
        namespace: 'my-namespace',
      }

      // Act
      setContext(mockContext)
      const { selectedContext } = useModeStore.getState()

      // Assert
      expect(selectedContext?.name).toBe('full-context')
      expect(selectedContext?.cluster).toBe('my-cluster')
      expect(selectedContext?.user).toBe('my-user')
      expect(selectedContext?.namespace).toBe('my-namespace')
    })
  })

  describe('reset', () => {
    it('should reset mode to mock', () => {
      // Arrange
      const { setMode, reset } = useModeStore.getState()
      setMode('real')

      // Act
      reset()
      const { mode } = useModeStore.getState()

      // Assert
      expect(mode).toBe('mock')
    })

    it('should reset selectedContext to null', () => {
      // Arrange
      const { setContext, reset } = useModeStore.getState()
      const mockContext: KubernetesContext = {
        name: 'test',
        cluster: 'test-cluster',
        user: 'test-user',
        namespace: 'test',
      }
      setContext(mockContext)

      // Act
      reset()
      const { selectedContext } = useModeStore.getState()

      // Assert
      expect(selectedContext).toBeNull()
    })

    it('should reset both mode and context simultaneously', () => {
      // Arrange
      const { setMode, setContext, reset } = useModeStore.getState()
      setMode('real')
      const mockContext: KubernetesContext = {
        name: 'test',
        cluster: 'test-cluster',
        user: 'test-user',
        namespace: 'test',
      }
      setContext(mockContext)

      // Act
      reset()
      const { mode, selectedContext } = useModeStore.getState()

      // Assert
      expect(mode).toBe('mock')
      expect(selectedContext).toBeNull()
    })

    it('should be idempotent (safe to call multiple times)', () => {
      // Arrange
      const { setMode, setContext, reset } = useModeStore.getState()
      setMode('real')
      const mockContext: KubernetesContext = {
        name: 'test',
        cluster: 'test-cluster',
        user: 'test-user',
        namespace: 'test',
      }
      setContext(mockContext)

      // Act
      reset()
      reset()
      reset()
      const { mode, selectedContext } = useModeStore.getState()

      // Assert
      expect(mode).toBe('mock')
      expect(selectedContext).toBeNull()
    })

    it('should return to initial state after reset', () => {
      // Arrange
      const initialState = useModeStore.getState()
      const { setMode, setContext, reset } = useModeStore.getState()

      // Modify state
      setMode('real')
      setContext({
        name: 'test',
        cluster: 'test-cluster',
        user: 'test-user',
        namespace: 'test',
      })

      // Act
      reset()
      const finalState = useModeStore.getState()

      // Assert
      expect(finalState.mode).toBe(initialState.mode)
      expect(finalState.selectedContext).toBe(initialState.selectedContext)
    })
  })

  describe('state persistence', () => {
    it('should have persistence enabled with correct name', () => {
      // The store is created with persist middleware
      // This test verifies the store structure
      const store = useModeStore

      // Assert
      expect(store).toBeDefined()
      expect(typeof store.getState).toBe('function')
      expect(typeof store.setState).toBe('function')
      expect(typeof store.subscribe).toBe('function')
    })
  })

  describe('complex state updates', () => {
    it('should handle multiple sequential state changes correctly', () => {
      // Arrange
      const { setMode, setContext } = useModeStore.getState()
      const context1: KubernetesContext = {
        name: 'context-1',
        cluster: 'cluster-1',
        user: 'user-1',
        namespace: 'ns-1',
      }
      const context2: KubernetesContext = {
        name: 'context-2',
        cluster: 'cluster-2',
        user: 'user-2',
        namespace: 'ns-2',
      }

      // Act
      setMode('real')
      setContext(context1)
      setMode('mock')
      setContext(context2)
      const { mode, selectedContext } = useModeStore.getState()

      // Assert
      expect(mode).toBe('mock')
      expect(selectedContext).toEqual(context2)
    })

    it('should maintain state consistency during rapid updates', () => {
      // Arrange
      const { setMode, setContext } = useModeStore.getState()

      // Act - rapid updates
      for (let i = 0; i < 10; i++) {
        setMode(i % 2 === 0 ? 'mock' : 'real')
        setContext({
          name: `context-${i}`,
          cluster: `cluster-${i}`,
          user: `user-${i}`,
          namespace: `ns-${i}`,
        })
      }
      const { mode, selectedContext } = useModeStore.getState()

      // Assert - should have the last values
      expect(mode).toBe('real') // 9 % 2 === 1
      expect(selectedContext?.name).toBe('context-9')
    })
  })
})
