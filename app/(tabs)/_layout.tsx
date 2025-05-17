import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          color: '#F2F2F2',
        },
        tabBarStyle: {
          height: 85,
          backgroundColor: '#1E1E1E',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 8,
        },
        tabBarActiveTintColor: '#FFD700', // cor amarela para aba ativa
        tabBarInactiveTintColor: '#aaa',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size ?? 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="FavoritesScreen"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" color={color} size={size ?? 22} />
          ),
        }}
      />
    </Tabs>
  );
  
}