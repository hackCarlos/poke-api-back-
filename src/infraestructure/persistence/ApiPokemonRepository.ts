import { Pokemon } from 'src/domain/Pokemon';
import { PokemonRepository } from 'src/domain/repositories/PokemonRepository';
import axios from 'axios';
import { NotFoundException } from '@nestjs/common';

export class ApiPokemonRepository implements PokemonRepository {
  constructor() {}

  POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

  public async search(name: string): Promise<Pokemon | null> {
    const data = await axios
      .get(`${this.POKEMON_API_URL}${name}`)
      .catch((error) => {
        console.log(error);
        throw new NotFoundException(`No existe el pokemon: ${name}`);
      });
    return data ? new Pokemon({ name }) : null;
  }

  public async pokemonsExists(pokemons: Array<string>): Promise<boolean> {
    const requests = pokemons.map(
      async (pokemon) => await this.search(pokemon).catch(() => undefined),
    );
    const responses = (await Promise.all(requests)).filter(
      (response) => !response,
    );

    return responses.length === 0;
  }
}
