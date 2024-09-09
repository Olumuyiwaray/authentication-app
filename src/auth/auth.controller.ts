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

    return {
      isSuccess: true,
      message: 'Registeration successful',
      data: result,
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    console.log('In the controller');
    const { username, password } = loginUserDto;
    const token = await this.authService.login(username, password);
    console.log('Back to controller');
    return { isSuccess: true, message: 'login successful', token };
  }
}
