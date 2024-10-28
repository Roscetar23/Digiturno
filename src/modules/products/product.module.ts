import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerfilSchema, Perfil } from 'src/database/schema/perfil.schema';
import { PerfilController } from './perfil/controller/perfil.controller';
import { PerfilRepository } from 'src/database/repository/perfil.repository';
import { PerfilService } from './perfil/service/perfil.service';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Perfil.name, schema: PerfilSchema }]),
  ],
  controllers: [PerfilController, AuthController],
  providers: [PerfilRepository, PerfilService, AuthService],
})
export class ProductModule {}
