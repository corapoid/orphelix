/**
 * Tests for GlassCard Component
 *
 * Tests rendering, props handling, and styling variations
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GlassCard } from '@/lib/ui/components/GlassCard'

describe('GlassCard', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      render(
        <GlassCard>
          <div>Test Content</div>
        </GlassCard>
      )

      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(
        <GlassCard className="custom-class">Content</GlassCard>
      )

      const card = container.querySelector('.custom-class')
      expect(card).toBeInTheDocument()
    })

    it('should render as MUI Card component', () => {
      const { container } = render(<GlassCard>Content</GlassCard>)

      const card = container.querySelector('.MuiCard-root')
      expect(card).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('should apply custom sx prop', () => {
      const { container } = render(
        <GlassCard sx={{ padding: 4, margin: 2 }}>Content</GlassCard>
      )

      const card = container.querySelector('.MuiCard-root')
      expect(card).toHaveStyle({ padding: '32px', margin: '16px' })
    })

    it('should forward all MUI Card props', () => {
      render(
        <GlassCard elevation={8} data-testid="glass-card">
          Content
        </GlassCard>
      )

      const card = screen.getByTestId('glass-card')
      expect(card).toBeInTheDocument()
    })

    it('should handle onClick prop', () => {
      const handleClick = vi.fn()
      render(
        <GlassCard onClick={handleClick} data-testid="clickable-card">
          Clickable Content
        </GlassCard>
      )

      const card = screen.getByTestId('clickable-card')
      fireEvent.click(card)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Interactive Mode', () => {
    it('should apply cursor pointer when interactive', () => {
      const { container } = render(
        <GlassCard interactive>Interactive Content</GlassCard>
      )

      const card = container.querySelector('.MuiCard-root')
      expect(card).toHaveStyle({ cursor: 'pointer' })
    })

    it('should not apply cursor pointer by default', () => {
      const { container } = render(
        <GlassCard>Non-interactive Content</GlassCard>
      )

      const card = container.querySelector('.MuiCard-root')
      expect(card).not.toHaveStyle({ cursor: 'pointer' })
    })

    it('should not apply cursor pointer when interactive is false', () => {
      const { container } = render(
        <GlassCard interactive={false}>Content</GlassCard>
      )

      const card = container.querySelector('.MuiCard-root')
      expect(card).not.toHaveStyle({ cursor: 'pointer' })
    })
  })

  describe('Styling', () => {
    it('should have position relative', () => {
      const { container } = render(<GlassCard>Content</GlassCard>)

      const card = container.querySelector('.MuiCard-root')
      expect(card).toHaveStyle({ position: 'relative' })
    })

    it('should have overflow hidden', () => {
      const { container } = render(<GlassCard>Content</GlassCard>)

      const card = container.querySelector('.MuiCard-root')
      expect(card).toHaveStyle({ overflow: 'hidden' })
    })

    it('should merge custom sx with default styles', () => {
      const { container } = render(
        <GlassCard sx={{ backgroundColor: 'red' }}>
          Content
        </GlassCard>
      )

      const card = container.querySelector('.MuiCard-root')
      expect(card).toHaveStyle({
        position: 'relative',
        overflow: 'hidden',
      })
    })
  })

  describe('Content', () => {
    it('should render multiple children', () => {
      render(
        <GlassCard>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </GlassCard>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })

    it('should render with complex nested content', () => {
      render(
        <GlassCard>
          <div>
            <div>
              <span>Nested Content</span>
            </div>
          </div>
        </GlassCard>
      )

      expect(screen.getByText('Nested Content')).toBeInTheDocument()
    })

    it('should handle empty content', () => {
      const { container } = render(<GlassCard />)

      const card = container.querySelector('.MuiCard-root')
      expect(card).toBeInTheDocument()
      expect(card).toBeEmptyDOMElement()
    })
  })
})
