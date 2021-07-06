import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { Case, CaseDocument } from '../schemas/case.schema';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Types } from 'mongoose';

@Injectable()
export class CaseService {
  constructor(@InjectModel(Case.name) private caseModel: Model<CaseDocument>) {}

  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    return new this.caseModel(createCaseDto).save();
  }

  async findAll(): Promise<Case[]> {
    return this.caseModel.find().exec();
  }

  async findOne(id: Types.ObjectId): Promise<Case> {
    return this.caseModel.findById(id);
  }

  update(id: Types.ObjectId, updateCaseDto: UpdateCaseDto) {
    return this.caseModel.updateOne({ id }, { $set: { ...updateCaseDto } });
  }

  remove(id: Types.ObjectId) {
    return this.caseModel.deleteOne({ id });
  }
}
