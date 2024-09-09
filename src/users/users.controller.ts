import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { RolesGuard } from 'src/guards/role-guard';
import { Roles } from './role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  adminRoute() {
    return { isSuccess: true, message: 'You have reached the admin routes' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CRM', 'admin')
  @Get('crm')
  crmRoute() {
    return { isSuccess: true, message: 'You have reached the CRM routes' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Student', 'CRM', 'admin')
  @Get('student')
  studentRoute() {
    return { isSuccess: true, message: 'You have reached the strudent routes' };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
