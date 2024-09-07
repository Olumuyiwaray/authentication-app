import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/roles.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}
  async create({ username, password, roles }) {
    await this.userModel.create({
      username,
      password,
      roles,
    });
  }

  async findRole(roleName: string) {
    return await this.roleModel.findOne({ role: roleName });
  }

  async createRole(roleName: string) {
    return await this.roleModel.create({
      role: roleName,
    });
  }
  async findOne(username: string) {
    return await this.userModel.findOne({ username });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return new NotFoundException('User not found');
    }

    const { password, ...result } = user;

    return result;
  }

  update() {
    return '';
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
