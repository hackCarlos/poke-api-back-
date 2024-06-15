import { Geolocation } from './Geolocation';

export class User {
  readonly id: string;
  readonly email?: string;
  readonly name?: string;
  readonly geolocation: Geolocation;
  readonly pokemons: Array<string>;
  readonly isAdmin: boolean;
  readonly password?: string;

  constructor({
    id,
    email,
    name,
    geolocation,
    pokemons,
    isAdmin,
    password,
  }: {
    id?: string;
    email?: string;
    name?: string;
    geolocation?: Geolocation;
    pokemons?: Array<string>;
    isAdmin: boolean;
    password?: string;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.geolocation = geolocation;
    this.pokemons = pokemons;
    this.isAdmin = isAdmin;
    this.password = password;
  }
}
