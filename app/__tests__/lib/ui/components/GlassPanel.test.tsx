/**
 * Tests for GlassPanel Component
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GlassPanel } from '@/lib/ui/components/GlassPanel'

describe('GlassPanel', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      render(
        <GlassPanel>
          <div>Panel Content</div>
        </GlassPanel>
      )

      expect(screen.getByText('Panel Content')).toBeInTheDocument()
    })

    it('should render as MUI Paper', () => {
      const { container } = render(<GlassPanel>Content</GlassPanel>)
      const paper = container.querySelector('.MuiPaper-root')
      expect(paper).toBeInTheDocument()
    })

    it('should render with custom sx prop', () => {
      const { container } = render(
        <GlassPanel sx={{ padding: 4 }}>Content</GlassPanel>
      )

      const paper = container.querySelector('.MuiPaper-root')
      expect(paper).toHaveStyle({ padding: '32px' })
    })
  })

  describe('Closeable Functionality', () => {
    it('should show close button when closeable', () => {
      render(
        <GlassPanel closeable>
          Closeable Panel
        </GlassPanel>
      )

      const closeButton = screen.getByRole('button')
      expect(closeButton).toBeInTheDocument()
    })

    it('should not show close button by default', () => {
      render(<GlassPanel>Non-closeable Panel</GlassPanel>)

      const closeButtons = screen.queryAllByRole('button')
      expect(closeButtons).toHaveLength(0)
    })

    it('should call onClose when close button clicked', () => {
      const handleClose = vi.fn()
      render(
        <GlassPanel closeable onClose={handleClose}>
          Panel Content
        </GlassPanel>
      )

      const closeButton = screen.getByRole('button')
      fireEvent.click(closeButton)

      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should render close icon', () => {
      const { container } = render(
        <GlassPanel closeable>Panel</GlassPanel>
      )

      const closeIcon = container.querySelector('[data-testid="CloseIcon"]')
      expect(closeIcon).toBeInTheDocument()
    })
  })

  describe('Open/Close State', () => {
    it('should be open by default', () => {
      render(<GlassPanel>Default Open</GlassPanel>)
      expect(screen.getByText('Default Open')).toBeInTheDocument()
    })

    it('should render when open is true', () => {
      render(<GlassPanel open={true}>Open Panel</GlassPanel>)
      expect(screen.getByText('Open Panel')).toBeInTheDocument()
    })

    it('should not render content when open is false and no animation', () => {
      render(
        <GlassPanel open={false} animationType="none">
          Hidden Content
        </GlassPanel>
      )

      expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument()
    })
  })

  describe('Animation Types', () => {
    it('should use fade animation by default', () => {
      render(<GlassPanel>Fade Panel</GlassPanel>)
      // Fade animation should render content
      expect(screen.getByText('Fade Panel')).toBeInTheDocument()
    })

    it('should use collapse animation when specified', () => {
      const { container } = render(
        <GlassPanel animationType="collapse">Collapse Panel</GlassPanel>
      )

      const collapse = container.querySelector('.MuiCollapse-root')
      expect(collapse).toBeInTheDocument()
    })

    it('should use no animation when specified', () => {
      const { container } = render(
        <GlassPanel animationType="none">No Animation</GlassPanel>
      )

      // Should not have Fade or Collapse wrapper
      const fade = container.querySelector('.MuiFade-root')
      const collapse = container.querySelector('.MuiCollapse-root')

      expect(fade).not.toBeInTheDocument()
      expect(collapse).not.toBeInTheDocument()
    })

    it('should pass open prop to Collapse animation', () => {
      const { container } = render(
        <GlassPanel open={true} animationType="collapse">
          Content
        </GlassPanel>
      )

      const collapse = container.querySelector('.MuiCollapse-root')
      expect(collapse).toBeInTheDocument()
    })

    it('should pass open prop to Fade animation', () => {
      render(
        <GlassPanel open={true} animationType="fade">
          Content
        </GlassPanel>
      )

      // Content should be visible when open=true with fade animation
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have position relative', () => {
      const { container } = render(<GlassPanel>Content</GlassPanel>)
      const paper = container.querySelector('.MuiPaper-root')
      expect(paper).toHaveStyle({ position: 'relative' })
    })

    it('should have default padding', () => {
      const { container } = render(<GlassPanel>Content</GlassPanel>)
      const paper = container.querySelector('.MuiPaper-root')
      expect(paper).toHaveStyle({ padding: '20px' })
    })

    it('should have elevation 0', () => {
      const { container } = render(<GlassPanel>Content</GlassPanel>)
      const paper = container.querySelector('.MuiPaper-elevation0')
      expect(paper).toBeInTheDocument()
    })

    it('should merge custom sx with defaults', () => {
      const { container } = render(
        <GlassPanel sx={{ marginTop: 2 }}>Content</GlassPanel>
      )

      const paper = container.querySelector('.MuiPaper-root')
      expect(paper).toHaveStyle({
        position: 'relative',
        marginTop: '16px',
      })
    })
  })

  describe('Close Button Positioning', () => {
    it('should position close button absolutely', () => {
      const { container } = render(
        <GlassPanel closeable>Content</GlassPanel>
      )

      const closeButton = container.querySelector('.MuiIconButton-root')
      expect(closeButton).toHaveStyle({
        position: 'absolute',
        top: '8px',
        right: '8px',
      })
    })

    it('should have proper z-index for close button', () => {
      const { container } = render(
        <GlassPanel closeable>Content</GlassPanel>
      )

      const closeButton = container.querySelector('.MuiIconButton-root')
      expect(closeButton).toHaveStyle({ zIndex: '1' })
    })
  })

  describe('Content', () => {
    it('should render complex nested content', () => {
      render(
        <GlassPanel>
          <div>
            <h1>Title</h1>
            <p>Description</p>
            <button>Action</button>
          </div>
        </GlassPanel>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })

    it('should handle multiple children', () => {
      render(
        <GlassPanel>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </GlassPanel>
      )

      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.getByText('Third')).toBeInTheDocument()
    })
  })
})
