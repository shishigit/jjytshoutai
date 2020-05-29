/******************************************************************************
 * 系统异常
 ******************************************************************************/
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

/**
 * HTTP 异常处理器
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost)
  {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 600)
    {
      response.status(status).json(exception.getResponse());
      return;
    }

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