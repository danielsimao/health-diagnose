import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from '../schemas/case.schema';
import { DiagnoseService } from '../diagnose/diagnose.service';
import { DiagnoseModule } from '../diagnose/diagnose.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }]),
    DiagnoseModule,
  ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
