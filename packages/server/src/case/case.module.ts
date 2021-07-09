import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiagnoseModule } from '../diagnose/diagnose.module';
import { Case, CaseSchema } from '../schemas/case.schema';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }]),
    DiagnoseModule,
  ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
