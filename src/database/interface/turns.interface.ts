import { TipoDocumento } from 'src/constants/enumTurns.constants';
import { TipoConsulta } from 'src/constants/enumTurns.constants';

export interface ITurno {
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  nombre: string;
  telefono: string;
  tipoConsulta: TipoConsulta;
}
