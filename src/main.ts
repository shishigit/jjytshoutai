import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rizhi } from './config/rizhi';
import { peizhiwenjian } from './config/peizhiwenjian';
import { qingqiurizhi } from './config/qingqiurizhi';
import { HttpExceptionFilter } from './config/yichang';
import { shujukubanben } from './config/shujukubanben';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule, { logger: rizhi });

  if (peizhiwenjian.kaifa) app.use(qingqiurizhi);
  app.useGlobalFilters(new HttpExceptionFilter());

  await shujukubanben();
  await app.listen(peizhiwenjian.duankou);
}

bootstrap()
  .then(() => rizhi.log('系统启动'))
  .catch(err =>
  {
    rizhi.error('系统异常');
    rizhi.error(err);
  });
