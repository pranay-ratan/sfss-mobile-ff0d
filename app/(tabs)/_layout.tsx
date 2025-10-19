import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { GLASS_TOKENS } from '@/constants/glass-tokens';
import HomeScreen from './home';
import EventsScreen from './events';
import ClubsScreen from './clubs';
import MarketplaceScreen from './marketplace';
import MoreScreen from './more';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: styles.tabBar,
    tabBarBackground: () => (
      <View style={styles.tabBarBackground} />
    ),
    tabBarActiveTintColor: GLASS_TOKENS.colors.sfssBlue,
    tabBarInactiveTintColor: GLASS_TOKENS.colors.darkText,
    tabBarLabelStyle: styles.tabBarLabel,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="events"
        component={EventsScreen}
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="clubs"
        component={ClubsScreen}
        options={{
          title: 'Clubs',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="marketplace"
        component={MarketplaceScreen}
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="more"
        component={MoreScreen}
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: GLASS_TOKENS.colors.glassBorderLight,
    position: 'absolute',
    height: 60,
    paddingBottom: 8,
  },
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GLASS_TOKENS.colors.glassLight,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
});
