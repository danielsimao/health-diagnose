import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: User): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { username },
      { $set: { ...updateUserDto } },
    );
  }

  async remove(username: string) {
    return this.userModel.deleteOne({ username });
  }
}
