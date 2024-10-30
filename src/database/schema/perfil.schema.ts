import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/constants/enumRole.constants';

export type PerfilDocument = Perfil & Document;

@Schema()
export class Perfil {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);
