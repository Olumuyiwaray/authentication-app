import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IpWhitelistGuard } from './guards/ip-whitelisting-guard';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalGuards(new IpWhitelistGuard());
  await app.listen(3000);
}
bootstrap();
