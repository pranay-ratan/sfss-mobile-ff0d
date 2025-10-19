import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

interface GlassButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function GlassButton({
  label,
  onPress,
  variant = 'glass',
  size = 'md',
  disabled = false,
  style,
}: GlassButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = [
    styles.button,
    styles[size],
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'glass' && styles.glass,
    isPressed && styles.pressed,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [styles.text, styles[`text${size}`]];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: GLASS_TOKENS.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.sm,
  },
  md: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  lg: {
    paddingHorizontal: GLASS_TOKENS.spacing.xl,
    paddingVertical: GLASS_TOKENS.spacing.lg,
  },
  primary: {
    backgroundColor: GLASS_TOKENS.colors.sfssBlue,
  },
  secondary: {
    backgroundColor: GLASS_TOKENS.colors.sfssRed,
  },
  glass: {
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    borderWidth: 1,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    color: GLASS_TOKENS.colors.darkText,
  },
  textsm: {
    fontSize: 12,
  },
  textmd: {
    fontSize: 14,
  },
  textlg: {
    fontSize: 16,
  },
});
