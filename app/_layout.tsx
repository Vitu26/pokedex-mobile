import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { FavoritesProvider } from '../src/presentation/context/FavoritesContext';
import { useColorScheme } from 'react-native';
import { ReactQueryProvider } from '../src/providers/ReactQueryProvider';
import { bulbasaurTheme } from '@/shared/constants/theme';
import { requestNotificationPermission, sendWelcomeNotification } from '../src/shared/utils/notifications';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // ✅ Inicializa a notificação de boas-vindas
  useEffect(() => {
    async function setupNotifications() {
      const granted = await requestNotificationPermission();
      if (granted) {
        await sendWelcomeNotification();
      }
    }

    setupNotifications();
  }, []);

  if (!loaded) return null;

  return (
    <ReactQueryProvider>
      <FavoritesProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerTitleAlign: 'center',
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: bulbasaurTheme.colors.background,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="PokemonDetailsScreen" options={{ title: 'Detalhes do Pokémon' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </FavoritesProvider>
    </ReactQueryProvider>
  );
}
