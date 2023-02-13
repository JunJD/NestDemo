
import { forwardRef, HttpException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { UserService } from "../user/user.service";
import { CryptoUtil } from "src/utils/crypto.util";
import { User } from "src/entities/user.entity";
@Injectable()
export class AuthService {
    constructor(
        @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    async createToken(user: JwtPayload) {
      const accessToken = this.jwtService.sign(user);
      return {
        expiresIn: 3600,
        accessToken,
      };
    }

    async verifyToken(token: string): Promise<boolean | User> {
      let user = null; 
      try {
        user= this.jwtService.verify(token)
      } catch (error) {
        throw new HttpException('TOKEN无效', 407);
      }
      return await this.userService.findOneByAccount(user.account);
    }

    async validateUser(username: string, password: string): Promise<any> {
      const user = await this.userService.findOneByAccount(username);
      if (!user) {
          throw new HttpException('登录账号有误', 406);
      }
      if (!this.cryptoUtil.checkPassword(password, user.password)) {
          throw new HttpException('登录密码有误', 406);
      }
      if (user && this.cryptoUtil.checkPassword(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
}