import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginUser } from 'src/application/LoginUser';
import { LoginUserDto } from '../dtos/LoginUser.dto';

@ApiTags('login')
@Controller('auth')
export class LoginPostController {
  constructor(private readonly loginUser: LoginUser) {}

  @ApiOkResponse({ description: 'Login success' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiUnauthorizedResponse({ description: 'Incorrect email or passsword' })
  @HttpCode(200)
  @Post('login')
  async run(@Body() request: LoginUserDto) {
    return this.loginUser.run({
      email: request.email,
      password: request.password,
    });
  }
}
