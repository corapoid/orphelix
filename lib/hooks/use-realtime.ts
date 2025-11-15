import { useEffect, useState, useRef, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useModeStore } from '@/lib/core/store'

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error'

export interface RealtimeEvent {
  type: string
  data: unknown
}

/**
 * Hook for real-time Kubernetes updates via SSE
 *
 * Automatically connects to SSE endpoint when:
 * - mode is 'real'
 * - selectedContext is set
 * - realtimeEnabled is true
 *
 * Features:
 * - Auto-reconnection on disconnect
 * - Heartbeat monitoring
 * - Cache invalidation on resource changes
 */
export function useRealtimeUpdates() {
  const queryClient = useQueryClient()
  const mode = useModeStore((state) => state.mode)
  const realtimeEnabled = useModeStore((state) => state.realtimeEnabled)
  const namespace = useModeStore((state) => state.selectedNamespace)
  const selectedContext = useModeStore((state) => state.selectedContext)

  const [status, setStatus] = useState<ConnectionStatus>('disconnected')
  const [lastEvent, setLastEvent] = useState<RealtimeEvent | null>(null)
  const [error, setError] = useState<string | null>(null)

  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttemptsRef = useRef(0)

  const maxReconnectAttempts = 5
  const reconnectDelay = 3000

  /**
   * Close existing connection
   */
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    setStatus('disconnected')
  }, [])

  /**
   * Connect to SSE endpoint
   */
  const connect = useCallback(() => {
    // Only connect in real mode with realtime enabled and context selected
    if (mode !== 'real' || !realtimeEnabled || !selectedContext) {
      disconnect()
      return
    }

    // Clean up existing connection
    disconnect()

    setStatus('connecting')
    setError(null)

    try {
      const eventSource = new EventSource(`/api/stream?namespace=${encodeURIComponent(namespace)}&context=${encodeURIComponent(selectedContext?.name || '')}`)
      eventSourceRef.current = eventSource

      // Connection opened
      eventSource.addEventListener('connected', (event) => {
        console.warn('[SSE] Connected:', event.data)
        setStatus('connected')
        reconnectAttemptsRef.current = 0
        setError(null)
      })

      // Heartbeat
      eventSource.addEventListener('heartbeat', () => {
        // Connection is alive
      })

      // Deployment updates
      eventSource.addEventListener('deployment', (event) => {
        const data = JSON.parse(event.data)
        setLastEvent({ type: 'deployment', data })

        // Invalidate deployment queries
        queryClient.invalidateQueries({ queryKey: ['deployments'] })
        queryClient.invalidateQueries({ queryKey: ['deployment'] })
      })

      // Pod updates
      eventSource.addEventListener('pod', (event) => {
        const data = JSON.parse(event.data)
        setLastEvent({ type: 'pod', data })

        // Invalidate pod queries
        queryClient.invalidateQueries({ queryKey: ['pods'] })
        queryClient.invalidateQueries({ queryKey: ['pod'] })
        queryClient.invalidateQueries({ queryKey: ['deployment-pods'] })
        queryClient.invalidateQueries({ queryKey: ['node-pods'] })
      })

      // Event updates
      eventSource.addEventListener('event', (event) => {
        const data = JSON.parse(event.data)
        setLastEvent({ type: 'event', data })

        // Invalidate event queries
        queryClient.invalidateQueries({ queryKey: ['events'] })
        queryClient.invalidateQueries({ queryKey: ['recent-events'] })
        queryClient.invalidateQueries({ queryKey: ['deployment-events'] })
        queryClient.invalidateQueries({ queryKey: ['pod-events'] })
        queryClient.invalidateQueries({ queryKey: ['node-events'] })
      })

      // Error from server
      eventSource.addEventListener('error', (event) => {
        const data = JSON.parse((event as MessageEvent).data || '{}')
        console.error('[SSE] Server error:', data)
        setError(data.message || 'Unknown server error')
      })

      // Connection error (network, etc.)
      eventSource.onerror = (err) => {
        console.error('[SSE] Connection error:', err)
        setStatus('error')
        eventSource.close()

        // Attempt reconnection
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++
          console.warn(
            `[SSE] Reconnecting... (attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts})`
          )

          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, reconnectDelay)
        } else {
          setError('Max reconnection attempts reached')
          setStatus('disconnected')
        }
      }
    } catch (err) {
      console.error('[SSE] Failed to create EventSource:', err)
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to connect')
    }
  }, [mode, realtimeEnabled, selectedContext, namespace, disconnect, queryClient])

  /**
   * Manual reconnect
   */
  const reconnect = useCallback(() => {
    reconnectAttemptsRef.current = 0
    connect()
  }, [connect])

  // Connect/disconnect on mode, realtime, context, or namespace changes
  useEffect(() => {
    if (mode === 'real' && realtimeEnabled && selectedContext) {
      connect()
    } else {
      disconnect()
    }

    // Cleanup on unmount
    return () => {
      disconnect()
    }
  }, [mode, realtimeEnabled, selectedContext, namespace, connect, disconnect])

  return {
    status,
    error,
    lastEvent,
    reconnect,
    disconnect,
    isConnected: status === 'connected',
  }
}
