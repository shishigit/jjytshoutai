import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rizhi } from './config/rizhi';
import { peizhiwenjian } from './config/peizhiwenjian';
import { qingqiurizhi } from './config/qingqiurizhi';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule, { logger: rizhi });

  if (peizhiwenjian.kaifa) app.use(qingqiurizhi);

  await app.listen(peizhiwenjian.duankou);
}

bootstrap()
  .then(value => rizhi.log('系统启动'))
  .catch(reason => rizhi.log('系统异常'));
