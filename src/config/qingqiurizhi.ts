/******************************************************************************
 * 开发时候，打印请求
 ******************************************************************************/
import { rizhi } from './rizhi';
import { Request } from 'express';

export function qingqiurizhi(req: Request, res, next)
{
  rizhi.verbose(`请求URL： ${req.originalUrl}`);
  rizhi.verbose(`请求BODY： ${req.body}`);
  next();
}