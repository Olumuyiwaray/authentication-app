import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('new')
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);

    return {
      isSuccess: true,
      message: 'Registeration successful',
      data: result,
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const token = await this.authService.login(username, password);
    return { isSuccess: true, message: 'login successful', token };
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    await this.authService.logout(req.user.sub);

    return { isSuccess: true, message: 'logout successful' };
  }
}
