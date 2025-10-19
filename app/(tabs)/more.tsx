import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import GlassCard from '@/components/glass/GlassCard';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  description: string;
  route?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'booking',
    label: 'Room Booking',
    icon: 'door-open',
    description: 'Reserve rooms and spaces',
    route: 'executive/room-booking',
  },
  {
    id: 'voting',
    label: 'Council Voting',
    icon: 'checkbox',
    description: 'Vote on council matters',
    route: 'executive/voting',
  },
  {
    id: 'executive',
    label: 'Executive Portal',
    icon: 'shield-checkmark',
    description: 'Executive access & features',
    route: 'executive/dashboard',
  },
  {
    id: 'profile',
    label: 'My Profile',
    icon: 'person',
    description: 'Manage your account',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    description: 'App preferences',
  },
];

export default function MoreScreen() {
  const router = useRouter();
  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.7}
      onPress={() => {
        if (item.route) {
          router.push(item.route as any);
        }
      }}
    >
      <GlassCard intensity={15} style={styles.menuItem}>
        <View style={styles.menuItemContent}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={item.icon as any}
              size={24}
              color={GLASS_TOKENS.colors.sfssBlue}
            />
          </View>
          <View style={styles.menuItemText}>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuDescription}>{item.description}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={GLASS_TOKENS.colors.darkText}
          />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>More</Text>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map(renderMenuItem)}
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
  content: {
    paddingBottom: 80,
  },
  header: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  title: {
    ...GLASS_TOKENS.typography.h3,
    color: GLASS_TOKENS.colors.darkText,
  },
  menuContainer: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.md,
    gap: GLASS_TOKENS.spacing.md,
  },
  menuItem: {
    borderRadius: GLASS_TOKENS.radius.lg,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: GLASS_TOKENS.radius.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    flex: 1,
  },
  menuLabel: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
  },
  menuDescription: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
    marginTop: 2,
  },
});