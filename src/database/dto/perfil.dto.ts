import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';

import { Role } from 'src/constants/enumRole.constants';

export class CreatePerfilDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  role: 'radicacion' | 'validacion';
}
