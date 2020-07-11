import {CanActivate, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JJYSession} from "./redis.session";

/**
 * HTTP 鉴权
 */
export class HttpJianquan implements CanActivate
{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
    {
        const request = context.switchToHttp().getRequest();
        let session: JJYSession = request.session;
        //todo
        // console.log(session)
        return true;
    }
}
