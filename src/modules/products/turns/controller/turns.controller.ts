// controllers/turno.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TurnsService } from '../service/turns.service';
import { CreateTurnDto } from 'src/database/dto/turns.dto';
import { AuthGuard } from 'src/guard/auth.guard';

import { SetMetadata } from '@nestjs/common';
import { ITurno } from 'src/database/interface/turns.interface';

export const Role = (role: string) => SetMetadata('role', role);

@Controller('turnos')
export class TurnsController {
  constructor(private readonly turnsService: TurnsService) {}

  @Post()
  async createTurn(@Body() createTurnDto: CreateTurnDto) {
    return this.turnsService.createTurn(createTurnDto);
  }

  @Get('radicacion')
  async getAllRadicationTurns() {
    return this.turnsService.getAllRadicationTurns();
  }

  @Get('validacion')
  async getAllValidationTurns() {
    return this.turnsService.getAllValidationTurns();
  }
  @Delete('radicacion/:id')
  @UseGuards(AuthGuard)
  @Role('radicacion')
  async deleteTurnRadication(@Param('id') id: string) {
    return this.turnsService.deleteTurnRadication(id);
  }
  @Delete('validacion/:id')
  @UseGuards(AuthGuard)
  @Role('validacion')
  async deleteTurnValidation(@Param('id') id: string) {
    return this.turnsService.deleteTurnValidation(id);
  }

  @Get('lastTurnRadication')
  @UseGuards(AuthGuard)
  @Role('radicacion')
  async getLastTurnRadication(): Promise<ITurno> {
    return this.turnsService.getLastTurnRadication();
  }

  @Get('lastTurnValidation')
  @UseGuards(AuthGuard)
  @Role('validacion')
  async getLastTurnValidation(): Promise<ITurno> {
    return this.turnsService.getLastTurnValidation();
  }

  @Get('nextTurnRadication')
  @UseGuards(AuthGuard)
  @Role('radicacion')
  async getNextTurnRadication(): Promise<ITurno | null> {
    return this.turnsService.getNextTurnRadication();
  }

  @Get('nextTurnValidation')
  @UseGuards(AuthGuard)
  @Role('validacion')
  async getNextTurnValidation(): Promise<ITurno | null> {
    return this.turnsService.getNextTurnValidation();
  }

  @Get('historialTurnos')
  @UseGuards(AuthGuard)
  @Role('admin')
  async getHistorialTurnos() {
    return this.turnsService.getHistorialTurnos();
  }
}
