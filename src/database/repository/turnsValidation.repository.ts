import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Validation,
  ValidationDocument,
} from '../schema/turnsValidation.schema';
import { ITurno } from '../interface/turns.interface';
import {
  TurnoHistorial,
  TurnoHistorialDocument,
} from '../schema/historialTurns.schema';

export class ValidationTurnsRepository {
  constructor(
    @InjectModel(Validation.name)
    private readonly validationturnsModel: Model<ValidationDocument>,
    @InjectModel(TurnoHistorial.name)
    private readonly turnoHistorialModel: Model<TurnoHistorialDocument>,
  ) {}

  async create(validationTurn: ITurno): Promise<ITurno> {
    const turno = new this.validationturnsModel(validationTurn);
    return turno.save();
  }

  async findAll(): Promise<ITurno[]> {
    return this.validationturnsModel.find().exec();
  }
  async deleteAll(): Promise<void> {
    await this.validationturnsModel.deleteMany({});
  }
  async deleteTurn(id: string): Promise<ITurno> {
    const turno = await this.validationturnsModel.findById(id);
    if (!turno) {
      throw new Error('Turno no encontrado');
    }

    const historialTurno = new this.turnoHistorialModel({
      tipoDocumento: turno.tipoDocumento,
      numeroDocumento: turno.numeroDocumento,
      nombre: turno.nombre,
      telefono: turno.telefono,
      tipoConsulta: 'validacion',
      atendidoPor: 'Validador',
      fechaAtencion: new Date(),
    });
    await historialTurno.save();

    return this.validationturnsModel.findByIdAndDelete(id);
  }

  async findLastTurn(): Promise<ITurno> {
    return this.validationturnsModel.findOne().sort({ createdAt: -1 }).exec();
  }

  async findAndLockNextTurn(): Promise<ITurno | null> {
    return this.validationturnsModel
      .findOneAndUpdate(
        { status: 'pending' },
        { $set: { status: 'in_progress' } },
        { new: true },
      )
      .sort({ createdAt: 1 })
      .exec();
  }
}
