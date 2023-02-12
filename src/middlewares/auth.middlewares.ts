import { HttpException, Injectable, NestMiddleware, } from '@nestjs/common';

/**
 * @class AuthMiddleware
 * @classdesc 用于处理 登录权限 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(request: any, response: any, next: (error?: any) => void)  {
    console.log(11111,'next()')
    // throw new HttpException('登录账号有误', 406);
    return next();
  };
}
