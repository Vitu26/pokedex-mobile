
import { IPokemonRepository } from '../repository/IPokemonRepository';
import { Pokemon } from '../models/Pokemon';

export class GetPokemonByNameUseCase {
  constructor(private repository: IPokemonRepository) {}

  async execute(name: string): Promise<Pokemon> {
    return this.repository.getPokemonByName(name);
  }
}
