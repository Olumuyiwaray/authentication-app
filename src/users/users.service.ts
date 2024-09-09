import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/roles.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
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

  async findRoleById(id: string) {
    return await this.roleModel.findById(id);
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

    user.password = undefined;

    return user;
  }
}
