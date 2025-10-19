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

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: 'sports' | 'social' | 'academic' | 'cultural';
}

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual SFSS Gala',
    date: 'Dec 15',
    time: '7:00 PM',
    location: 'Main Hall',
    attendees: 245,
    category: 'social',
  },
  {
    id: '2',
    title: 'Career Fair 2024',
    date: 'Dec 18',
    time: '10:00 AM',
    location: 'Convention Center',
    attendees: 89,
    category: 'academic',
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    date: 'Dec 20',
    time: '3:00 PM',
    location: 'Sports Complex',
    attendees: 156,
    category: 'sports',
  },
  {
    id: '4',
    title: 'Cultural Night',
    date: 'Dec 22',
    time: '6:00 PM',
    location: 'Auditorium',
    attendees: 312,
    category: 'cultural',
  },
];

const CATEGORIES = ['all', 'sports', 'social', 'academic', 'cultural'];
const CATEGORY_COLORS = {
  sports: '#ef4444',
  social: '#3b82f6',
  academic: '#10b981',
  cultural: '#f59e0b',
};

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents = selectedCategory === 'all'
    ? MOCK_EVENTS
    : MOCK_EVENTS.filter((e) => e.category === selectedCategory);

  const renderEventCard = ({ item }: { item: Event }) => (
    <GlassCard style={styles.eventCard} intensity={15}>
      <View style={styles.eventHeader}>
        <View style={styles.eventDateBadge}>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventTime}>{item.time}</Text>
        </View>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: CATEGORY_COLORS[item.category] },
          ]}
        >
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <View style={styles.eventMeta}>
        <Ionicons
          name="location"
          size={14}
          color={GLASS_TOKENS.colors.darkText}
        />
        <Text style={styles.eventLocation}>{item.location}</Text>
      </View>
      <View style={styles.eventFooter}>
        <View style={styles.attendees}>
          <Ionicons
            name="people"
            size={14}
            color={GLASS_TOKENS.colors.darkText}
          />
          <Text style={styles.attendeesText}>{item.attendees} attending</Text>
        </View>
        <GlassButton
          label="RSVP"
          onPress={() => {}}
          variant="primary"
          size="sm"
        />
      </View>
    </GlassCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Events</Text>
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
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
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
  eventCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  eventDateBadge: {
    backgroundColor: GLASS_TOKENS.colors.sfssBlue,
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.sm,
    borderRadius: GLASS_TOKENS.radius.md,
  },
  eventDate: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.white,
    fontSize: 14,
  },
  eventTime: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.white,
    marginTop: 2,
  },
  categoryBadge: {
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.sm,
    borderRadius: GLASS_TOKENS.radius.md,
  },
  categoryText: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.white,
    textTransform: 'capitalize',
  },
  eventTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.sm,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: GLASS_TOKENS.spacing.md,
    gap: GLASS_TOKENS.spacing.sm,
  },
  eventLocation: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.darkText,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: GLASS_TOKENS.spacing.md,
    paddingTop: GLASS_TOKENS.spacing.md,
    borderTopWidth: 1,
    borderTopColor: GLASS_TOKENS.colors.glassBorderLight,
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.sm,
  },
  attendeesText: {
    ...GLASS_TOKENS.typography.bodySmall,
    color: GLASS_TOKENS.colors.darkText,
  },
});
