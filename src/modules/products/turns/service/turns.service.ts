import { RadicationTurnsRepository } from 'src/database/repository/turnsRadication.repository';
import { ValidationTurnsRepository } from 'src/database/repository/turnsValidation.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ITurno } from 'src/database/interface/turns.interface';
import { CreateTurnDto } from 'src/database/dto/turns.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TurnsService {
  private readonly logger = new Logger(TurnsService.name);
  constructor(
    private readonly turnsRadicationRepository: RadicationTurnsRepository,
    private readonly TurnsValidationRepository: ValidationTurnsRepository,
  ) {}

  async createTurn(createTurnDto: CreateTurnDto): Promise<ITurno> {
    if (createTurnDto.tipoConsulta === 'radicacion') {
      return this.turnsRadicationRepository.create(createTurnDto);
    } else if (createTurnDto.tipoConsulta === 'validacion') {
      return this.TurnsValidationRepository.create(createTurnDto);
    }
    throw new Error('Tipo de consulta inválido');
  }

  async getAllRadicationTurns(): Promise<ITurno[]> {
    return this.turnsRadicationRepository.findAll();
  }

  async getAllValidationTurns(): Promise<ITurno[]> {
    return this.TurnsValidationRepository.findAll();
  }

  @Cron('0 21 * * *')
  async deleteAllTurns() {
    this.logger.debug('Eliminando los turnos a las 2 am');

    await this.turnsRadicationRepository.deleteAll();
    this.logger.debug('Turnos de radicación eliminados');

    await this.TurnsValidationRepository.deleteAll();
    this.logger.debug('Turnos de validación eliminados');
  }

  async deleteTurnRadication(id: string): Promise<ITurno> {
    return await this.turnsRadicationRepository.deleteTurn(id);
  }

  async deleteTurnValidation(id: string): Promise<ITurno> {
    return await this.TurnsValidationRepository.deleteTurn(id);
  }

  async getLastTurnRadication(): Promise<ITurno> {
    return this.turnsRadicationRepository.findLastTurn();
  }

  async getLastTurnValidation(): Promise<ITurno> {
    return this.TurnsValidationRepository.findLastTurn();
  }

  async getNextTurnRadication(): Promise<ITurno | null> {
    return this.turnsRadicationRepository.findAndLockNextTurn();
  }

  async getNextTurnValidation(): Promise<ITurno | null> {
    return this.TurnsValidationRepository.findAndLockNextTurn();
  }
}
