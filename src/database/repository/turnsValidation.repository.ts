import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Validation,
  ValidationDocument,
} from '../schema/turnsValidation.schema';
import { ITurno } from '../interface/turns.interface';

export class ValidationTurnsRepository {
  constructor(
    @InjectModel(Validation.name)
    private readonly validationturnsModel: Model<ValidationDocument>,
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
