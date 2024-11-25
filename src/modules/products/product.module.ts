import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PerfilSchema, Perfil } from 'src/database/schema/perfil.schema';
import { PerfilController } from './perfil/controller/perfil.controller';
import { PerfilRepository } from 'src/database/repository/perfil.repository';
import { PerfilService } from './perfil/service/perfil.service';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { jwtConstants } from 'src/constants/jwt.constants';
import { TurnsController } from './turns/controller/turns.controller';
import { RadicationTurnsRepository } from 'src/database/repository/turnsRadication.repository';
import { ValidationTurnsRepository } from 'src/database/repository/turnsValidation.repository';
import { TurnsService } from './turns/service/turns.service';
import {
  RadicacionTurnoSchema,
  Radication,
} from 'src/database/schema/turnsRadication.schema';
import {
  Validation,
  ValidacionTurnoSchema,
} from 'src/database/schema/turnsValidation.schema';
import { ScheduleModule } from '@nestjs/schedule';
import {
  TurnoHistorial,
  TurnoHistorialSchema,
} from 'src/database/schema/historialTurns.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Perfil.name, schema: PerfilSchema }]),
    MongooseModule.forFeature([
      { name: Radication.name, schema: RadicacionTurnoSchema },
    ]),
    MongooseModule.forFeature([
      { name: Validation.name, schema: ValidacionTurnoSchema },
    ]),
    MongooseModule.forFeature([
      { name: TurnoHistorial.name, schema: TurnoHistorialSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [PerfilController, AuthController, TurnsController],
  providers: [
    PerfilRepository,
    PerfilService,
    AuthService,
    RadicationTurnsRepository,
    ValidationTurnsRepository,
    TurnsService,
  ],
})
export class ProductModule {}
