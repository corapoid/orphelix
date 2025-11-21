/**
 * Visual Presets for Orphelix UI
 *
 * Two visual styles:
 * - classic: Traditional Material UI (solid colors, no effects)
 * - liquidGlass: Premium liquid glass (transparency + gradients + shine + animations)
 *
 * NOTE: blur/backdropFilter is NOT used in cards for performance reasons.
 * Only main containers use blur effects.
 */

export type VisualPresetName = 'classic' | 'liquidGlass'

export interface VisualPresetEffects {
  transparency: boolean    // Use rgba backgrounds?
  blur: number | false     // Blur amount in px, or false
  saturation: number       // Saturation percentage (100-200)
  gradient: boolean        // Diagonal shine gradient overlay?
  shine: boolean          // Extra glass shine effects?
  insetShadows: boolean   // Depth with inset shadows?
  animations: boolean     // Transform animations on hover?
}

export interface ColorPalette {
  primary: {
    main: string
    light: string
    dark: string
    contrast: string
  }
  secondary: {
    main: string
    light: string
    dark: string
    contrast: string
  }
  accent: {
    main: string
    light: string
    dark: string
  }
  success: string
  warning: string
  error: string
  info: string
  background: {
    default: string
    paper: string
    glass: string
    wallpaper?: string
  }
  text: {
    primary: string
    secondary: string
    disabled: string
  }
  divider: string
  border: string
}

export interface VisualPreset {
  name: string
  description: string
  effects: VisualPresetEffects
  light: ColorPalette
  dark: ColorPalette
}

/**
 * CLASSIC PRESET - Traditional Material UI
 * No transparency, no blur, solid colors
 * Best for: Traditional enterprise applications
 */
export const classicPreset: VisualPreset = {
  name: 'Classic',
  description: 'Traditional Material Design without transparency effects',
  effects: {
    transparency: false,
    blur: false,
    saturation: 100,
    gradient: false,
    shine: false,
    insetShadows: false,
    animations: false,
  },
  light: {
    primary: {
      main: '#1976D2',
      light: '#42A5F5',
      dark: '#1565C0',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#455A64',
      light: '#607D8B',
      dark: '#37474F',
      contrast: '#FFFFFF',
    },
    accent: {
      main: '#F5F5F5',
      light: '#FAFAFA',
      dark: '#EEEEEE',
    },
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',        // SOLID
      glass: '#FFFFFF',        // Not used in classic
      wallpaper: '#F5F5F5',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
    },
    divider: '#E0E0E0',
    border: '#BDBDBD',
  },
  dark: {
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#607D8B',
      light: '#90A4AE',
      dark: '#455A64',
      contrast: '#FFFFFF',
    },
    accent: {
      main: '#263238',
      light: '#37474F',
      dark: '#1C2428',
    },
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#EF5350',
    info: '#42A5F5',
    background: {
      default: '#121212',
      paper: '#1E1E1E',       // SOLID
      glass: '#1E1E1E',       // Not used in classic
      wallpaper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#666666',
    },
    divider: '#2C2C2C',
    border: '#404040',
  },
}

/**
 * LIQUID GLASS PRESET - Premium ⭐ DEFAULT
 * Transparent backgrounds with gradients and animations
 * NO BLUR for performance with many cards!
 * Best for: Premium polished interfaces
 */
export const liquidGlassPreset: VisualPreset = {
  name: 'Liquid Glass',
  description: 'Premium glass effect with depth, shine, and animations',
  effects: {
    transparency: true,
    blur: false,             // ❌ NO BLUR for performance!
    saturation: 180,
    gradient: true,          // ✅ Diagonal shine!
    shine: true,            // ✅ Extra shine!
    insetShadows: false,     // ❌ NO inset shadows for performance!
    animations: true,       // ✅ Hover effects!
  },
  light: {
    primary: {
      main: '#007AFF',
      light: '#58ADFF',
      dark: '#0058D7',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#5E5CE6',
      light: '#8F8CFF',
      dark: '#3F3AD6',
      contrast: '#FFFFFF',
    },
    accent: {
      main: 'rgba(255, 255, 255, 0.68)',
      light: 'rgba(255, 255, 255, 0.85)',
      dark: 'rgba(255, 255, 255, 0.45)',
    },
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#55BEFF',
    background: {
      default: 'linear-gradient(135deg, #D8E1F0 0%, #E5EAF5 50%, #EDF1F9 100%)',
      paper: 'rgba(255, 255, 255, 0.25)',
      glass: 'rgba(255, 255, 255, 0.15)',
      wallpaper: 'linear-gradient(135deg, #D8E1F0 0%, #E5EAF5 50%, #EDF1F9 100%)',
    },
    text: {
      primary: 'rgba(28, 28, 30, 0.92)',
      secondary: 'rgba(60, 60, 67, 0.7)',
      disabled: 'rgba(60, 60, 67, 0.35)',
    },
    divider: 'rgba(60, 60, 67, 0.15)',
    border: 'rgba(60, 60, 67, 0.12)',
  },
  dark: {
    primary: {
      main: '#0A84FF',
      light: '#64D2FF',
      dark: '#0060DF',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#5E5CE6',
      light: '#9F8CFF',
      dark: '#3D3ACF',
      contrast: '#FFFFFF',
    },
    accent: {
      main: 'rgba(44, 44, 46, 0.75)',
      light: 'rgba(58, 58, 60, 0.86)',
      dark: 'rgba(0, 0, 0, 0.68)',
    },
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#0A84FF',
    background: {
      default: 'linear-gradient(135deg, #0F0F18 0%, #15151D 50%, #1A1A22 100%)',
      paper: 'rgba(28, 28, 30, 0.4)',
      glass: 'rgba(44, 44, 46, 0.3)',
      wallpaper: 'linear-gradient(135deg, #0F0F18 0%, #15151D 50%, #1A1A22 100%)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.92)',
      secondary: 'rgba(235, 235, 245, 0.68)',
      disabled: 'rgba(235, 235, 245, 0.36)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.15)',
  },
}

export const visualPresets: Record<VisualPresetName, VisualPreset> = {
  classic: classicPreset,
  liquidGlass: liquidGlassPreset,
}

export const defaultVisualPreset: VisualPresetName = 'liquidGlass'
