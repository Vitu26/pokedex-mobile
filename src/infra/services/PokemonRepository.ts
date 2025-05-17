// src/infrastructure/repositories/PokemonRepository.ts
import { IPokemonRepository } from '../../domain/repository/IPokemonRepository';
import { Pokemon } from '../../domain/models/Pokemon';
import {
  getPokemonByName as fetchPokemon,
  getFavorites as fetchFavoriteIds,
  getPokemons as fetchPokemonsList,
} from '../services/pokemonService';

export class PokemonRepository implements IPokemonRepository {
  async getPokemonByName(name: string): Promise<Pokemon> {
    return await fetchPokemon(name);
  }

  async getFavorites(): Promise<Pokemon[]> {
    const ids = await fetchFavoriteIds();
    const pokemons = await Promise.all(ids.map((id) => fetchPokemon(id)));
    return pokemons;
  }

  async getPokemons(limit: number, offset: number): Promise<Pokemon[]> {
    const list = await fetchPokemonsList(limit, offset);
    const pokemons = await Promise.all(
      list.results.map((item) => fetchPokemon(item.name))
    );
    return pokemons;
  }
}
