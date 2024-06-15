import { Controller, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/AuthGuard';
import { IdUserParamDto } from '../dtos/IdUserParam.dto';
import { UpdateUserDto } from '../dtos/UpdateUser.dto';
import { UpdateUser } from 'src/application/UpdateUser';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiOkResponse({ description: 'Update user successfully' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@ApiUnauthorizedResponse({ description: 'Incorrect auth bearer' })
@ApiBearerAuth()
@Controller('users')
export class UserPatchController {
  constructor(private readonly updateUser: UpdateUser) {}

  @UseGuards(AuthGuard)
  @Patch(':id')
  async run(
    @Param() param: IdUserParamDto,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return this.updateUser.run(param.id, body);
  }
}
