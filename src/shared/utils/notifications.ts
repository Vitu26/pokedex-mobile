import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
    };
  },
});


export async function requestNotificationPermission() {
  if (Platform.OS === 'web') return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function sendWelcomeNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bem-vindo à sua Pokédex!',
      body: 'Estamos felizes em te ver novamente no Pokédex!',
    },
    trigger: null, // dispara imediatamente
  });
}

