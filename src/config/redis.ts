import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      store: redisStore,
      socket: {
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
      },
    };
  },
  inject: [ConfigService],
};
