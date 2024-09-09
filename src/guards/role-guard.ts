import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // If no roles are required, the route is open
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // User should be attached by JwtAuthGuard
    console.log(user);
    const userRole = await this.userService.findRoleById(user.roles);

    console.log('roles:', userRole);

    if (
      !user ||
      !user.roles ||
      !requiredRoles.some((role) => role === userRole.role)
    ) {
      throw new ForbiddenException('You do not have the required permissions');
    }

    return true;
  }
}
