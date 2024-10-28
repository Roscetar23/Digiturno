import { RadicationTurnsRepository } from 'src/database/repository/turnsRadication.repository';
import { ValidationTurnsRepository } from 'src/database/repository/turnsValidation.repository';
import { Injectable } from '@nestjs/common';
import { ITurno } from 'src/database/interface/turns.interface';
import { CreateTurnDto } from 'src/database/dto/turns.dto';

@Injectable()
export class TurnsService {
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
}
