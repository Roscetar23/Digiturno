import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PerfilDocument, Perfil } from '../schema/perfil.schema';
import { Model } from 'mongoose';
import { PerfilI } from '../interface/perfil.interface';

@Injectable()
export class PerfilRepository {
  constructor(
    @InjectModel(Perfil.name)
    private readonly perfilModel: Model<PerfilDocument>,
  ) {}

  async create(perfil: PerfilI): Promise<PerfilI> {
    const createPerfil = new this.perfilModel(perfil);
    return createPerfil.save();
  }

  async findAll(): Promise<PerfilI[]> {
    return this.perfilModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<PerfilI> {
    return this.perfilModel.findOne({ email });
  }

  async delete(id: string): Promise<PerfilI> {
    return this.perfilModel.findByIdAndDelete(id).exec();
  }
}
