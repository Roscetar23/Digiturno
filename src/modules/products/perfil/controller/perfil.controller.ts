import { Body, Controller } from '@nestjs/common';
import { PerfilService } from '../service/perfil.service';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}
}
