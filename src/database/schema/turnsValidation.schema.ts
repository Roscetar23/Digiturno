import { TipoDocumento } from 'src/constants/enumTurns.constants';
import { TipoConsulta } from 'src/constants/enumTurns.constants';
import { ITurno } from '../interface/turns.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ValidationDocument = Validation & Document;

@Schema({ collection: 'validacion_turnos' })
export class Validation {
  @Prop({ required: true, enum: TipoDocumento })
  tipoDocumento: TipoDocumento;

  @Prop({ required: true })
  numeroDocumento: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true, enum: [TipoConsulta.VALIDACION] })
  tipoConsulta: TipoConsulta;
}

export const ValidacionTurnoSchema = SchemaFactory.createForClass(Validation);
