#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const APP_DIR = path.join(__dirname, '..')

console.log('📦 Copying assets to standalone build...')

try {
  // Copy .next/static to standalone
  const staticSrc = path.join(APP_DIR, '.next/static')
  const staticDest = path.join(APP_DIR, '.next/standalone/orphelix/app/.next/static')
  if (fs.existsSync(staticSrc)) {
    fs.cpSync(staticSrc, staticDest, { recursive: true, force: true })
    console.log('✅ Copied .next/static')
  } else {
    console.warn('⚠️  .next/static not found, skipping')
  }

  // Copy public to standalone
  const publicSrc = path.join(APP_DIR, 'public')
  const publicDest = path.join(APP_DIR, '.next/standalone/orphelix/app/public')
  if (fs.existsSync(publicSrc)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true, force: true })
    console.log('✅ Copied public/')
  } else {
    console.warn('⚠️  public/ not found, skipping')
  }

  // Copy .env.local to standalone
  const envSrc = path.join(APP_DIR, '.env.local')
  const envDest = path.join(APP_DIR, '.next/standalone/orphelix/app/.env.local')
  if (fs.existsSync(envSrc)) {
    fs.cpSync(envSrc, envDest)
    console.log('✅ Copied .env.local')
  } else {
    console.warn('⚠️  .env.local not found, skipping')
  }

  console.log('✅ All assets copied successfully')
} catch (error) {
  console.error('❌ Failed to copy assets:', error.message)
  process.exit(1)
}
