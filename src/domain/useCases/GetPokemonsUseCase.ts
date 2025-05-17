import { IPokemonRepository } from '../repository/IPokemonRepository';
import { Pokemon } from '../models/Pokemon';

export class GetPokemonsUseCase {
  constructor(private repository: IPokemonRepository) {}

  async execute(limit = 151, offset = 0): Promise<Pokemon[]> {
    return this.repository.getPokemons(limit, offset);
  }
}
