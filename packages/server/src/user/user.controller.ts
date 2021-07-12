import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../schemas/user.schema';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: User) {
    const existingUser = await this.userService.findOne(createUserDto.email);

    if (existingUser) {
      throw new ForbiddenException();
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    return this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@Req() req: Request) {
    const user = <User>req.user;
    const userData = await this.userService.findOne(user.email);
    userData.password = undefined;
    return userData;
  }
}
