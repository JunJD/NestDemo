import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './filters/error.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResultInterceptor } from './interceptors/result.interceptor';
import { ConfigService } from './config/config.service';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**适当设置 HTTP 标头来帮助保护应用免受一些众所周知的 Web 漏洞的影响 */
  app.use((helmet as any)());
  /**压缩可以大大减小响应正文的大小，从而提高 Web 应用的速度 */
  app.use(compression());
  /**在给定时间段内发出的 API 请求数。如果超过此限制，则在给定时间段完成之前，将不允许应用或用户发出任何 API 请。*/
  app.use((rateLimit as any)({ windowMs: 15 * 60 * 1000,  max: 100, message: "请求太多,请15分钟后再试" }));
  /**
   * 全局异常拦截器
   */
  /**异常: 报错catch并透出 */
  app.useGlobalFilters(new AnyExceptionFilter());
  /**管道: 接口类型错误透出 */
  app.useGlobalPipes(new ValidationPipe());
  /**拦截器: 拦截请求和响应做处理，如log */
  app.useGlobalInterceptors(new LoggingInterceptor(), new ResultInterceptor());
  /**全局守卫: token、角色权限鉴定 */
  // ...

  /**配置 */
  const config = new ConfigService(process.env.NODE_ENV);
  await app.listen(config.get('PORT'));
}

bootstrap();
