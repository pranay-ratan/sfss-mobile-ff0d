import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

interface AdminSection {
  id: string;
  title: string;
  icon: string;
  items: AdminItem[];
}

interface AdminItem {
  id: string;
  label: string;
  icon: string;
  hasToggle?: boolean;
  enabled?: boolean;
}

const ADMIN_SECTIONS: AdminSection[] = [
  {
    id: 'users',
    title: 'User Management',
    icon: 'people',
    items: [
      { id: 'add-user', label: 'Add User', icon: 'person-add' },
      { id: 'manage-roles', label: 'Manage Roles', icon: 'shield' },
      { id: 'suspend-user', label: 'Suspend Users', icon: 'block' },
      { id: 'audit-log', label: 'Audit Log', icon: 'list' },
    ],
  },
  {
    id: 'system',
    title: 'System Settings',
    icon: 'settings',
    items: [
      { id: 'maintenance', label: 'Maintenance Mode', icon: 'construct', hasToggle: true, enabled: false },
      { id: 'notifications', label: 'Push Notifications', icon: 'notifications', hasToggle: true, enabled: true },
      { id: 'analytics', label: 'Analytics', icon: 'analytics', hasToggle: true, enabled: true },
      { id: 'backup', label: 'System Backup', icon: 'cloud-download' },
    ],
  },
  {
    id: 'content',
    title: 'Content Management',
    icon: 'folder',
    items: [
      { id: 'events', label: 'Manage Events', icon: 'calendar' },
      { id: 'clubs', label: 'Manage Clubs', icon: 'people-circle' },
      { id: 'announcements', label: 'Announcements', icon: 'megaphone' },
      { id: 'reports', label: 'Reports', icon: 'document-text' },
    ],
  },
];

export default function AdminPanel() {
  const router = useRouter();
  const [toggleStates, setToggleStates] = React.useState({
    'maintenance': false,
    'notifications': true,
    'analytics': true,
  });

  const handleToggle = (id: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderAdminItem = (item: AdminItem) => (
    <TouchableOpacity key={item.id} activeOpacity={0.7}>
      <View style={styles.adminItem}>
        <View style={styles.adminItemLeft}>
          <View style={styles.adminItemIcon}>
            <Ionicons
              name={item.icon as any}
              size={20}
              color={GLASS_TOKENS.colors.sfssBlue}
            />
          </View>
          <Text style={styles.adminItemLabel}>{item.label}</Text>
        </View>
        {item.hasToggle ? (
          <Switch
            value={toggleStates[item.id as keyof typeof toggleStates] ?? false}
            onValueChange={() => handleToggle(item.id)}
            trackColor={{
              false: GLASS_TOKENS.colors.glassLight,
              true: GLASS_TOKENS.colors.sfssBlue,
            }}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={GLASS_TOKENS.colors.darkText}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = (section: AdminSection) => (
    <View key={section.id} style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons
          name={section.icon as any}
          size={24}
          color={GLASS_TOKENS.colors.sfssRed}
        />
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      <GlassCard intensity={15} style={styles.sectionCard}>
        {section.items.map((item, idx) => (
          <View key={item.id}>
            {renderAdminItem(item)}
            {idx < section.items.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </GlassCard>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
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
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* System Status */}
        <View style={styles.statusSection}>
          <GlassCard intensity={20}>
            <View style={styles.statusContainer}>
              <View style={styles.statusItem}>
                <View style={styles.statusBullet}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#10b981"
                  />
                </View>
                <View>
                  <Text style={styles.statusLabel}>System Status</Text>
                  <Text style={styles.statusValue}>All Systems Operational</Text>
                </View>
              </View>
              <View style={styles.statusItem}>
                <View style={styles.statusBullet}>
                  <Ionicons
                    name="people"
                    size={24}
                    color={GLASS_TOKENS.colors.sfssBlue}
                  />
                </View>
                <View>
                  <Text style={styles.statusLabel}>Active Users</Text>
                  <Text style={styles.statusValue}>1,247 users online</Text>
                </View>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* Admin Sections */}
        {ADMIN_SECTIONS.map(renderSection)}

        {/* Emergency Actions */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Emergency Actions</Text>
          <View style={styles.emergencyButtonsContainer}>
            <GlassButton
              label="System Restart"
              onPress={() => {}}
              variant="secondary"
              size="lg"
              style={styles.emergencyButton}
            />
            <GlassButton
              label="Clear Cache"
              onPress={() => {}}
              variant="glass"
              size="lg"
              style={styles.emergencyButton}
            />
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
  statusSection: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.md,
  },
  statusContainer: {
    gap: GLASS_TOKENS.spacing.lg,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
  },
  statusBullet: {
    width: 48,
    height: 48,
    borderRadius: GLASS_TOKENS.radius.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusLabel: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
  },
  statusValue: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  sectionTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
  },
  sectionCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
    padding: 0,
    overflow: 'hidden',
  },
  adminItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  adminItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
  },
  adminItemIcon: {
    width: 40,
    height: 40,
    borderRadius: GLASS_TOKENS.radius.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminItemLabel: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.darkText,
  },
  divider: {
    height: 1,
    backgroundColor: GLASS_TOKENS.colors.glassBorderLight,
    marginHorizontal: GLASS_TOKENS.spacing.lg,
  },
  emergencySection: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.xl,
  },
  emergencyTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.sfssRed,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  emergencyButtonsContainer: {
    gap: GLASS_TOKENS.spacing.md,
  },
  emergencyButton: {
    marginTop: 0,
  },
});
