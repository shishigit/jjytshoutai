/******************************************************************************
 * 开发时候，打印请求
 ******************************************************************************/
import { rizhi } from './rizhi';
import { Request, Response } from 'express';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function qingqiurizhi(req: Request, res, next)
{
  rizhi.verbose(`请求URL： ${req.originalUrl}`);
  rizhi.verbose(`请求BODY： ${req.body}`);
  next();
}


@Injectable()
export class LoggingInterceptor implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any>
  {
    if (context.getType() === 'http')
    {
      let req = context.switchToHttp().getRequest<Request>();
      let res = context.switchToHttp().getResponse<Response>();

      const now = Date.now();

      return next
        .handle()
        .pipe(
          tap(() =>
          {
            rizhi.verbose(`请求
URL： ${req.originalUrl}
METHOD: ${req.method}
BODY：
${JSON.stringify(req.body, null, 4)}
返回： ${res.statusCode}
用时：${Date.now() - now}ms
            `);
          }),
        );
    }

    rizhi.verbose(`未处理的日志： ${context.getType()}`);
    return next.handle();
  }
}