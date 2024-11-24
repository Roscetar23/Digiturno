import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TipoDocumento } from 'src/constants/enumTurns.constants';
import { TipoConsulta } from 'src/constants/enumTurns.constants';
import { ITurno } from '../interface/turns.interface';

export type RadicationDocument = Radication & Document;

@Schema({ collection: 'radicacion_turnos' })
export class Radication {
  @Prop({ required: true, enum: TipoDocumento })
  tipoDocumento: TipoDocumento;

  @Prop({ required: true })
  numeroDocumento: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true, enum: [TipoConsulta.RADICACION] })
  tipoConsulta: TipoConsulta;

  @Prop({ default: 'pending' })
  status: string;
}

export const RadicacionTurnoSchema = SchemaFactory.createForClass(Radication);
