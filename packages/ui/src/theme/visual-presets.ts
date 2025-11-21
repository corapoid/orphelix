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
      default: '#E8EDF5',
      paper: 'rgba(255, 255, 255, 0.25)',
      glass: 'rgba(255, 255, 255, 0.15)',
      wallpaper: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1100%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='%23E8EDF5'%3e%3c/rect%3e%3cpath d='M0%2c331.604C72.812%2c345.382%2c158.038%2c382.699%2c217.694%2c338.738C278.012%2c294.288%2c248.882%2c195.989%2c277.819%2c126.875C305.396%2c61.01%2c394.353%2c15.42%2c382.548%2c-55.002C370.685%2c-125.772%2c269.89%2c-138.932%2c224.012%2c-194.107C176.656%2c-251.06%2c176.472%2c-344.598%2c111.769%2c-380.65C45.275%2c-417.7%2c-43.148%2c-413.847%2c-111.962%2c-381.309C-178.124%2c-350.025%2c-206.113%2c-274.232%2c-244.749%2c-212.077C-277.514%2c-159.367%2c-306.247%2c-106.499%2c-320.354%2c-46.06C-335.564%2c19.103%2c-358.382%2c90.119%2c-329.36%2c150.413C-300.43%2c210.514%2c-228.929%2c233.135%2c-170.488%2c265.285C-115.957%2c295.284%2c-61.153%2c320.032%2c0%2c331.604' fill='%23D8E1F0'%3e%3c/path%3e%3cpath d='M1440 1118.087C1542.047 1129.3049999999998 1621.664 1029.112 1695.924 958.225 1759.5439999999999 897.495 1802.246 822.04 1835.453 740.597 1867.479 662.049 1883.811 580.938 1884.34 496.114 1884.946 399.054 1912.024 278.132 1838.737 214.49200000000002 1763.2649999999999 148.95499999999998 1640.2649999999999 232.596 1545.224 201.639 1445.324 169.10000000000002 1390.209 24.006999999999948 1285.653 34.341999999999985 1185.223 44.269000000000005 1143.809 169.85199999999998 1079.55 247.668 1016.977 323.443 921.258 386.372 914.023 484.376 906.822 581.922 985.9010000000001 661.919 1043.114 741.252 1090.862 807.461 1158.653 849.466 1217.85 905.672 1293.684 977.675 1336.054 1106.661 1440 1118.087' fill='%23EDF1F9'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1100'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e\")",
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
      default: '#0e2a47',
      paper: 'rgba(28, 28, 30, 0.4)',
      glass: 'rgba(44, 44, 46, 0.3)',
      wallpaper: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1100%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M0%2c331.604C72.812%2c345.382%2c158.038%2c382.699%2c217.694%2c338.738C278.012%2c294.288%2c248.882%2c195.989%2c277.819%2c126.875C305.396%2c61.01%2c394.353%2c15.42%2c382.548%2c-55.002C370.685%2c-125.772%2c269.89%2c-138.932%2c224.012%2c-194.107C176.656%2c-251.06%2c176.472%2c-344.598%2c111.769%2c-380.65C45.275%2c-417.7%2c-43.148%2c-413.847%2c-111.962%2c-381.309C-178.124%2c-350.025%2c-206.113%2c-274.232%2c-244.749%2c-212.077C-277.514%2c-159.367%2c-306.247%2c-106.499%2c-320.354%2c-46.06C-335.564%2c19.103%2c-358.382%2c90.119%2c-329.36%2c150.413C-300.43%2c210.514%2c-228.929%2c233.135%2c-170.488%2c265.285C-115.957%2c295.284%2c-61.153%2c320.032%2c0%2c331.604' fill='%230b2037'%3e%3c/path%3e%3cpath d='M1440 1118.087C1542.047 1129.3049999999998 1621.664 1029.112 1695.924 958.225 1759.5439999999999 897.495 1802.246 822.04 1835.453 740.597 1867.479 662.049 1883.811 580.938 1884.34 496.114 1884.946 399.054 1912.024 278.132 1838.737 214.49200000000002 1763.2649999999999 148.95499999999998 1640.2649999999999 232.596 1545.224 201.639 1445.324 169.10000000000002 1390.209 24.006999999999948 1285.653 34.341999999999985 1185.223 44.269000000000005 1143.809 169.85199999999998 1079.55 247.668 1016.977 323.443 921.258 386.372 914.023 484.376 906.822 581.922 985.9010000000001 661.919 1043.114 741.252 1090.862 807.461 1158.653 849.466 1217.85 905.672 1293.684 977.675 1336.054 1106.661 1440 1118.087' fill='%23113457'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1100'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e\")",
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
