import { PokemonRepository } from '../infra/services/PokemonRepository';
import { GetFavoritesUseCase } from '../domain/useCases/GetFavoritesUseCase';
import { GetPokemonByNameUseCase } from '../domain/useCases/GetPokemonByNameUseCase';
import { GetPokemonsUseCase } from '../domain/useCases/GetPokemonsUseCase';

const repository = new PokemonRepository();

export const getFavoritesUseCase = new GetFavoritesUseCase(repository);
export const getPokemonByNameUseCase = new GetPokemonByNameUseCase(repository);
export const getPokemonsUseCase = new GetPokemonsUseCase(repository);
