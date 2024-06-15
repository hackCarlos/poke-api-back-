import { Inject, Injectable } from '@nestjs/common';
import { Pokemon } from 'src/domain/Pokemon';
import { PokemonRepository } from 'src/domain/repositories/PokemonRepository';

@Injectable()
export class SearchPokemon {
  constructor(
    @Inject('PokemonRepository')
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async run(pokemonName: string): Promise<Pokemon> {
    return this.pokemonRepository.search(pokemonName);
  }
}
