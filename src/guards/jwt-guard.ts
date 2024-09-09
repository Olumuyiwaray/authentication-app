import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/helpers/cache-service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const secret = this.configService.get<string>('jwt.secret');
      console.log(secret);
      const decoded = await this.jwtService.verifyAsync(token, { secret });

      console.log(decoded.sub);

      const session = await this.cacheService.getSession(decoded.sub);

      if (!session) {
        throw new UnauthorizedException('User logged out');
      }

      console.log(session);

      if (session.accessToken !== token) {
        throw new UnauthorizedException('Invalid token');
      }

      console.log(session.accessToken);
      // Attach the decoded user info to the request
      request.user = decoded;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
