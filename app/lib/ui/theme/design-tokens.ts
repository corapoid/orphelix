/**
 * Design Tokens for Orphelix UI
 * Centralized design values used across all visual presets
 */

export const designTokens = {
  // Blur levels
  blur: {
    none: 0,
    light: 12,
    medium: 24,
    heavy: 40,
    ultra: 60,
  },

  // Saturation levels
  saturation: {
    normal: 100,
    medium: 150,
    high: 180,
    ultra: 200,
  },

  // Border radius
  radius: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
  },

  // Shadows
  shadows: {
    glass: {
      light: '0 4px 16px rgba(31, 38, 135, 0.08)',
      dark: '0 4px 16px rgba(0, 0, 0, 0.3)',
    },
    glassInset: {
      light: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05)',
      dark: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)',
    },
    glassHover: {
      light: '0 8px 32px rgba(31, 38, 135, 0.12)',
      dark: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
  },

  // Gradients
  gradients: {
    // Diagonal shine effect for liquid glass
    diagonalShine: {
      light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 60%, rgba(0, 0, 0, 0.02) 100%)',
      dark: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%, rgba(0, 0, 0, 0.1) 100%)',
    },
    // Welcome modal background
    welcomePurple: {
      light: 'radial-gradient(ellipse at top, rgba(230, 235, 250, 0.08), transparent 50%), ' +
             'radial-gradient(ellipse at bottom, rgba(240, 235, 250, 0.08), transparent 50%), ' +
             'linear-gradient(180deg, rgb(252, 252, 255) 0%, rgb(248, 250, 254) 100%)',
      dark: 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.2), transparent 50%), ' +
            'radial-gradient(ellipse at bottom, rgba(118, 75, 162, 0.2), transparent 50%), ' +
            'linear-gradient(180deg, rgb(10, 10, 20) 0%, rgb(15, 15, 25) 100%)',
    },
    // Hero gradient (for logos, buttons)
    heroBluePurple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },

  // Animations
  animations: {
    duration: {
      fast: 200,
      normal: 350,
      slow: 500,
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enter: 'cubic-bezier(0.0, 0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },

  // Noise texture (for welcome modal and overlays)
  noise: {
    svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    size: '150px 150px',
    opacity: {
      light: 0.3,
      dark: 0.4,
    },
  },
}
