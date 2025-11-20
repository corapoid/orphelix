import { describe, it, expect } from 'vitest'

describe('Landing Page Tests', () => {
  describe('Server Health', () => {
    it('server should be running on port 3001', async () => {
      try {
        const response = await fetch('http://localhost:3001')
        expect(response.status).toBe(200)
      } catch (error) {
        throw new Error('Server is not running on port 3001')
      }
    })

    it('should return HTML content', async () => {
      const response = await fetch('http://localhost:3001')
      const contentType = response.headers.get('content-type')
      expect(contentType).toContain('text/html')
    })
  })

  describe('Page Content', () => {
    it('should contain Orphelix branding', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('Orphelix')
    })

    it('should contain main heading', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('Modern Kubernetes Dashboard')
    })

    it('should contain GitOps workflow description', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('Beautiful GitOps workflow')
    })
  })

  describe('Theme Support', () => {
    it('should load theme provider', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('theme-provider')
    })

    it('should load theme toggle component', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('theme-toggle')
    })

    it('should have gradient background', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('gradient-bg')
    })
  })

  describe('Components Loading', () => {
    it('should load hero component', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('hero')
    })

    it('should load features component', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('features')
    })
  })

  describe('Build Artifacts', () => {
    it('should bundle theme provider chunk', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('components_theme-provider')
    })

    it('should bundle components chunk', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('components_')
    })

    it('should bundle page chunk', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('app_page')
    })
  })

  describe('Metadata', () => {
    it('should have correct title', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('<title>Orphelix - Modern Kubernetes Dashboard</title>')
    })

    it('should have description meta tag', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('Beautiful GitOps workflow for Kubernetes')
    })

    it('should have viewport meta tag', async () => {
      const response = await fetch('http://localhost:3001')
      const html = await response.text()
      expect(html).toContain('viewport')
    })
  })
})
