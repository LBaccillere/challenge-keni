import { Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { User } from '../core/user.schema';
import { UsersRepository } from '../core/users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersDBRepository implements UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().sort({ name: 'asc' });
    return users;
  }

  async findOne(uuid: UUID): Promise<User> {
    const user = await this.userModel.findOne({ uuid });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
