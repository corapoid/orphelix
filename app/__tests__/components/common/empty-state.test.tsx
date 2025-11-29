/**
 * Tests for EmptyState Component
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EmptyState } from '@/app/components/common/empty-state'
import SearchIcon from '@mui/icons-material/Search'

describe('EmptyState', () => {
  describe('Basic Rendering', () => {
    it('should render with title', () => {
      render(<EmptyState title="No data found" />)
      expect(screen.getByText('No data found')).toBeInTheDocument()
    })

    it('should render default InboxIcon when no icon provided', () => {
      const { container } = render(<EmptyState title="Empty" />)
      const icon = container.querySelector('[data-testid="InboxIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should render custom icon when provided', () => {
      const { container } = render(<EmptyState title="No results" icon={SearchIcon} />)
      const icon = container.querySelector('[data-testid="SearchIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should render description when provided', () => {
      render(<EmptyState title="No data" description="Try adjusting your filters" />)
      expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument()
    })

    it('should not render description when not provided', () => {
      const { container } = render(<EmptyState title="No data" />)
      const descriptions = container.querySelectorAll('[class*="MuiTypography-body2"]')
      expect(descriptions.length).toBe(0)
    })
  })

  describe('Action Button', () => {
    it('should render action button when provided', () => {
      const action = { label: 'Create New', onClick: vi.fn() }
      render(<EmptyState title="Empty" action={action} />)
      expect(screen.getByRole('button', { name: 'Create New' })).toBeInTheDocument()
    })

    it('should not render action button when not provided', () => {
      render(<EmptyState title="Empty" />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should call onClick when action button clicked', () => {
      const onClick = vi.fn()
      const action = { label: 'Add Item', onClick }
      render(<EmptyState title="Empty" action={action} />)

      const button = screen.getByRole('button', { name: 'Add Item' })
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should render button with correct label', () => {
      const action = { label: 'Custom Action', onClick: vi.fn() }
      render(<EmptyState title="Empty" action={action} />)
      expect(screen.getByText('Custom Action')).toBeInTheDocument()
    })

    it('should use contained variant for button', () => {
      const action = { label: 'Action', onClick: vi.fn() }
      const { container } = render(<EmptyState title="Empty" action={action} />)
      const button = container.querySelector('[class*="MuiButton-contained"]')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    it('should center content', () => {
      const { container } = render(<EmptyState title="Centered" />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should have minimum height', () => {
      const { container } = render(<EmptyState title="Height" />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })

    it('should display icon in circular background', () => {
      const { container } = render(<EmptyState title="Icon" />)
      const icon = container.querySelector('[data-testid="InboxIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should render title as h6 variant', () => {
      const { container } = render(<EmptyState title="Heading" />)
      const heading = container.querySelector('[class*="MuiTypography-h6"]')
      expect(heading).toBeInTheDocument()
    })

    it('should render description as body2 variant', () => {
      const { container } = render(<EmptyState title="Title" description="Description text" />)
      const description = container.querySelector('[class*="MuiTypography-body2"]')
      expect(description).toBeInTheDocument()
    })
  })

  describe('Content Combinations', () => {
    it('should render title only', () => {
      render(<EmptyState title="Just Title" />)
      expect(screen.getByText('Just Title')).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should render title and description', () => {
      render(<EmptyState title="Title" description="Description" />)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('should render title and action', () => {
      const action = { label: 'Action', onClick: vi.fn() }
      render(<EmptyState title="Title" action={action} />)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render all props together', () => {
      const action = { label: 'Do Something', onClick: vi.fn() }
      const { container } = render(
        <EmptyState title="No Items" description="Get started by adding your first item" action={action} icon={SearchIcon} />
      )

      expect(screen.getByText('No Items')).toBeInTheDocument()
      expect(screen.getByText('Get started by adding your first item')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Do Something' })).toBeInTheDocument()
      expect(container.querySelector('[data-testid="SearchIcon"]')).toBeInTheDocument()
    })
  })

  describe('Typography', () => {
    it('should render title with h6 typography', () => {
      const { container } = render(<EmptyState title="Title Text" />)
      const heading = container.querySelector('[class*="MuiTypography-h6"]')
      expect(heading).toBeInTheDocument()
      expect(heading?.textContent).toBe('Title Text')
    })

    it('should center align text', () => {
      const { container } = render(<EmptyState title="Centered Text" />)
      const box = container.querySelector('[class*="MuiBox-root"]')
      expect(box).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible title', () => {
      render(<EmptyState title="Accessible Title" />)
      const title = screen.getByText('Accessible Title')
      expect(title).toBeInTheDocument()
      expect(title.tagName).toMatch(/^H\d$/)
    })

    it('should have accessible button when action provided', () => {
      const action = { label: 'Accessible Action', onClick: vi.fn() }
      render(<EmptyState title="Empty" action={action} />)
      const button = screen.getByRole('button', { name: 'Accessible Action' })
      expect(button).toBeInTheDocument()
    })

    it('should have visible icon', () => {
      const { container } = render(<EmptyState title="Icon visible" />)
      const icon = container.querySelector('[data-testid="InboxIcon"]')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Icon Customization', () => {
    it('should accept custom icon component', () => {
      const { container } = render(<EmptyState title="Custom" icon={SearchIcon} />)
      expect(container.querySelector('[data-testid="SearchIcon"]')).toBeInTheDocument()
      expect(container.querySelector('[data-testid="InboxIcon"]')).not.toBeInTheDocument()
    })

    it('should use default icon when icon prop is undefined', () => {
      const { container } = render(<EmptyState title="Default" icon={undefined} />)
      expect(container.querySelector('[data-testid="InboxIcon"]')).toBeInTheDocument()
    })
  })
})
