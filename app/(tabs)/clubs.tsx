import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

interface Club {
  id: string;
  name: string;
  category: string;
  members: number;
  description: string;
  icon: string;
  joined: boolean;
}

const MOCK_CLUBS: Club[] = [
  {
    id: '1',
    name: 'Coding Club',
    category: 'Technology',
    members: 156,
    description: 'Learn and share programming skills',
    icon: 'code-slash',
    joined: false,
  },
  {
    id: '2',
    name: 'Photography Club',
    category: 'Arts',
    members: 89,
    description: 'Capture moments and share perspectives',
    icon: 'camera',
    joined: true,
  },
  {
    id: '3',
    name: 'Debate Society',
    category: 'Academics',
    members: 67,
    description: 'Sharpen your argumentation skills',
    icon: 'chatbubbles',
    joined: false,
  },
  {
    id: '4',
    name: 'Basketball Team',
    category: 'Sports',
    members: 234,
    description: 'Competitive basketball league',
    icon: 'basketball',
    joined: false,
  },
  {
    id: '5',
    name: 'Music Ensemble',
    category: 'Arts',
    members: 45,
    description: 'Play and perform together',
    icon: 'musical-notes',
    joined: false,
  },
  {
    id: '6',
    name: 'Environmental Club',
    category: 'Community',
    members: 123,
    description: 'Sustainability and eco-initiatives',
    icon: 'leaf',
    joined: true,
  },
];

const CATEGORIES = ['All', 'Technology', 'Arts', 'Academics', 'Sports', 'Community'];

export default function ClubsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [clubs, setClubs] = useState(MOCK_CLUBS);

  const filteredClubs = selectedCategory === 'All'
    ? clubs
    : clubs.filter((c) => c.category === selectedCategory);

  const handleJoin = (id: string) => {
    setClubs(clubs.map((c) => (c.id === id ? { ...c, joined: !c.joined } : c)));
  };

  const renderClubCard = ({ item }: { item: Club }) => (
    <GlassCard style={styles.clubCard} intensity={15}>
      <View style={styles.clubHeader}>
        <View
          style={[
            styles.clubIconContainer,
            item.joined && styles.clubIconContainerActive,
          ]}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            color={item.joined ? GLASS_TOKENS.colors.white : GLASS_TOKENS.colors.sfssBlue}
          />
        </View>
        <View style={styles.clubInfo}>
          <Text style={styles.clubName}>{item.name}</Text>
          <Text style={styles.clubCategory}>{item.category}</Text>
        </View>
        <Text style={styles.memberCount}>{item.members}</Text>
      </View>

      <Text style={styles.clubDescription}>{item.description}</Text>

      <View style={styles.clubFooter}>
        <View style={styles.membersTag}>
          <Ionicons
            name="people"
            size={12}
            color={GLASS_TOKENS.colors.darkText}
          />
          <Text style={styles.membersLabel}>members</Text>
        </View>
        <GlassButton
          label={item.joined ? 'Joined' : 'Join'}
          onPress={() => handleJoin(item.id)}
          variant={item.joined ? 'secondary' : 'primary'}
          size="sm"
        />
      </View>
    </GlassCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Clubs & Societies</Text>
        <Text style={styles.subtitle}>
          {clubs.filter((c) => c.joined).length} clubs joined
        </Text>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.filterChip,
              selectedCategory === category && styles.filterChipActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Clubs List */}
      <FlatList
        data={filteredClubs}
        renderItem={renderClubCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLASS_TOKENS.colors.background,
  },
  header: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.md,
  },
  title: {
    ...GLASS_TOKENS.typography.h3,
    color: GLASS_TOKENS.colors.darkText,
  },
  subtitle: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.darkText,
    marginTop: GLASS_TOKENS.spacing.sm,
    opacity: 0.7,
  },
  filterScroll: {
    maxHeight: 50,
  },
  filterContainer: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.sm,
    gap: GLASS_TOKENS.spacing.md,
  },
  filterChip: {
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.sm,
    borderRadius: GLASS_TOKENS.radius.full,
    borderWidth: 1,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
  },
  filterChipActive: {
    backgroundColor: GLASS_TOKENS.colors.sfssBlue,
    borderColor: GLASS_TOKENS.colors.sfssBlue,
  },
  filterText: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
  },
  filterTextActive: {
    color: GLASS_TOKENS.colors.white,
  },
  listContent: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    paddingVertical: GLASS_TOKENS.spacing.md,
    paddingBottom: 80,
    gap: GLASS_TOKENS.spacing.md,
  },
  clubCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
  },
  clubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: GLASS_TOKENS.spacing.md,
    gap: GLASS_TOKENS.spacing.md,
  },
  clubIconContainer: {
    width: 48,
    height: 48,
    borderRadius: GLASS_TOKENS.radius.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clubIconContainerActive: {
    backgroundColor: GLASS_TOKENS.colors.sfssBlue,
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
  },
  clubCategory: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.7,
    marginTop: 2,
  },
  memberCount: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.sfssBlue,
  },
  clubDescription: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.md,
    lineHeight: 18,
  },
  clubFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: GLASS_TOKENS.spacing.md,
    paddingTop: GLASS_TOKENS.spacing.md,
    borderTopWidth: 1,
    borderTopColor: GLASS_TOKENS.colors.glassBorderLight,
  },
  membersTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.sm,
  },
  membersLabel: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
  },
});
