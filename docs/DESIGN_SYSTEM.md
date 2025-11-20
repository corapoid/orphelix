# Orphelix Design System

## Overview

Orphelix uses a unified design system powered by the `@orphelix/ui` package. This system provides consistent theming, components, and visual presets across all applications in the monorepo.

## Architecture

```
kubevista/
├── packages/
│   └── ui/                    # Shared design system package
│       ├── src/
│       │   ├── components/    # Reusable UI components
│       │   ├── theme/         # Theme system and presets
│       │   └── providers/     # React context providers
│       └── dist/              # Compiled JavaScript output
├── app/                       # Main Orphelix application
└── landing-page/              # Marketing landing page
```

## Visual Presets

The design system offers three visual presets, each providing a different look and feel:

### 1. Classic
- **Style**: Solid backgrounds, standard Material-UI appearance
- **Best for**: Maximum accessibility and readability
- **Characteristics**:
  - No transparency effects
  - Standard elevation shadows
  - High contrast
  - Traditional enterprise software aesthetic

### 2. Glass (Glassmorphism)
- **Style**: Transparent with blur effects
- **Best for**: Modern, clean interfaces
- **Characteristics**:
  - Frosted glass effect with backdrop blur
  - Semi-transparent backgrounds
  - Subtle borders and dividers
  - iOS-inspired design language

### 3. Liquid Glass ✨
- **Style**: Premium glassmorphism with gradient shines and animations
- **Best for**: Eye-catching, futuristic interfaces
- **Characteristics**:
  - All glassmorphism features
  - Animated gradient shine effects
  - Liquid-like hover states
  - Enhanced depth with multiple layers
  - Premium feel with refined details

## Usage

### Basic Setup

Each application wraps its content with the `ThemeProvider` from `@orphelix/ui`:

```tsx
import { ThemeProvider } from '@orphelix/ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider
          storageKeyPrefix="orphelix"
          defaultPreset="liquidGlass"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Using the Theme Hook

Access and control the theme in any component:

```tsx
import { useTheme } from '@orphelix/ui'

function SettingsPanel() {
  const {
    mode,              // 'light' | 'dark' | 'system'
    setThemeMode,      // Change theme mode
    actualTheme,       // Resolved theme ('light' | 'dark')
    visualPreset,      // Current preset
    setVisualPreset    // Change visual preset
  } = useTheme()

  return (
    <div>
      <button onClick={() => setThemeMode('dark')}>
        Dark Mode
      </button>
      <button onClick={() => setVisualPreset('glass')}>
        Glass Style
      </button>
    </div>
  )
}
```

### Using Components

Import components from `@orphelix/ui`:

```tsx
import { GlassButton, GlassPanel } from '@orphelix/ui'

function MyComponent() {
  return (
    <GlassPanel>
      <GlassButton variant="contained">
        Click Me
      </GlassButton>
    </GlassPanel>
  )
}
```

## Components

### GlassButton

A button component that adapts to the current visual preset.

**Props:**
- All standard MUI Button props
- `selected?: boolean` - Highlights the button as selected
- `href?: string` - Renders as an anchor tag when provided
- `target?: string` - Link target (for href buttons)
- `rel?: string` - Link relationship (for href buttons)

**Example:**
```tsx
<GlassButton
  variant="contained"
  selected={isActive}
  onClick={handleClick}
>
  Settings
</GlassButton>
```

### GlassPanel

A panel/card component with glassmorphism effects.

**Props:**
- All standard MUI Paper props
- Automatically adapts to current visual preset
- Uses appropriate blur, transparency, and shadow effects

**Example:**
```tsx
<GlassPanel sx={{ p: 3 }}>
  <Typography variant="h6">Dashboard</Typography>
  <Typography>Content goes here</Typography>
