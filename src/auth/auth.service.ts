import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { comparePassword, hashPassword } from 'src/helpers/utility';
import { CacheService } from 'src/helpers/cache-service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, password, role } = createUserDto;

    const user = await this.userService.findOne(username);

    if (user) {
      throw new ConflictException('Username already exists');
    }

    const hash = await hashPassword(password);
    console.log('Hashing password');

    const checkRole = await this.userService.findRole(role);

    const newUserObj = {
      username,
      password: hash,
      roles: '',
    };

    if (!checkRole) {
      newUserObj.roles = checkRole.id;
    } else {
      const newRole = await this.userService.createRole(role);
      newUserObj.roles = newRole.id;
    }

    await this.userService.create(newUserObj);
    return 'User creation sucessful';
  }

  async login(username: string, password: string) {
    console.log('validating user');
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };

    const token = await this.jwtService.signAsync(payload);

    await this.cacheService.setSession(user.id, {
      userId: user.id,
      accessToken: token,
    });
    return token;
  }

  async logout(userId: string) {
    return await this.cacheService.deleteSessionToken(userId);
  }

  private async validateUser(username: string, userPassword: string) {
    const user = await this.userService.findOne(username);

    if (!user) {
      return null;
    }
    const passwordIsMatch = await comparePassword(userPassword, user.password);

    if (!passwordIsMatch) {
      return null;
    }

    user.password = undefined;

    return user;
  }
}
