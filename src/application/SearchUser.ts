import { Inject, Injectable } from '@nestjs/common';

import { User } from '../domain/User';
import { UserRepository } from 'src/domain/repositories/UserRepository';

@Injectable()
export class SearchUser {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
  ) {}

  async run(id: string): Promise<User> {
    const [user] = await this.repository.search({ id });

    return user;
  }
}
