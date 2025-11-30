-- Migration: Add encrypted API keys table
-- Date: 2025-11-29
-- Purpose: Store API keys (OpenAI, etc.) with encryption at rest

CREATE TABLE IF NOT EXISTS api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key_name TEXT NOT NULL UNIQUE, -- 'openai', 'anthropic', etc.
  encrypted_value TEXT NOT NULL, -- AES-256-GCM encrypted key
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_name ON api_keys(key_name);
