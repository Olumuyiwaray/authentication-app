import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { Role, RoleSchema } from './schemas/roles.schema';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { RolesGuard } from 'src/guards/role-guard';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/helpers/cache-service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [JwtService, UsersService, CacheService, JwtAuthGuard, RolesGuard],
  exports: [UsersService, MongooseModule, CacheService],
})
export class UsersModule {}
