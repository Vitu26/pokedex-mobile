
import { IPokemonRepository } from '../repository/IPokemonRepository';
import { Pokemon } from '../models/Pokemon';

export class GetFavoritesUseCase {
  constructor(private repository: IPokemonRepository) {}

  async execute(): Promise<Pokemon[]> {
    return this.repository.getFavorites();
  }
}
