/**
 * HttpException filter.
 * @file 全局异常拦截器
 */

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (!('getStatus' in exception)) {
      this.handleNoGetStatus(request, response);
      // console.error(exception)
      return;
    }
    response!.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
      msg:
        exception.message.message ||
        exception.message.error ||
        exception.message,
    });
  }

  handleNoGetStatus(request, response) {
    response!.status(500).json({
      statusCode: 30001,
      timestamp: new Date().toISOString(),
      path: request.url,
      msg: '系统异常',
    });
  }
}
