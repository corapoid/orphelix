/**
 * Tests for GlassButton Component
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GlassButton } from '@/lib/ui/components/GlassButton'

describe('GlassButton', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      render(<GlassButton>Click Me</GlassButton>)
      expect(screen.getByText('Click Me')).toBeInTheDocument()
    })

    it('should render as MUI Button', () => {
      const { container } = render(<GlassButton>Button</GlassButton>)
      const button = container.querySelector('.MuiButton-root')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('should handle onClick', () => {
      const handleClick = vi.fn()
      render(<GlassButton onClick={handleClick}>Click</GlassButton>)

      fireEvent.click(screen.getByText('Click'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should render as link when href provided', () => {
      render(<GlassButton href="/test">Link Button</GlassButton>)
      const link = screen.getByText('Link Button')
      expect(link.tagName).toBe('A')
    })

    it('should handle disabled state', () => {
      render(<GlassButton disabled>Disabled</GlassButton>)
      const button = screen.getByText('Disabled')
      expect(button).toBeDisabled()
    })
  })

  describe('Selected State', () => {
    it('should apply selected styles', () => {
      const { container } = render(<GlassButton selected>Selected</GlassButton>)
      const button = container.querySelector('.MuiButton-root')
      expect(button).toBeInTheDocument()
    })

    it('should not be selected by default', () => {
      const { container } = render(<GlassButton>Not Selected</GlassButton>)
      const button = container.querySelector('.MuiButton-root')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('should render small size', () => {
      render(<GlassButton size="small">Small</GlassButton>)
      expect(screen.getByText('Small')).toBeInTheDocument()
    })

    it('should render medium size (default)', () => {
      render(<GlassButton>Medium</GlassButton>)
      expect(screen.getByText('Medium')).toBeInTheDocument()
    })

    it('should render large size', () => {
      render(<GlassButton size="large">Large</GlassButton>)
      expect(screen.getByText('Large')).toBeInTheDocument()
    })
  })

  describe('Link Attributes', () => {
    it('should apply target attribute for links', () => {
      render(<GlassButton href="/external" target="_blank">External</GlassButton>)
      const link = screen.getByText('External')
      expect(link).toHaveAttribute('target', '_blank')
    })

    it('should apply rel attribute for links', () => {
      render(<GlassButton href="/external" rel="noopener noreferrer">Safe Link</GlassButton>)
      const link = screen.getByText('Safe Link')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
