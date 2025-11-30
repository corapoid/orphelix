/**
 * Tests for API Key Encryption Module
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { encrypt, decrypt, isEncrypted, encryptApiKey, decryptApiKey } from '@/lib/security/encryption'

describe('Encryption Module', () => {
  beforeAll(() => {
    // Set test encryption key
    process.env.ENCRYPTION_KEY = 'test-encryption-key-32-characters-long'
  })

  describe('encrypt/decrypt', () => {
    it('should encrypt and decrypt a string successfully', async () => {
      const plaintext = 'sk-test-api-key-1234567890'
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should produce different ciphertext for same plaintext (unique IV)', async () => {
      const plaintext = 'sk-test-api-key'
      const encrypted1 = await encrypt(plaintext)
      const encrypted2 = await encrypt(plaintext)

      expect(encrypted1).not.toBe(encrypted2)

      const decrypted1 = await decrypt(encrypted1)
      const decrypted2 = await decrypt(encrypted2)

      expect(decrypted1).toBe(plaintext)
      expect(decrypted2).toBe(plaintext)
    })

    it('should handle long strings', async () => {
      const plaintext = 'a'.repeat(1000)
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should handle special characters', async () => {
      const plaintext = '!@#$%^&*()_+-=[]{}|;:",.<>?/~`'
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should handle unicode characters', async () => {
      const plaintext = 'Hello 世界 🌍'
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should throw error for empty string encryption', async () => {
      await expect(encrypt('')).rejects.toThrow('Cannot encrypt empty string')
    })

    it('should throw error for empty string decryption', async () => {
      await expect(decrypt('')).rejects.toThrow('Cannot decrypt empty string')
    })

    it('should throw error for invalid encrypted data format', async () => {
      await expect(decrypt('invalid-data')).rejects.toThrow('Invalid encrypted data format')
    })

    it('should throw error for tampered encrypted data', async () => {
      const plaintext = 'sk-test-api-key'
      const encrypted = await encrypt(plaintext)
      const tampered = encrypted.substring(0, encrypted.length - 10) + 'XXXXXXXXXX'

      await expect(decrypt(tampered)).rejects.toThrow('Decryption failed')
    })
  })

  describe('isEncrypted', () => {
    it('should detect encrypted strings', async () => {
      const encrypted = await encrypt('test-data')
      expect(isEncrypted(encrypted)).toBe(true)
    })

    it('should return false for non-encrypted strings', () => {
      expect(isEncrypted('sk-test-api-key')).toBe(false)
      expect(isEncrypted('plain text')).toBe(false)
      expect(isEncrypted('random.string.here')).toBe(false)
    })

    it('should return false for invalid formats', () => {
      expect(isEncrypted('')).toBe(false)
      expect(isEncrypted('a.b')).toBe(false)
      expect(isEncrypted('a.b.c')).toBe(false)
      expect(isEncrypted('not base64!.test.test.test')).toBe(false)
    })
  })

  describe('encryptApiKey', () => {
    it('should encrypt unencrypted API key', async () => {
      const apiKey = 'sk-test-api-key'
      const encrypted = await encryptApiKey(apiKey)

      expect(isEncrypted(encrypted)).toBe(true)
      expect(encrypted).not.toBe(apiKey)
    })

    it('should return encrypted key as-is if already encrypted', async () => {
      const apiKey = 'sk-test-api-key'
      const encrypted = await encryptApiKey(apiKey)
      const reEncrypted = await encryptApiKey(encrypted)

      expect(reEncrypted).toBe(encrypted)
    })

    it('should throw error for empty API key', async () => {
      await expect(encryptApiKey('')).rejects.toThrow('API key cannot be empty')
    })
  })

  describe('decryptApiKey', () => {
    it('should decrypt encrypted API key', async () => {
      const apiKey = 'sk-test-api-key'
      const encrypted = await encryptApiKey(apiKey)
      const decrypted = await decryptApiKey(encrypted)

      expect(decrypted).toBe(apiKey)
    })

    it('should return unencrypted key as-is (backward compatibility)', async () => {
      const apiKey = 'sk-test-api-key'
      const decrypted = await decryptApiKey(apiKey)

      expect(decrypted).toBe(apiKey)
    })

    it('should throw error for empty API key', async () => {
      await expect(decryptApiKey('')).rejects.toThrow('API key cannot be empty')
    })
  })

  describe('format validation', () => {
    it('should produce 4-part base64 format', async () => {
      const encrypted = await encrypt('test')
      const parts = encrypted.split('.')

      expect(parts).toHaveLength(4)

      // Each part should be valid base64
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
      parts.forEach(part => {
        expect(part).toMatch(base64Regex)
      })
    })
  })

  describe('security properties', () => {
    it('should use unique salt for each encryption', async () => {
      const plaintext = 'test'
      const encrypted1 = await encrypt(plaintext)
      const encrypted2 = await encrypt(plaintext)

      const salt1 = encrypted1.split('.')[0]
      const salt2 = encrypted2.split('.')[0]

      expect(salt1).not.toBe(salt2)
    })

    it('should use unique IV for each encryption', async () => {
      const plaintext = 'test'
      const encrypted1 = await encrypt(plaintext)
      const encrypted2 = await encrypt(plaintext)

      const iv1 = encrypted1.split('.')[1]
      const iv2 = encrypted2.split('.')[1]

      expect(iv1).not.toBe(iv2)
    })
  })
})
