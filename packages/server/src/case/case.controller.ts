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
import { User } from '../schemas/user.schema';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto) {
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
