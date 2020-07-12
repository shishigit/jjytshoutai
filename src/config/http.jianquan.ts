import {CanActivate, ExecutionContext} from '@nestjs/common';
import {JJYSession} from "./redis.session";
import {Request} from "express";
import {JianquanLeixing, redisUtil} from "./gongju";

/**
 * HTTP 鉴权
 */
export class HttpJianquan implements CanActivate
{
    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = context.switchToHttp().getRequest();
        let session: JJYSession = request.session;

        if (context.getType() !== 'http') return false

        let qingqiuyrl = context.switchToHttp().getRequest<Request>().originalUrl
        let quanxian = await redisUtil.getQuanxian(qingqiuyrl) as JianquanLeixing

        if (quanxian === 'niming') return true
        if (quanxian === 'denglu') return !!session.yonghu;
        return session.jiekous.includes(qingqiuyrl);
    }
}
