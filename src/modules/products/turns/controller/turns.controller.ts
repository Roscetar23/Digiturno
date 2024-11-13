// controllers/turno.controller.ts
import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
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
  @Delete('radicacion/:id')
  async deleteTurnRadication(@Param('id') id: string) {
    return this.turnsService.deleteTurnRadication(id);
  }
  @Delete('validacion/:id')
  async deleteTurnValidation(@Param('id') id: string) {
    return this.turnsService.deleteTurnValidation(id);
  }
}
