import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PerfilDocument = Perfil & Document;

@Schema()
export class Perfil {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  rol: string;
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);
