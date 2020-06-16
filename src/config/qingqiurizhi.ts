import {rizhi} from './rizhi';
import {Request, Response} from 'express';
import {CallHandler, ExecutionContext, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * 开发时候，打印请求
 */
export class KaifaRizhi implements NestInterceptor
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
                            KaifaRizhi.dayinqingqiu(req, res, now);
                        },
                        () =>
                        {
                            KaifaRizhi.dayinqingqiu(req, res, now);
                        },
                        () =>
                        {
                            KaifaRizhi.dayinqingqiu(req, res, now);
                        }),
                );
        }

        rizhi.verbose(`未处理的日志： ${context.getType()}`);
        return next.handle();
    }

    private static dayinqingqiu(req: Request, res: Response, now: number)
    {
        rizhi.verbose(`请求
URL： ${req.originalUrl}
METHOD: ${req.method}
BODY：
${JSON.stringify(req.body, null, 4)}
返回： ${res.statusCode}
用时：${Date.now() - now}ms
            `);
    }
}