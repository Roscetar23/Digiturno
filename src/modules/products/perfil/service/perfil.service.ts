import { Injectable } from '@nestjs/common';
import { PerfilRepository } from 'src/database/repository/perfil.repository';

@Injectable()
export class PerfilService {
  constructor(private readonly perfilRepository: PerfilRepository) {}
}
