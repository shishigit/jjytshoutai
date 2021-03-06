import {Module, OnApplicationBootstrap} from '@nestjs/common';
import {AppService} from './serv/app.service';
import {CtrlXitong} from './ctrl/ctrl.xitong';
import {TypeOrmModule} from '@nestjs/typeorm';
import {peizhiwenjian} from './config/peizhiwenjian';
import {CtrlYonghuguanli} from './ctrl/ctrl.yonghuguanli';
import {CtrlJueseguanli} from "./ctrl/ctrl.jueseguanli";
import {CtrlBumenguanli} from "./ctrl/ctrl.bumenguanli";

@Module({
    imports: [
        TypeOrmModule.forRoot(peizhiwenjian.shujuku),
    ],
    controllers: [CtrlXitong, CtrlYonghuguanli, CtrlJueseguanli, CtrlBumenguanli],
    providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap
{
    onApplicationBootstrap(): any
    {
    }
}