</GlassPanel>
```

## Theme System

### Design Tokens

The theme system uses a set of design tokens defined in `design-tokens.ts`:

```typescript
export const tokens = {
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
  },
  blur: {
    light: 'blur(20px)',
    medium: 'blur(40px)',
    heavy: 'blur(60px)',
  },
  opacity: {
    glass: 0.7,
    background: 0.5,
  },
  // ... more tokens
}
```

### Preset Effects

Each visual preset defines its own effect configuration:

```typescript
export interface PresetEffects {
  enableGlass: boolean           // Enable glassmorphism
  enableGradientShine: boolean   // Enable gradient shines
  enableAnimations: boolean      // Enable animations
  blurStrength: string           // Backdrop blur amount
  backgroundOpacity: number      // Background transparency
}
```

### Theme Builder

The theme builder creates MUI themes based on the current preset:

```typescript
const theme = buildTheme({
  mode: 'dark',
  preset: 'liquidGlass',
  baseTheme: createTheme({ ... })
})
```

## Migration Guide

### From Old lib/ui System

If you're migrating from the old `lib/ui` theme system:

1. **Remove old imports:**
   ```diff
   - import { useTheme } from '@/lib/ui/theme'
   + import { useTheme } from '@orphelix/ui'
   ```

2. **Update theme provider:**
   ```diff
   - import { ThemeProvider } from '@/lib/ui/theme-provider'
   + import { ThemeProvider } from '@orphelix/ui'
   ```

3. **Replace colorSkin with visualPreset:**
   ```diff
   - const { colorSkin, setColorSkin } = useUIPreferences()
   + const { visualPreset, setVisualPreset } = useTheme()
   ```

4. **Remove backgroundPreset usage:**
   The new system uses visual presets only. Remove any code related to `backgroundPreset` or `useUIPreferences`.

## Development

### Building the UI Package

```bash
cd packages/ui
npm run build
```

### Watching for Changes

```bash
cd packages/ui
npm run dev
```

### Adding New Components

1. Create component in `packages/ui/src/components/`
2. Export from `packages/ui/src/components/index.ts`
3. Rebuild the package
4. Use in applications

### Adding New Presets

1. Define preset effects in `packages/ui/src/theme/visual-presets.ts`
2. Update `VisualPreset` type
3. Add preset to theme builder logic
4. Rebuild the package

## Best Practices

### Accessibility

- Always provide sufficient contrast for text
- Use the `classic` preset when accessibility is paramount
- Test with screen readers and keyboard navigation

### Performance

- Avoid excessive blur effects (already optimized in presets)
- Use `will-change` CSS property sparingly
- Test animations on lower-end devices

### Consistency

- Use design tokens instead of hardcoded values
- Leverage the theme system for all styling
- Use provided components when possible

### Theme Persistence

The theme system automatically persists user preferences to localStorage:
- Theme mode (light/dark/system)
- Visual preset selection

Each application uses its own storage key prefix to avoid conflicts.

## Troubleshooting

### Build Issues

**Problem:** `Cannot find module '@orphelix/ui'`

**Solution:** Ensure the package is built:
```bash
cd packages/ui && npm run build
```

**Problem:** Module resolution errors in Next.js

**Solution:** Verify workspace configuration in root `package.json`:
```json
{
  "workspaces": [
    "app",
    "landing-page",
    "packages/*"
  ]
}
```

### Theme Not Applying

**Problem:** Theme changes don't take effect

**Solution:**
1. Verify `ThemeProvider` wraps your application
2. Check browser console for errors
3. Clear localStorage and refresh
4. Ensure you're using the hook correctly

### Component Styling Issues

**Problem:** Glass effects not showing

**Solution:**
1. Check that `visualPreset` is set correctly
2. Verify backdrop-filter browser support
3. Ensure parent elements don't have `overflow: hidden`

## Resources

- [Material-UI Documentation](https://mui.com/)
- [CSS Glassmorphism Guide](https://css-tricks.com/glassmorphism/)
- [React Context API](https://react.dev/reference/react/useContext)

## Contributing

When contributing to the design system:

1. Follow existing patterns and conventions
2. Document new components and features
3. Test across all visual presets
4. Ensure accessibility compliance
5. Update this documentation

## Version History

- **v1.0.0** - Initial unified design system
  - Three visual presets (Classic, Glass, Liquid Glass)
  - Core components (GlassButton, GlassPanel)
  - Theme provider with localStorage persistence
  - Removed old backgroundPreset/colorSkin system
