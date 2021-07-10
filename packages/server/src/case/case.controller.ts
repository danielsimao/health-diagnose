import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Case } from '../schemas/case.schema';
import { CaseService } from './case.service';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  create(@Body() createCaseDto: Case) {
    return this.caseService.create(createCaseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/unreviewed')
  findAllUnreviewed(@Req() req) {
    const user = req.user;
    return this.caseService.findAllUnreviewed(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: Schema.Types.ObjectId) {
    return this.caseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: Schema.Types.ObjectId, @Body() updateCaseDto: Case) {
    return this.caseService.update(id, updateCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Schema.Types.ObjectId) {
    return this.caseService.remove(id);
  }
}
