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
}
