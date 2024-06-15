import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/domain/repositories/UserRepository';

@Injectable()
export class LoginUser {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async run({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ access_token: string; idUser: string }> {
    const [user] = await this.userRepository.search({ email, password });

    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      idUser: user.id,
    };
  }
}
