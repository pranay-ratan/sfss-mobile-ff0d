import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  variant?: 'light' | 'dark';
}

export default function GlassCard({
  children,
  style,
  intensity = 20,
  variant = 'light',
}: GlassCardProps) {
  const isDark = variant === 'dark';

  return (
    <BlurView intensity={intensity} style={[styles.blurContainer, style]}>
      <View
        style={[
          styles.container,
          isDark ? styles.darkOverlay : styles.lightOverlay,
        ]}
      >
        {children}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    borderRadius: GLASS_TOKENS.radius.lg,
    overflow: 'hidden',
  },
  container: {
    borderRadius: GLASS_TOKENS.radius.lg,
    borderWidth: 1,
    padding: GLASS_TOKENS.spacing.lg,
    ...GLASS_TOKENS.shadows.md,
  },
  lightOverlay: {
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
  },
  darkOverlay: {
    backgroundColor: GLASS_TOKENS.colors.glassDark,
    borderColor: GLASS_TOKENS.colors.glassBorderDark,
  },
});
