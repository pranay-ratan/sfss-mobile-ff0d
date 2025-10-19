import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { GLASS_TOKENS } from '@/constants/glass-tokens';

export default function ExecutiveLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: GLASS_TOKENS.colors.background },
        }}
      >
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="cheque-requisition" options={{ headerShown: false }} />
        <Stack.Screen name="document-uploads" options={{ headerShown: false }} />
        <Stack.Screen name="voting" options={{ headerShown: false }} />
        <Stack.Screen name="room-booking" options={{ headerShown: false }} />
        <Stack.Screen name="admin-panel" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
