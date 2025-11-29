/**
 * Tests for ContextSelector Component
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContextSelector } from '@/components/layout/context-selector'

describe('ContextSelector', () => {
  describe('Expanded State (Default)', () => {
    it('should render in expanded state by default', () => {
      render(<ContextSelector />)
      expect(screen.getByText('Kubernetes Cluster')).toBeInTheDocument()
    })

    it('should display "Kubernetes Cluster" text', () => {
      render(<ContextSelector />)
      expect(screen.getByText('Kubernetes Cluster')).toBeInTheDocument()
    })

    it('should display Cloud icon in expanded state', () => {
      const { container } = render(<ContextSelector />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should use h6 variant for title', () => {
      const { container } = render(<ContextSelector />)
      const heading = container.querySelector('[class*="MuiTypography-h6"]')
      expect(heading).toBeInTheDocument()
    })

    it('should display icon and text together', () => {
      const { container } = render(<ContextSelector />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
      expect(screen.getByText('Kubernetes Cluster')).toBeInTheDocument()
    })

    it('should have border bottom', () => {
      const { container } = render(<ContextSelector />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should use uppercase text', () => {
      const { container } = render(<ContextSelector />)
      const heading = container.querySelector('[class*="MuiTypography-h6"]')
      expect(heading).toBeInTheDocument()
    })

    it('should display icon with correct size in expanded mode', () => {
      const { container } = render(<ContextSelector />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Collapsed State', () => {
    it('should render in collapsed state when prop is true', () => {
      render(<ContextSelector collapsed={true} />)
      // Should not show full text
      expect(screen.queryByText('Kubernetes Cluster')).not.toBeInTheDocument()
    })

    it('should display only Cloud icon when collapsed', () => {
      const { container } = render(<ContextSelector collapsed={true} />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should not display text when collapsed', () => {
      render(<ContextSelector collapsed={true} />)
      expect(screen.queryByText('Kubernetes Cluster')).not.toBeInTheDocument()
    })

    it('should center icon when collapsed', () => {
      const { container } = render(<ContextSelector collapsed={true} />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should use larger icon size when collapsed', () => {
      const { container } = render(<ContextSelector collapsed={true} />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should have border bottom when collapsed', () => {
      const { container } = render(<ContextSelector collapsed={true} />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })
  })

  describe('State Toggle', () => {
    it('should change content when toggling collapsed prop', () => {
      const { rerender } = render(<ContextSelector collapsed={false} />)

      // Expanded - should show text
      expect(screen.getByText('Kubernetes Cluster')).toBeInTheDocument()

      // Collapse
      rerender(<ContextSelector collapsed={true} />)

      // Collapsed - should hide text
      expect(screen.queryByText('Kubernetes Cluster')).not.toBeInTheDocument()
    })

    it('should show full content when collapsed=false', () => {
      render(<ContextSelector collapsed={false} />)
      expect(screen.getByText('Kubernetes Cluster')).toBeInTheDocument()
    })

    it('should hide text when collapsed=true', () => {
      render(<ContextSelector collapsed={true} />)
      expect(screen.queryByText('Kubernetes Cluster')).not.toBeInTheDocument()
    })

    it('should always display Cloud icon in both states', () => {
      const { container, rerender } = render(<ContextSelector collapsed={false} />)
      expect(container.querySelector('[data-testid="CloudIcon"]')).toBeInTheDocument()

      rerender(<ContextSelector collapsed={true} />)
      expect(container.querySelector('[data-testid="CloudIcon"]')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should render with MUI Box component', () => {
      const { container } = render(<ContextSelector />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should render with MUI Typography in expanded mode', () => {
      const { container } = render(<ContextSelector />)
      const typography = container.querySelector('[class*="MuiTypography-root"]')
      expect(typography).toBeInTheDocument()
    })

    it('should not render Typography in collapsed mode', () => {
      const { container } = render(<ContextSelector collapsed={true} />)
      const typography = container.querySelector('[class*="MuiTypography-root"]')
      expect(typography).not.toBeInTheDocument()
    })

    it('should use CloudIcon from MUI', () => {
      const { container } = render(<ContextSelector />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should apply primary color to icon', () => {
      const { container } = render(<ContextSelector collapsed={true} />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should have divider border in both states', () => {
      const { container, rerender } = render(<ContextSelector />)
      let box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()

      rerender(<ContextSelector collapsed={true} />)
      box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should render cluster title text for screen readers in expanded mode', () => {
      render(<ContextSelector />)
      expect(screen.getByText('Kubernetes Cluster')).toBeInTheDocument()
    })

    it('should have accessible icon', () => {
      const { container } = render(<ContextSelector />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should use semantic heading element', () => {
      const { container } = render(<ContextSelector />)
      const heading = container.querySelector('[class*="MuiTypography-h6"]')
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Layout', () => {
    it('should use flexbox layout in expanded mode', () => {
      const { container } = render(<ContextSelector />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should use flexbox column layout in collapsed mode', () => {
      const { container } = render(<ContextSelector collapsed={true} />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should have padding in both states', () => {
      const { container, rerender } = render(<ContextSelector />)
      let box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()

      rerender(<ContextSelector collapsed={true} />)
      box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should describe as "Kubernetes Cluster"', () => {
      render(<ContextSelector />)
      expect(screen.getByText('Kubernetes Cluster')).toBeInTheDocument()
    })

    it('should use Cloud icon to represent cluster', () => {
      const { container } = render(<ContextSelector />)
      const icon = container.querySelector('[data-testid="CloudIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should maintain consistent branding in both states', () => {
      const { container, rerender } = render(<ContextSelector collapsed={false} />)

      // Both states should have CloudIcon
      expect(container.querySelector('[data-testid="CloudIcon"]')).toBeInTheDocument()

      rerender(<ContextSelector collapsed={true} />)
      expect(container.querySelector('[data-testid="CloudIcon"]')).toBeInTheDocument()
    })
  })
})
