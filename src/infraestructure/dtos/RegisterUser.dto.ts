import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
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

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => GeolocationDto)
  geolocation: GeolocationDto;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  pokemons: string[];

  @IsBoolean()
  isAdmin: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;
}
