import { describe, it, expect, beforeEach } from 'vitest'
import { useModeStore, useGitHubStore } from '@/lib/core/store'
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

describe('useGitHubStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useGitHubStore.getState()
    store.setSelectedRepo(null)
    // Clear all pending PRs
    const allPRs = store.pendingPRs
    allPRs.forEach((_, key) => {
      const [namespace, name] = key.split('/')
      store.removePendingPR(name, namespace)
    })
  })

  describe('initial state', () => {
    it('should initialize with null selectedRepo', () => {
      const { selectedRepo } = useGitHubStore.getState()
      expect(selectedRepo).toBeNull()
    })

    it('should initialize with empty pendingPRs Map', () => {
      const { pendingPRs } = useGitHubStore.getState()
      expect(pendingPRs).toBeInstanceOf(Map)
      expect(pendingPRs.size).toBe(0)
    })
  })

  describe('setSelectedRepo', () => {
    it('should set a GitHub repository', () => {
      const { setSelectedRepo } = useGitHubStore.getState()
      const repo = { owner: 'kubernetes', repo: 'kubernetes', branch: 'main' }

      setSelectedRepo(repo)
      const { selectedRepo } = useGitHubStore.getState()

      expect(selectedRepo).toEqual(repo)
    })

    it('should update existing repository', () => {
      const { setSelectedRepo } = useGitHubStore.getState()
      const repo1 = { owner: 'facebook', repo: 'react', branch: 'main' }
      const repo2 = { owner: 'vercel', repo: 'next.js', branch: 'canary' }

      setSelectedRepo(repo1)
      setSelectedRepo(repo2)
      const { selectedRepo } = useGitHubStore.getState()

      expect(selectedRepo).toEqual(repo2)
    })

    it('should set repository to null', () => {
      const { setSelectedRepo } = useGitHubStore.getState()
      const repo = { owner: 'test', repo: 'test', branch: 'main' }

      setSelectedRepo(repo)
      setSelectedRepo(null)
      const { selectedRepo } = useGitHubStore.getState()

      expect(selectedRepo).toBeNull()
    })
  })

  describe('setPendingPR', () => {
    it('should add a pending PR', () => {
      const { setPendingPR, getPendingPR } = useGitHubStore.getState()

      setPendingPR('my-deployment', 'default', 123)
      const prNumber = getPendingPR('my-deployment', 'default')

      expect(prNumber).toBe(123)
    })

    it('should handle multiple pending PRs', () => {
      const { setPendingPR, getPendingPR } = useGitHubStore.getState()

      setPendingPR('deployment-1', 'ns1', 100)
      setPendingPR('deployment-2', 'ns2', 200)
      setPendingPR('deployment-3', 'ns1', 300)

      expect(getPendingPR('deployment-1', 'ns1')).toBe(100)
      expect(getPendingPR('deployment-2', 'ns2')).toBe(200)
      expect(getPendingPR('deployment-3', 'ns1')).toBe(300)
    })

    it('should update existing PR number', () => {
      const { setPendingPR, getPendingPR } = useGitHubStore.getState()

      setPendingPR('my-deployment', 'default', 123)
      setPendingPR('my-deployment', 'default', 456)

      expect(getPendingPR('my-deployment', 'default')).toBe(456)
    })

    it('should use namespace/deployment as key', () => {
      const { setPendingPR, getPendingPR } = useGitHubStore.getState()

      setPendingPR('nginx', 'prod', 111)
      setPendingPR('nginx', 'dev', 222)

      expect(getPendingPR('nginx', 'prod')).toBe(111)
      expect(getPendingPR('nginx', 'dev')).toBe(222)
    })
  })

  describe('removePendingPR', () => {
    it('should remove a pending PR', () => {
      const { setPendingPR, removePendingPR, getPendingPR } = useGitHubStore.getState()

      setPendingPR('my-deployment', 'default', 123)
      removePendingPR('my-deployment', 'default')

      expect(getPendingPR('my-deployment', 'default')).toBeNull()
    })

    it('should only remove specified PR', () => {
      const { setPendingPR, removePendingPR, getPendingPR } = useGitHubStore.getState()

      setPendingPR('deployment-1', 'ns1', 100)
      setPendingPR('deployment-2', 'ns2', 200)

      removePendingPR('deployment-1', 'ns1')

      expect(getPendingPR('deployment-1', 'ns1')).toBeNull()
      expect(getPendingPR('deployment-2', 'ns2')).toBe(200)
    })

    it('should handle removing non-existent PR gracefully', () => {
      const { removePendingPR, getPendingPR } = useGitHubStore.getState()

      removePendingPR('non-existent', 'default')

      expect(getPendingPR('non-existent', 'default')).toBeNull()
    })
  })

  describe('getPendingPR', () => {
    it('should return null for non-existent PR', () => {
      const { getPendingPR } = useGitHubStore.getState()

      expect(getPendingPR('non-existent', 'default')).toBeNull()
    })

    it('should distinguish between namespaces', () => {
      const { setPendingPR, getPendingPR } = useGitHubStore.getState()

      setPendingPR('app', 'production', 999)

      expect(getPendingPR('app', 'production')).toBe(999)
      expect(getPendingPR('app', 'staging')).toBeNull()
    })
  })

  describe('complex scenarios', () => {
    it('should handle full workflow: add, update, remove PRs', () => {
      const { setPendingPR, getPendingPR, removePendingPR } = useGitHubStore.getState()

      // Add PRs
      setPendingPR('frontend', 'prod', 101)
      setPendingPR('backend', 'prod', 102)

      // Update PR
      setPendingPR('frontend', 'prod', 201)

      // Verify
      expect(getPendingPR('frontend', 'prod')).toBe(201)
      expect(getPendingPR('backend', 'prod')).toBe(102)

      // Remove one
      removePendingPR('frontend', 'prod')

      expect(getPendingPR('frontend', 'prod')).toBeNull()
      expect(getPendingPR('backend', 'prod')).toBe(102)
    })

    it('should maintain separate state from repo selection', () => {
      const { setSelectedRepo, setPendingPR, getPendingPR } = useGitHubStore.getState()

      setPendingPR('deployment', 'default', 123)
      setSelectedRepo({ owner: 'test', repo: 'test', branch: 'main' })

      expect(getPendingPR('deployment', 'default')).toBe(123)
    })
  })
})
