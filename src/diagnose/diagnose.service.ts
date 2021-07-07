import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  findAll() {
    return this.diagnosesModel.find().exec();
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
