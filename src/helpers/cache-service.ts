import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async setSession(userId: string, sessionData: any) {
    console.log('seetsession');
    await this.cache.set(`user-session:${userId}`, sessionData);
  }

  async getSession(userId: string): Promise<{ accessToken: string }> {
    console.log(userId);
    console.log('getting session');
    return await this.cache.get(`user-session:${userId}`);
  }

  async setCount(ipAddress: string, countDetails: any, ttl: any) {
    console.log('seetsession');
    await this.cache.set(`limit:${ipAddress}`, countDetails, ttl);
  }

  async getCount(
    ipAddress: string,
  ): Promise<{ count: number; timestamp: number }> {
    console.log('getting session');
    return await this.cache.get(`limit:${ipAddress}`);
  }

  async deleteSessionToken(userId: string) {
    await this.cache.del(`user-session:${userId}`);
  }
}
