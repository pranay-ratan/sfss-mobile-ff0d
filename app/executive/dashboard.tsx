import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

interface ExecutiveRole {
  id: string;
  title: string;
  icon: string;
  color: string;
  features: string[];
}

const EXECUTIVE_ROLES: ExecutiveRole[] = [
  {
    id: 'president',
    title: 'President',
    icon: 'crown',
    color: GLASS_TOKENS.colors.sfssRed,
    features: ['Council Voting', 'Document Uploads', 'Room Booking'],
  },
  {
    id: 'treasurer',
    title: 'Treasurer',
    icon: 'calculator',
    color: '#10b981',
    features: ['Cheque Requisition', 'Budget Reports', 'Document Uploads'],
  },
  {
    id: 'secretary',
    title: 'Secretary',
    icon: 'document-text',
    color: '#3b82f6',
    features: ['Minutes', 'Document Uploads', 'Council Voting'],
  },
  {
    id: 'admin',
    title: 'Admin',
    icon: 'shield-checkmark',
    color: '#8b5cf6',
    features: ['User Management', 'System Settings', 'All Features'],
  },
];

const QUICK_ACTIONS = [
  { id: 'cheque', label: 'Cheque Req.', icon: 'checkmark-circle', route: 'executive/cheque-requisition' },
  { id: 'voting', label: 'Voting', icon: 'checkbox', route: 'executive/voting' },
  { id: 'booking', label: 'Room Book', icon: 'door-open', route: 'executive/room-booking' },
  { id: 'documents', label: 'Documents', icon: 'folder', route: 'executive/document-uploads' },
];

export default function ExecutivePortal() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={28}
              color={GLASS_TOKENS.colors.sfssBlue}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Executive Portal</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={[GLASS_TOKENS.colors.sfssRed, '#991b1b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.heroTitle}>Welcome Back!</Text>
          <Text style={styles.heroSubtitle}>Manage executive operations</Text>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => router.push(action.route as any)}
              >
                <GlassCard intensity={15} style={styles.quickAction}>
                  <Ionicons
                    name={action.icon as any}
                    size={32}
                    color={GLASS_TOKENS.colors.sfssRed}
                  />
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Your Roles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Roles</Text>
          <View style={styles.rolesContainer}>
            {EXECUTIVE_ROLES.slice(0, 2).map((role) => (
              <GlassCard key={role.id} intensity={15} style={styles.roleCard}>
                <View style={styles.roleHeader}>
                  <View
                    style={[styles.roleIconContainer, { backgroundColor: role.color }]}
                  >
                    <Ionicons
                      name={role.icon as any}
                      size={24}
                      color={GLASS_TOKENS.colors.white}
                    />
                  </View>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                </View>
                <Text style={styles.roleFeatures}>{role.features.join(' • ')}</Text>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.statsGrid}>
            <GlassCard style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Decisions Made</Text>
            </GlassCard>
            <GlassCard style={styles.statItem}>
              <Text style={styles.statNumber}>$4.5K</Text>
              <Text style={styles.statLabel}>Approved Budget</Text>
            </GlassCard>
            <GlassCard style={styles.statItem}>
              <Text style={styles.statNumber}>89%</Text>
              <Text style={styles.statLabel}>Participation</Text>
            </GlassCard>
          </View>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  headerTitle: {
    ...GLASS_TOKENS.typography.h3,
    color: GLASS_TOKENS.colors.darkText,
    flex: 1,
    textAlign: 'center',
  },
  hero: {
    marginHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.md,
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.xl,
    borderRadius: GLASS_TOKENS.radius.lg,
  },
  heroTitle: {
    ...GLASS_TOKENS.typography.h2,
    color: GLASS_TOKENS.colors.white,
    marginBottom: GLASS_TOKENS.spacing.sm,
  },
  heroSubtitle: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.white,
    opacity: 0.9,
  },
  section: {
    marginVertical: GLASS_TOKENS.spacing.md,
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
  },
  sectionTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GLASS_TOKENS.spacing.md,
  },
  quickAction: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1.2,
    paddingVertical: GLASS_TOKENS.spacing.lg,
  },
  quickActionLabel: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    marginTop: GLASS_TOKENS.spacing.sm,
    textAlign: 'center',
  },
  rolesContainer: {
    gap: GLASS_TOKENS.spacing.md,
  },
  roleCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  roleIconContainer: {
    width: 44,
    height: 44,
    borderRadius: GLASS_TOKENS.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
  },
  roleFeatures: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.7,
    lineHeight: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: GLASS_TOKENS.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: GLASS_TOKENS.spacing.lg,
  },
  statNumber: {
    ...GLASS_TOKENS.typography.h2,
    color: GLASS_TOKENS.colors.sfssRed,
  },
  statLabel: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    marginTop: GLASS_TOKENS.spacing.sm,
  },
});
