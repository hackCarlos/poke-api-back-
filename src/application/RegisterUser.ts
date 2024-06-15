import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Geolocation } from 'src/domain/Geolocation';

import { User } from 'src/domain/User';
import { UserRepository } from 'src/domain/repositories/UserRepository';
import { RegisterUserDto } from 'src/infraestructure/dtos/RegisterUser.dto';
import { PokemonRepository } from 'src/domain/repositories/PokemonRepository';

@Injectable()
export class RegisterUser {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    @Inject('PokemonRepository')
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async run(request: RegisterUserDto): Promise<void> {
    if (await this.existEmailUser(request.email)) {
      throw new ConflictException('El correo ya está registrado');
    }

    if (!(await this.pokemonRepository.pokemonsExists(request.pokemons))) {
      throw new BadRequestException('Los pokemons deben existir en PokeAPI');
    }

    const user = new User({
      email: request.email,
      name: request.name,
      password: request.password,
      geolocation: new Geolocation({
        lattitude: request.geolocation.lattitude,
        longitude: request.geolocation.longitude,
      }),
      pokemons: request.pokemons,
      isAdmin: request.isAdmin,
    });

    return this.repository.save(user);
  }

  async existEmailUser(email: string): Promise<boolean> {
    const user = await this.repository.search({ email });
    console.log(user, user.length, user.length > 0 ? true : false);
    return user.length > 0 ? true : false;
  }
}
