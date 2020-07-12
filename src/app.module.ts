import {Module, OnApplicationBootstrap} from '@nestjs/common';
import {AppService} from './serv/app.service';
import {CtrlXitong} from './ctrl/ctrl.xitong';
import {TypeOrmModule} from '@nestjs/typeorm';
import {peizhiwenjian} from './config/peizhiwenjian';
import {CtrlYonghuguanli} from './ctrl/ctrl.yonghuguanli';
import {CtrlJueseguanli} from "./ctrl/ctrl.jueseguanli";

@Module({
    imports: [
        TypeOrmModule.forRoot(peizhiwenjian.shujuku),
    ],
    controllers: [CtrlXitong, CtrlYonghuguanli, CtrlJueseguanli],
    providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap
{
    onApplicationBootstrap(): any
    {
    }
}
