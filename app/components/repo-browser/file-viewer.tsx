'use client'

import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material/styles'
import Editor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import SaveIcon from '@mui/icons-material/Save'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useGitHubStore } from '@/lib/core/store'
import { LiquidGlassButton } from '@/app/components/common/liquid-glass-button'

interface FileViewerProps {
  owner: string
  repo: string
  branch: string
  filePath: string
  onCreatePR?: (content: string, originalContent: string, sha: string) => void
}

export function FileViewer({ owner, repo, branch, filePath }: FileViewerProps) {
  const theme = useTheme()
  const { addToBasket, editBasket, removeFromBasket } = useGitHubStore()
  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [fileSha, setFileSha] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [monacoInstance, setMonacoInstance] = useState<typeof import('monaco-editor') | null>(null)

  // Load file on mount or when file path changes
  useEffect(() => {
    const loadFile = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/github/file?owner=${owner}&repo=${repo}&path=${encodeURIComponent(filePath)}&ref=${branch}`
        )

        if (!response.ok) {
          throw new Error(`Failed to load file: ${response.statusText}`)
        }

        const data = await response.json()

        // Check if this file is in the basket
        const basketEdit = editBasket.get(filePath)
        const newContent = basketEdit ? basketEdit.content : data.content
        const newOriginalContent = basketEdit ? basketEdit.originalContent : data.content

        setContent(newContent)
        setOriginalContent(newOriginalContent)
        setFileSha(basketEdit ? basketEdit.sha : data.sha)
        setIsSaved(!!basketEdit)
      } catch (err) {
        const error = err as Error
        setError(error.message || 'Failed to load file')
      } finally {
        setIsLoading(false)
      }
    }

    loadFile()
  }, [owner, repo, branch, filePath, editBasket])

  const hasChanges = content !== originalContent
  const fileExtension = filePath.split('.').pop()?.toLowerCase()
  const editorLanguage = fileExtension === 'json' ? 'json' : fileExtension === 'md' ? 'markdown' : 'yaml'

  const handleSave = () => {
    if (!hasChanges) return

    addToBasket({
      filePath,
      content,
      originalContent,
      sha: fileSha,
    })
    setIsSaved(true)
  }

  const handleDiscard = () => {
    removeFromBasket(filePath)
    setContent(originalContent)
    setIsSaved(false)
  }

  // Keyboard shortcut: Cmd+S / Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [content, originalContent, filePath, fileSha])

  // Update isSaved state when content changes
  useEffect(() => {
    const basketEdit = editBasket.get(filePath)
    if (basketEdit && basketEdit.content === content) {
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  }, [content, editBasket, filePath])

  const handleEditorMount = (_editorRef: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    setMonacoInstance(monaco)

    monaco.editor.defineTheme('kubevista-theme', {
      base: theme.palette.mode === 'dark' ? 'vs-dark' : 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': theme.palette.mode === 'dark' ? '#1a1b26' : '#f5f5f5',
        'editor.foreground': theme.palette.mode === 'dark' ? '#e0e0e0' : '#1e1e1e',
        'editorLineNumber.foreground': theme.palette.mode === 'dark' ? '#858585' : '#999999',
        'editorCursor.foreground': theme.palette.primary.main.startsWith('#') ? theme.palette.primary.main : '#007acc',
        'editor.selectionBackground': theme.palette.mode === 'dark' ? '#264f78' : '#c8ddff',
        'editor.lineHighlightBackground': theme.palette.mode === 'dark' ? '#2a2d2e' : '#eeeeee',
        'editorIndentGuide.background': theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
        'editorIndentGuide.activeBackground': theme.palette.mode === 'dark' ? '#707070' : '#b0b0b0',
      },
    })
    monaco.editor.setTheme('kubevista-theme')
  }

  // Update editor theme when theme mode changes
  useEffect(() => {
    if (!monacoInstance) return

    monacoInstance.editor.defineTheme('kubevista-theme', {
      base: theme.palette.mode === 'dark' ? 'vs-dark' : 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': theme.palette.mode === 'dark' ? '#1a1b26' : '#f5f5f5',
        'editor.foreground': theme.palette.mode === 'dark' ? '#e0e0e0' : '#1e1e1e',
        'editorLineNumber.foreground': theme.palette.mode === 'dark' ? '#858585' : '#999999',
        'editorCursor.foreground': theme.palette.primary.main.startsWith('#') ? theme.palette.primary.main : '#007acc',
        'editor.selectionBackground': theme.palette.mode === 'dark' ? '#264f78' : '#c8ddff',
        'editor.lineHighlightBackground': theme.palette.mode === 'dark' ? '#2a2d2e' : '#eeeeee',
        'editorIndentGuide.background': theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
        'editorIndentGuide.activeBackground': theme.palette.mode === 'dark' ? '#707070' : '#b0b0b0',
      },
    })
    monacoInstance.editor.setTheme('kubevista-theme')
  }, [theme.palette.mode, monacoInstance, theme.palette.primary.main])

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', pt: 0, px: 3, pb: 0 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, pt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">{filePath}</Typography>
          {isSaved && hasChanges && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.main' }}>
              <CheckCircleIcon fontSize="small" />
              <Typography variant="body2">Saved</Typography>
            </Box>
          )}
          {!isSaved && hasChanges && (
            <Typography variant="body2" sx={{ color: 'warning.main' }}>
              Unsaved changes
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {isSaved && (
            <LiquidGlassButton
              color="warning"
              onClick={handleDiscard}
              sx={{
                textTransform: 'none',
                py: 0.75,
                px: 2,
                minWidth: 'auto',
                borderColor: 'warning.main',
                color: 'warning.main',
                '&:hover': {
                  borderColor: 'warning.dark',
                },
              }}
            >
              Discard Changes
            </LiquidGlassButton>
          )}
          <LiquidGlassButton
            disabled={!hasChanges}
            onClick={handleSave}
            startIcon={isSaved ? <CheckCircleIcon /> : <SaveIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 140,
              px: 3,
              py: 0.75,
              justifyContent: 'center',
              ...(isSaved && {
                color: 'success.main',
                borderColor: 'success.main',
              }),
            }}
          >
            {isSaved ? 'Saved' : 'Save'}
          </LiquidGlassButton>
        </Box>
      </Box>

      {/* Editor */}
      <Box
        sx={{
          flex: 1,
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 16px 0 rgba(0, 0, 0, 0.3)'
            : '0 4px 16px 0 rgba(31, 38, 135, 0.08)',
          border: theme.palette.mode === 'light'
            ? '1px solid rgba(209, 213, 219, 0.4)'
            : '1px solid rgba(255, 255, 255, 0.12)',
          pt: 2,
        }}
      >
        <Editor
          height="100%"
          language={editorLanguage}
          value={content}
          onChange={(value) => setContent(value || '')}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            hideCursorInOverviewRuler: true,
            overviewRulerLanes: 0,
          }}
        />
      </Box>
    </Box>
  )
}
