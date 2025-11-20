# @orphelix/ui

Shared UI library for Orphelix - providing unified theming, components, and visual presets across all Orphelix applications.

## Features

- **3 Visual Presets**: Classic, Glassmorphism, Liquid Glass
- **Auto-Adaptive Components**: Components automatically style based on selected preset
- **Theme Management**: Unified theme provider with light/dark/system modes
- **Design Tokens**: Centralized design values for consistency
- **TypeScript**: Full type safety

## Visual Presets

### Classic
- Solid backgrounds
- No transparency or blur
- Standard MUI appearance
- Best for: Traditional interfaces, accessibility

### Glassmorphism (Glass)
- Transparent backgrounds with blur
- Enhanced saturation
- Clean, modern look
- Best for: Modern web apps, content-focused UIs

### Liquid Glass (Default)
- Full glassmorphism effects
- Diagonal gradient shine
- Inset shadows for depth
- Hover animations
- Best for: Premium feel, interactive dashboards

## Installation

This package uses file dependencies. In your project's `package.json`:

```json
{
  "dependencies": {
    "@orphelix/ui": "file:../packages/ui"
  }
}
```

Then run:

```bash
npm install
```

## Usage

### Basic Setup

```tsx
import { ThemeProvider } from '@orphelix/ui'

export default function App({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
```

### With Custom Storage Key

```tsx
<ThemeProvider
  storageKeyPrefix="my-app"
  defaultPreset="glass"
>
  {children}
</ThemeProvider>
```

### Using Components

```tsx
import { GlassPanel, GlassButton, GlassCard } from '@orphelix/ui'

function MyComponent() {
  return (
    <GlassPanel>
      <GlassCard interactive>
        <h2>Hello World</h2>
        <GlassButton>Click Me</GlassButton>
      </GlassCard>
    </GlassPanel>
  )
}
```

### Changing Visual Preset

```tsx
import { useTheme } from '@orphelix/ui'

function Settings() {
  const { visualPreset, setVisualPreset } = useTheme()

  return (
    <select value={visualPreset} onChange={e => setVisualPreset(e.target.value)}>
      <option value="classic">Classic</option>
      <option value="glass">Glassmorphism</option>
      <option value="liquidGlass">Liquid Glass</option>
    </select>
  )
}
```

### Theme Mode Control

```tsx
import { useTheme } from '@orphelix/ui'

function ThemeToggle() {
  const { mode, setThemeMode } = useTheme()

  return (
    <button onClick={() => setThemeMode(mode === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

## Components

### GlassPanel
Container component with optional close button and animations.

```tsx
<GlassPanel
  closeable
  open={isOpen}
  onClose={() => setIsOpen(false)}
  animationType="fade"
>
  Content here
</GlassPanel>
```

### GlassButton
Button that auto-adapts to visual preset.

```tsx
<GlassButton
  selected={isSelected}
  onClick={handleClick}
>
  Click Me
</GlassButton>
```

### GlassCard
Card component with optional interactive mode.

```tsx
<GlassCard interactive onClick={handleClick}>
  Card content
</GlassCard>
```

## Design Tokens

Access centralized design values:

```tsx
import { designTokens } from '@orphelix/ui'

const blur = designTokens.blur.medium // 24
const gradient = designTokens.gradients.diagonalShine.dark
```

## Custom Theme Building

For advanced use cases:

```tsx
import { buildTheme, liquidGlassPreset } from '@orphelix/ui'

const customTheme = buildTheme(liquidGlassPreset, 'dark', true)
```

## Peer Dependencies

Required peer dependencies:

- `@mui/material` ^7.3.5
- `@emotion/react` ^11.13.3
- `@emotion/styled` ^11.13.5
- `react` ^19.0.0

## Structure

```
packages/ui/
├── src/
│   ├── theme/
│   │   ├── design-tokens.ts      # Centralized design values
│   │   ├── visual-presets.ts     # 3 preset definitions
│   │   ├── theme-builder.ts      # MUI theme builder
│   │   └── index.ts
│   ├── components/
│   │   ├── GlassPanel.tsx
│   │   ├── GlassButton.tsx
│   │   ├── GlassCard.tsx
│   │   └── index.ts
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   └── index.ts
│   └── index.ts                  # Main exports
├── package.json
├── tsconfig.json
└── README.md
```

## License

Private - Orphelix Project
