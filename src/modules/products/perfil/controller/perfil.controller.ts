import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { PerfilService } from '../service/perfil.service';
import { CreatePerfilDto } from 'src/database/dto/perfil.dto';
import { Post } from '@nestjs/common';
import { PerfilI } from 'src/database/interface/perfil.interface';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  async createPerfil(
    @Body() createPerfilDto: CreatePerfilDto,
  ): Promise<PerfilI> {
    return await this.perfilService.create(createPerfilDto);
  }
  @Get('ViewAllPerfils')
  async getAllPerfils(): Promise<PerfilI[]> {
    return this.perfilService.getAllPerfils();
  }
  @Delete(':id')
  async deletePerfil(@Param('id') id: string): Promise<PerfilI> {
    return this.perfilService.deletePerfil(id);
  }
}
