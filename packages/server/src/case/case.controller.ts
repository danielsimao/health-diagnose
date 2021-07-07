import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { FindAllCasesDto } from './dto/find-all-cases.dto';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.caseService.create(createCaseDto);
  }

  @Get()
  findAll(
    @Body()
    findAllCaseDto: FindAllCasesDto,
  ) {
    if (findAllCaseDto.unreviewed) {
      return this.caseService.findAllUnreviewedByUserId(findAllCaseDto.userId);
    }
    return this.caseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: Schema.Types.ObjectId) {
    return this.caseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() updateCaseDto: UpdateCaseDto,
  ) {
    return this.caseService.update(id, updateCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Schema.Types.ObjectId) {
    return this.caseService.remove(id);
  }
}
