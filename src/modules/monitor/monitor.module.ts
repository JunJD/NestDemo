import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { MonitorController } from './monitor.controller';
import { User } from '../../entities/user.entity';
import { CryptoUtil } from 'src/utils/crypto.util';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [CryptoUtil, JwtService],
  controllers: [MonitorController],
})
export class MonitorModule {}
