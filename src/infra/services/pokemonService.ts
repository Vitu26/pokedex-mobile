import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export async function getPokemons(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
}

export async function getPokemonByName(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) throw new Error('Erro ao buscar o Pokémon');
  return response.json();
}

export async function getFavorites(): Promise<string[]> {
  const json = await AsyncStorage.getItem('favorite_pokemons');
  return json ? JSON.parse(json) : [];
}
