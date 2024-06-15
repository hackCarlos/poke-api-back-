import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { RegisterUserDto } from '../dtos/RegisterUser.dto';
import { RegisterUser } from 'src/application/RegisterUser';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiOkResponse({ description: 'Create user successfully' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@ApiUnauthorizedResponse({ description: 'Incorrect auth bearer' })
@Controller('users')
export class UserPostController {
  constructor(private registerUser: RegisterUser) {}

  @Post()
  @HttpCode(201)
  async run(@Body() request: RegisterUserDto) {
    return this.registerUser.run(request);
  }
}
