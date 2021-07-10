import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { DiagnoseService } from '../diagnose/diagnose.service';
import { Case, CaseDocument } from '../schemas/case.schema';

const lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
  when an unknown printer took a galley of type and scrambled it to make a type 
  specimen book. It has survived not only five centuries, but also the leap into 
  electronic typesetting, remaining essentially unchanged. It was popularised in 
  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
  and more recently with desktop publishing software like Aldus PageMaker 
  including versions of Lorem Ipsum.`;

@Injectable()
export class CaseService {
  constructor(
    @InjectModel(Case.name) private caseModel: Model<CaseDocument>,
    private diagnoseService: DiagnoseService,
  ) {}

  async create(createCaseDto: Case = { ehr: lorem }): Promise<Case> {
    return new this.caseModel(createCaseDto).save();
  }

  async findAll(): Promise<Case[]> {
    return this.caseModel.find().exec();
  }

  async findOne(id: Schema.Types.ObjectId): Promise<Case> {
    return this.caseModel.findById(id);
  }

  update(id: Schema.Types.ObjectId, updateCaseDto: Case) {
    return this.caseModel.updateOne({ id }, { $set: { ...updateCaseDto } });
  }

  remove(id: Schema.Types.ObjectId) {
    return this.caseModel.deleteOne({ id });
  }

  async findAllUnreviewed(userId: Schema.Types.ObjectId) {
    const diagnoses = await this.diagnoseService.findAll(userId);

    const reviewedCaseIds = diagnoses.map((diagnose) => diagnose.caseId);

    return this.caseModel.find({ _id: { $nin: reviewedCaseIds } }).exec();
  }
}
