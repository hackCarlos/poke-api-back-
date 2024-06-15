import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from 'src/domain/repositories/UserRepository';

@Injectable()
export class DeleteUser {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
  ) {}

  async run(id: string): Promise<void> {
    const [user] = await this.repository.search({ id });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.repository.delete(id);
  }
}
