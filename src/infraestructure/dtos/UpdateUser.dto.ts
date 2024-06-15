import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class GeolocationDto {
  @IsNotEmpty()
  @IsNumber()
  lattitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => GeolocationDto)
  geolocation: GeolocationDto;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMinSize(2)
  pokemons: string[];
}
