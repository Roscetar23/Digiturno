import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  readonly rol: string;
}
