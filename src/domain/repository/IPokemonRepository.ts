import { Pokemon } from '../models/Pokemon';

export interface IPokemonRepository {
  getPokemonByName(name: string): Promise<Pokemon>;
  getFavorites(): Promise<Pokemon[]>;
  getPokemons(limit: number, offset: number): Promise<Pokemon[]>;
}
