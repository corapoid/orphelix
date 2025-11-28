/**
 * Tests for Validation Schemas
 */

import { describe, it, expect } from 'vitest'
import {
  k8sNameSchema,
  namespaceSchema,
  k8sResourceDetailSchema,
  k8sClusterResourceSchema,
  githubOwnerSchema,
  githubRepoNameSchema,
  githubBranchSchema,
  yamlContentSchema,
} from '@/lib/validation/schemas'

describe('Validation Schemas', () => {
  describe('k8sNameSchema', () => {
    it('should accept valid DNS-1123 names', () => {
      const validNames = [
        'my-deployment',
        'nginx-prod',
        'web-app-123',
        'service-v2',
        'app',
        '123-numbers-first',
      ]

      validNames.forEach(name => {
        expect(() => k8sNameSchema.parse(name)).not.toThrow()
      })
    })

    it('should reject invalid DNS-1123 names', () => {
      const invalidNames = [
        'MyDeployment', // uppercase
        'my_deployment', // underscore
        'app@service', // special char
        'my..app', // consecutive dots
        '.startswith-dot',
        'endswith-dot.',
        '-startswith-dash',
        'endswith-dash-',
        'a'.repeat(254), // too long
      ]

      invalidNames.forEach(name => {
        expect(() => k8sNameSchema.parse(name)).toThrow()
      })
    })

    it('should reject empty names', () => {
      expect(() => k8sNameSchema.parse('')).toThrow()
    })

    it('should enforce max length of 253 characters', () => {
      const valid253 = 'a'.repeat(253)
      const invalid254 = 'a'.repeat(254)

      expect(() => k8sNameSchema.parse(valid253)).not.toThrow()
      expect(() => k8sNameSchema.parse(invalid254)).toThrow()
    })
  })

  describe('namespaceSchema', () => {
    it('should accept valid namespace names', () => {
      const validNamespaces = [
        'default',
        'kube-system',
        'my-namespace',
        'prod-environment',
      ]

      validNamespaces.forEach(ns => {
        expect(() => namespaceSchema.parse(ns)).not.toThrow()
      })
    })

    it('should reject invalid namespace names', () => {
      const invalidNamespaces = [
        '',
        'My-Namespace',
        'namespace_name',
        'namespace@123',
      ]

      invalidNamespaces.forEach(ns => {
        expect(() => namespaceSchema.parse(ns)).toThrow()
      })
    })
  })

  describe('k8sResourceDetailSchema', () => {
    it('should accept valid resource detail', () => {
      const validData = {
        name: 'my-deployment',
        namespace: 'production',
      }

      const result = k8sResourceDetailSchema.parse(validData)
      expect(result.name).toBe('my-deployment')
      expect(result.namespace).toBe('production')
    })

    it('should use default namespace if not provided', () => {
      const data = {
        name: 'my-deployment',
      }

      const result = k8sResourceDetailSchema.parse(data)
      expect(result.namespace).toBe('default')
    })

    it('should reject invalid resource names', () => {
      const invalidData = {
        name: 'Invalid_Name',
        namespace: 'production',
      }

      expect(() => k8sResourceDetailSchema.parse(invalidData)).toThrow()
    })

    it('should reject invalid namespace', () => {
      const invalidData = {
        name: 'my-deployment',
        namespace: 'Invalid_Namespace',
      }

      expect(() => k8sResourceDetailSchema.parse(invalidData)).toThrow()
    })
  })

  describe('k8sClusterResourceSchema', () => {
    it('should accept valid cluster resource', () => {
      const validData = {
        name: 'node-01',
      }

      const result = k8sClusterResourceSchema.parse(validData)
      expect(result.name).toBe('node-01')
    })

    it('should reject invalid name', () => {
      const invalidData = {
        name: 'Invalid_Node_Name',
      }

      expect(() => k8sClusterResourceSchema.parse(invalidData)).toThrow()
    })
  })

  describe('githubOwnerSchema', () => {
    it('should accept valid GitHub usernames', () => {
      const validOwners = [
        'octocat',
        'my-org',
        'user123',
        'a',
        'a' + '-'.repeat(37), // 39 chars (max)
      ]

      validOwners.forEach(owner => {
        expect(() => githubOwnerSchema.parse(owner)).not.toThrow()
      })
    })

    it('should reject invalid GitHub usernames', () => {
      const invalidOwners = [
        '',
        '-startswith-dash',
        'endswith-dash-',
        'double--dash',
        'a'.repeat(40), // too long
        'user@name',
        'user name',
      ]

      invalidOwners.forEach(owner => {
        expect(() => githubOwnerSchema.parse(owner)).toThrow()
      })
    })
  })

  describe('githubRepoNameSchema', () => {
    it('should accept valid repository names', () => {
      const validRepos = [
        'my-repo',
        'repo_name',
        'repo.name',
        'Repo123',
        'a',
        'a'.repeat(100),
      ]

      validRepos.forEach(repo => {
        expect(() => githubRepoNameSchema.parse(repo)).not.toThrow()
      })
    })

    it('should reject invalid repository names', () => {
      const invalidRepos = [
        '',
        'a'.repeat(101), // too long
        '.startswith-dot',
        'endswith-dot.',
      ]

      invalidRepos.forEach(repo => {
        expect(() => githubRepoNameSchema.parse(repo)).toThrow()
      })
    })
  })

  describe('githubBranchSchema', () => {
    it('should accept valid branch names', () => {
      const validBranches = [
        'main',
        'develop',
        'feature/my-feature',
        'hotfix/bug-123',
        'release/v1.0.0',
        'user/john/feature',
      ]

      validBranches.forEach(branch => {
        expect(() => githubBranchSchema.parse(branch)).not.toThrow()
      })
    })

    it('should reject empty branch names', () => {
      expect(() => githubBranchSchema.parse('')).toThrow()
    })
  })

  describe('yamlContentSchema', () => {
    it('should accept valid YAML content', () => {
      const validYaml = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
      `.trim()

      expect(() => yamlContentSchema.parse(validYaml)).not.toThrow()
    })

    it('should reject empty YAML', () => {
      expect(() => yamlContentSchema.parse('')).toThrow()
    })

    it('should accept YAML with special characters', () => {
      const yamlWithSpecialChars = `
apiVersion: v1
data:
  config: |
    server {
      listen 80;
      location / {
        proxy_pass http://backend;
      }
    }
      `.trim()

      expect(() => yamlContentSchema.parse(yamlWithSpecialChars)).not.toThrow()
    })
  })

  describe('edge cases', () => {
    it('should handle undefined values', () => {
      expect(() => k8sNameSchema.parse(undefined)).toThrow()
      expect(() => namespaceSchema.parse(undefined)).toThrow()
    })

    it('should handle null values', () => {
      expect(() => k8sNameSchema.parse(null)).toThrow()
      expect(() => namespaceSchema.parse(null)).toThrow()
    })

    it('should handle number inputs', () => {
      expect(() => k8sNameSchema.parse(123)).toThrow()
    })

    it('should handle object inputs', () => {
      expect(() => k8sNameSchema.parse({})).toThrow()
    })

    it('should handle array inputs', () => {
      expect(() => k8sNameSchema.parse([])).toThrow()
    })
  })

  describe('whitespace handling', () => {
    it('should trim leading/trailing whitespace in k8sNameSchema', () => {
      const result = k8sNameSchema.parse('  my-deployment  ')
      expect(result).toBe('my-deployment')
    })

    it('should trim whitespace in namespaceSchema', () => {
      const result = namespaceSchema.parse('  production  ')
      expect(result).toBe('production')
    })

    it('should reject names that are only whitespace', () => {
      expect(() => k8sNameSchema.parse('   ')).toThrow()
      expect(() => namespaceSchema.parse('   ')).toThrow()
    })
  })
})
