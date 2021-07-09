import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Diagnoses, DiagnosesDocument } from '../schemas/diagnoses.schema';
import { CreateDiagnoseDto } from './dto/create-diagnose.dto';
import { UpdateDiagnoseDto } from './dto/update-diagnose.dto';

@Injectable()
export class DiagnoseService {
  constructor(
    @InjectModel(Diagnoses.name)
    private diagnosesModel: Model<DiagnosesDocument>,
  ) {}

  async create(createDiagnoseDto: CreateDiagnoseDto): Promise<Diagnoses> {
    return new this.diagnosesModel(createDiagnoseDto).save();
  }

  findAll(userId?: Schema.Types.ObjectId) {
    return this.diagnosesModel.find(userId && { userId });
  }

  findOne(id: number) {
    return this.diagnosesModel.findById(id);
  }

  update(id: number, updateDiagnoseDto: UpdateDiagnoseDto) {
    return this.diagnosesModel.updateOne(
      { id },
      { $set: { ...updateDiagnoseDto } },
    );
  }

  remove(id: number) {
    return this.diagnosesModel.deleteOne({ id });
  }
}
