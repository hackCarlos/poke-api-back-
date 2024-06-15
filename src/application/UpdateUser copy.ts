import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from 'src/domain/User';
import { UserRepository } from 'src/domain/repositories/UserRepository';
import { PokemonRepository } from 'src/domain/repositories/PokemonRepository';
import { UpdateUserDto } from 'src/infraestructure/dtos/UpdateUser.dto';

@Injectable()
export class UpdateUser {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    @Inject('PokemonRepository')
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async run(id: string, request: UpdateUserDto): Promise<void> {
    const [user] = await this.repository.search({ id });

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    if (
      request.pokemons &&
      !(await this.pokemonRepository.pokemonsExists(request.pokemons))
    ) {
      throw new BadRequestException('Los pokemons deben existir en PokeAPI');
    }

    return this.repository.update(
      id,
      new User({
        email: user.email,
        name: request.name || user.name,
        geolocation: request.geolocation || user.geolocation,
        pokemons: request.pokemons || user.pokemons,
        isAdmin: user.isAdmin,
        password: user.password,
      }),
    );
  }
}
