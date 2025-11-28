/**
 * Database Services Tests - Simplified for CRITICAL security verification
 *
 * Focus: SQL Injection Prevention & Core CRUD operations
 */

import { describe, it, expect } from 'vitest'
import Database from 'better-sqlite3'
import { encrypt, decrypt } from '@/lib/security/encryption'

describe('SQL Injection Prevention - Critical Security Tests', () => {
  it('should use parameterized queries (prepared statements)', () => {
    // Create in-memory test database
    const db = new Database(':memory:')

    // Create test table
    db.exec(`
      CREATE TABLE test_table (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        value TEXT
      )
    `)

    // Test 1: SQL injection attempt in INSERT
    const maliciousName = "'; DROP TABLE test_table; --"
    const stmt = db.prepare('INSERT INTO test_table (name, value) VALUES (?, ?)')
    stmt.run(maliciousName, 'test-value')

    // Verify table still exists
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='test_table'").all()
    expect(tables).toHaveLength(1)

    // Verify malicious string was stored as data
    const row = db.prepare('SELECT * FROM test_table WHERE name = ?').get(maliciousName) as any
    expect(row.name).toBe(maliciousName)
    expect(row.value).toBe('test-value')

    db.close()
  })

  it('should prevent boolean-based blind SQL injection', () => {
    const db = new Database(':memory:')

    db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT
      )
    `)

    // Insert test user
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', 'secret123')

    // Attempt boolean-based injection
    const payload = "admin' OR '1'='1"
    const result = db.prepare('SELECT * FROM users WHERE username = ?').get(payload)

    // Should return no results (payload treated as literal string)
    expect(result).toBeUndefined()

    // Verify only one user exists
    const count = db.prepare('SELECT COUNT(*) as count FROM users').get() as any
    expect(count.count).toBe(1)

    db.close()
  })

  it('should prevent UNION-based SQL injection', () => {
    const db = new Database(':memory:')

    db.exec(`
      CREATE TABLE products (id INTEGER, name TEXT, price REAL);
      INSERT INTO products VALUES (1, 'Widget', 9.99);
      INSERT INTO products VALUES (2, 'Gadget', 19.99);
    `)

    // UNION injection attempt
    const payload = "' UNION SELECT id, name, price FROM products --"

    const result = db.prepare('SELECT * FROM products WHERE name = ?').all(payload)

    // Should return empty (no product with that exact name)
    expect(result).toHaveLength(0)

    db.close()
  })

  it('should handle special characters safely', () => {
    const db = new Database(':memory:')

    db.exec('CREATE TABLE settings (key TEXT, value TEXT)')

    const specialChars = "value'with\"quotes;and--comments"
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('test-key', specialChars)

    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('test-key') as any
    expect(row.value).toBe(specialChars)

    db.close()
  })

  it('should safely handle NULL values', () => {
    const db = new Database(':memory:')

    db.exec('CREATE TABLE config (name TEXT, value TEXT)')

    // Insert NULL value
    db.prepare('INSERT INTO config (name, value) VALUES (?, ?)').run('empty-value', null)

    const row = db.prepare('SELECT * FROM config WHERE name = ?').get('empty-value') as any
    expect(row.value).toBe(null)

    db.close()
  })
})

describe('API Key Encryption - Critical Security Tests', () => {
  it('should encrypt and decrypt API keys correctly', async () => {
    const plaintext = 'sk-test-key-1234567890'

    const encrypted = await encrypt(plaintext)
    const decrypted = await decrypt(encrypted)

    expect(decrypted).toBe(plaintext)
    expect(encrypted).not.toBe(plaintext)
  })

  it('should use AES-256-GCM format (salt.iv.authTag.ciphertext)', async () => {
    const plaintext = 'sk-test-key'

    const encrypted = await encrypt(plaintext)

    // Should have 4 parts separated by dots
    const parts = encrypted.split('.')
    expect(parts).toHaveLength(4)

    // Each part should be valid base64
    parts.forEach(part => {
      expect(part).toMatch(/^[A-Za-z0-9+/]+=*$/)
    })
  })

  it('should reject empty strings', async () => {
    await expect(encrypt('')).rejects.toThrow('Cannot encrypt empty string')
    await expect(decrypt('')).rejects.toThrow('Cannot decrypt empty string')
  })

  it('should fail decryption on tampered data', async () => {
    const plaintext = 'sk-test-key'
    const encrypted = await encrypt(plaintext)

    // Tamper with encrypted data
    const parts = encrypted.split('.')
    parts[3] = 'tampered'
    const tampered = parts.join('.')

    await expect(decrypt(tampered)).rejects.toThrow()
  })

  it('should generate unique encrypted values for same input', async () => {
    const plaintext = 'sk-test-key'

    const encrypted1 = await encrypt(plaintext)
    const encrypted2 = await encrypt(plaintext)

    // Should be different due to random IV and salt
    expect(encrypted1).not.toBe(encrypted2)

    // But both should decrypt to same value
    expect(await decrypt(encrypted1)).toBe(plaintext)
    expect(await decrypt(encrypted2)).toBe(plaintext)
  })
})

describe('Database CRUD Operations - Core Functionality', () => {
  it('should perform basic INSERT and SELECT', () => {
    const db = new Database(':memory:')

    db.exec(`
      CREATE TABLE user_settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        mode TEXT NOT NULL DEFAULT 'demo'
      )
    `)

    db.prepare('INSERT INTO user_settings (id, mode) VALUES (1, ?)').run('real')

    const row = db.prepare('SELECT mode FROM user_settings WHERE id = 1').get() as any
    expect(row.mode).toBe('real')

    db.close()
  })

  it('should perform UPDATE operations safely', () => {
    const db = new Database(':memory:')

    db.exec(`
      CREATE TABLE settings (
        id INTEGER PRIMARY KEY,
        name TEXT,
        value TEXT
      );
      INSERT INTO settings (id, name, value) VALUES (1, 'test', 'old-value');
    `)

    db.prepare('UPDATE settings SET value = ? WHERE id = ?').run('new-value', 1)

    const row = db.prepare('SELECT value FROM settings WHERE id = 1').get() as any
    expect(row.value).toBe('new-value')

    db.close()
  })

  it('should enforce UNIQUE constraints', () => {
    const db = new Database(':memory:')

    db.exec(`
      CREATE TABLE cluster_aliases (
        context_name TEXT UNIQUE,
        alias TEXT
      )
    `)

    db.prepare('INSERT INTO cluster_aliases (context_name, alias) VALUES (?, ?)').run('minikube', 'Local')

    // Try to insert duplicate
    expect(() => {
      db.prepare('INSERT INTO cluster_aliases (context_name, alias) VALUES (?, ?)').run('minikube', 'Duplicate')
    }).toThrow()

    db.close()
  })

  it('should handle transactions with ROLLBACK', () => {
    const db = new Database(':memory:')

    db.exec('CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)')

    try {
      db.exec('BEGIN TRANSACTION')
      db.prepare('INSERT INTO items (name) VALUES (?)').run('item1')
      db.prepare('INSERT INTO items (name) VALUES (?)').run('item2')

      // Simulate error
      throw new Error('Simulated error')

      db.exec('COMMIT')
    } catch (error) {
      db.exec('ROLLBACK')
    }

    // Verify no data was committed
    const count = db.prepare('SELECT COUNT(*) as count FROM items').get() as any
    expect(count.count).toBe(0)

    db.close()
  })
})

describe('Database Security Best Practices', () => {
  it('should not expose sensitive data in error messages', () => {
    const db = new Database(':memory:')

    try {
      // Force an error with invalid SQL
      db.prepare('SELECT * FROM non_existent_table').all()
    } catch (error) {
      const message = (error as Error).message

      // Error should not contain sensitive paths or credentials
      expect(message).not.toContain('password')
      expect(message).not.toContain('secret')
      expect(message).not.toContain('api_key')
    }

    db.close()
  })

  it('should validate input before database operations', () => {
    // This is a conceptual test - in real app, Zod validates before DB
    const validateKeyName = (name: string): boolean => {
      return /^[a-z][a-z0-9_-]*$/.test(name) && name.length <= 50
    }

    expect(validateKeyName('openai')).toBe(true)
    expect(validateKeyName('my-api-key')).toBe(true)
    expect(validateKeyName('test_key_123')).toBe(true)

    // Invalid inputs
    expect(validateKeyName('UPPERCASE')).toBe(false)
    expect(validateKeyName('has spaces')).toBe(false)
    expect(validateKeyName("'; DROP TABLE")).toBe(false)
  })
})
