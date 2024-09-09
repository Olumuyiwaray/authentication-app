import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CacheService } from 'src/helpers/cache-service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private MAX_REQUESTS_PER_MINUTE = 5; // Maximum requests allowed in a minute
  private WINDOW_SIZE = 60000; // Window in milliseconds (1 minute)

  constructor(private readonly cache: CacheService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIpAddress = request.ip;
    const currentTime = Date.now(); // Current time in seconds

    // Retrieve user rate limit data from Redis
    const rateLimitData = await this.cache.getCount(userIpAddress);

    console.log(rateLimitData);

    if (rateLimitData) {
      const { count, timestamp } = rateLimitData;

      // If within the time window and requests exceed the limit
      if (
        currentTime - timestamp < this.WINDOW_SIZE &&
        count >= this.MAX_REQUESTS_PER_MINUTE
      ) {
        throw new UnauthorizedException(
          'Rate limit exceeded. Try again later.',
        );
      }

      // Reset or increment the count based on time window
      if (currentTime - timestamp >= this.WINDOW_SIZE) {
        // Reset the window and the count
        await this.cache.setCount(
          userIpAddress,
          { count: 1, timestamp: currentTime },
          this.WINDOW_SIZE,
        );
      } else {
        // Increment the count within the time window
        await this.cache.setCount(
          userIpAddress,
          { count: count + 1, timestamp },
          this.WINDOW_SIZE,
        );
      }
    } else {
      // Initialize rate limit for the user if it's their first request in the time window
      await this.cache.setCount(
        userIpAddress,
        { count: 1, timestamp: currentTime },
        this.WINDOW_SIZE,
      );
    }

    return true; // Allow the request to proceed
  }
}
