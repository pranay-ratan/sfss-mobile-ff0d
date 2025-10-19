import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/glass/GlassCard';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

export default function MarketplaceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <GlassCard intensity={20}>
          <View style={styles.placeholder}>
            <Ionicons
              name="bag"
              size={64}
              color={GLASS_TOKENS.colors.sfssBlue}
            />
            <Text style={styles.title}>Marketplace</Text>
            <Text style={styles.description}>
              Buy and sell items from fellow students. Coming soon!
            </Text>
          </View>
        </GlassCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLASS_TOKENS.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
  },
  placeholder: {
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
  },
  title: {
    ...GLASS_TOKENS.typography.h3,
    color: GLASS_TOKENS.colors.darkText,
  },
  description: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.darkText,
    textAlign: 'center',
    opacity: 0.7,
  },
});
