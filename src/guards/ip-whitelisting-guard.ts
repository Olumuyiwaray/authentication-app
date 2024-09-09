import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  private readonly whitelist: string[] = ['127.0.0.1', '::1'];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.ip;
    console.log(clientIp);

    if (this.whitelist.includes(clientIp)) {
      return true; // Allow access
    } else {
      throw new ForbiddenException('Access denied from this IP');
    }
  }
}
