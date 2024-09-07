import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { comparePassword, hashPassword } from 'src/helpers/utility';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, password, role } = createUserDto;

    const user = await this.userService.findOne(username);

    if (user) {
      return new ConflictException('Username already exists');
    }

    const hash = await hashPassword(password);

    const checkRole = await this.userService.findRole(role);

    const newUserObj = {
      username,
      password: hash,
      roles: checkRole.id,
    };

    if (!checkRole) {
      const newRole = await this.userService.createRole(role);
      newUserObj.roles = newRole.id;
    }

    await this.userService.create(newUserObj);
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };

    const token = this.jwtService.sign(payload);

    await this.cache.set(
      `session${token}`,
      { userId: user.id },
      parseInt(this.configService.get<string>('jwt.expiresIn'), 10),
    );
    return token;
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

    const { password, ...result } = user;

    return result;
  }
}
