import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { DiagnoseService } from '../diagnose/diagnose.service';
import { Case, CaseDocument } from '../schemas/case.schema';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class CaseService {
  constructor(
    @InjectModel(Case.name) private caseModel: Model<CaseDocument>,
    private diagnoseService: DiagnoseService,
  ) {}

  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    return new this.caseModel(createCaseDto).save();
  }

  async findAll(): Promise<Case[]> {
    return this.caseModel.find().exec();
  }

  async findOne(id: Schema.Types.ObjectId): Promise<Case> {
    return this.caseModel.findById(id);
  }

  update(id: Schema.Types.ObjectId, updateCaseDto: UpdateCaseDto) {
    return this.caseModel.updateOne({ id }, { $set: { ...updateCaseDto } });
  }

  remove(id: Schema.Types.ObjectId) {
    return this.caseModel.deleteOne({ id });
  }

  async findAllUnreviewedByUserId(userId: Schema.Types.ObjectId) {
    const diagnoses = await this.diagnoseService.findAll(userId);

    const reviewedCaseIds = diagnoses.map((diagnose) => diagnose.caseId);

    return this.caseModel.find({ _id: { $nin: reviewedCaseIds } }).exec();
  }
}
