import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Diagnoses } from '../schemas/diagnoses.schema';
import { DiagnoseService } from './diagnose.service';

@Controller('diagnose')
export class DiagnoseController {
  constructor(private readonly diagnoseService: DiagnoseService) {}

  @Post()
  create(@Body() createDiagnoseDto: Diagnoses) {
    return this.diagnoseService.create(createDiagnoseDto);
  }

  @Get()
  findAll() {
    return this.diagnoseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnoseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiagnoseDto: Diagnoses) {
    return this.diagnoseService.update(+id, updateDiagnoseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnoseService.remove(+id);
  }
}
