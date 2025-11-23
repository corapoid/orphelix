# Orphelix Desktop Application (macOS)

This guide explains how to build and run Orphelix as a native macOS application using Tauri.

## Prerequisites

- **Node.js 24+**
- **Rust** (install via `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)
- **Xcode Command Line Tools** (`xcode-select --install`)

## Development

Run the desktop app in development mode (hot reload enabled):

```bash
# From project root
npm run tauri:dev

# Or from app directory
cd app
npm run tauri:dev
```

This will:
1. Start Next.js development server on port 3000
2. Launch Tauri window pointing to localhost:3000
3. Hot reload on file changes

## Building for Production

Build a native macOS application:

```bash
# From project root
npm run build:ui  # Build UI package first
npm run tauri:build

# Or from app directory
cd app
npm run tauri:build
```

This will create:
- **DMG installer**: `app/src-tauri/target/release/bundle/dmg/Orphelix_1.1.0_universal.dmg`
- **App bundle**: `app/src-tauri/target/release/bundle/macos/Orphelix.app`

## Installation

1. Open the DMG file
2. Drag Orphelix.app to Applications folder
3. Launch Orphelix from Applications

## Architecture

The desktop app uses:
- **Tauri 2.x** - Native window and system integration
- **Next.js Standalone** - Full-featured server bundled with the app
- **Rust Backend** - Manages Next.js server process

### How it works:

1. **Development**: Tauri opens a window to `localhost:3000` (your dev server)
2. **Production**: Tauri bundles Next.js standalone server and starts it automatically
3. All API routes, SSR, and Next.js features work normally

## Configuration

### Tauri Config
Located at `app/src-tauri/tauri.conf.json`:
- Window size, title, icons
- Bundle settings (DMG, App)
- Security policies

### Next.js Config
Located at `app/next.config.ts`:
- Uses `standalone` output for Tauri builds (via `TAURI_BUILD` env var)
- Regular build for web deployment

## Troubleshooting

### Build fails
- Ensure Rust is installed: `cargo --version`
- Update Rust: `rustup update`
- Clean build: `cd app/src-tauri && cargo clean`

### App doesn't start
- Check if port 3000 is available
- Look at logs in Console.app (search for "Orphelix")

### Icon not showing
- Rebuild icon: `npm run tauri icon path/to/icon.png`
- Icon must be 1024x1024 PNG

## Development Tips

- Use `npm run tauri:dev` for fast iteration
- The app auto-restarts when Rust code changes
- Frontend hot reloads like normal Next.js development

## Distribution

To distribute your app:
1. Build release: `npm run tauri:build`
2. Sign the app (requires Apple Developer account)
3. Notarize for distribution outside App Store
4. Distribute DMG file

For more info: https://tauri.app/v2/guides/distribution/
