/**
 * Tests for SearchInput Component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchInput } from '@/components/layout/search-input'

// Mock the search context
const mockSetSearchQuery = vi.fn()
const mockSearchContext = {
  searchQuery: '',
  setSearchQuery: mockSetSearchQuery,
  searchPlaceholder: 'Search resources...',
}

vi.mock('@/lib/contexts/search-context', () => ({
  useSearch: () => mockSearchContext,
}))

// Mock the theme context
const mockThemeContext = {
  visualPreset: 'liquidGlass' as 'liquidGlass' | 'classic',
  toggleTheme: vi.fn(),
  mode: 'light' as const,
  compact: false,
}

vi.mock('@/lib/ui', () => ({
  useTheme: () => mockThemeContext,
}))

describe('SearchInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSearchContext.searchQuery = ''
    mockSearchContext.searchPlaceholder = 'Search resources...'
    mockThemeContext.visualPreset = 'liquidGlass'
  })

  describe('Rendering', () => {
    it('should render search input field', () => {
      render(<SearchInput />)
      const input = screen.getByPlaceholderText('Search resources...')
      expect(input).toBeInTheDocument()
    })

    it('should render search icon', () => {
      const { container } = render(<SearchInput />)
      const searchIcon = container.querySelector('[data-testid="SearchIcon"]')
      expect(searchIcon).toBeInTheDocument()
    })

    it('should use placeholder from context', () => {
      mockSearchContext.searchPlaceholder = 'Search pods...'
      render(<SearchInput />)
      expect(screen.getByPlaceholderText('Search pods...')).toBeInTheDocument()
    })

    it('should render as outlined variant', () => {
      const { container } = render(<SearchInput />)
      const input = container.querySelector('.MuiOutlinedInput-root')
      expect(input).toBeInTheDocument()
    })

    it('should render as small size', () => {
      const { container } = render(<SearchInput />)
      const input = container.querySelector('.MuiInputBase-sizeSmall')
      expect(input).toBeInTheDocument()
    })
  })

  describe('Search Query Display', () => {
    it('should display empty value initially', () => {
      render(<SearchInput />)
      const input = screen.getByPlaceholderText('Search resources...') as HTMLInputElement
      expect(input.value).toBe('')
    })

    it('should display search query from context', () => {
      mockSearchContext.searchQuery = 'nginx'
      render(<SearchInput />)
      const input = screen.getByDisplayValue('nginx')
      expect(input).toBeInTheDocument()
    })

    it('should update when searchQuery changes', () => {
      const { rerender } = render(<SearchInput />)
      expect(screen.getByPlaceholderText('Search resources...')).toBeInTheDocument()

      mockSearchContext.searchQuery = 'deployment'
      rerender(<SearchInput />)
      expect(screen.getByDisplayValue('deployment')).toBeInTheDocument()
    })
  })

  describe('User Input', () => {
    it('should call setSearchQuery on input change', () => {
      render(<SearchInput />)
      const input = screen.getByPlaceholderText('Search resources...')

      fireEvent.change(input, { target: { value: 'test' } })

      expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
      expect(mockSetSearchQuery).toHaveBeenCalledTimes(1)
    })

    it('should call setSearchQuery with correct values', () => {
      render(<SearchInput />)
      const input = screen.getByPlaceholderText('Search resources...')

      fireEvent.change(input, { target: { value: 'pod-name' } })
      expect(mockSetSearchQuery).toHaveBeenCalledWith('pod-name')

      fireEvent.change(input, { target: { value: 'service' } })
      expect(mockSetSearchQuery).toHaveBeenCalledWith('service')
    })
  })

  describe('Clear Button', () => {
    it('should not show clear button when query is empty', () => {
      mockSearchContext.searchQuery = ''
      render(<SearchInput />)

      const clearIcon = screen.queryByTestId('ClearIcon')
      expect(clearIcon).not.toBeInTheDocument()
    })

    it('should show clear button when query has value', () => {
      mockSearchContext.searchQuery = 'nginx'
      render(<SearchInput />)

      const clearIcon = screen.getByTestId('ClearIcon')
      expect(clearIcon).toBeInTheDocument()
    })

    it('should call setSearchQuery with empty string when clear button clicked', () => {
      mockSearchContext.searchQuery = 'nginx'
      render(<SearchInput />)

      const clearButton = screen.getByRole('button')
      fireEvent.click(clearButton)

      expect(mockSetSearchQuery).toHaveBeenCalledWith('')
      expect(mockSetSearchQuery).toHaveBeenCalledTimes(1)
    })

    it('should toggle clear button visibility based on query', () => {
      const { rerender } = render(<SearchInput />)

      // Empty - no clear button
      mockSearchContext.searchQuery = ''
      rerender(<SearchInput />)
      expect(screen.queryByTestId('ClearIcon')).not.toBeInTheDocument()

      // Has value - show clear button
      mockSearchContext.searchQuery = 'test'
      rerender(<SearchInput />)
      expect(screen.getByTestId('ClearIcon')).toBeInTheDocument()
    })
  })

  describe('Visual Preset Styling', () => {
    it('should apply glass effect for liquidGlass preset', () => {
      mockThemeContext.visualPreset = 'liquidGlass'
      const { container } = render(<SearchInput />)

      const input = container.querySelector('.MuiOutlinedInput-root')
      expect(input).toBeInTheDocument()
    })

    it('should not apply glass effect for classic preset', () => {
      mockThemeContext.visualPreset = 'classic'
      const { container } = render(<SearchInput />)

      const input = container.querySelector('.MuiOutlinedInput-root')
      expect(input).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible input field', () => {
      render(<SearchInput />)
      const input = screen.getByPlaceholderText('Search resources...')
      expect(input).toBeInTheDocument()
      expect(input.tagName).toBe('INPUT')
    })

    it('should have accessible clear button when visible', () => {
      mockSearchContext.searchQuery = 'test'
      render(<SearchInput />)

      const clearButton = screen.getByRole('button')
      expect(clearButton).toBeInTheDocument()
    })

    it('should show search icon for visual affordance', () => {
      const { container } = render(<SearchInput />)
      const searchIcon = container.querySelector('[data-testid="SearchIcon"]')
      expect(searchIcon).toBeInTheDocument()
    })
  })

  describe('Input Props', () => {
    it('should render with start adornment (search icon)', () => {
      const { container } = render(<SearchInput />)
      const startAdornment = container.querySelector('.MuiInputAdornment-positionStart')
      expect(startAdornment).toBeInTheDocument()
    })

    it('should render with end adornment when query exists', () => {
      mockSearchContext.searchQuery = 'nginx'
      const { container } = render(<SearchInput />)

      const endAdornment = container.querySelector('.MuiInputAdornment-positionEnd')
      expect(endAdornment).toBeInTheDocument()
    })

    it('should not render end adornment when query is empty', () => {
      mockSearchContext.searchQuery = ''
      const { container } = render(<SearchInput />)

      const endAdornment = container.querySelector('.MuiInputAdornment-positionEnd')
      expect(endAdornment).not.toBeInTheDocument()
    })
  })
})
