import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { GLASS_TOKENS } from '@/constants/glass-tokens';
import { useAuth } from '@/contexts/AuthContext';

interface LoginRole {
  id: 'guest' | 'student' | 'executive';
  title: string;
  icon: string;
  description: string;
  color: string;
  features: string[];
}

const LOGIN_ROLES: LoginRole[] = [
  {
    id: 'guest',
    title: 'Guest',
    icon: 'person',
    description: 'Browse events and clubs',
    color: '#64748b',
    features: ['View Events', 'Browse Clubs', 'Limited Access'],
  },
  {
    id: 'student',
    title: 'Student',
    icon: 'school',
    description: 'Full student access',
    color: GLASS_TOKENS.colors.sfssBlue,
    features: ['RSVP Events', 'Join Clubs', 'Marketplace'],
  },
  {
    id: 'executive',
    title: 'Executive',
    icon: 'shield-checkmark',
    description: 'Executive & admin features',
    color: GLASS_TOKENS.colors.sfssRed,
    features: ['All Student Features', 'Executive Portal', 'Admin Access'],
  },
];

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'guest' | 'student' | 'executive' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (role: 'guest' | 'student' | 'executive') => {
    setError(null);

    try {
      console.log(`Logging in as ${role}`);
      await login(role);
      // Auth state change will automatically redirect to home
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      console.error('Login error:', err);
    }
  };

  const renderRoleCard = (role: LoginRole) => (
    <TouchableOpacity
      key={role.id}
      onPress={() => setSelectedRole(role.id)}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <GlassCard
        intensity={15}
        style={[
          styles.roleCard,
          selectedRole === role.id && styles.roleCardSelected,
        ]}
      >
        {/* Role Icon */}
        <View
          style={[
            styles.roleIconContainer,
            { backgroundColor: role.color },
            selectedRole === role.id && styles.roleIconContainerSelected,
          ]}
        >
          <Ionicons
            name={role.icon as any}
            size={32}
            color={GLASS_TOKENS.colors.white}
          />
        </View>

        {/* Role Title */}
        <Text style={styles.roleTitle}>{role.title}</Text>
        <Text style={styles.roleDescription}>{role.description}</Text>

        {/* Features */}
        <View style={styles.featuresList}>
          {role.features.map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={14}
                color={role.color}
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Selection Indicator */}
        {selectedRole === role.id && (
          <View style={styles.selectedIndicator}>
            <Ionicons
              name="checkmark"
              size={20}
              color={GLASS_TOKENS.colors.white}
            />
          </View>
        )}
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
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
          <View style={styles.logoContainer}>
            <Ionicons
              name="school"
              size={48}
              color={GLASS_TOKENS.colors.white}
            />
          </View>
          <Text style={styles.appTitle}>SFSS</Text>
          <Text style={styles.appSubtitle}>Student Federation</Text>
        </LinearGradient>

        {/* Login Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Role</Text>
          <Text style={styles.sectionDescription}>
            Choose how you want to access SFSS
          </Text>

          <View style={styles.rolesGrid}>
            {LOGIN_ROLES.map(renderRoleCard)}
          </View>
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle"
              size={20}
              color={GLASS_TOKENS.colors.sfssRed}
            />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <GlassButton
            label={isLoading ? 'Logging in...' : 'Continue'}
            onPress={() => {
              if (selectedRole) {
                handleLogin(selectedRole);
              }
            }}
            variant="primary"
            size="lg"
            disabled={!selectedRole || isLoading}
            style={[!selectedRole && styles.buttonDisabled]}
          />

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color={GLASS_TOKENS.colors.sfssBlue}
              />
            </View>
          )}
        </View>

        {/* Footer Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Having trouble? Contact support or use Guest mode to explore.
          </Text>
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
  scrollContent: {
    paddingBottom: 40,
  },
  hero: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: GLASS_TOKENS.radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: GLASS_TOKENS.spacing.lg,
  },
  appTitle: {
    ...GLASS_TOKENS.typography.h1,
    color: GLASS_TOKENS.colors.white,
    marginBottom: GLASS_TOKENS.spacing.sm,
  },
  appSubtitle: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.white,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.xl,
  },
  sectionTitle: {
    ...GLASS_TOKENS.typography.h3,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.sm,
    textAlign: 'center',
  },
  sectionDescription: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: GLASS_TOKENS.spacing.lg,
  },
  rolesGrid: {
    gap: GLASS_TOKENS.spacing.md,
  },
  roleCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingVertical: GLASS_TOKENS.spacing.lg,
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    alignItems: 'center',
    position: 'relative',
  },
  roleCardSelected: {
    borderColor: GLASS_TOKENS.colors.sfssBlue,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
  },
  roleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: GLASS_TOKENS.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  roleIconContainerSelected: {
    transform: [{ scale: 1.1 }],
  },
  roleTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.sm,
  },
  roleDescription: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.7,
    marginBottom: GLASS_TOKENS.spacing.md,
    textAlign: 'center',
  },
  featuresList: {
    gap: GLASS_TOKENS.spacing.sm,
    width: '100%',
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.sm,
  },
  featureText: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
  },
  selectedIndicator: {
    position: 'absolute',
    top: GLASS_TOKENS.spacing.md,
    right: GLASS_TOKENS.spacing.md,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: GLASS_TOKENS.colors.sfssBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.lg,
    position: 'relative',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    marginTop: GLASS_TOKENS.spacing.md,
    alignItems: 'center',
  },
  errorContainer: {
    marginHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
    backgroundColor: '#fee2e2',
    borderRadius: GLASS_TOKENS.radius.md,
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  errorText: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.sfssRed,
    flex: 1,
  },
  footer: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.lg,
  },
  footerText: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.5,
    textAlign: 'center',
  },
});