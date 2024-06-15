import { IsNotEmpty } from 'class-validator';

export class IdUserParamDto {
  @IsNotEmpty()
  id: string;
}
