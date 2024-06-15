import { Pokemon } from '../Pokemon';

export interface PokemonRepository {
  search(name: string): Promise<Pokemon | null>;
  pokemonsExists(pokemons: Array<string>): Promise<boolean>;
}
