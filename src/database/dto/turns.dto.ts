import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoDocumento } from 'src/constants/enumTurns.constants';
import { TipoConsulta } from 'src/constants/enumTurns.constants';

export class CreateTurnDto {
  @IsEnum(TipoDocumento, { message: 'Tipo de documento no válido' })
  tipoDocumento: TipoDocumento;

  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  @IsString()
  numeroDocumento: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString()
  telefono: string;

  @IsEnum(TipoConsulta, { message: 'Tipo de consulta no válido' })
  tipoConsulta: TipoConsulta;
}
