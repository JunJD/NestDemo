import { UserModule } from '../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { CryptoUtil } from 'src/utils/crypto.util';
// const fs = require('fs');
// const path = require('path')
// const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './../../../keys/private.key'));
// const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './../../../keys/public.key'));
@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy, JwtStrategy, CryptoUtil],
  exports: [AuthService],
})
export class AuthModule {}
