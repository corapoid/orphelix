'use client'

import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'
import { GlassPanel } from '@/lib/ui'
import type { TroubleshootingContext } from '@/lib/ai/context-collector'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface TroubleshootingChatProps {
  context?: TroubleshootingContext
  onClose?: () => void
}

export function TroubleshootingChat({ context }: TroubleshootingChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      // Get API key from localStorage
      const apiKey = localStorage.getItem('kubevista_openai_key')
      if (!apiKey) {
        setError('OpenAI API key not configured. Please add it in Settings.')
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/ai/troubleshoot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          context,
          apiKey,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter(line => line.trim())

          for (const line of lines) {
            if (line.startsWith('0:')) {
              // Extract content from streaming format
              const content = line.substring(2).replace(/^"(.*)"$/, '$1')
              assistantContent += content

              setMessages(prev => {
                const updated = [...prev]
                const lastMsg = updated[updated.length - 1]
                if (lastMsg.role === 'assistant') {
                  lastMsg.content = assistantContent
                }
                return updated
              })
            }
          }
        }
      }

      setIsLoading(false)
    } catch (err) {
      console.error('AI chat error:', err)
      setError(err instanceof Error ? err.message : 'Failed to get AI response')
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <SmartToyIcon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5, mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              AI Troubleshooting Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ask me anything about Kubernetes issues, errors, or best practices.
            </Typography>
            {context && (
              <Alert severity="info" sx={{ mt: 3, maxWidth: 600, mx: 'auto' }}>
                I have context about your {context.resource?.type} <strong>{context.resource?.name}</strong>
              </Alert>
            )}
          </Box>
        )}

        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'flex-start',
              flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: message.role === 'user' ? 'primary.main' : 'success.main',
                color: 'white',
                flexShrink: 0,
              }}
            >
              {message.role === 'user' ? (
                <PersonIcon fontSize="small" />
              ) : (
                <SmartToyIcon fontSize="small" />
              )}
            </Box>

            {/* Message Content */}
            <GlassPanel
              sx={{
                p: 2,
                maxWidth: '70%',
                flex: 1,
              }}
            >
              <ReactMarkdown
                components={{
                  // Style markdown elements
                  p: ({ children }) => (
                    <Typography variant="body2" sx={{ mb: 1, '&:last-child': { mb: 0 } }}>
                      {children}
                    </Typography>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <Box
                        component="code"
                        sx={{
                          bgcolor: 'action.hover',
                          px: 0.5,
                          py: 0.25,
                          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                        }}
                      >
                        {children}
                      </Box>
                    ) : (
                      <Box
                        component="pre"
                        sx={{
                          bgcolor: 'action.hover',
                          p: 2,
                          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
                          overflow: 'auto',
                          my: 1,
                        }}
                      >
                        <code style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                          {children}
                        </code>
                      </Box>
                    )
                  },
                  ul: ({ children }) => (
                    <Box component="ul" sx={{ my: 1, pl: 3 }}>
                      {children}
                    </Box>
                  ),
                  ol: ({ children }) => (
                    <Box component="ol" sx={{ my: 1, pl: 3 }}>
                      {children}
                    </Box>
                  ),
                  li: ({ children }) => (
                    <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                      {children}
                    </Typography>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </GlassPanel>
          </Box>
        ))}

        {isLoading && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'success.main',
                color: 'white',
              }}
            >
              <SmartToyIcon fontSize="small" />
            </Box>
            <Paper elevation={0} sx={{ p: 2 }}>
              <CircularProgress size={20} />
            </Paper>
          </Box>
        )}

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Ask about Kubernetes issues, errors, or best practices..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
            size="small"
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            sx={{ mb: 0.5 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
