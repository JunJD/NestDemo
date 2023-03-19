/**
 * Logging interceptor.
 * @file 处理响应结果
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // const response = context.switchToHttp().getResponse();
    // const request = context.switchToHttp().getRequest();
    return next.handle().pipe(map((data) => ({ status: 200, data })));
  }
}
