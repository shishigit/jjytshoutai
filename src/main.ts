import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rizhi } from './config/rizhi';
import { peizhiwenjian } from './config/peizhiwenjian';
import { KaifaRizhi } from './config/qingqiurizhi';
import { HttpYichang } from './config/yichang';
import { Shujukubanben } from './config/shujukubanben';
import { gengxinJiekou } from './config/zhujie';
import { Shouwei } from './config/shouwei';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule, { logger: rizhi });

  if (peizhiwenjian.kaifa) app.useGlobalInterceptors(new KaifaRizhi());
  app.useGlobalFilters(new HttpYichang());
  app.useGlobalGuards(new Shouwei());

  await gengxinJiekou();
  await Shujukubanben.tongbushuju();

  await app.listen(peizhiwenjian.duankou);
}

bootstrap()
  .then(() => rizhi.log('系统启动'))
  .catch(err =>
  {
    rizhi.error('系统异常');
    rizhi.error(err);
  });
