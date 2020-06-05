import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * HTTP 鉴权
 */
export class Shouwei implements CanActivate
{
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
  {
    const request = context.switchToHttp().getRequest();
    let session = request.session;
    //todo
    return true;
  }
}