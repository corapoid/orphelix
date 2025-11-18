'use client'

import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Editor from '@monaco-editor/react'
import { useTheme } from '@mui/material/styles'
import type { RepoStructure } from '@/lib/github/repo-analyzer'
import {
  type AppTemplate,
  RESOURCE_PRESETS,
  generateManifests,
  validateAppName,
  validateDockerImage,
} from '@/lib/github/template-generator'
import { useGitHubStore, useModeStore } from '@/lib/core/store'
import { LiquidGlassButton } from '@/app/components/common/liquid-glass-button'

interface AddAppModalProps {
  open: boolean
  onClose: () => void
}

const STEPS = ['Type', 'Configure', 'Autoscaling', 'Preview', 'Commit']

const POPULAR_IMAGES = [
  'nginx:latest',
  'nginx:alpine',
  'redis:latest',
  'postgres:14',
  'mysql:8',
  'node:18-alpine',
  'python:3.11-slim',
  'busybox:latest',
]

export function AddAppModal({ open, onClose }: AddAppModalProps) {
  const theme = useTheme()
  const { selectedRepo, selectedBranch, addToBasket } = useGitHubStore()
  const { mode, selectedNamespace: currentNamespace } = useModeStore()

  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [repoStructure, setRepoStructure] = useState<RepoStructure | null>(null)

  // Form state
  const [appType, setAppType] = useState<'deployment' | 'statefulset'>('deployment')
  const [appName, setAppName] = useState('')
  const [replicas, setReplicas] = useState(3)
  const [resourcePreset, setResourcePreset] = useState<keyof typeof RESOURCE_PRESETS>('medium')
  const [dockerImage, setDockerImage] = useState('')
  const [port, setPort] = useState<number | ''>('')
  const [envVars, setEnvVars] = useState<Array<{ name: string; value: string }>>([])
  const [repoUrl, setRepoUrl] = useState('')
  const [enableAutoscaling, setEnableAutoscaling] = useState(false)
  const [minReplicas, setMinReplicas] = useState(1)
  const [maxReplicas, setMaxReplicas] = useState(10)
  const [targetCPU, setTargetCPU] = useState(80)
  const [targetMemory, setTargetMemory] = useState(80)

  // Validation errors
  const [nameError, setNameError] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)

  // Preview state
  const [previewTab, setPreviewTab] = useState(0)
  const [generatedFiles, setGeneratedFiles] = useState<ReturnType<typeof generateManifests> | null>(null)

  // Load repository structure on mount
  useEffect(() => {
    if (!open || !selectedRepo) return

    const loadStructure = async () => {
      setLoading(true)
      setError(null)

      try {
        const modeParam = mode === 'mock' ? '&mode=mock' : ''
        const response = await fetch(
          `/api/github/analyze-structure?owner=${selectedRepo.owner}&repo=${selectedRepo.repo}&ref=${selectedBranch}${modeParam}`
        )

        if (!response.ok) {
          throw new Error('Failed to analyze repository structure')
        }

        const structure: RepoStructure = await response.json()
        setRepoStructure(structure)
      } catch (err) {
        const error = err as Error
        setError(error.message || 'Failed to load repository structure')
      } finally {
        setLoading(false)
      }
    }

    loadStructure()
  }, [open, selectedRepo, selectedBranch, mode])


  // Validate app name
  useEffect(() => {
    if (!appName) {
      setNameError(null)
      return
    }

    const result = validateAppName(appName)
    setNameError(result.valid ? null : result.error || 'Invalid name')
  }, [appName])

  // Validate docker image
  useEffect(() => {
    if (!dockerImage) {
      setImageError(null)
      return
    }

    const result = validateDockerImage(dockerImage)
    setImageError(result.valid ? null : result.error || 'Invalid image')
  }, [dockerImage])

  const handleNext = () => {
    if (activeStep === 1) {
      // Validate form before moving to autoscaling
      if (!appName || nameError) {
        setError('Please provide a valid application name')
        return
      }
      if (!dockerImage || imageError) {
        setError('Please provide a valid Docker image')
        return
      }
    }

    if (activeStep === 2) {
      // Generate manifests for preview after autoscaling configuration
      if (repoStructure) {
        const template: AppTemplate = {
          name: appName,
          namespace: currentNamespace || 'default',
          replicas,
          resources: RESOURCE_PRESETS[resourcePreset],
          image: dockerImage,
          port: port === '' ? undefined : port,
          type: appType,
          env: envVars.filter(e => e.name && e.value),
          repoUrl: repoUrl || undefined,
          autoscaling: enableAutoscaling ? {
            enabled: true,
            minReplicas,
            maxReplicas,
            targetCPU,
            targetMemory,
          } : undefined,
        }

        const files = generateManifests(template, repoStructure)
        setGeneratedFiles(files)
      }
    }

    setError(null)
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setError(null)
    setActiveStep((prev) => prev - 1)
  }

  const handleFinish = () => {
    if (!generatedFiles) return

    // Add files to edit basket
    const filesToAdd = []
    if (generatedFiles.deployment) filesToAdd.push(generatedFiles.deployment)
    if (generatedFiles.service) filesToAdd.push(generatedFiles.service)
    if (generatedFiles.hpa) filesToAdd.push(generatedFiles.hpa)
    if (generatedFiles.kustomization) filesToAdd.push(generatedFiles.kustomization)
    if (generatedFiles.overlays) filesToAdd.push(...generatedFiles.overlays)

    filesToAdd.forEach((file) => {
      addToBasket({
        filePath: file.path,
        content: file.content,
        originalContent: '', // New file
        sha: file.sha || '', // New file
      })
    })

    // Close modal and show success
    onClose()
    alert(`${filesToAdd.length} files added to your changes. Review and commit when ready.`)
  }

  const handleClose = () => {
    // Reset form
    setActiveStep(0)
    setAppName('')
    setReplicas(3)
    setResourcePreset('medium')
    setDockerImage('')
    setPort('')
    setEnvVars([])
    setRepoUrl('')
    setEnableAutoscaling(false)
    setMinReplicas(1)
    setMaxReplicas(10)
    setTargetCPU(80)
    setTargetMemory(80)
    setError(null)
    setGeneratedFiles(null)

    onClose()
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <FormControl>
              <FormLabel>Application Type</FormLabel>
              <RadioGroup value={appType} onChange={(e) => setAppType(e.target.value as 'deployment' | 'statefulset')}>
                <FormControlLabel
                  value="deployment"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight={600}>Deployment</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stateless applications, can scale horizontally
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="statefulset"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight={600}>StatefulSet</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stateful applications with persistent identity
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Application Name"
              value={appName}
              onChange={(e) => setAppName(e.target.value.toLowerCase())}
              error={!!nameError}
              helperText={nameError || 'Lowercase alphanumeric and hyphens only'}
              fullWidth
              required
            />

            <TextField
              label="Namespace"
              value={currentNamespace || 'default'}
              fullWidth
              disabled
              helperText="Namespace is set from your current context. Change context in Settings to deploy to a different namespace."
            />

            <FormControl fullWidth>
              <InputLabel>Resource Preset</InputLabel>
              <Select
                value={resourcePreset}
                label="Resource Preset"
                onChange={(e) => setResourcePreset(e.target.value as keyof typeof RESOURCE_PRESETS)}
              >
                <MenuItem value="small">
                  Small (128Mi/250m → 256Mi/500m)
                </MenuItem>
                <MenuItem value="medium">
                  Medium (256Mi/500m → 512Mi/1000m)
                </MenuItem>
                <MenuItem value="large">
                  Large (512Mi/1000m → 1Gi/2000m)
                </MenuItem>
              </Select>
            </FormControl>

            <Autocomplete
              freeSolo
              options={POPULAR_IMAGES}
              value={dockerImage}
              onChange={(_, newValue) => setDockerImage(newValue || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Docker Image"
                  error={!!imageError}
                  helperText={imageError || 'e.g., nginx:latest or myregistry.com/app:v1.0'}
                  required
                />
              )}
            />

            <TextField
              label="Port (optional)"
              type="number"
              value={port}
              onChange={(e) => setPort(e.target.value === '' ? '' : parseInt(e.target.value))}
              helperText="Container port to expose. Service will be created if specified."
              fullWidth
            />

            <TextField
              label="Repository URL (optional)"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              fullWidth
              helperText="Link to source code repository (e.g., https://github.com/user/repo)"
              placeholder="https://github.com/..."
            />
          </Box>
        )

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={enableAutoscaling}
                  onChange={(e) => setEnableAutoscaling(e.target.checked)}
                />
              }
              label="Enable Horizontal Pod Autoscaling (HPA)"
            />

            {enableAutoscaling ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Alert severity="info">
                  HPA will automatically scale your application between min and max replicas based on CPU and memory utilization.
                </Alert>

                <Box>
                  <Typography gutterBottom>Initial Replicas: {replicas}</Typography>
                  <Slider
                    value={replicas}
                    onChange={(_, value) => setReplicas(value as number)}
                    min={1}
                    max={10}
                    marks
                    valueLabelDisplay="auto"
                  />
                  <Typography variant="caption" color="text.secondary">
                    Number of replicas to start with before autoscaling takes effect
                  </Typography>
                </Box>

                <Box>
                  <Typography gutterBottom>Min Replicas: {minReplicas}</Typography>
                  <Slider
                    value={minReplicas}
                    onChange={(_, value) => {
                      const newMin = value as number
                      setMinReplicas(newMin)
                      // Ensure max is always >= min
                      if (maxReplicas < newMin) {
                        setMaxReplicas(newMin)
                      }
                    }}
                    min={1}
                    max={20}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Box>

                <Box>
                  <Typography gutterBottom>Max Replicas: {maxReplicas}</Typography>
                  <Slider
                    value={maxReplicas}
                    onChange={(_, value) => setMaxReplicas(value as number)}
                    min={minReplicas}
                    max={20}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Box>

                <Box>
                  <Typography gutterBottom>Target CPU Utilization: {targetCPU}%</Typography>
                  <Slider
                    value={targetCPU}
                    onChange={(_, value) => setTargetCPU(value as number)}
                    min={10}
                    max={100}
                    step={5}
                    marks={[
                      { value: 50, label: '50%' },
                      { value: 80, label: '80%' },
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>

                <Box>
                  <Typography gutterBottom>Target Memory Utilization: {targetMemory}%</Typography>
                  <Slider
                    value={targetMemory}
                    onChange={(_, value) => setTargetMemory(value as number)}
                    min={10}
                    max={100}
                    step={5}
                    marks={[
                      { value: 50, label: '50%' },
                      { value: 80, label: '80%' },
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Alert severity="info">
                  Autoscaling is disabled. Your application will run with a fixed number of replicas.
                </Alert>

                <Box>
                  <Typography gutterBottom>Replicas: {replicas}</Typography>
                  <Slider
                    value={replicas}
                    onChange={(_, value) => setReplicas(value as number)}
                    min={1}
                    max={10}
                    marks
                    valueLabelDisplay="auto"
                  />
                  <Typography variant="caption" color="text.secondary">
                    Fixed number of pod replicas to run
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )

      case 3:
        if (!generatedFiles) return <CircularProgress />

        // Flatten all files into a single array for display
        const allFiles: Array<{ name: string; file: { path: string; content: string } }> = []

        if (generatedFiles.deployment) {
          allFiles.push({ name: 'Deployment', file: generatedFiles.deployment })
        }
        if (generatedFiles.service) {
          allFiles.push({ name: 'Service', file: generatedFiles.service })
        }
        if (generatedFiles.hpa) {
          allFiles.push({ name: 'HPA', file: generatedFiles.hpa })
        }
        if (generatedFiles.kustomization) {
          allFiles.push({ name: 'Base Kustomization', file: generatedFiles.kustomization })
        }
        if (generatedFiles.overlays) {
          generatedFiles.overlays.forEach((overlay, idx) => {
            const envName = overlay.path.split('/').filter(p => p !== 'kustomization.yaml').pop() || `overlay-${idx}`
            allFiles.push({ name: `${envName} Kustomization`, file: overlay })
          })
        }

        return (
          <Box>
            <Tabs value={previewTab} onChange={(_, val) => setPreviewTab(val)}>
              {allFiles.map(({ name }) => (
                <Tab key={name} label={name} />
              ))}
            </Tabs>

            <Box sx={{ mt: 2 }}>
              {allFiles.map(({ name, file }, index) => (
                <Box key={name} sx={{ display: previewTab === index ? 'block' : 'none' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    {file.path}
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: 1,
                      borderColor: 'divider',
                      height: 400,
                    }}
                  >
                    <Editor
                      height="400px"
                      language="yaml"
                      value={file.content}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 13,
                      }}
                      theme={theme.palette.mode === 'dark' ? 'vs-dark' : 'vs'}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )

      case 4:
        if (!generatedFiles) return null

        // Collect all file paths
        const filePaths: string[] = []
        if (generatedFiles.deployment) filePaths.push(generatedFiles.deployment.path)
        if (generatedFiles.service) filePaths.push(generatedFiles.service.path)
        if (generatedFiles.hpa) filePaths.push(generatedFiles.hpa.path)
        if (generatedFiles.kustomization) filePaths.push(generatedFiles.kustomization.path)
        if (generatedFiles.overlays) {
          generatedFiles.overlays.forEach(overlay => filePaths.push(overlay.path))
        }

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info">
              Files will be added to your changes. You can review and commit them from the changes panel.
            </Alert>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Files to be created ({filePaths.length}):
              </Typography>
              {filePaths.map(path => (
                <Chip key={path} label={path} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </Box>
        )

      default:
        return null
    }
  }

  if (!selectedRepo) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backdropFilter: 'blur(60px)',
          border: theme.palette.mode === 'light'
            ? '1px solid rgba(209, 213, 219, 0.4)'
            : '1px solid rgba(255, 255, 255, 0.12)',
        },
      }}
    >
      <DialogTitle>Add New Application</DialogTitle>

      <DialogContent>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {!loading && repoStructure && (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStepContent()}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Box sx={{ flex: 1 }} />
        {activeStep > 0 && (
          <Button onClick={handleBack}>Back</Button>
        )}
        {activeStep < STEPS.length - 1 ? (
          <LiquidGlassButton onClick={handleNext} disabled={loading}>
            Next
          </LiquidGlassButton>
        ) : (
          <LiquidGlassButton onClick={handleFinish} disabled={loading || !generatedFiles}>
            Add to Changes
          </LiquidGlassButton>
        )}
      </DialogActions>
    </Dialog>
  )
}
