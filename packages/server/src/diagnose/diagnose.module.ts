import { Module } from '@nestjs/common';
import { DiagnoseService } from './diagnose.service';
import { DiagnoseController } from './diagnose.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Diagnoses, DiagnosesSchema } from '../schemas/diagnoses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Diagnoses.name, schema: DiagnosesSchema },
    ]),
  ],
  controllers: [DiagnoseController],
  providers: [DiagnoseService],
  exports: [DiagnoseService],
})
export class DiagnoseModule {}
