import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {rizhi} from './config/rizhi';
import {peizhiwenjian} from './config/peizhiwenjian';
import {KaifaRizhi} from './config/qingqiurizhi';
import {HttpYichang, YichangXitongTuichu} from './config/yichang';
import {gengxinJiekou} from './config/zhujie';
import {HttpJianquan} from './config/http.jianquan';
import {redissession} from './config/redis.session';
import {shujukubanben} from "./config/shujukubanben";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule, {logger: rizhi});

    if (peizhiwenjian.kaifa) app.useGlobalInterceptors(new KaifaRizhi());

    app.useGlobalFilters(new HttpYichang());
    app.useGlobalGuards(new HttpJianquan());
    app.use(redissession);

    await shujukubanben.tongbushuju();
    await gengxinJiekou();

    await app.listen(peizhiwenjian.duankou);
}

bootstrap()
    .then(() => rizhi.log('系统启动'))
    .catch(err =>
    {
        rizhi.error('系统异常');
        rizhi.error(err);
        if (err instanceof YichangXitongTuichu) process.exit();
    });
