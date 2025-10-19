import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

export default function HomeScreen() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={[GLASS_TOKENS.colors.sfssBlue, '#1e3a8a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroContent}>
            <Text style={styles.greeting}>{greeting}! 👋</Text>
            <Text style={styles.heroSubtitle}>Welcome to SFSS</Text>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Active Clubs</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Upcoming Events</Text>
          </GlassCard>
        </View>

        {/* Services Widget */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <GlassCard intensity={15}>
            <View style={styles.serviceGrid}>
              <GlassButton
                label="Events"
                onPress={() => {}}
                variant="glass"
                size="sm"
              />
              <GlassButton
                label="Clubs"
                onPress={() => {}}
                variant="glass"
                size="sm"
              />
              <GlassButton
                label="Book Room"
                onPress={() => {}}
                variant="glass"
                size="sm"
              />
              <GlassButton
                label="Marketplace"
                onPress={() => {}}
                variant="glass"
                size="sm"
              />
            </View>
          </GlassCard>
        </View>

        {/* News Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <GlassCard intensity={15}>
            <Text style={styles.newsHeadline}>
              Annual SFSS Gala - Mark Your Calendars!
            </Text>
            <Text style={styles.newsPreview}>
              Join us for an evening of celebration, food, and community. Tickets on sale next week.
            </Text>
            <GlassButton
              label="Read More"
              onPress={() => {}}
              variant="primary"
              size="sm"
              style={styles.newsButton}
            />
          </GlassCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLASS_TOKENS.colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  hero: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.xl,
    borderBottomLeftRadius: GLASS_TOKENS.radius.lg,
    borderBottomRightRadius: GLASS_TOKENS.radius.lg,
  },
  heroContent: {
    marginTop: GLASS_TOKENS.spacing.lg,
  },
  greeting: {
    ...GLASS_TOKENS.typography.h2,
    color: GLASS_TOKENS.colors.white,
    marginBottom: GLASS_TOKENS.spacing.sm,
  },
  heroSubtitle: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.white,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.lg,
    gap: GLASS_TOKENS.spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  statNumber: {
    ...GLASS_TOKENS.typography.h2,
    color: GLASS_TOKENS.colors.sfssBlue,
  },
  statLabel: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    marginTop: GLASS_TOKENS.spacing.sm,
  },
  section: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.md,
  },
  sectionTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GLASS_TOKENS.spacing.md,
  },
  newsHeadline: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.sm,
  },
  newsPreview: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.md,
    lineHeight: 20,
  },
  newsButton: {
    marginTop: GLASS_TOKENS.spacing.sm,
  },
});
