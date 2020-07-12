import {CanActivate, ExecutionContext} from '@nestjs/common';
import {JJYSession} from "./redis.session";
import {JianquanLeixing, redisUtil} from "./gongju";

/**
 * HTTP 鉴权
 */
export class HttpJianquan implements CanActivate
{
    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        if (context.getType() !== 'http') return false
        const request = context.switchToHttp().getRequest();

        let qingqiuyrl = request.originalUrl

        let quanxian = await redisUtil.getQuanxian(qingqiuyrl) as JianquanLeixing
        if (quanxian === 'niming') return true

        let session = request.session as JJYSession;
        if (!session) return false

        if (quanxian === 'denglu') return !!session.yonghu;
        if (quanxian === 'jianquan')
        {
            if (!session.jiekous) return false
            return session.jiekous.includes(qingqiuyrl);
        }

        return false
    }
}
