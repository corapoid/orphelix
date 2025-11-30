/**
 * API Key Encryption Module
 *
 * Provides secure encryption/decryption for sensitive API keys using AES-256-GCM.
 * Keys are encrypted before storage and decrypted only when needed.
 *
 * @module lib/security/encryption
 */

import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

/**
 * Encryption algorithm configuration
 */
const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32 // 256 bits
const IV_LENGTH = 16 // 128 bits
const SALT_LENGTH = 32
const AUTH_TAG_LENGTH = 16

/**
 * Get or generate encryption key
 * In production, this should come from environment variable
 */
function getEncryptionPassword(): string {
  const password = process.env.ENCRYPTION_KEY

  if (!password) {
    // In development, use a default key (NOT for production!)
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'ENCRYPTION_KEY environment variable must be set in production. ' +
        'Generate one using: openssl rand -base64 32'
      )
    }
    return 'dev-encryption-key-change-in-production'
  }

  return password
}

/**
 * Derive a key from password using scrypt
 */
async function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  return (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer
}

/**
 * Encrypt a string (e.g., API key)
 *
 * @param plaintext - The text to encrypt
 * @returns Encrypted string in format: salt.iv.authTag.ciphertext (all base64)
 */
export async function encrypt(plaintext: string): Promise<string> {
  if (!plaintext || plaintext.trim() === '') {
    throw new Error('Cannot encrypt empty string')
  }

  const password = getEncryptionPassword()

  // Generate random salt and IV
  const salt = randomBytes(SALT_LENGTH)
  const iv = randomBytes(IV_LENGTH)

  // Derive encryption key from password
  const key = await deriveKey(password, salt)

  // Create cipher
  const cipher = createCipheriv(ALGORITHM, key, iv)

  // Encrypt the plaintext
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])

  // Get authentication tag
  const authTag = cipher.getAuthTag()

  // Return: salt.iv.authTag.ciphertext (all base64 encoded)
  return [
    salt.toString('base64'),
    iv.toString('base64'),
    authTag.toString('base64'),
    encrypted.toString('base64'),
  ].join('.')
}

/**
 * Decrypt an encrypted string
 *
 * @param encryptedData - The encrypted string (format: salt.iv.authTag.ciphertext)
 * @returns Decrypted plaintext
 */
export async function decrypt(encryptedData: string): Promise<string> {
  if (!encryptedData || encryptedData.trim() === '') {
    throw new Error('Cannot decrypt empty string')
  }

  try {
    const password = getEncryptionPassword()

    // Parse the encrypted data
    const parts = encryptedData.split('.')
    if (parts.length !== 4) {
      throw new Error('Invalid encrypted data format')
    }

    const [saltB64, ivB64, authTagB64, encryptedB64] = parts

    const salt = Buffer.from(saltB64, 'base64')
    const iv = Buffer.from(ivB64, 'base64')
    const authTag = Buffer.from(authTagB64, 'base64')
    const encrypted = Buffer.from(encryptedB64, 'base64')

    // Validate buffer lengths
    if (salt.length !== SALT_LENGTH) {
      throw new Error('Invalid salt length')
    }
    if (iv.length !== IV_LENGTH) {
      throw new Error('Invalid IV length')
    }
    if (authTag.length !== AUTH_TAG_LENGTH) {
      throw new Error('Invalid auth tag length')
    }

    // Derive decryption key
    const key = await deriveKey(password, salt)

    // Create decipher
    const decipher = createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)

    // Decrypt
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ])

    return decrypted.toString('utf8')
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Decryption failed: ${error.message}`)
    }
    throw new Error('Decryption failed: Unknown error')
  }
}

/**
 * Check if a string is encrypted (basic format check)
 */
export function isEncrypted(data: string): boolean {
  if (!data || typeof data !== 'string') {
    return false
  }

  // Check if it has the correct format (4 base64 parts separated by dots)
  const parts = data.split('.')
  if (parts.length !== 4) {
    return false
  }

  // Verify each part is valid base64
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
  return parts.every(part => base64Regex.test(part))
}

/**
 * Encrypt API key if not already encrypted
 */
export async function encryptApiKey(apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error('API key cannot be empty')
  }

  // If already encrypted, return as-is
  if (isEncrypted(apiKey)) {
    return apiKey
  }

  return encrypt(apiKey)
}

/**
 * Decrypt API key if encrypted, otherwise return as-is
 */
export async function decryptApiKey(apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error('API key cannot be empty')
  }

  // If not encrypted, return as-is (for backward compatibility)
  if (!isEncrypted(apiKey)) {
    return apiKey
  }

  return decrypt(apiKey)
}

/**
 * Securely clear a string from memory (best effort)
 * Note: JavaScript doesn't provide guaranteed memory clearing,
 * but this is a best-effort approach for sensitive data.
 */
export function clearString(_str: string): void {
  // JavaScript strings are immutable, so we can't actually clear them
  // This function is provided for API compatibility and documentation purposes
  // In JavaScript, the best practice is to let garbage collection handle cleanup
  // and avoid keeping references to sensitive data longer than necessary
}
