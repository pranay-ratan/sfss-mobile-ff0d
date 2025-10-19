/**
 * SFSS Glassmorphism Design Tokens
 * Centralized design system for glass effects, colors, spacing, and typography
 */

export const GLASS_TOKENS = {
  // Primary Colors
  colors: {
    sfssBlue: '#1e40af',
    sfssRed: '#dc2626',
    white: '#ffffff',
    black: '#000000',
    darkText: '#1f2937',
    lightText: '#ffffff',
    background: '#f9fafb',
    darkBg: '#111827',
    transparent: 'transparent',
    // Glass overlays
    glassLight: 'rgba(255, 255, 255, 0.15)',
    glassDark: 'rgba(0, 0, 0, 0.15)',
    glassBorderLight: 'rgba(255, 255, 255, 0.2)',
    glassBorderDark: 'rgba(0, 0, 0, 0.1)',
    // Semantic
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Spacing (8px base grid)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  // Border Radius
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },

  // Shadows (glass-style soft shadows)
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
      elevation: 6,
    },
  },

  // Typography Scale
  typography: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: 'bold' as const,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '600' as const,
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600' as const,
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600' as const,
      letterSpacing: 0,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
      letterSpacing: 0.2,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
      letterSpacing: 0.25,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500' as const,
      letterSpacing: 0.4,
    },
    button: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600' as const,
      letterSpacing: 0.5,
    },
  },

  // Blur amounts (for expo-blur)
  blur: {
    light: 10,
    medium: 20,
    heavy: 30,
  },
};

export type GlassTokens = typeof GLASS_TOKENS;
