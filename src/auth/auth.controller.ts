import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('new')
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);

    return { isSuccess: true, message: 'login successful', data: result };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const token = await this.authService.login(username, password);

    return { isSuccess: true, message: 'login successful', token };
  }
}
