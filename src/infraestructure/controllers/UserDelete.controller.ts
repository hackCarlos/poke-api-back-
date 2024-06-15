import { Controller, UseGuards, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '../auth/AuthGuard';
import { IdUserParamDto } from '../dtos/IdUserParam.dto';
import { DeleteUser } from 'src/application/DeleteUser';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserDeleteController {
  constructor(private readonly deleteUser: DeleteUser) {}

  @ApiOkResponse({ description: 'Delete user successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiUnauthorizedResponse({ description: 'Incorrect auth bearer' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async run(@Param() param: IdUserParamDto): Promise<void> {
    return this.deleteUser.run(param.id);
  }
}
