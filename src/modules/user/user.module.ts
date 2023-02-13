import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

import { UserController } from './user.controller';
import { User } from '../../entities/user.entity';
import { CryptoUtil } from 'src/utils/crypto.util';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [
    CryptoUtil, 
    UserService, 
    JwtService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard ,
    // },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}