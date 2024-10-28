// controllers/turno.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { TurnsService } from '../service/turns.service';
import { CreateTurnDto } from 'src/database/dto/turns.dto';

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
}
