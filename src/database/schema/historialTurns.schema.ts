import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TurnoHistorialDocument = TurnoHistorial & Document;
@Schema()
export class TurnoHistorial extends Document {
  @Prop({ required: true })
  tipoDocumento: string;

  @Prop({ required: true })
  numeroDocumento: string;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  telefono: string;

  @Prop({ required: true })
  tipoConsulta: string; // Por ejemplo: 'radicacion'

  @Prop()
  atendidoPor: string; // Nombre del usuario que atendió el turno

  @Prop({ default: Date.now })
  fechaAtencion: Date;
}

export const TurnoHistorialSchema =
  SchemaFactory.createForClass(TurnoHistorial);
