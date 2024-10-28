import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from 'src/database/dto/perfil.dto';
import { PerfilRepository } from 'src/database/repository/perfil.repository';
import { PerfilI } from 'src/database/interface/perfil.interface';

@Injectable()
export class PerfilService {
  constructor(private readonly perfilRepository: PerfilRepository) {}

  async create(createPerfilDto: CreatePerfilDto): Promise<PerfilI> {
    return await this.perfilRepository.create(createPerfilDto);
  }
  async deletePerfil(id: string): Promise<PerfilI> {
    return await this.perfilRepository.delete(id);
  }
  async getAllPerfils(): Promise<PerfilI[]> {
    return this.perfilRepository.findAll();
  }
  async findOneByEmail(email: string): Promise<PerfilI> {
    return await this.perfilRepository.findOneByEmail(email);
  }
}
