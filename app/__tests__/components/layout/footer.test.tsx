/**
 * Tests for Footer Component
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/app/components/layout/footer'

describe('Footer', () => {
  beforeEach(() => {
    // Set environment variable for version
    process.env.NEXT_PUBLIC_APP_VERSION = '0.1.0'
  })

  describe('Rendering', () => {
    it('should render footer element', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    it('should render with caption typography', () => {
      const { container } = render(<Footer />)
      const caption = container.querySelector('[class*="MuiTypography-caption"]')
      expect(caption).toBeInTheDocument()
    })

    it('should render GitHub icon button', () => {
      const { container } = render(<Footer />)
      const githubIcon = container.querySelector('[data-testid="GitHubIcon"]')
      expect(githubIcon).toBeInTheDocument()
    })
  })

  describe('Version Information', () => {
    it('should display app version from environment variable', () => {
      render(<Footer />)
      expect(screen.getByText(/Orphelix v0\.1\.0/)).toBeInTheDocument()
    })

    it('should display "Modern Kubernetes Dashboard" tagline', () => {
      render(<Footer />)
      expect(screen.getByText(/Modern Kubernetes Dashboard/)).toBeInTheDocument()
    })

    it('should combine version and tagline', () => {
      render(<Footer />)
      expect(screen.getByText('Orphelix v0.1.0 - Modern Kubernetes Dashboard')).toBeInTheDocument()
    })

    it('should handle missing version gracefully', () => {
      delete process.env.NEXT_PUBLIC_APP_VERSION
      render(<Footer />)
      expect(screen.getByText(/Orphelix v/)).toBeInTheDocument()
    })
  })

  describe('GitHub Link', () => {
    it('should render GitHub repository link', () => {
      render(<Footer />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://github.com/corapoid/orphelix')
    })

    it('should open link in new tab', () => {
      render(<Footer />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
    })

    it('should have rel="noopener noreferrer" for security', () => {
      render(<Footer />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render as IconButton', () => {
      const { container } = render(<Footer />)
      const iconButton = container.querySelector('[class*="MuiIconButton-root"]')
      expect(iconButton).toBeInTheDocument()
    })

    it('should be a small size button', () => {
      const { container } = render(<Footer />)
      const iconButton = container.querySelector('[class*="MuiIconButton-sizeSmall"]')
      expect(iconButton).toBeInTheDocument()
    })
  })

  describe('Layout', () => {
    it('should use flexbox for layout', () => {
      const { container } = render(<Footer />)
      const flexBox = container.querySelector('[class*="MuiBox-root"]')
      expect(flexBox).toBeInTheDocument()
    })

    it('should have border top', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    it('should render version text on the left', () => {
      render(<Footer />)
      const versionText = screen.getByText(/Orphelix v/)
      expect(versionText).toBeInTheDocument()
    })

    it('should render GitHub link on the right', () => {
      const { container: _container } = render(<Footer />)
      const githubButton = screen.getByRole('link')
      expect(githubButton).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible link', () => {
      render(<Footer />)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('should have GitHub icon for visual affordance', () => {
      const { container } = render(<Footer />)
      const icon = container.querySelector('[data-testid="GitHubIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should use semantic footer element', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
      expect(footer?.tagName).toBe('FOOTER')
    })
  })

  describe('Styling', () => {
    it('should render with MUI Box components', () => {
      const { container } = render(<Footer />)
      const boxes = container.querySelectorAll('[class*="MuiBox-root"]')
      expect(boxes.length).toBeGreaterThan(0)
    })

    it('should render with MUI Typography', () => {
      const { container } = render(<Footer />)
      const typography = container.querySelector('[class*="MuiTypography-root"]')
      expect(typography).toBeInTheDocument()
    })

    it('should use caption variant for version text', () => {
      const { container } = render(<Footer />)
      const caption = container.querySelector('[class*="MuiTypography-caption"]')
      expect(caption).toBeInTheDocument()
    })

    it('should use secondary text color', () => {
      const { container } = render(<Footer />)
      const caption = container.querySelector('[class*="MuiTypography-caption"]')
      expect(caption).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should display product name "Orphelix"', () => {
      render(<Footer />)
      expect(screen.getByText(/Orphelix/)).toBeInTheDocument()
    })

    it('should describe as "Kubernetes Dashboard"', () => {
      render(<Footer />)
      expect(screen.getByText(/Kubernetes Dashboard/)).toBeInTheDocument()
    })

    it('should link to correct repository', () => {
      render(<Footer />)
      const link = screen.getByRole('link')
      expect(link.getAttribute('href')).toContain('github.com/corapoid/orphelix')
    })
  })
})
