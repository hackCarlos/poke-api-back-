import {
  Controller,
  UseGuards,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '../auth/AuthGuard';
import { SearchUser } from 'src/application/SearchUser';
import { User } from 'src/domain/User';
import { IdUserParamDto } from '../dtos/IdUserParam.dto';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiOkResponse({ description: 'User found' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@ApiUnauthorizedResponse({ description: 'Incorrect auth bearer' })
@ApiBearerAuth()
@Controller('users')
export class UserGetController {
  constructor(private readonly searchUser: SearchUser) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async run(@Param() param: IdUserParamDto): Promise<User> {
    const user = await this.searchUser.run(param.id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
