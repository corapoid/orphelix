/**
 * Color Skins for KubeVista
 *
 * Each skin has light and dark variants with glassmorphism support
 */

export type ColorSkinName = 'classic' | 'glass' | 'liquidGlass'

export interface ColorSkin {
  name: string
  description: string
  light: ColorPalette
  dark: ColorPalette
}

export interface ColorPalette {
  // Primary colors
  primary: {
    main: string
    light: string
    dark: string
    contrast: string
  }
  // Secondary colors
  secondary: {
    main: string
    light: string
    dark: string
    contrast: string
  }
  // Accent colors
  accent: {
    main: string
    light: string
    dark: string
  }
  // Status colors
  success: string
  warning: string
  error: string
  info: string
  // Background colors
  background: {
    default: string
    paper: string
    glass: string // For glassmorphism effect
    wallpaper?: string // Optional wallpaper/gradient for page background
  }
  // Text colors
  text: {
    primary: string
    secondary: string
    disabled: string
  }
  // Border and divider
  divider: string
  border: string
}

/**
 * Classic Blue - Traditional and Professional
 * Inspired by classic enterprise software
 */
export const classicSkin: ColorSkin = {
  name: 'Classic Blue',
  description: 'Traditional professional blue palette',
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
      paper: 'rgba(245, 245, 245, 0.88)', // Glass panel with backdrop-filter
      glass: 'rgba(245, 245, 245, 0.45)',
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
      paper: 'rgba(18, 18, 18, 0.88)', // Glass panel with backdrop-filter
      glass: 'rgba(18, 18, 18, 0.45)',
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
 * Glass iOS - Modern Glassmorphism
 * Inspired by iOS design with frosted glass effects
 * Uses unified background for seamless liquid glass appearance
 */
export const glassSkin: ColorSkin = {
  name: 'Glass iOS',
  description: 'Modern glassmorphism inspired by iOS design',
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
      default: '#F1F2F8', // Unified background
      paper: 'rgba(241, 242, 248, 0.88)', // Glass panels matching background - higher opacity for consistency
      glass: 'rgba(241, 242, 248, 0.45)', // Even more transparent for overlays
      wallpaper: '#F1F2F8', // Solid color for perfect uniformity
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
      default: '#000000', // Pure black unified background
      paper: 'rgba(0, 0, 0, 0.88)', // Glass panels matching background - higher opacity for consistency
      glass: 'rgba(0, 0, 0, 0.45)', // Transparent overlays
      wallpaper: '#000000', // Solid color for perfect uniformity
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

/**
 * Liquid Glass Blue - Futuristic yet familiar
 * Builds on Classic Blue with liquid glass gradients inspired by iOS
 * Uses unified background for seamless liquid glass appearance
 */
export const liquidGlassSkin: ColorSkin = {
  name: 'Liquid Glass Blue',
  description: 'Classic enterprise blue reimagined with iOS liquid glass aesthetics',
  light: {
    primary: {
      main: '#1C64FF',
      light: '#5A8CFF',
      dark: '#0F3FD0',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#16C2FF',
      light: '#6FE2FF',
      dark: '#0095D8',
      contrast: '#021B34',
    },
    accent: {
      main: 'rgba(247, 251, 255, 0.72)',
      light: 'rgba(247, 251, 255, 0.88)',
      dark: 'rgba(247, 251, 255, 0.48)',
    },
    success: '#2ECC9F',
    warning: '#F7B84B',
    error: '#FF6B6B',
    info: '#3AA0FF',
    background: {
      default: '#E9F1FF', // Unified background with subtle blue tint
      paper: 'rgba(233, 241, 255, 0.88)', // Glass panels matching background - higher opacity for consistency
      glass: 'rgba(233, 241, 255, 0.45)', // Transparent overlays
      wallpaper: '#E9F1FF', // Solid color for perfect uniformity
    },
    text: {
      primary: 'rgba(15, 33, 70, 0.92)',
      secondary: 'rgba(31, 54, 105, 0.7)',
      disabled: 'rgba(25, 55, 95, 0.35)',
    },
    divider: 'rgba(26, 64, 152, 0.15)',
    border: 'rgba(26, 64, 152, 0.12)',
  },
  dark: {
    primary: {
      main: '#3C7BFF',
      light: '#6EA0FF',
      dark: '#2353EC',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#1CC4FF',
      light: '#66DAFF',
      dark: '#0996D8',
      contrast: '#021120',
    },
    accent: {
      main: 'rgba(18, 32, 64, 0.75)',
      light: 'rgba(30, 52, 96, 0.86)',
      dark: 'rgba(0, 5, 20, 0.65)',
    },
    success: '#3DDC97',
    warning: '#F5A524',
    error: '#FF7379',
    info: '#5AB2FF',
    background: {
      default: '#000000', // Pure black unified background
      paper: 'rgba(0, 0, 0, 0.88)', // Glass panels matching background - higher opacity for consistency
      glass: 'rgba(0, 0, 0, 0.45)', // Transparent overlays
      wallpaper: '#000000', // Solid color for perfect uniformity
    },
    text: {
      primary: 'rgba(231, 240, 255, 0.92)',
      secondary: 'rgba(177, 201, 255, 0.7)',
      disabled: 'rgba(120, 145, 201, 0.35)',
    },
    divider: 'rgba(68, 116, 209, 0.18)',
    border: 'rgba(68, 116, 209, 0.15)',
  },
}

export const colorSkins: Record<ColorSkinName, ColorSkin> = {
  classic: classicSkin,
  glass: glassSkin,
  liquidGlass: liquidGlassSkin,
}

export const defaultSkin: ColorSkinName = 'glass'
