import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorite_pokemons';

export async function getFavorites(): Promise<string[]> {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
}

// Alias opcional para clareza
export const getAllFavorites = getFavorites;

export async function isFavorite(id: string): Promise<boolean> {
  const list = await getFavorites();
  return list.includes(id);
}

export async function toggleFavorite(id: string): Promise<boolean> {
  const list = await getFavorites();
  let updated;
  let isNowFavorite: boolean;

  if (list.includes(id)) {
    updated = list.filter((item) => item !== id);
    isNowFavorite = false;
  } else {
    updated = [...list, id];
    isNowFavorite = true;
  }

  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return isNowFavorite;
}
