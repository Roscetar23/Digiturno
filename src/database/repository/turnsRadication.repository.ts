import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';
import {
  Radication,
  RadicationDocument,
} from '../schema/turnsRadication.schema';
import { ITurno } from '../interface/turns.interface';
import {
  TurnoHistorial,
  TurnoHistorialDocument,
} from '../schema/historialTurns.schema';

export class RadicationTurnsRepository {
  constructor(
    @InjectModel(Radication.name)
    private readonly radicationTurnsModel: Model<RadicationDocument>,

    @InjectModel(TurnoHistorial.name)
    private readonly turnoHistorialModel: Model<TurnoHistorialDocument>,
  ) {}

  async create(turnoRadication: ITurno): Promise<ITurno> {
    const turno = new this.radicationTurnsModel(turnoRadication);
    return turno.save();
  }

  async findAll(): Promise<ITurno[]> {
    return this.radicationTurnsModel.find().exec();
  }

  async deleteAll(): Promise<void> {
    await this.radicationTurnsModel.deleteMany({});
  }

  async deleteTurn(id: string): Promise<ITurno> {
    const turno = await this.radicationTurnsModel.findById(id);
    if (!turno) {
      throw new Error('Turno no encontrado');
    }

    const historialTurno = new this.turnoHistorialModel({
      tipoDocumento: turno.tipoDocumento,
      numeroDocumento: turno.numeroDocumento,
      nombre: turno.nombre,
      telefono: turno.telefono,
      tipoConsulta: 'radicacion',
      atendidoPor: 'Radicador',
      fechaAtencion: new Date(),
    });
    await historialTurno.save();

    return this.radicationTurnsModel.findByIdAndDelete(id);
  }

  async findLastTurn(): Promise<ITurno> {
    return this.radicationTurnsModel.findOne().sort({ createdAt: -1 }).exec();
  }

  async findAndLockNextTurn(): Promise<ITurno | null> {
    return this.radicationTurnsModel
      .findOneAndUpdate(
        { status: 'pending' },
        { $set: { status: 'in_progress' } },
        { new: true },
      )
      .sort({ createdAt: 1 })
      .exec();
  }
}
