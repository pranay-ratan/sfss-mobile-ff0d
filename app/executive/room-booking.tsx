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
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

interface Room {
  id: string;
  name: string;
  capacity: number;
  amenities: string[];
  available: boolean;
}

interface Booking {
  id: string;
  room: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Board Room A',
    capacity: 12,
    amenities: ['Projector', 'Whiteboard', 'Video Conference'],
    available: true,
  },
  {
    id: '2',
    name: 'Meeting Room B',
    capacity: 6,
    amenities: ['Display Screen', 'Phone System'],
    available: true,
  },
  {
    id: '3',
    name: 'Conference Hall',
    capacity: 50,
    amenities: ['Projector', 'Sound System', 'Catering'],
    available: false,
  },
  {
    id: '4',
    name: 'Study Room C',
    capacity: 4,
    amenities: ['Whiteboard'],
    available: true,
  },
];

const BOOKINGS: Booking[] = [
  {
    id: '1',
    room: 'Board Room A',
    date: 'Dec 20',
    time: '2:00 PM',
    duration: '1 hour',
    status: 'confirmed',
  },
  {
    id: '2',
    room: 'Meeting Room B',
    date: 'Dec 22',
    time: '10:00 AM',
    duration: '2 hours',
    status: 'pending',
  },
];

export default function RoomBooking() {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const renderRoom = ({ item }: { item: Room }) => (
    <TouchableOpacity onPress={() => setSelectedRoom(item.id)}>
      <GlassCard
        intensity={15}
        style={[
          styles.roomCard,
          selectedRoom === item.id && styles.roomCardSelected,
        ]}
      >
        <View style={styles.roomHeader}>
          <View>
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.roomCapacity}>
              Capacity: {item.capacity} people
            </Text>
          </View>
          <View
            style={[
              styles.availabilityBadge,
              !item.available && styles.unavailable,
            ]}
          >
            <Ionicons
              name={item.available ? 'checkmark-circle' : 'close-circle'}
              size={20}
              color={GLASS_TOKENS.colors.white}
            />
          </View>
        </View>
        <View style={styles.amenitiesContainer}>
          {item.amenities.map((amenity, idx) => (
            <View key={idx} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  const renderBooking = ({ item }: { item: Booking }) => (
    <GlassCard intensity={15} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingRoom}>{item.room}</Text>
          <Text style={styles.bookingTime}>
            {item.date} • {item.time} • {item.duration}
          </Text>
        </View>
        <View
          style={[
            styles.bookingStatusBadge,
            {
              backgroundColor:
                item.status === 'confirmed'
                  ? '#10b981'
                  : item.status === 'pending'
                  ? '#f59e0b'
                  : '#ef4444',
            },
          ]}
        >
          <Text style={styles.bookingStatusText}>{item.status}</Text>
        </View>
      </View>
    </GlassCard>
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
          <Text style={styles.headerTitle}>Room Booking</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Date Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date & Time</Text>
          <GlassCard intensity={15}>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity style={styles.dateButton}>
                <Ionicons
                  name="calendar"
                  size={20}
                  color={GLASS_TOKENS.colors.sfssBlue}
                />
                <Text style={styles.dateButtonText}>Dec 20, 2024</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timeButton}>
                <Ionicons
                  name="time"
                  size={20}
                  color={GLASS_TOKENS.colors.sfssBlue}
                />
                <Text style={styles.timeButtonText}>2:00 PM</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>

        {/* Available Rooms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rooms</Text>
          <FlatList
            data={ROOMS}
            renderItem={renderRoom}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: GLASS_TOKENS.spacing.md }} />}
          />
        </View>

        {/* Your Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Bookings</Text>
          {BOOKINGS.length > 0 ? (
            <FlatList
              data={BOOKINGS}
              renderItem={renderBooking}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={{ height: GLASS_TOKENS.spacing.md }} />
              )}
            />
          ) : (
            <GlassCard intensity={15}>
              <Text style={styles.noBookingsText}>No bookings yet</Text>
            </GlassCard>
          )}
        </View>

        {/* Book Button */}
        {selectedRoom && (
          <View style={styles.bookButtonContainer}>
            <GlassButton
              label="Book Room"
              onPress={() => {}}
              variant="primary"
              size="lg"
            />
          </View>
        )}
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
  section: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.md,
  },
  sectionTitle: {
    ...GLASS_TOKENS.typography.h4,
    color: GLASS_TOKENS.colors.darkText,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: GLASS_TOKENS.spacing.md,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.md,
    borderWidth: 1,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
    borderRadius: GLASS_TOKENS.radius.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
  },
  dateButtonText: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.darkText,
  },
  timeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: GLASS_TOKENS.spacing.md,
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.md,
    borderWidth: 1,
    borderColor: GLASS_TOKENS.colors.glassBorderLight,
    borderRadius: GLASS_TOKENS.radius.md,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
  },
  timeButtonText: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.darkText,
  },
  roomCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roomCardSelected: {
    borderColor: GLASS_TOKENS.colors.sfssBlue,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  roomName: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
  },
  roomCapacity: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
    marginTop: 2,
  },
  availabilityBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailable: {
    backgroundColor: '#ef4444',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    gap: GLASS_TOKENS.spacing.sm,
    flexWrap: 'wrap',
  },
  amenityTag: {
    backgroundColor: GLASS_TOKENS.colors.glassLight,
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.sm,
    borderRadius: GLASS_TOKENS.radius.full,
  },
  amenityText: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
  },
  bookingCard: {
    borderRadius: GLASS_TOKENS.radius.lg,
    marginBottom: GLASS_TOKENS.spacing.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingInfo: {
    flex: 1,
  },
  bookingRoom: {
    ...GLASS_TOKENS.typography.button,
    color: GLASS_TOKENS.colors.darkText,
  },
  bookingTime: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
    marginTop: 2,
  },
  bookingStatusBadge: {
    paddingHorizontal: GLASS_TOKENS.spacing.md,
    paddingVertical: GLASS_TOKENS.spacing.sm,
    borderRadius: GLASS_TOKENS.radius.md,
  },
  bookingStatusText: {
    ...GLASS_TOKENS.typography.caption,
    color: GLASS_TOKENS.colors.white,
    textTransform: 'capitalize',
  },
  noBookingsText: {
    ...GLASS_TOKENS.typography.body,
    color: GLASS_TOKENS.colors.darkText,
    opacity: 0.6,
    textAlign: 'center',
  },
  bookButtonContainer: {
    paddingHorizontal: GLASS_TOKENS.spacing.lg,
    marginVertical: GLASS_TOKENS.spacing.lg,
  },
});
