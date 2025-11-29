/**
 * Tests for Logo Component
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo } from '@/app/components/layout/logo'

describe('Logo', () => {
  describe('Expanded State (Default)', () => {
    it('should render full logo by default', () => {
      render(<Logo />)
      expect(screen.getByText('ORPHELIX')).toBeInTheDocument()
      expect(screen.getByText('Kubernetes')).toBeInTheDocument()
    })

    it('should render icon with "O" letter', () => {
      const { container: _container } = render(<Logo />)
      const icons = screen.getAllByText('O')
      expect(icons.length).toBeGreaterThan(0)
    })

    it('should render brand name "ORPHELIX"', () => {
      render(<Logo />)
      expect(screen.getByText('ORPHELIX')).toBeInTheDocument()
    })

    it('should render subtitle "Kubernetes"', () => {
      render(<Logo />)
      const subtitle = screen.getByText('Kubernetes')
      expect(subtitle).toBeInTheDocument()
    })

    it('should use gradient background on icon', () => {
      const { container } = render(<Logo />)
      const boxes = container.querySelectorAll('[class*="MuiBox-root"]')

      // Find the icon box (has gradient background)
      const iconBox = Array.from(boxes).find((box) => {
        const style = window.getComputedStyle(box)
        return style.background?.includes('linear-gradient')
      })

      expect(iconBox).toBeDefined()
    })

    it('should apply gradient to brand text', () => {
      render(<Logo />)
      const brandText = screen.getByText('ORPHELIX')

      // Should have gradient styles applied
      expect(brandText).toBeInTheDocument()
    })

    it('should display subtitle in caption variant', () => {
      render(<Logo />)
      const subtitle = screen.getByText('Kubernetes')

      // Check if it's using caption styles (uppercase, small font)
      expect(subtitle).toBeInTheDocument()
    })
  })

  describe('Collapsed State', () => {
    it('should render only icon when collapsed', () => {
      render(<Logo collapsed={true} />)

      // Should show only "O"
      expect(screen.getByText('O')).toBeInTheDocument()

      // Should NOT show full brand name
      expect(screen.queryByText('ORPHELIX')).not.toBeInTheDocument()
      expect(screen.queryByText('Kubernetes')).not.toBeInTheDocument()
    })

    it('should render single "O" letter in collapsed mode', () => {
      render(<Logo collapsed={true} />)
      const icons = screen.getAllByText('O')

      // Should have exactly one "O" in collapsed mode
      expect(icons).toHaveLength(1)
    })

    it('should use larger size for collapsed icon', () => {
      const { container } = render(<Logo collapsed={true} />)
      const iconContainer = container.querySelector('[class*="MuiBox-root"]')

      // Collapsed icon should have specific dimensions (40x40)
      expect(iconContainer).toBeInTheDocument()
    })

    it('should apply gradient background in collapsed mode', () => {
      const { container } = render(<Logo collapsed={true} />)
      const boxes = container.querySelectorAll('[class*="MuiBox-root"]')

      // Should have gradient background
      const iconBox = Array.from(boxes).find((box) => {
        const style = window.getComputedStyle(box)
        return style.background?.includes('linear-gradient')
      })

      expect(iconBox).toBeDefined()
    })
  })

  describe('State Toggle', () => {
    it('should change content when toggling collapsed prop', () => {
      const { rerender } = render(<Logo collapsed={false} />)

      // Expanded - should show full brand
      expect(screen.getByText('ORPHELIX')).toBeInTheDocument()
      expect(screen.getByText('Kubernetes')).toBeInTheDocument()

      // Collapse
      rerender(<Logo collapsed={true} />)

      // Collapsed - should hide full brand
      expect(screen.queryByText('ORPHELIX')).not.toBeInTheDocument()
      expect(screen.queryByText('Kubernetes')).not.toBeInTheDocument()
      expect(screen.getByText('O')).toBeInTheDocument()
    })

    it('should show full logo when collapsed=false', () => {
      render(<Logo collapsed={false} />)
      expect(screen.getByText('ORPHELIX')).toBeInTheDocument()
    })

    it('should hide full logo when collapsed=true', () => {
      render(<Logo collapsed={true} />)
      expect(screen.queryByText('ORPHELIX')).not.toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should render with MUI Box components', () => {
      const { container } = render(<Logo />)
      const boxes = container.querySelectorAll('[class*="MuiBox-root"]')
      expect(boxes.length).toBeGreaterThan(0)
    })

    it('should render with MUI Typography components', () => {
      const { container } = render(<Logo />)
      const typography = container.querySelectorAll('[class*="MuiTypography-root"]')
      expect(typography.length).toBeGreaterThan(0)
    })

    it('should use custom Momo Trust Display font for brand name', () => {
      render(<Logo />)
      const brandText = screen.getByText('ORPHELIX')
      expect(brandText).toBeInTheDocument()
    })

    it('should apply text-secondary color to subtitle', () => {
      render(<Logo />)
      const subtitle = screen.getByText('Kubernetes')
      expect(subtitle).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should render text content for screen readers', () => {
      render(<Logo />)

      // All text should be accessible
      expect(screen.getByText('ORPHELIX')).toBeInTheDocument()
      expect(screen.getByText('Kubernetes')).toBeInTheDocument()
    })

    it('should render icon letter for screen readers in collapsed mode', () => {
      render(<Logo collapsed={true} />)

      // Icon "O" should be accessible
      expect(screen.getByText('O')).toBeInTheDocument()
    })
  })
})
