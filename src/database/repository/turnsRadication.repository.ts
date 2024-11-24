import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';
import {
  Radication,
  RadicationDocument,
} from '../schema/turnsRadication.schema';
import { ITurno } from '../interface/turns.interface';

export class RadicationTurnsRepository {
  constructor(
    @InjectModel(Radication.name)
    private readonly radicationTurnsModel: Model<RadicationDocument>,
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
