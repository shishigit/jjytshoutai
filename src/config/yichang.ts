import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';
import {rizhi} from "./rizhi";
import {QueryFailedError} from "typeorm";

/**
 * HTTP 异常处理器
 */
@Catch(HttpException)
export class HttpYichang implements ExceptionFilter
{
    catch(exception: HttpException, host: ArgumentsHost)
    {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if (status === 600)
        {
            response.status(status).json(exception.getResponse());
            return;
        }

        rizhi.error(`请求异常  URL：${request.originalUrl}  BODY：${JSON.stringify(request.body)}`);
        rizhi.error(exception)

        response.status(600).json('系统异常！');
    }
}

/**
 * HTTP 异常处理器
 */
@Catch(QueryFailedError)
export class ShujukuYichang implements ExceptionFilter
{
    catch(exception: QueryFailedError, host: ArgumentsHost)
    {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception.message.includes('uk_juese_mingcheng'))
        {
            response.status(600).json('角色名称已经存在！');
            return
        }

        rizhi.error(`请求异常  URL：${request.originalUrl}  BODY：${JSON.stringify(request.body)}`);
        rizhi.error(exception)

        response.status(600).json('系统异常！');
    }
}

/**
 * 提示异常，抛出此异常后，系统将返回给前端
 */
export class YichangTishi extends HttpException
{
    constructor(private readonly xinxi: string)
    {
        super(xinxi, 600);
    }
}

/**
 * 系统退出异常，抛出此异常后，系统将退出运行
 */
export class YichangXitongTuichu extends Error
{
    constructor(message: string)
    {
        super(message);
    }
}
